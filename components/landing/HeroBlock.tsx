import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import { eventQuoteHref, store } from "@/lib/brand";
import type { PublicPlace } from "@/lib/cardapio";
import { stats } from "@/lib/landing";
import OutboundLink from "@/components/landing/OutboundLink";
import Rise from "@/components/landing/Rise";

export default function HeroBlock({ place }: { place: PublicPlace | null }) {
  const menuUrl = place?.menuUrl ?? store.menuUrl;
  const quoteUrl = eventQuoteHref(place?.whatsappUrl);
  return (
    <section id="hero" className="relative px-1 py-1">
      <div className="hero-grid relative mx-auto flex max-w-xl flex-col items-center text-center">
        <Rise className="flex w-full flex-col items-center">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3">
            <Image
              src={assetPath("/brand/logo-badge.webp")}
              alt="Mascote Raullah, cookie com olhos de coração"
              width={56}
              height={56}
              className="size-10 rounded-full bg-cream object-cover sm:size-12"
            />
            <p className="text-[10px] font-semibold tracking-[0.14em] text-blush uppercase sm:text-[11px] sm:tracking-[0.16em]">
              {place?.city ?? "Campina Grande"} · Encomendas e delivery
            </p>
          </div>

          <h1 className="mt-3 text-[1.85rem] leading-[1.05] font-semibold tracking-tight text-balance text-cream sm:mt-5 sm:text-5xl sm:leading-[1.02]">
            Cookies de alto padrão para celebrar — e para pedir agora.
          </h1>

          <p className="mt-3 max-w-md text-sm leading-snug text-pretty text-cream/75 sm:mt-5 sm:text-lg sm:leading-relaxed">
            Casamentos, festas premium e eventos corporativos. Ou o cookie
            grande, macio por dentro, no delivery de sempre.
          </p>

          <div className="mt-4 flex w-full flex-col items-stretch gap-2.5 sm:mt-8 sm:w-auto sm:flex-row sm:items-center">
            <OutboundLink
              href={menuUrl}
              content="hero-cardapio"
              event="InitiateCheckout"
              className="inline-flex items-center justify-center rounded-full bg-blush px-7 py-3 text-sm font-semibold text-navy transition-colors hover:bg-rose sm:px-8 sm:py-4"
            >
              Pedir agora
            </OutboundLink>
            <OutboundLink
              href={quoteUrl}
              content="hero-orcamento"
              event="Lead"
              className="inline-flex items-center justify-center rounded-full border border-cream/35 px-7 py-3 text-sm font-semibold text-cream transition-colors hover:bg-cream hover:text-navy sm:px-8 sm:py-4"
            >
              Orçamento para eventos
            </OutboundLink>
          </div>
          <p className="mt-2 text-xs tracking-wide text-cream/60 sm:mt-3">
            Delivery em poucos cliques · {place?.serviceLine ?? "Retirada ou entrega"}
          </p>

          <dl className="mt-4 grid w-full grid-cols-2 gap-2 text-left sm:mt-8 sm:gap-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-cream/15 bg-cream/5 px-3 py-2 sm:rounded-3xl sm:px-4 sm:py-3"
              >
                <dt className="text-lg leading-none font-semibold tracking-tight text-blush sm:text-2xl">
                  {item.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-cream/70 sm:mt-2">{item.label}</dd>
              </div>
            ))}
          </dl>
        </Rise>
      </div>
    </section>
  );
}
