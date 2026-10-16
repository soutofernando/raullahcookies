import type { ReactNode } from "react";
import type { PublicPlace } from "@/lib/cardapio";
import type { GooglePlaceReviews, QuoteItem } from "@/lib/google-reviews";
import { testimonials } from "@/lib/landing";
import { store } from "@/lib/brand";
import Rise from "@/components/landing/Rise";
import { GoogleIcon, IfoodIcon } from "@/components/ui/PlatformIcons";

function QuoteCard({ quote, name, detail, href }: QuoteItem) {
  const author = href ? (
    <a href={href} target="_blank" rel="noreferrer" className="underline-offset-2 hover:underline">
      {name}
    </a>
  ) : (
    name
  );

  return (
    <li className="rounded-[1.75rem] bg-cream px-6 py-6 text-navy">
      <p className="text-base leading-relaxed">“{quote}”</p>
      <p className="mt-5 text-sm font-semibold">
        {author} <span className="font-normal text-navy/60">· {detail}</span>
      </p>
    </li>
  );
}

function QuoteColumn({ items, reverse = false }: { items: QuoteItem[]; reverse?: boolean }) {
  const loop = [...items, ...items];
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

function formatRating(value: number) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function RatingPill({
  rating,
  label,
  children,
}: {
  rating: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-sm">
      <span aria-hidden="true">★★★★★</span>
      <span className="font-semibold">{rating}</span>
      <span className="inline-flex items-center gap-1.5 text-cream/60">
        no
        {children}
        <span className="sr-only">{label}</span>
      </span>
    </p>
  );
}

export default function TestimonialsBlock({
  place,
  reviews,
}: {
  place: PublicPlace | null;
  reviews: GooglePlaceReviews | null;
}) {
  const quotes: QuoteItem[] = reviews?.quotes.length
    ? reviews.quotes
    : testimonials.map((item) => ({
        quote: item.quote,
        name: item.name,
        detail: item.city,
        href: null,
      }));
  return (
    <section id="depoimentos" className="scroll-mt-24 px-5 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <Rise className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-md text-3xl font-semibold tracking-tight sm:text-4xl">
            Quem já pediu, pede de novo.
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <RatingPill rating="4,9" label="iFood">
              <IfoodIcon className="size-5" />
            </RatingPill>
            {reviews?.rating != null ? (
              <RatingPill rating={formatRating(reviews.rating)} label="Google">
                <GoogleIcon className="size-5" />
              </RatingPill>
            ) : null}
          </div>
        </Rise>

        <ul className="sr-only">
          {quotes.map((item) => (
            <li key={item.name}>
              {item.quote} {item.name}, {item.detail}
            </li>
          ))}
        </ul>

        <ul className="mt-10 grid gap-4 motion-safe:hidden md:grid-cols-2" aria-hidden="true">
          {quotes.map((item) => (
            <QuoteCard key={item.name} {...item} />
          ))}
        </ul>

        <Rise className="mt-10 hidden gap-4 motion-safe:grid md:grid-cols-2" delay={80}>
          <QuoteColumn items={quotes} />
          <div className="hidden md:block">
            <QuoteColumn items={quotes} reverse />
          </div>
        </Rise>

        <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-cream/60">
          <span>{place?.serviceLine ?? "Entrega em Campina Grande e região"}</span>
          {reviews?.quotes.length ? (
            <a href={store.googleReviews} target="_blank" rel="noreferrer" className="underline-offset-2 hover:underline">
              Comentários do Google
            </a>
          ) : null}
        </p>
      </div>
    </section>
  );
}
