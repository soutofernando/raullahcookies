"use client";

import { highlights } from "@/lib/landing";
import Rise from "@/components/landing/Rise";
import { scrollToSection } from "@/lib/lenis-instance";

export default function PainBlock() {
  return (
    <section id="vontade" className="scroll-mt-24 px-1 py-1 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-xl gap-4 sm:gap-8">
        <Rise>
          <h2 className="max-w-md text-2xl leading-tight font-semibold tracking-tight sm:text-4xl">
            Tem cookies que dão vontade. E tem aqueles que ficam na memória.
          </h2>
          <p className="mt-3 text-sm leading-snug text-cream/80 sm:mt-4 sm:text-base sm:leading-relaxed">
            Cookies artesanais, generosos no tamanho, com casquinha levemente
            crocante, interior macio e combinações de sabores que surpreendem.
            Feitos para transformar uma simples pausa em um momento especial.
          </p>
        </Rise>
        <ul className="divide-y divide-cream/15 border-y border-cream/15">
          {highlights.map((item, index) => (
            <li key={item.title}>
              <Rise
                delay={index * 70}
                className="flex items-start gap-3 py-2.5 text-sm leading-snug sm:py-4 sm:text-base sm:leading-relaxed"
              >
                <span
                  className="icon-bob mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-blush/20 text-xs font-semibold text-blush"
                  style={{ animationDelay: `${index * 0.25}s` }}
                >
                  {index + 1}
                </span>
                <span>
                  <span className="block font-semibold text-cream">{item.title}</span>
                  <span className="mt-1 block text-cream/80">{item.text}</span>
                </span>
              </Rise>
            </li>
          ))}
        </ul>
        <Rise>
          <button
            type="button"
            onClick={() => scrollToSection("cardapio")}
            className="inline-flex items-center justify-center rounded-full bg-blush px-7 py-3 text-sm font-semibold text-navy transition-colors hover:bg-rose sm:px-8 sm:py-4"
          >
            Conheça nossos cookies
          </button>
        </Rise>
      </div>
    </section>
  );
}
