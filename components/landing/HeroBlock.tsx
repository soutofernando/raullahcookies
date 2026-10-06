import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import { store } from "@/lib/brand";
import type { PublicPlace } from "@/lib/cardapio";
import { stats } from "@/lib/landing";
import OutboundLink from "@/components/landing/OutboundLink";
import Rise from "@/components/landing/Rise";

export default function HeroBlock({ place }: { place: PublicPlace | null }) {
  const menuUrl = place?.menuUrl ?? store.menuUrl;
  const city = place?.city ?? "Campina Grande";
  return (
    <section id="hero" className="relative px-5 pt-24 pb-14 sm:px-6 sm:pt-28 sm:pb-20">
      <div className="dot-field pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <Rise>
          <div className="flex items-center gap-3">
            <Image
              src={assetPath("/brand/logo-badge.webp")}
              alt="Mascote Raullah, cookie com olhos de coração"
              width={56}
              height={56}
              className="size-12 rounded-full bg-cream object-cover"
              priority
            />
            <p className="text-[11px] font-semibold tracking-[0.28em] text-blush uppercase">
              {city}
              {place?.openLabel ? ` · ${place.openLabel}` : ""}
            </p>
          </div>

          <h1 className="mt-5 max-w-xl text-[2.45rem] leading-[1.02] font-semibold tracking-tight text-cream sm:text-5xl lg:text-6xl">
            Cookie grande, macio por dentro, feito à mão.
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-cream/75 sm:text-lg">
            Crocante por fora, macio por dentro e do tamanho que cookie de verdade
            tem. Mais de 50 sabores criados em quase 7 anos, direto de Campina Grande.
          </p>

          <div className="mt-8">
            <OutboundLink
              href={menuUrl}
              content="hero-cardapio"
              event="InitiateCheckout"
              className="inline-flex w-full items-center justify-center rounded-full bg-blush px-8 py-4 text-sm font-semibold text-navy transition-colors hover:bg-rose sm:w-auto"
            >
              Ver o cardápio
            </OutboundLink>
            <p className="mt-3 text-xs tracking-wide text-cream/60">
              Pedido em poucos cliques • {place?.serviceLine ?? "Retirada ou delivery"}
            </p>
            <OutboundLink
              href={store.ifood}
              content="hero-ifood"
              event="InitiateCheckout"
              className="mt-4 inline-block text-sm text-cream/80 underline decoration-rose/80 underline-offset-4"
            >
              Prefere o iFood? Peça por lá.
            </OutboundLink>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-cream/15 bg-cream/5 px-4 py-3"
              >
                <dt className="text-xl leading-none font-semibold tracking-tight text-blush sm:text-2xl">
                  {item.value}
                </dt>
                <dd className="mt-2 text-xs leading-snug text-cream/70">{item.label}</dd>
              </div>
            ))}
          </dl>
        </Rise>

        <Rise delay={120} className="relative">
          <div className="absolute -inset-3 rounded-[2.2rem] bg-blush/25" />
          <Image
            src={assetPath("/brand/cookie-chocolate.webp")}
            alt="Cookie de chocolate da Raullah, grande e com miolo macio"
            width={960}
            height={1200}
            priority
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="relative aspect-[4/5] w-full rounded-[2rem] object-cover"
          />
        </Rise>
      </div>
    </section>
  );
}
