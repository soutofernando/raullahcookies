"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brand, store } from "@/lib/brand";
import { scrollState } from "@/lib/scroll-state";
import { scrollToSection } from "@/lib/lenis-instance";

gsap.registerPlugin(ScrollTrigger);

export default function HeroScene() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = section.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        scrollState.hero = 0.2;
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(scrollState, {
          hero: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });

      gsap.from(".hero-char", {
        yPercent: 120,
        opacity: 0,
        stagger: 0.04,
        duration: 1,
        ease: "power3.out",
        delay: 0.15,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={section} className="relative z-[2] h-[200vh]">
      <div className="sticky top-0 flex h-svh items-end justify-center px-5 pb-10 pt-24 sm:px-6 sm:pb-16">
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          <p className="mb-4 text-[10px] font-semibold tracking-[0.3em] uppercase sm:mb-6 sm:text-xs sm:tracking-[0.4em]">
            Cookies artesanais · Feitos em casa
          </p>
          <h1 className="font-script text-[22vw] leading-[0.8] text-navy sm:text-[16vw] md:text-[9rem]">
            {"Raullah".split("").map((char, index) => (
              <span key={index} className="hero-char inline-block">
                {char}
              </span>
            ))}
          </h1>
          <p className="mt-2 text-xs font-semibold tracking-[0.4em] uppercase sm:text-sm sm:tracking-[0.55em] md:text-base">
            {"Cookies".split("").map((char, index) => (
              <span key={index} className="hero-char inline-block">
                {char}
              </span>
            ))}
          </p>
          <p className="hero-char mt-5 max-w-md text-sm text-navy/80 sm:mt-8 sm:text-base md:text-lg">
            {brand.tagline}
          </p>
          <div className="hero-char mt-6 flex w-full max-w-xs flex-col gap-3 sm:mt-8 sm:w-auto sm:max-w-none sm:flex-row">
            <a
              href={store.menuUrl}
              className="rounded-full bg-navy px-7 py-3.5 text-center text-xs font-semibold tracking-[0.2em] text-cream uppercase transition-colors hover:bg-rose hover:text-navy"
            >
              Fazer meu pedido
            </a>
            <button
              type="button"
              onClick={() => scrollToSection("menu")}
              className="rounded-full border border-navy/30 px-7 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition-colors hover:bg-navy/5"
            >
              Ver cardápio
            </button>
          </div>
          <div className="hero-char mt-8 flex flex-col items-center gap-2 text-[10px] tracking-[0.35em] uppercase sm:mt-12">
            <span>Role para começar</span>
            <span className="block h-8 w-px bg-navy/50 sm:h-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
