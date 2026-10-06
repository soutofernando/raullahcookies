"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { track, type TrackEvent } from "@/lib/outbound";

export default function TrackWhenVisible({
  event,
  content,
  children,
}: {
  event: TrackEvent;
  content: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let sent = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || sent) return;
        sent = true;
        track(event, content);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [content, event]);

  return <div ref={ref}>{children}</div>;
}
