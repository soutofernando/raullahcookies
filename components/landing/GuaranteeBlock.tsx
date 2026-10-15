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
          Garantia Raullah de Carinho
        </p>
        <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-cream/80">
          <p>
            Se o seu pedido chegar diferente do que prometemos, é só mandar uma
            foto no WhatsApp em até 24 horas. A gente resolve com troca ou
            reembolso, sem burocracia.
          </p>
          <p>Cookie bom é pra deixar você feliz. Se não deixou, o problema é nosso.</p>
        </div>
        <OutboundLink
          href={place?.whatsappUrl || store.whatsapp}
          content="garantia-whatsapp"
          event="Lead"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream"
        >
          <WhatsAppIcon className="size-5" />
          Chamar no WhatsApp
        </OutboundLink>
      </Rise>
    </section>
  );
}
