import { eventQuoteHref, store } from "@/lib/brand";
import type { PublicPlace } from "@/lib/cardapio";
import OutboundLink from "@/components/landing/OutboundLink";
import Rise from "@/components/landing/Rise";

export default function PathsBlock({ place }: { place: PublicPlace | null }) {
  const menuUrl = place?.menuUrl ?? store.menuUrl;
  const quoteUrl = eventQuoteHref(place?.whatsappUrl);

  return (
    <section id="caminhos" className="scroll-mt-24 px-5 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <Rise>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-blush uppercase">
            Como pedir
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Dois caminhos. O mesmo cookie.
          </h2>
        </Rise>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Rise>
            <article className="flex h-full flex-col rounded-[1.75rem] bg-cream px-6 py-7 text-navy sm:px-8 sm:py-8">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-rose uppercase">
                Delivery
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                Quero receber hoje.
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-navy/75">
                Cardápio completo, caixas e sabores do dia. Você escolhe, paga e
                recebe em casa ou retira na loja.
              </p>
              <OutboundLink
                href={menuUrl}
                content="caminho-delivery"
                event="InitiateCheckout"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-rose hover:text-navy sm:w-auto"
              >
                Ir para o cardápio
              </OutboundLink>
            </article>
          </Rise>
          <Rise delay={90}>
            <article className="flex h-full flex-col rounded-[1.75rem] border border-blush/40 bg-cream/8 px-6 py-7 sm:px-8 sm:py-8">
              <p className="text-[11px] font-semibold tracking-[0.22em] text-blush uppercase">
                Alto padrão
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                Tenho um evento.
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-cream/75">
                Casamentos, festas premium e corporativo. Quantidade, sabores e
                apresentação combinados com antecedência.
              </p>
              <OutboundLink
                href={quoteUrl}
                content="caminho-eventos"
                event="Lead"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-blush px-6 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-rose sm:w-auto"
              >
                Pedir orçamento
              </OutboundLink>
            </article>
          </Rise>
        </div>
      </div>
    </section>
  );
}
