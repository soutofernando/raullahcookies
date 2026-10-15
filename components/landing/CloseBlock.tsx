import { store } from "@/lib/brand";
import type { PublicPlace } from "@/lib/cardapio";
import OutboundLink from "@/components/landing/OutboundLink";
import Rise from "@/components/landing/Rise";

export default function CloseBlock({ place }: { place: PublicPlace | null }) {
  const menuUrl = place?.menuUrl ?? store.menuUrl;
  return (
    <section id="fechar" className="scroll-mt-24 bg-cream text-navy">
      <div className="arch-veil mx-auto max-w-3xl px-5 py-10 text-center sm:px-6 sm:py-14">
        <Rise>
        <h2 className="text-3xl leading-tight font-semibold tracking-tight sm:text-5xl">
          Imagina abrir a caixa, sentir o cheiro de cookie fresquinho e escolher por
          qual começar.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-navy/75">
          Você merece um cookie que seja de verdade, e quem ganha de presente
          também. Faz o pedido agora e deixa a Raullah cuidar do resto.
        </p>
        <OutboundLink
          href={menuUrl}
          content="cta-final"
          event="InitiateCheckout"
          className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-navy px-8 py-4 text-sm font-semibold text-cream sm:w-auto"
        >
          Ver o cardápio
        </OutboundLink>
        <p className="mt-3 text-xs text-navy/60">
          {place?.serviceLine ?? "Retirada ou delivery"} • Feito à mão em {place?.city ?? "Campina Grande"}
        </p>
        </Rise>
      </div>
    </section>
  );
}
