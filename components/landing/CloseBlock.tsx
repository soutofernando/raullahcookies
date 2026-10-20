import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import { eventQuoteHref, store } from "@/lib/brand";
import type { PublicPlace } from "@/lib/cardapio";
import OutboundLink from "@/components/landing/OutboundLink";
import Rise from "@/components/landing/Rise";

export default function CloseBlock({ place }: { place: PublicPlace | null }) {
  const menuUrl = place?.menuUrl ?? store.menuUrl;
  const quoteUrl = eventQuoteHref(place?.whatsappUrl);
  return (
    <section id="fechar" className="scroll-mt-24 bg-cream text-navy">
      <div className="arch-veil mx-auto max-w-3xl px-5 py-10 text-center sm:px-6 sm:py-14">
        <Rise>
        <div className="mascot-cheer mx-auto -mt-3 mb-1 size-28 overflow-hidden sm:size-36">
          <Image
            src={assetPath("/general/boneco-1.webp")}
            alt="Mascote Raullah de óculos, com o polegar para cima"
            width={320}
            height={320}
            className="size-full scale-[1.55] object-cover object-center"
          />
        </div>
        <h2 className="text-3xl leading-tight font-semibold tracking-tight sm:text-5xl">
          Um cookie para a mesa de casa. Ou para o evento inteiro.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-navy/75">
          Delivery quando a vontade é agora. Orçamento quando a ocasião pede
          quantidade, apresentação e cuidado.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <OutboundLink
            href={menuUrl}
            content="cta-final"
            event="InitiateCheckout"
            className="inline-flex w-full items-center justify-center rounded-full bg-navy px-8 py-4 text-sm font-semibold text-cream sm:w-auto"
          >
            Pedir agora
          </OutboundLink>
          <OutboundLink
            href={quoteUrl}
            content="cta-final-orcamento"
            event="Lead"
            className="inline-flex w-full items-center justify-center rounded-full border border-navy/20 px-8 py-4 text-sm font-semibold text-navy sm:w-auto"
          >
            Orçamento para eventos
          </OutboundLink>
        </div>
        <p className="mt-3 text-xs text-navy/60">
          {place?.serviceLine ?? "Retirada ou delivery"} • Feito à mão em {place?.city ?? "Campina Grande"}
        </p>
        </Rise>
      </div>
    </section>
  );
}
