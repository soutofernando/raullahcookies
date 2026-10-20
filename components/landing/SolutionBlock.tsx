import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import Rise from "@/components/landing/Rise";

const beats = [
  "Começou na cozinha, porque cookie de mercado não bastava.",
  "Virou loja, mais de 50 sabores e milhares de pedidos.",
  "Hoje entra em casamentos, festas e mesas corporativas com o mesmo cuidado.",
] as const;

export default function SolutionBlock() {
  return (
    <section id="historia" className="scroll-mt-24 text-navy">
      <div className="grid items-center gap-4 lg:grid-cols-[auto_1fr] lg:gap-8">
        <Rise className="flex items-end gap-3">
          <Image
            src={assetPath("/brand/logo-badge.webp")}
            alt="Selo Homemade with love"
            width={220}
            height={220}
            className="seal-float size-14 shrink-0 rounded-full bg-navy object-cover sm:size-24"
          />
          <Image
            src={assetPath("/brand/caixa-marca.webp")}
            alt="Caixa da Raullah Cookies"
            width={640}
            height={800}
            sizes="(min-width: 1024px) 220px, 46vw"
            className="h-36 w-auto rounded-[1.25rem] object-cover sm:h-52"
          />
        </Rise>
        <Rise delay={120}>
          <p className="font-script text-4xl leading-none text-rose sm:text-5xl">
            Homemade with Love
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-3xl">
            Da cozinha de casa ao alto padrão.
          </h2>
          <ol className="mt-4 space-y-2.5 text-sm leading-snug text-navy/80 sm:text-base">
            {beats.map((beat, index) => (
              <li key={beat} className="flex gap-3">
                <span className="mt-0.5 font-semibold text-rose">{index + 1}</span>
                <span>{beat}</span>
              </li>
            ))}
          </ol>
        </Rise>
      </div>
    </section>
  );
}
