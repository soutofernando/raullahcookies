"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brand } from "@/lib/brand";
import { scrollState } from "@/lib/scroll-state";
import MarqueeStrip from "@/components/ui/MarqueeStrip";

gsap.registerPlugin(ScrollTrigger);

export default function BrandManifesto() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = section.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(scrollState, {
        manifesto: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      });

      gsap.from(".manifesto-line", {
        y: 70,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
        },
      });

      gsap.to(".seal-spin", {
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="manifesto" ref={section} className="relative z-[2] text-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-16 sm:px-6 sm:py-24 md:min-h-[80svh] md:grid-cols-[1.2fr_0.8fr] md:gap-10">
        <div className="arch-pattern rounded-[2rem] p-6 sm:p-8 md:rounded-[2.5rem] md:p-12">
          <p className="manifesto-line text-[10px] tracking-[0.3em] uppercase text-rose sm:text-xs sm:tracking-[0.4em]">
            A marca
          </p>
          <h2 className="manifesto-line mt-4 max-w-xl font-script text-4xl leading-tight sm:text-5xl md:text-7xl">
            {brand.manifesto}
          </h2>
          <p className="manifesto-line mt-5 max-w-md text-sm text-cream/80 sm:mt-6 sm:text-base">
            Cookies grossos, recheio que escorre e uma estética coquette — laços,
            rosa pêssego e azul-marinho — para transformar um doce em um momento.
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image
            src="/brand/logo-badge.webp"
            alt="Selo Homemade with love"
            width={280}
            height={280}
            className="seal-spin size-36 rounded-full bg-cream object-cover sm:size-52 md:size-64"
          />
        </div>
      </div>
      <MarqueeStrip tone="cream" />
    </section>
  );
}
