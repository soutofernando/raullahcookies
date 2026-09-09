"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Sits below the WebGL canvas so the 3D cookie stays visible over it.
export default function PageBackdrop() {
  const layer = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = layer.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div ref={layer} className="checkerboard absolute inset-0 opacity-40" />
    </div>
  );
}
