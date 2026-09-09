"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { orderSteps, store } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

export default function HowToOrder() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = section.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(".step-card", {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 75%" },
      });

      gsap.from(".step-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 70%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how-to-order"
      ref={section}
      className="relative z-[2] px-5 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-5xl rounded-[2rem] bg-navy px-6 py-12 text-cream sm:rounded-[2.5rem] sm:py-16 md:px-12">
        <p className="text-[10px] tracking-[0.3em] uppercase text-rose sm:text-xs sm:tracking-[0.4em]">
          Como pedir
        </p>
        <h2 className="mt-3 max-w-xl font-script text-4xl sm:text-5xl md:text-6xl">
          É rapidinho, quase tão rápido quanto acabar o cookie
        </h2>

        <div className="step-line mt-8 h-px w-full bg-cream/25 sm:mt-10" />

        <div className="mt-8 grid gap-7 sm:mt-10 sm:gap-8 md:grid-cols-3">
          {orderSteps.map((step) => (
            <div key={step.step} className="step-card">
              <span className="flex size-11 items-center justify-center rounded-full border border-cream/30 text-sm font-semibold">
                {step.step}
              </span>
              <h3 className="mt-4 font-script text-2xl sm:mt-5 sm:text-3xl">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-cream/75">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="step-card mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap">
          <a
            href={store.whatsapp}
            className="rounded-full bg-cream px-6 py-3 text-center text-xs font-semibold tracking-[0.2em] text-navy uppercase transition-colors hover:bg-rose"
          >
            Chamar no WhatsApp
          </a>
          <a
            href={store.ifood}
            className="rounded-full border border-cream/40 px-6 py-3 text-center text-xs font-semibold tracking-[0.2em] uppercase transition-colors hover:bg-cream/10"
          >
            Pedir pelo iFood
          </a>
        </div>
      </div>
    </section>
  );
}
