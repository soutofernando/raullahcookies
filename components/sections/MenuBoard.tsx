"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { menu, store } from "@/lib/brand";

gsap.registerPlugin(ScrollTrigger);

export default function MenuBoard() {
  const section = useRef<HTMLElement>(null);
  const list = useRef<HTMLDivElement>(null);
  type CategoryId = (typeof menu.categories)[number]["id"];
  const [active, setActive] = useState<CategoryId>(menu.categories[0].id);

  const category =
    menu.categories.find((item) => item.id === active) ?? menu.categories[0];

  useLayoutEffect(() => {
    const el = section.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(".menu-head", {
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

  useLayoutEffect(() => {
    const el = list.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(".menu-item", {
        y: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
      });
    }, el);
    return () => ctx.revert();
  }, [active]);

  return (
    <section
      id="menu"
      ref={section}
      className="relative z-[2] px-5 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <p className="menu-head text-[10px] tracking-[0.3em] uppercase sm:text-xs sm:tracking-[0.4em]">
          Cardápio
        </p>
        <h2 className="menu-head mt-3 font-script text-4xl sm:text-5xl md:text-6xl">
          O que sai do forno
        </h2>

        <div className="rail menu-head -mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:mt-8 sm:flex-wrap sm:overflow-visible sm:px-0">
          {menu.categories.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item.id)}
              className={`shrink-0 rounded-full px-4 py-2.5 text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors sm:px-5 sm:text-xs sm:tracking-[0.2em] ${
                item.id === active
                  ? "bg-navy text-cream"
                  : "border border-navy/20 text-navy hover:bg-navy/5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div ref={list} className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-2">
          {category.items.map((item) => (
            <article
              key={item.name}
              className="menu-item rounded-2xl bg-white/80 p-5 backdrop-blur-sm sm:rounded-3xl sm:p-6"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-script text-2xl leading-none sm:text-3xl">
                  {item.name}
                </h3>
                <span className="text-sm font-semibold whitespace-nowrap">
                  {item.price}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-navy/60">
                <span>{item.weight}</span>
                {"badge" in item && item.badge ? (
                  <span className="rounded-full bg-rose px-2.5 py-1 text-navy">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm text-navy/70">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="menu-head mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-xs text-navy/60">{menu.note}</p>
          <a
            href={store.menuUrl}
            className="rounded-full bg-navy px-6 py-3 text-xs font-semibold tracking-[0.2em] text-cream uppercase transition-colors hover:bg-rose hover:text-navy"
          >
            Pedir agora
          </a>
        </div>
      </div>
    </section>
  );
}
