"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Approach = "left" | "right" | "up" | "down";
type Anchor = "left" | "right" | "center";

function shift(from: Approach, progress: number, rise: number) {
  const fadeInEnd = 0.28;
  const fadeOutStart = 0.58;
  let fade = 1;
  if (progress < fadeInEnd) fade = progress / fadeInEnd;
  else if (progress > fadeOutStart) fade = Math.max(0, (1 - progress) / (1 - fadeOutStart));

  const enter = 1 - Math.min(1, progress / fadeInEnd);
  const leave = progress <= fadeOutStart ? 0 : (progress - fadeOutStart) / (1 - fadeOutStart);

  if (from === "right") return { fade, x: 100 * enter - 220 * leave, y: 0 };
  if (from === "left") return { fade, x: -80 * enter + 80 * leave, y: 0 };
  if (from === "up") return { fade, x: 0, y: -rise * enter + rise * 0.65 * leave };
  return { fade, x: 0, y: rise * enter - rise * 0.7 * leave };
}

export default function FilmChapter({
  from,
  anchor = "center",
  tone = "dark",
  children,
}: {
  from: Approach;
  anchor?: Anchor;
  tone?: "dark" | "light";
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const panel = panelRef.current;
    if (!root || !panel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const apply = (progress: number) => {
      const rise =
        window.innerWidth < 640 ? 0 : Math.min(320, Math.round(window.innerHeight * 0.46));
      const { fade, x, y } = shift(from, progress, rise);
      panel.style.opacity = fade.toFixed(3);
      panel.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)`;
      panel.style.visibility = fade < 0.02 ? "hidden" : "visible";
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onRefresh: (self) => apply(self.progress),
        onUpdate: (self) => apply(self.progress),
      });
    }, root);

    return () => ctx.revert();
  }, [from]);

  const wide = anchor === "center";

  return (
    <div
      ref={rootRef}
      data-film=""
      className={`flex items-center py-[4svh] sm:min-h-svh sm:py-12 ${
        anchor === "left"
          ? "justify-start pr-4 pl-20"
          : anchor === "right"
            ? "justify-end pr-[100px] pl-4"
            : "justify-center px-5 sm:px-8"
      }`}
    >
      <div
        ref={panelRef}
        className={`w-full rounded-[2rem] px-5 py-5 shadow-[0_24px_80px_rgba(8,16,32,0.28)] sm:px-10 sm:py-10 ${
          wide ? "max-w-5xl" : "max-w-lg"
        } ${
          tone === "light"
            ? "bg-cream/92 text-navy"
            : "bg-navy/90 text-cream"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
