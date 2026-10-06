export type TrackEvent =
  | "ViewContent"
  | "AddToCart"
  | "InitiateCheckout"
  | "Lead";

type Queued = { event: TrackEvent; content: string };

const queue: Queued[] = [];

const CONSENT_KEY = "raullah-consent";

type Fbq = ((...args: unknown[]) => void) & { loaded?: boolean };

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: Fbq;
    _fbq?: Fbq;
    gtag?: (...args: unknown[]) => void;
  }
}

export function consentStatus(): "accepted" | "essential" | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_KEY);
  if (value === "accepted" || value === "essential") return value;
  return null;
}

export function setConsent(value: "accepted" | "essential") {
  window.localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new Event("raullah-consent"));
  if (value === "accepted") flush();
}

function flush() {
  const pending = queue.splice(0, queue.length);
  for (const item of pending) emit(item.event, item.content);
}

function emit(event: TrackEvent, content: string) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, content, page: "landing" });
  window.gtag?.("event", event, { content_id: content, item_id: content });
  if (event === "Lead") window.fbq?.("track", "Lead", { content_name: content });
  else window.fbq?.("track", event, { content_name: content, content_ids: [content] });
}

export function track(event: TrackEvent, content: string) {
  if (typeof window === "undefined") return;
  if (consentStatus() !== "accepted") {
    queue.push({ event, content });
    return;
  }
  emit(event, content);
}

export function withUtm(href: string, content: string) {
  try {
    const url = new URL(href);
    const incoming = new URLSearchParams(window.location.search);
    url.searchParams.set("utm_source", incoming.get("utm_source") || "site");
    url.searchParams.set("utm_medium", incoming.get("utm_medium") || "landing");
    url.searchParams.set(
      "utm_campaign",
      incoming.get("utm_campaign") || "raullah-cookies",
    );
    const current = incoming.get("utm_content");
    url.searchParams.set("utm_content", current ? `${current}-${content}` : content);
    return url.toString();
  } catch {
    return href;
  }
}
