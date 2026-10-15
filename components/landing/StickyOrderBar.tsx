"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OutboundLink from "@/components/landing/OutboundLink";
import { usePlace } from "@/components/landing/PlaceProvider";

gsap.registerPlugin(ScrollTrigger);

export default function StickyOrderBar() {
  const place = usePlace();
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const bar = barRef.current;
    const hero = document.getElementById("hero")?.closest("[data-film]");
    if (!bar || !hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set(bar, { autoAlpha: 0, y: 16 });
      ScrollTrigger.create({
        trigger: hero,
        start: "bottom 50%",
        onEnter: () => {
          gsap.to(bar, {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
        onLeaveBack: () => {
          gsap.to(bar, {
            autoAlpha: 0,
            y: 16,
            duration: 0.3,
            ease: "power2.in",
            overwrite: "auto",
          });
        },
      });
    }, bar);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={barRef}
      className="pointer-events-auto border-t border-cream/10 bg-navy/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden"
    >
      <OutboundLink
        href={place.menuUrl}
        content="sticky-cardapio"
        event="InitiateCheckout"
        className="flex w-full items-center justify-center rounded-full bg-blush py-3.5 text-sm font-semibold text-navy"
      >
        Ver o cardápio
      </OutboundLink>
    </div>
  );
}
