"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

export default function Rise({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (node.closest("[data-film]")) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    node.classList.add("rise-item");
    let timer = 0;
    const reveal = () => {
      timer = window.setTimeout(() => node.classList.add("is-shown"), delay);
    };

    if (reduced) {
      reveal();
      return () => window.clearTimeout(timer);
    }

    const rect = node.getBoundingClientRect();
    const visible = rect.top < window.innerHeight * 0.9 && rect.bottom > 24;
    if (visible) {
      requestAnimationFrame(() => requestAnimationFrame(reveal));
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        reveal();
        observer.disconnect();
      },
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
