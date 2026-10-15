"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assetPath } from "@/lib/asset-path";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    label: "Em casa",
    text: "Cozinheira, forno próprio e os primeiros cookies, fornada por fornada.",
  },
  {
    label: "A loja",
    text: "A cozinha de casa virou loja física. O cookie continua saindo da mão dela.",
  },
];

export default function FounderBlock() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const portrait = root.querySelector("[data-founder-portrait]");
      const aside = root.querySelector("[data-founder-aside]");
      const lines = gsap.utils.toArray<HTMLElement>("[data-founder-line]", root);

      if (portrait) {
        gsap.fromTo(
          portrait,
          { autoAlpha: 0, y: 88 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 82%",
              end: "top 38%",
              scrub: true,
            },
          },
        );
      }

      if (aside) {
        gsap.fromTo(
          aside,
          { autoAlpha: 0, x: 72, y: 24 },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 68%",
              end: "top 30%",
              scrub: true,
            },
          },
        );
      }

      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: line,
              start: "top 88%",
              end: "top 62%",
              scrub: true,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="fundadora"
      ref={rootRef}
      className="scroll-mt-24 overflow-hidden bg-cream text-navy"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
        <div className="relative mx-auto w-full max-w-md lg:mx-0">
          <div
            data-founder-portrait=""
            className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-navy/10"
          >
            <Image
              src={assetPath("/raullah/0L8A5615.jpg")}
              alt="Raullah, cozinheira da Raullah Cookies, segurando um prato de cookies com o avental da marca"
              fill
              sizes="(min-width: 1024px) 36vw, 90vw"
              className="object-cover object-top"
            />
          </div>
          <div
            data-founder-aside=""
            className="absolute -right-1 bottom-6 w-[42%] overflow-hidden rounded-[1.4rem] border-4 border-cream shadow-[0_18px_50px_rgba(15,51,99,0.18)] sm:-right-8 sm:bottom-10"
          >
            <div className="relative aspect-[3/4] bg-navy/10">
              <Image
                src={assetPath("/raullah/0L8A5312.jpg")}
                alt="Raullah, dona da Raullah Cookies"
                fill
                sizes="(min-width: 1024px) 16vw, 40vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>

        <div>
          <h2
            data-founder-line=""
            className="mt-4 font-script text-6xl leading-none text-rose sm:text-7xl"
          >
            Raullah
          </h2>
          <p
            data-founder-line=""
            className="mt-4 max-w-md text-2xl leading-snug font-semibold tracking-tight sm:text-3xl"
          >
            Da cozinha de casa até a loja física.
          </p>
          <div
            data-founder-line=""
            className="mt-6 max-w-lg space-y-4 text-base leading-relaxed text-navy/80"
          >
            <p>
              Raullah é a cozinheira da marca. Começou fazendo cookies em casa, no
              forno da própria cozinha.
            </p>
            <p>
              O pedido foi crescendo até a cozinha virar loja. O endereço mudou. Quem
              assa continua sendo ela.
            </p>
          </div>

          <ol className="mt-8 grid gap-3 sm:grid-cols-2">
            {steps.map((step, index) => (
              <li
                key={step.label}
                data-founder-line=""
                className="rounded-3xl border border-navy/10 bg-white/55 px-5 py-4"
              >
                <p className="text-xs font-semibold tracking-[0.18em] text-rose uppercase">
                  0{index + 1} · {step.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-navy/80">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
