"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brand } from "@/lib/brand";
import {
  FRAME_COUNT,
  FrameSequence,
  cinematicFrameSrc,
  cinematicPixelSize,
  drawCinematicFrame,
} from "@/lib/cinematic-frames";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicScroll({ children }: { children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const posterMobileRef = useRef<HTMLImageElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const poster = posterRef.current;
    const posterMobile = posterMobileRef.current;
    if (!section || !stage || !canvas || !poster || !posterMobile) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    const context2d = canvas.getContext("2d", { alpha: false });
    if (!context2d) return;

    const sequence = new FrameSequence();
    let target = 0;
    let lastBitmap: ImageBitmap | null = null;
    let lastWidth = 0;
    let lastHeight = 0;
    let lastFit: "cover" | "contain" = "cover";
    let mobile = false;
    let paintFrame = 0;
    let disposed = false;

    const paint = () => {
      if (disposed || canvas.width < 2 || canvas.height < 2) return;
      const bitmap = sequence.resolve(target);
      if (!bitmap) return;
      const fit = "cover";
      if (
        bitmap === lastBitmap &&
        canvas.width === lastWidth &&
        canvas.height === lastHeight &&
        fit === lastFit
      ) {
        return;
      }

      drawCinematicFrame(context2d, bitmap, canvas.width, canvas.height, fit);
      lastFit = fit;

      lastBitmap = bitmap;
      lastWidth = canvas.width;
      lastHeight = canvas.height;
      if (poster.style.visibility !== "hidden") poster.style.visibility = "hidden";
      if (posterMobile.style.visibility !== "hidden") posterMobile.style.visibility = "hidden";
    };

    const requestPaint = () => {
      if (paintFrame) return;
      paintFrame = window.requestAnimationFrame(() => {
        paintFrame = 0;
        paint();
      });
    };

    const updateCopy = (progress: number) => {
      const hint = hintRef.current;
      if (hint) {
        const opacity = progress <= 0.02 ? 1 : progress >= 0.12 ? 0 : 1 - (progress - 0.02) / 0.1;
        hint.style.opacity = opacity.toFixed(3);
      }

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      }
    };

    const fit = () => {
      const rect = stage.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      const nextMobile = window.matchMedia("(max-width: 767px)").matches;
      if (nextMobile !== mobile) {
        mobile = nextMobile;
        lastBitmap = null;
      }
      const { width: pixelWidth, height: pixelHeight } = cinematicPixelSize(
        rect.width,
        rect.height,
        window.devicePixelRatio || 1,
      );
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        const previous = lastBitmap;
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
        if (previous) {
          drawCinematicFrame(
            context2d,
            previous,
            pixelWidth,
            pixelHeight,
            "cover",
          );
        }
        lastBitmap = null;
      }
      sequence.setViewport(mobile);
      paint();
    };

    const unsubscribe = sequence.subscribe(requestPaint);
    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(stage);
    fit();
    sequence.warm();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        onRefresh: (self) => {
          const next = Math.round(self.progress * (FRAME_COUNT - 1));
          sequence.setFocus(next, next - target);
          target = next;
          updateCopy(self.progress);
          paint();
        },
        onUpdate: (self) => {
          const next = Math.round(self.progress * (FRAME_COUNT - 1));
          sequence.setFocus(next, next - target);
          target = next;
          updateCopy(self.progress);
          paint();
        },
      });
    }, section);

    requestAnimationFrame(() => {
      if (!disposed) ScrollTrigger.refresh();
    });

    return () => {
      disposed = true;
      if (paintFrame) window.cancelAnimationFrame(paintFrame);
      unsubscribe();
      resizeObserver.disconnect();
      ctx.revert();
      sequence.destroy();
    };
  }, []);

  return (
    <section
      id="cena"
      ref={sectionRef}
      aria-label="Cena do cookie saindo da caixa"
      data-frame="0"
      className="cinematic-sequence relative w-full bg-cream md:bg-navy"
    >
      <div className="hidden px-5 py-16 motion-reduce:block sm:px-6 sm:py-24">
        <figure className="mx-auto max-w-6xl">
          <Image
            src={cinematicFrameSrc(FRAME_COUNT - 1, true)}
            alt="Cookie da Raullah no comercial vertical"
            width={1080}
            height={1920}
            unoptimized
            className="aspect-[9/16] w-full rounded-[2rem] bg-navy object-contain md:hidden"
          />
          <Image
            src={cinematicFrameSrc(FRAME_COUNT - 1)}
            alt="Cookie da Raullah flutuando ao lado da caixa aberta"
            width={1920}
            height={1080}
            unoptimized
            className="hidden aspect-video w-full rounded-[2rem] bg-navy object-contain md:block"
          />
          <figcaption className="mt-6 text-center text-[11px] font-semibold tracking-[0.28em] text-cream/80 uppercase">
            {brand.seal}
          </figcaption>
        </figure>
      </div>

      <div className="cinematic-stage sticky top-0 z-0 w-full overflow-hidden motion-reduce:hidden">
        <div ref={stageRef} className="absolute inset-0 bg-cream md:bg-navy">
          <Image
            ref={posterMobileRef}
            src={cinematicFrameSrc(0, true)}
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-center md:hidden"
          />
          <Image
            ref={posterRef}
            src={cinematicFrameSrc(0)}
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="hidden object-cover object-center md:block"
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent px-5 pt-16 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <div className="relative mx-auto max-w-md">
            <p
              ref={hintRef}
              className="flex flex-col items-center gap-2 text-center text-[11px] font-semibold tracking-[0.28em] text-cream/70 uppercase"
            >
              Role para acompanhar
              <svg
                className="scroll-cue size-5 text-cream"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 9.5 12 15.5 18 9.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
          </div>
          <div className="mx-auto mt-3 h-px w-36 overflow-hidden bg-cream/15">
            <span
              ref={progressRef}
              className="block h-full origin-left bg-blush"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>

      <div className="film-chapters relative z-10">
        <div className="film-spacer motion-reduce:hidden" aria-hidden="true" />
        {children}
      </div>
    </section>
  );
}
