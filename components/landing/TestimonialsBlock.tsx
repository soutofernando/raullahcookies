import type { PublicPlace } from "@/lib/cardapio";
import { testimonials } from "@/lib/landing";
import Rise from "@/components/landing/Rise";
import { IfoodIcon } from "@/components/ui/PlatformIcons";

function QuoteCard({
  quote,
  name,
  city,
}: {
  quote: string;
  name: string;
  city: string;
}) {
  return (
    <li className="rounded-[1.75rem] bg-cream px-6 py-6 text-navy">
      <p className="text-base leading-relaxed">“{quote}”</p>
      <p className="mt-5 text-sm font-semibold">
        {name} <span className="font-normal text-navy/60">· {city}</span>
      </p>
    </li>
  );
}

function QuoteColumn({ reverse = false }: { reverse?: boolean }) {
  const loop = [...testimonials, ...testimonials];
  return (
    <div className="quote-window h-[32rem] overflow-hidden">
      <ul className={`flex flex-col gap-4 ${reverse ? "quote-fall" : "quote-rise"}`}>
        {loop.map((item, index) => (
          <QuoteCard key={`${item.name}-${index}`} {...item} />
        ))}
      </ul>
    </div>
  );
}

export default function TestimonialsBlock({ place }: { place: PublicPlace | null }) {
  return (
    <section id="depoimentos" className="scroll-mt-24 px-5 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <Rise className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-md text-3xl font-semibold tracking-tight sm:text-4xl">
            Quem já pediu, pede de novo.
          </h2>
          <p className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-sm">
            <span aria-hidden="true">★★★★★</span>
            <span className="font-semibold">4,9</span>
            <span className="inline-flex items-center gap-1.5 text-cream/60">
              no
              <IfoodIcon className="size-5" />
              <span className="sr-only">iFood</span>
            </span>
          </p>
        </Rise>

        <ul className="sr-only">
          {testimonials.map((item) => (
            <li key={item.name}>
              {item.quote} {item.name}, {item.city}
            </li>
          ))}
        </ul>

        <ul className="mt-10 grid gap-4 motion-safe:hidden md:grid-cols-2" aria-hidden="true">
          {testimonials.map((item) => (
            <QuoteCard key={item.name} {...item} />
          ))}
        </ul>

        <Rise className="mt-10 hidden gap-4 motion-safe:grid md:grid-cols-2" delay={80}>
          <QuoteColumn />
          <div className="hidden md:block">
            <QuoteColumn reverse />
          </div>
        </Rise>

        <p className="mt-8 text-xs text-cream/60">
          {place?.serviceLine ?? "Entrega em Campina Grande e região"}
        </p>
      </div>
    </section>
  );
}
