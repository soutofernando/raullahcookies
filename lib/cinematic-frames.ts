import { assetPath } from "@/lib/asset-path";

export const FRAME_COUNT = 192;

/** Canvas backing store in device pixels, so the browser does not upscale a small bitmap. */
export function cinematicPixelSize(cssWidth: number, cssHeight: number, devicePixelRatio: number) {
  const dpr = Math.min(Math.max(devicePixelRatio || 1, 1), 2);
  let width = Math.max(1, Math.round(cssWidth * dpr));
  let height = Math.max(1, Math.round(cssHeight * dpr));
  const longEdge = Math.max(width, height);
  const cap = 3840;
  if (longEdge > cap) {
    const down = cap / longEdge;
    width = Math.max(1, Math.round(width * down));
    height = Math.max(1, Math.round(height * down));
  }
  return { width, height };
}

export function cinematicFrameSrc(index: number, mobile = false) {
  const frame = String(index + 1).padStart(3, "0");
  const folder = mobile ? "frames-mobile" : "frames";
  return assetPath(`/scroll/${folder}/frame-${frame}.webp`);
}

/** Cover fills the canvas. Contain keeps the whole frame, used for the vertical mobile video. */
export function drawCinematicFrame(
  context: CanvasRenderingContext2D,
  bitmap: CanvasImageSource & { width: number; height: number },
  width: number,
  height: number,
  fit: "cover" | "contain" = "cover",
) {
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  if (fit === "contain") {
    const scale = Math.min(width / bitmap.width, height / bitmap.height);
    const dw = bitmap.width * scale;
    const dh = bitmap.height * scale;
    context.fillStyle = "#0f3363";
    context.fillRect(0, 0, width, height);
    context.drawImage(
      bitmap,
      0,
      0,
      bitmap.width,
      bitmap.height,
      (width - dw) / 2,
      (height - dh) / 2,
      dw,
      dh,
    );
    return;
  }

  const scale = Math.max(width / bitmap.width, height / bitmap.height);
  const cropW = width / scale;
  const cropH = height / scale;
  const sx = (bitmap.width - cropW) / 2;
  const sy = (bitmap.height - cropH) / 2;
  context.drawImage(bitmap, sx, sy, cropW, cropH, 0, 0, width, height);
}

type Listener = () => void;

/**
 * Keeps the JPEGs as original-size bitmaps. Scaling happens once, at draw time.
 */
export class FrameSequence {
  private readonly blobs = new Map<number, Blob>();
  private readonly bitmaps = new Map<number, ImageBitmap>();
  private readonly blobTasks = new Map<number, Promise<void>>();
  private readonly decodeTasks = new Set<number>();
  private readonly failed = new Set<number>();
  private readonly listeners = new Set<Listener>();
  private readonly controller = new AbortController();
  private focus = 0;
  private direction = 1;
  private ahead = 24;
  private behind = 8;
  private fetchSlots = 0;
  private decodeSlots = 0;
  private fetchLimit = 12;
  private decodeLimit = 4;
  private pinned = -1;
  private mobile = false;
  private generation = 0;
  private disposed = false;

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emit() {
    for (const listener of this.listeners) listener();
  }

  setViewport(mobile: boolean) {
    const ahead = mobile ? 10 : 24;
    const behind = mobile ? 4 : 8;
    const fetchLimit = mobile ? 6 : 12;
    const decodeLimit = mobile ? 2 : 4;
    const sourceChanged = mobile !== this.mobile;
    const changed =
      sourceChanged ||
      ahead !== this.ahead ||
      behind !== this.behind ||
      fetchLimit !== this.fetchLimit ||
      decodeLimit !== this.decodeLimit;
    this.mobile = mobile;
    this.ahead = ahead;
    this.behind = behind;
    this.fetchLimit = fetchLimit;
    this.decodeLimit = decodeLimit;
    if (!changed) return;
    if (sourceChanged) this.resetSource();
    else this.evict();
    this.pump();
  }

  setFocus(index: number, direction = 0) {
    const next = clampFrame(index);
    if (direction !== 0) this.direction = direction > 0 ? 1 : -1;
    else if (next !== this.focus) this.direction = next > this.focus ? 1 : -1;
    if (next === this.focus) return;
    this.focus = next;
    this.evict();
    this.pump();
  }

  warm() {
    this.pump();
  }

  resolve(index: number) {
    const exact = this.bitmaps.get(index);
    if (exact) {
      this.pinned = index;
      return exact;
    }

    let best: ImageBitmap | null = null;
    let bestFrame = -1;
    let bestScore = Number.POSITIVE_INFINITY;
    for (const [frame, bitmap] of this.bitmaps) {
      const score = Math.abs(frame - index);
      if (score < bestScore) {
        bestScore = score;
        best = bitmap;
        bestFrame = frame;
      }
    }
    if (best) this.pinned = bestFrame;
    return best;
  }

  destroy() {
    this.disposed = true;
    this.controller.abort();
    this.closeMap(this.bitmaps);
    this.listeners.clear();
  }

  private resetSource() {
    this.generation += 1;
    this.failed.clear();
    this.blobs.clear();
    this.blobTasks.clear();
    this.closeMap(this.bitmaps);
    this.pinned = -1;
  }

  private inWindow(index: number) {
    const delta = (index - this.focus) * this.direction;
    return delta <= this.ahead && delta >= -this.behind;
  }

  private evict() {
    for (const [index, bitmap] of this.bitmaps) {
      if (this.inWindow(index) || index === this.pinned) continue;
      bitmap.close();
      this.bitmaps.delete(index);
    }
  }

  private fetchOrder() {
    const order: number[] = [];
    const seen = new Uint8Array(FRAME_COUNT);
    const push = (index: number) => {
      if (index < 0 || index >= FRAME_COUNT || seen[index]) return;
      seen[index] = 1;
      order.push(index);
    };

    for (let step = 0; step < FRAME_COUNT; step += 1) {
      push(this.focus + this.direction * step);
    }
    for (let index = 0; index < FRAME_COUNT; index += 1) push(index);
    return order;
  }

  private pump() {
    if (this.disposed) return;

    for (const index of this.fetchOrder()) {
      if (this.blobs.has(index) || this.failed.has(index) || this.blobTasks.has(index)) {
        continue;
      }
      if (this.fetchSlots >= this.fetchLimit) break;
      this.fetchSlots += 1;
      const task = this.fetchBlob(index).finally(() => {
        this.fetchSlots -= 1;
        if (this.blobTasks.get(index) === task) this.blobTasks.delete(index);
        this.pump();
      });
      this.blobTasks.set(index, task);
    }

    this.scheduleDecode(this.focus);
    for (let step = 1; step <= this.ahead; step += 1) {
      this.scheduleDecode(this.focus + this.direction * step);
    }
    for (let step = 1; step <= this.behind; step += 1) {
      this.scheduleDecode(this.focus - this.direction * step);
    }
  }

  private scheduleDecode(index: number) {
    const critical = index === this.focus;
    if (
      index < 0 ||
      index >= FRAME_COUNT ||
      this.disposed ||
      this.failed.has(index) ||
      !this.inWindow(index) ||
      (!critical && this.decodeSlots >= this.decodeLimit)
    ) {
      return;
    }
    if (this.decodeTasks.has(index) || this.bitmaps.has(index) || !this.blobs.has(index)) return;

    this.decodeSlots += 1;
    this.decodeTasks.add(index);
    void this.decode(index)
      .then((bitmap) => {
        if (!bitmap) return;
        if (this.disposed || !this.inWindow(index)) {
          bitmap.close();
          return;
        }
        this.bitmaps.get(index)?.close();
        this.bitmaps.set(index, bitmap);
        this.emit();
      })
      .finally(() => {
        this.decodeSlots -= 1;
        this.decodeTasks.delete(index);
        this.pump();
      });
  }

  private async fetchBlob(index: number) {
    const generation = this.generation;
    const mobile = this.mobile;
    try {
      const distance = Math.abs(index - this.focus);
      const response = await fetch(cinematicFrameSrc(index, mobile), {
        cache: "force-cache",
        priority: distance <= this.ahead ? "high" : "auto",
        signal: this.controller.signal,
      });
      if (generation !== this.generation || this.disposed) return;
      if (!response.ok) {
        this.failed.add(index);
        return;
      }
      const blob = await response.blob();
      if (generation !== this.generation || this.disposed) return;
      this.blobs.set(index, blob);
    } catch {
      if (generation === this.generation && !this.disposed) this.failed.add(index);
    }
  }

  private async decode(index: number) {
    const generation = this.generation;
    const blob = this.blobs.get(index);
    if (!blob || this.disposed) return null;
    try {
      const bitmap = await createImageBitmap(blob);
      if (this.disposed || generation !== this.generation) {
        bitmap.close();
        return null;
      }
      return bitmap;
    } catch {
      if (generation === this.generation) this.failed.add(index);
      return null;
    }
  }

  private closeMap(bitmaps: Map<number, ImageBitmap>) {
    for (const bitmap of bitmaps.values()) bitmap.close();
    bitmaps.clear();
  }
}

function clampFrame(index: number) {
  return Math.min(FRAME_COUNT - 1, Math.max(0, index));
}
