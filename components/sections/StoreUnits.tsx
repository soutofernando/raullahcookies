"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { deliveryPlatforms, store, units } from "@/lib/brand";
import { scrollState } from "@/lib/scroll-state";

gsap.registerPlugin(ScrollTrigger);

export default function StoreUnits() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = section.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(scrollState, {
        cta: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 30%",
          scrub: true,
        },
      });

      gsap.from(".unit-item", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 75%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="units"
      ref={section}
      className="relative z-[2] px-5 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <p className="unit-item text-[10px] tracking-[0.3em] uppercase sm:text-xs sm:tracking-[0.4em]">
          Unidades
        </p>
        <h2 className="unit-item mt-3 font-script text-4xl sm:text-5xl md:text-6xl">
          Onde nos achar
        </h2>

        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2">
          {units.map((unit) => (
            <article
              key={unit.id}
              className="unit-item rounded-2xl bg-white/80 p-5 backdrop-blur-sm sm:rounded-3xl sm:p-7"
            >
              <h3 className="text-xs font-semibold tracking-[0.2em] uppercase sm:text-sm sm:tracking-[0.25em]">
                {unit.city}
              </h3>
              <p className="mt-3 text-base sm:text-lg">{unit.address}</p>
              <ul className="mt-4 space-y-1 text-sm text-navy/70">
                {unit.hours.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="unit-item mt-8 rounded-2xl bg-navy px-5 py-7 text-cream sm:mt-12 sm:rounded-3xl sm:px-7 sm:py-9">
          <p className="text-[10px] tracking-[0.25em] uppercase text-rose sm:text-xs sm:tracking-[0.35em]">
            Peça de onde estiver
          </p>
          <p className="mt-3 max-w-lg text-cream/80">
            Disponível nas plataformas de delivery e também direto com a gente pelo
            WhatsApp.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {deliveryPlatforms.map((platform) => (
              <a
                key={platform.id}
                href={platform.href}
                className="rounded-full border border-cream/40 px-6 py-3 text-center text-xs font-semibold tracking-[0.2em] uppercase transition-colors hover:bg-cream hover:text-navy"
              >
                {platform.label}
              </a>
            ))}
          </div>
          <p className="mt-6 text-[10px] tracking-[0.15em] uppercase break-words text-cream/60 sm:text-xs sm:tracking-[0.2em]">
            {store.phone} · {store.email}
          </p>
        </div>
      </div>
    </section>
  );
}
