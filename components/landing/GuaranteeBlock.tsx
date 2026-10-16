import { store } from "@/lib/brand";
import type { PublicPlace } from "@/lib/cardapio";
import Rise from "@/components/landing/Rise";
import OutboundLink from "@/components/landing/OutboundLink";
import { WhatsAppIcon } from "@/components/ui/PlatformIcons";

export default function GuaranteeBlock({ place }: { place: PublicPlace | null }) {
  return (
    <section id="garantia" className="scroll-mt-24 px-5 pt-10 pb-6 sm:px-6 sm:pt-12 sm:pb-8">
      <Rise className="mx-auto max-w-3xl">
        <p className="font-script text-5xl leading-none text-blush sm:text-6xl">
          Nosso cuidado com você
        </p>
        <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-cream/80">
          <p>Nosso compromisso é que seu pedido chegue conforme o que você escolheu.</p>
          <p>
            Ao receber seu pedido, confira os itens e, caso identifique alguma
            divergência em relação ao que foi solicitado, entre em contato
            imediatamente pelo WhatsApp, enviando uma foto e contando o que
            aconteceu, para que possamos verificar a situação e solucionar da
            melhor forma possível, o mais rápido possível.
          </p>
        </div>
        <OutboundLink
          href={place?.whatsappUrl || store.whatsapp}
          content="garantia-whatsapp"
          event="Lead"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream"
        >
          <WhatsAppIcon className="size-5" />
          WhatsApp
        </OutboundLink>
      </Rise>
    </section>
  );
}
