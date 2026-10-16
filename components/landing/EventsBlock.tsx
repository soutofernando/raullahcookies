"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cityMoments } from "@/lib/landing";
import Rise from "@/components/landing/Rise";

export default function EventsBlock() {
  const scroller = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncEdges = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    syncEdges();
    el.addEventListener("scroll", syncEdges, { passive: true });
    window.addEventListener("resize", syncEdges);
    return () => {
      el.removeEventListener("scroll", syncEdges);
      window.removeEventListener("resize", syncEdges);
    };
  }, [syncEdges]);

  const move = (direction: -1 | 1) => {
    const el = scroller.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const gap = Number.parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap) || 12;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <section id="eventos" className="scroll-mt-24 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Rise className="flex items-end justify-between gap-4">
          <h2 className="max-w-xl text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
            Nós desafiamos sempre, participando de eventos em
            <span className="mt-1 block font-script text-5xl leading-none font-normal text-blush sm:text-6xl">
              Nossa cidade
            </span>
          </h2>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              aria-label="Fotos anteriores"
              disabled={atStart}
              onClick={() => move(-1)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:bg-cream hover:text-navy disabled:pointer-events-none disabled:opacity-30"
            >
              <Arrow direction="left" />
            </button>
            <button
              type="button"
              aria-label="Próximas fotos"
              disabled={atEnd}
              onClick={() => move(1)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:bg-cream hover:text-navy disabled:pointer-events-none disabled:opacity-30"
            >
              <Arrow direction="right" />
            </button>
          </div>
        </Rise>

        <ul
          ref={scroller}
          className="rail mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto sm:gap-4"
        >
          {cityMoments.map((moment) => (
            <li key={moment.src} className="w-[42%] shrink-0 snap-start sm:w-[30%] lg:w-[23%]">
              <figure className="overflow-hidden rounded-[1.5rem] bg-cream/10">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={moment.src}
                    alt={moment.alt}
                    fill
                    sizes="(min-width: 1024px) 23vw, 42vw"
                    className="object-cover"
                  />
                </div>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 6 9 12l6 6" : "M9 6l6 6-6 6"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
