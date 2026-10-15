import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import { store } from "@/lib/brand";
import Rise from "@/components/landing/Rise";
import OutboundLink from "@/components/landing/OutboundLink";
import { GoogleIcon, IfoodIcon } from "@/components/ui/PlatformIcons";

export default function ReviewBlock() {
  return (
    <section id="avaliar" className="scroll-mt-24 bg-navy px-5 py-10 text-cream sm:px-6 sm:py-14">
      <Rise className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[auto_1fr]">
        <Image
          src={assetPath("/brand/hang-tag.webp")}
          alt="Tag rosa com o mascote da Raullah"
          width={280}
          height={360}
          className="cookie-swing mx-auto w-36 sm:w-44"
        />
        <div>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-blush uppercase">
            Avaliações
          </p>
          <h2 className="mt-3 max-w-lg text-3xl font-semibold tracking-tight sm:text-4xl">
            Gostou do cookie? Conta pra gente onde você pediu.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/75">
            A nota ajuda a próxima pessoa a pedir sem medo. Leva menos de um minuto.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <OutboundLink
              href={store.ifood}
              content="avaliar-ifood"
              event="Lead"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blush px-6 py-3 text-sm font-semibold text-navy"
            >
              <IfoodIcon className="size-5" />
              Avaliar no iFood
            </OutboundLink>
            <OutboundLink
              href={store.googleReviews}
              content="avaliar-google"
              event="Lead"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream"
            >
              <GoogleIcon className="size-5" />
              Avaliar no Google
            </OutboundLink>
          </div>
        </div>
      </Rise>
    </section>
  );
}
