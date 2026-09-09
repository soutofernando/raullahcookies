"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { swatches } from "@/lib/brand";
import { scrollState } from "@/lib/scroll-state";

gsap.registerPlugin(ScrollTrigger);

export default function BrandIdentity() {
  const section = useRef<HTMLElement>(null);
  const pack = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = section.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(scrollState, {
        identity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          end: "bottom 25%",
          scrub: true,
        },
      });

      gsap.from(".swatch", {
        scaleY: 0,
        transformOrigin: "bottom",
        stagger: 0.08,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".swatch-row",
          start: "top 80%",
        },
      });
    }, el);

    const node = pack.current;
    const onMove = (event: MouseEvent) => {
      if (!node || scrollState.reducedMotion) return;
      const rect = node.getBoundingClientRect();
      const dx = (event.clientX - rect.left) / rect.width - 0.5;
      const dy = (event.clientY - rect.top) / rect.height - 0.5;
      node.style.transform = `rotateY(${dx * 10}deg) rotateX(${-dy * 8}deg)`;
    };
    const onLeave = () => {
      if (node) node.style.transform = "rotateY(0deg) rotateX(0deg)";
    };
    node?.addEventListener("mousemove", onMove);
    node?.addEventListener("mouseleave", onLeave);

    return () => {
      ctx.revert();
      node?.removeEventListener("mousemove", onMove);
      node?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      id="identity"
      ref={section}
      className="relative z-[2] px-5 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase sm:text-xs sm:tracking-[0.4em]">
            Identidade
          </p>
          <h2 className="mt-3 font-script text-4xl sm:text-5xl md:text-6xl">
            Paleta e embalagem
          </h2>
          <p className="mt-5 max-w-md text-sm text-navy/75 sm:text-base">
            Navy profundo, rosa pêssego e cream. O cookie mordido com olhos de
            coração é o selo da marca — da caixa ao avental.
          </p>
          <div className="swatch-row mt-8 flex h-28 overflow-hidden rounded-2xl sm:mt-10 sm:h-40 sm:rounded-3xl">
            {swatches.map((swatch) => (
              <div
                key={swatch.hex}
                className="swatch flex flex-1 flex-col justify-end p-2 text-[8px] leading-tight tracking-[0.1em] uppercase sm:p-3 sm:text-[10px] sm:tracking-[0.15em]"
                style={{
                  background: swatch.hex,
                  color: swatch.hex === "#0F3363" ? "#FDD9D9" : "#0F3363",
                }}
              >
                <span>{swatch.name}</span>
                <span>{swatch.hex}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ perspective: "1200px" }}>
          <div
            ref={pack}
            className="relative aspect-square overflow-hidden rounded-[2rem] bg-navy transition-transform duration-200 ease-out will-change-transform"
          >
            <Image
              src="/brand/packaging-box.webp"
              alt="Embalagem Raullah Cookies"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4">
            <Image
              src="/brand/hang-tag.webp"
              alt="Tag da marca"
              width={400}
              height={400}
              className="h-28 w-full rounded-2xl object-cover sm:h-40"
            />
            <Image
              src="/brand/logo-primary.webp"
              alt="Logo Raullah Cookies"
              width={400}
              height={400}
              className="h-28 w-full rounded-2xl bg-white object-contain p-4 sm:h-40 sm:p-6"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
