"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { flavors } from "@/lib/brand";
import { scrollState } from "@/lib/scroll-state";

gsap.registerPlugin(ScrollTrigger);

function syncFlavor(progress: number) {
  scrollState.flavors = progress;
  const index = Math.min(
    flavors.length - 1,
    Math.floor(progress * flavors.length),
  );
  scrollState.flavorIndex = index;
  scrollState.cookieColor = Number.parseInt(
    flavors[index].tint.replace("#", ""),
    16,
  );
}

export default function FlavorShowcase() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = section.current;
    const row = track.current;
    if (!el || !row) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const distance = () => Math.max(0, row.scrollWidth - window.innerWidth);
          gsap.to(row, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.8,
              invalidateOnRefresh: true,
              onUpdate: (self) => syncFlavor(self.progress),
            },
          });
        },
      );

      mm.add("(max-width: 767px)", () => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 70%",
          end: "bottom 30%",
          onUpdate: (self) => syncFlavor(self.progress),
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="flavors" ref={section} className="relative z-[2] md:h-[300vh]">
      <div className="md:sticky md:top-0 md:flex md:h-svh md:flex-col md:justify-center md:overflow-hidden">
        <div className="mb-6 px-5 pt-12 sm:px-6 sm:pt-16 md:mb-10">
          <p className="text-[10px] tracking-[0.3em] uppercase sm:text-xs sm:tracking-[0.4em]">
            Sabores
          </p>
          <h2 className="mt-3 font-script text-4xl sm:text-5xl md:text-6xl">
            A vitrine
          </h2>
        </div>
        <div
          ref={track}
          className="rail flex gap-4 px-5 pb-12 sm:gap-6 sm:px-6 md:w-max md:cursor-default md:pb-16 max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto"
        >
          {flavors.map((flavor) => (
            <article
              key={flavor.id}
              className="w-[78vw] shrink-0 snap-center overflow-hidden rounded-[1.5rem] bg-white shadow-[0_20px_60px_rgba(15,51,99,0.12)] sm:w-[70vw] sm:rounded-[2rem] md:w-[32rem]"
            >
              <div className="relative aspect-square sm:aspect-[4/5]">
                <Image
                  src={flavor.image}
                  alt={flavor.name}
                  fill
                  sizes="(max-width: 768px) 78vw, 32rem"
                  className="object-cover"
                />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="font-script text-3xl sm:text-4xl">{flavor.name}</h3>
                <p className="mt-2 text-sm text-navy/70">{flavor.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
