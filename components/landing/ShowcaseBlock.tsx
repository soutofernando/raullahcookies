import type { ReactNode } from "react";
import Image from "next/image";
import { store } from "@/lib/brand";
import { boxes, flavors } from "@/lib/landing";
import type { MenuCatalog, PublicPlace } from "@/lib/cardapio";
import OutboundLink from "@/components/landing/OutboundLink";
import TrackWhenVisible from "@/components/landing/TrackWhenVisible";
import TiltCard from "@/components/landing/TiltCard";
import Rise from "@/components/landing/Rise";
import MenuBrowser from "@/components/landing/MenuBrowser";
import PaymentMethods from "@/components/landing/PaymentMethods";

const addClass =
  "mt-4 inline-flex items-center justify-center rounded-full bg-navy px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-rose hover:text-navy";

function IconWrap({ children }: { children: ReactNode }) {
  return (
    <span className="mb-3 inline-flex size-10 items-center justify-center rounded-full bg-cream text-navy">
      {children}
    </span>
  );
}

function StoreIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M4 10h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9Z" strokeLinejoin="round" />
      <path d="M3 10 6.2 4.8A1 1 0 0 1 7.1 4.3h9.8a1 1 0 0 1 .9.5L21 10" strokeLinejoin="round" />
      <path d="M9 20v-5h6v5" strokeLinejoin="round" />
    </svg>
  );
}

function DeliveryIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M3 7h11v8H3V7Z" strokeLinejoin="round" />
      <path d="M14 10h4l3 3v2h-7v-5Z" strokeLinejoin="round" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="18" cy="18" r="1.6" />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h4" strokeLinecap="round" />
    </svg>
  );
}

function InfoCard({
  icon,
  title,
  text,
  children,
}: {
  icon: ReactNode;
  title: string;
  text?: string;
  children?: ReactNode;
}) {
  return (
    <div className="lift-card rounded-3xl bg-white px-5 py-5">
      <span className="icon-bob mb-3 inline-flex">
        <IconWrap>{icon}</IconWrap>
      </span>
      <h3 className="font-semibold">{title}</h3>
      {text ? <p className="mt-2 text-sm text-navy/70">{text}</p> : null}
      {children ? <div className="mt-3">{children}</div> : null}
    </div>
  );
}

function LiveShowcase({
  catalog,
  place,
}: {
  catalog: MenuCatalog;
  place: PublicPlace | null;
}) {
  return (
    <TrackWhenVisible event="ViewContent" content="vitrine">
      <section id="cardapio" className="scroll-mt-24 bg-cream text-navy">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
          <Rise>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-rose uppercase">
              Vitrine
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-5xl">
              O cardápio de agora
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-navy/70">
              {catalog.priceFrom
                ? `Escolhe aqui e pede no cardápio, a partir de ${catalog.priceFrom}. Um clique abre o produto.`
                : "Escolhe aqui e pede no cardápio. Um clique abre o produto."}
            </p>
          </Rise>

          <MenuBrowser categories={catalog.categories} />

          <div className="mt-16">
            <div className="grid gap-3 sm:grid-cols-3">
              <InfoCard
                icon={<StoreIcon />}
                title="Retirada na loja"
                text="Escolha retirada no pedido e passe no balcão."
              />
              <InfoCard
                icon={<DeliveryIcon />}
                title="Delivery"
                text="O frete é calculado pela sua região no pedido."
              />
              <InfoCard icon={<PaymentIcon />} title="Pagamento">
                <PaymentMethods kinds={place?.payments ?? ["money", "card", "pix"]} />
              </InfoCard>
            </div>
            {place?.hoursLine ? (
              <p className="mt-4 text-sm text-navy/70">{place.hoursLine}</p>
            ) : null}
            <OutboundLink
              href={place?.menuUrl ?? store.menuUrl}
              content="montar-pedido"
              event="InitiateCheckout"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-navy px-8 py-4 text-sm font-semibold text-cream sm:w-auto"
            >
              Montar meu pedido
            </OutboundLink>
          </div>
        </div>
      </section>
    </TrackWhenVisible>
  );
}

function StaticShowcase() {
  return (
    <TrackWhenVisible event="ViewContent" content="vitrine">
      <section id="cardapio" className="scroll-mt-24 bg-cream text-navy">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
          <Rise>
            <p className="text-[11px] font-semibold tracking-[0.28em] text-rose uppercase">
              Vitrine
            </p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-5xl">
              Os mais pedidos
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-navy/70">
              Cookie avulso a partir de R$ 14,50, até R$ 25 conforme o sabor.
            </p>
          </Rise>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {flavors.map((flavor, index) => (
              <li key={flavor.id} className="h-full">
                <Rise delay={(index % 3) * 80} className="h-full">
                  <TiltCard className="flex flex-col overflow-hidden rounded-[1.75rem] bg-white">
                    <Image
                      src={flavor.image}
                      alt={`Cookie ${flavor.name} da Raullah`}
                      width={800}
                      height={800}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      className="aspect-square w-full object-cover"
                    />
                    <div className="flex flex-1 flex-col px-5 py-5">
                      <h3 className="text-xl font-semibold">{flavor.name}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/70">
                        {flavor.description}
                      </p>
                      <p className="mt-4 text-sm font-semibold">{flavor.price}</p>
                      <OutboundLink
                        href={store.menuUrl}
                        content={`add-${flavor.id}`}
                        event="AddToCart"
                        className={addClass}
                      >
                        Adicionar
                      </OutboundLink>
                    </div>
                  </TiltCard>
                </Rise>
              </li>
            ))}
          </ul>

          <div id="caixas" className="scroll-mt-24 mt-16">
            <Rise>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Caixas pra presentear e dividir
              </h2>
            </Rise>
            <ul className="mt-8 grid gap-4 lg:grid-cols-3">
              {boxes.map((box, index) => (
                <li key={box.id} className="h-full">
                  <Rise delay={index * 90} className="h-full">
                    <TiltCard
                      className={`rounded-[1.75rem] px-5 py-6 ${
                        box.badge === "Mais pedida"
                          ? "bg-navy text-cream"
                          : "border border-navy/10 bg-white"
                      }`}
                    >
                      {box.badge ? (
                        <p className="text-[11px] font-semibold tracking-[0.22em] text-blush uppercase">
                          {box.badge}
                        </p>
                      ) : (
                        <p className="text-[11px] font-semibold tracking-[0.22em] text-rose uppercase">
                          Caixa
                        </p>
                      )}
                      <h3 className="mt-3 text-xl font-semibold">{box.name}</h3>
                      <p className="mt-4 font-script text-5xl leading-none">{box.price}</p>
                      <p className="mt-2 text-sm opacity-70">{box.each}</p>
                      <OutboundLink
                        href={store.menuUrl}
                        content={box.id}
                        event="AddToCart"
                        className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold ${
                          box.badge === "Mais pedida"
                            ? "bg-blush text-navy"
                            : "bg-navy text-cream"
                        }`}
                      >
                        Adicionar
                      </OutboundLink>
                    </TiltCard>
                  </Rise>
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-3xl text-base leading-relaxed text-navy/80">
              Fazendo a conta: 10 cookies avulsos a partir de R$ 14,50 custariam
              R$ 145,00. Na caixa de 10, você paga R$ 109,90 e economiza pelo menos
              R$ 35,10.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-white px-5 py-5">
                <h3 className="font-semibold">Retirada na loja</h3>
                <p className="mt-2 text-sm text-navy/70">
                  Escolha retirada no pedido e passe no balcão.
                </p>
              </div>
              <div className="rounded-3xl bg-white px-5 py-5">
                <h3 className="font-semibold">Delivery</h3>
                <p className="mt-2 text-sm text-navy/70">
                  O frete é calculado pela sua região no pedido.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <PaymentMethods kinds={["money", "card", "pix"]} />
            </div>

            <OutboundLink
              href={store.menuUrl}
              content="montar-pedido"
              event="InitiateCheckout"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-navy px-8 py-4 text-sm font-semibold text-cream sm:w-auto"
            >
              Montar meu pedido
            </OutboundLink>
          </div>
        </div>
      </section>
    </TrackWhenVisible>
  );
}

export default function ShowcaseBlock({
  catalog,
  place = null,
}: {
  catalog: MenuCatalog | null;
  place?: PublicPlace | null;
}) {
  if (catalog) return <LiveShowcase catalog={catalog} place={place} />;
  return <StaticShowcase />;
}
