"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gallery } from "@/lib/brand";
import { scrollState } from "@/lib/scroll-state";

gsap.registerPlugin(ScrollTrigger);

export default function StoreGallery() {
  const section = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = section.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(scrollState, {
        gallery: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      });

      gsap.from(".gallery-card", {
        y: 80,
        opacity: 0,
        scale: 1.08,
        stagger: 0.12,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
        },
      });

      gsap.utils.toArray<HTMLElement>(".gallery-img").forEach((image) => {
        gsap.to(image, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={section}
      className="relative z-[2] px-5 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-[10px] tracking-[0.3em] uppercase sm:text-xs sm:tracking-[0.4em]">
          A loja
        </p>
        <h2 className="mt-3 font-script text-4xl sm:text-5xl md:text-6xl">
          Instagramável por natureza
        </h2>
        <div className="mt-8 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-3">
          {gallery.map((item) => (
            <figure
              key={item.src}
              className="gallery-card overflow-hidden rounded-[1.75rem] bg-cream"
            >
              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[3/4]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="gallery-img object-cover"
                />
              </div>
              <figcaption className="px-4 py-3 text-xs tracking-[0.2em] uppercase sm:px-5 sm:py-4 sm:text-sm">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
