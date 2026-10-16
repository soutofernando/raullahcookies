"use client";

import { benefits } from "@/lib/landing";
import Rise from "@/components/landing/Rise";
import { scrollToSection } from "@/lib/lenis-instance";

const icons = [TextureIcon, FlavorIcon, GiftIcon];

export default function BenefitsBlock() {
  return (
    <section id="beneficios" className="scroll-mt-24 px-1 py-1 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-xl gap-4 sm:gap-8">
        <Rise>
          <h2 className="max-w-md text-2xl leading-tight font-semibold tracking-tight sm:text-4xl">
            Muito além da primeira mordida.
          </h2>
        </Rise>
        <ul className="divide-y divide-cream/15 border-y border-cream/15">
          {benefits.map((item, index) => {
            const Icon = icons[index] ?? TextureIcon;
            return (
              <li key={item.title}>
                <Rise
                  delay={index * 70}
                  className="flex items-start gap-3 py-2.5 text-sm leading-snug sm:py-4 sm:text-base sm:leading-relaxed"
                >
                  <span
                    className="icon-bob mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-blush/20 text-blush sm:size-9"
                    style={{ animationDelay: `${index * 0.25}s` }}
                  >
                    <Icon />
                  </span>
                  <span>
                    <span className="block font-semibold text-cream">{item.title}</span>
                    <span className="mt-1 block text-cream/80">{item.text}</span>
                  </span>
                </Rise>
              </li>
            );
          })}
        </ul>
        <Rise>
          <button
            type="button"
            onClick={() => scrollToSection("cardapio")}
            className="inline-flex items-center justify-center rounded-full bg-blush px-7 py-3 text-sm font-semibold text-navy transition-colors hover:bg-rose sm:px-8 sm:py-4"
          >
            Explorar o cardápio
          </button>
        </Rise>
      </div>
    </section>
  );
}

function TextureIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 4a8 8 0 1 0 7.2 11.5 3 3 0 0 1-3.4-3.4A8 8 0 0 0 12 4Z" />
      <path d="M14 8.5h.01M10 11h.01M13.5 13.5h.01" strokeLinecap="round" />
    </svg>
  );
}

function FlavorIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 3v3M12 18v3M4.9 6.5l2.1 2.1M17 15.4l2.1 2.1M3 12h3M18 12h3M4.9 17.5l2.1-2.1M17 8.6l2.1-2.1" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="4" y="10" width="16" height="9" rx="1.5" />
      <path d="M4 14h16M12 10v9M12 10c-2 0-3.5-2.2-2.2-3.6S12 7.2 12 10Zm0 0c2 0 3.5-2.2 2.2-3.6S12 7.2 12 10Z" strokeLinejoin="round" />
    </svg>
  );
}
