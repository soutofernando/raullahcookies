"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState } from "@/lib/scroll-state";
import { setLenis } from "@/lib/lenis-instance";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => {
      scrollState.reducedMotion = motionQuery.matches;
    };
    syncMotion();
    motionQuery.addEventListener("change", syncMotion);

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.12,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    setLenis(lenis);

    // Lenis exposes normalized progress, avoiding a layout read on every scroll.
    lenis.on("scroll", ({ progress }: { progress: number }) => {
      scrollState.global = progress;
      ScrollTrigger.update();
    });

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    void document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      motionQuery.removeEventListener("change", syncMotion);
      window.removeEventListener("load", refresh);
      setLenis(null);
      lenis.destroy();
      gsap.ticker.remove(ticker);
    };
  }, []);

  return <>{children}</>;
}
