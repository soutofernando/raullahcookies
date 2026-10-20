import { store } from "@/lib/brand";
import { flavors } from "@/lib/landing";
import type { MenuCatalog, PublicPlace } from "@/lib/cardapio";
import OutboundLink from "@/components/landing/OutboundLink";
import TrackWhenVisible from "@/components/landing/TrackWhenVisible";
import Rise from "@/components/landing/Rise";
import ProductRail from "@/components/landing/ProductRail";

function ProductPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    // Foto do cardápio; o domínio muda por loja.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={640} height={640} loading="lazy" decoding="async" className="aspect-square w-full object-cover" />
  );
}

export default function ShowcaseBlock({
  catalog,
  place = null,
}: {
  catalog: MenuCatalog | null;
  place?: PublicPlace | null;
}) {
  const menuUrl = place?.menuUrl ?? store.menuUrl;

  return (
    <TrackWhenVisible event="ViewContent" content="vitrine">
      <section id="cardapio" className="scroll-mt-24 bg-cream text-navy">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
          <Rise className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.28em] text-rose uppercase">
                Sabores
              </p>
              <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-5xl">
                Os que saem primeiro.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-navy/70">
                Filtre por destaque ou categoria e deslize para ver o restante. O cardápio completo abre em um clique.
              </p>
            </div>
            <OutboundLink
              href={menuUrl}
              content="vitrine-completa"
              event="InitiateCheckout"
              className="inline-flex items-center justify-center rounded-full border border-navy/15 px-5 py-3 text-sm font-semibold transition-colors hover:bg-navy hover:text-cream"
            >
              Ver cardápio completo
            </OutboundLink>
          </Rise>

          {catalog ? (
            <ProductRail categories={catalog.categories} />
          ) : (
            <ul className="rail mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:gap-4">
              {flavors.map((flavor) => (
                <li key={flavor.id} className="w-[78%] shrink-0 snap-start sm:w-60">
                  <div className="flex h-full flex-col overflow-hidden rounded-[1.35rem] bg-white">
                    <ProductPhoto src={flavor.image} alt={`Cookie ${flavor.name} da Raullah`} />
                    <div className="flex flex-1 flex-col px-4 py-3.5">
                      <h3 className="text-base font-semibold">{flavor.name}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-navy/70">
                        {flavor.description}
                      </p>
                      <p className="mt-3 text-sm font-semibold">{flavor.price}</p>
                      <OutboundLink
                        href={menuUrl}
                        content={`teaser-${flavor.id}`}
                        event="AddToCart"
                        className="mt-3 inline-flex w-fit rounded-full bg-navy px-4 py-2 text-xs font-semibold text-cream transition-colors hover:bg-rose hover:text-navy"
                      >
                        Pedir
                      </OutboundLink>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </TrackWhenVisible>
  );
}
