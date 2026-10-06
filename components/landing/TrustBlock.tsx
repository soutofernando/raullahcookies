import Image from "next/image";
import type { ReactNode } from "react";
import { assetPath } from "@/lib/asset-path";
import { store } from "@/lib/brand";
import type { PublicPlace } from "@/lib/cardapio";
import { faqs, urgencies } from "@/lib/landing";
import Disclosure from "@/components/landing/Disclosure";
import Rise from "@/components/landing/Rise";
import OutboundLink from "@/components/landing/OutboundLink";
import { GoogleIcon, IfoodIcon, WhatsAppIcon } from "@/components/ui/PlatformIcons";

const urgencyIcons = [WeekIcon, ClockIcon, CalendarIcon];

export default function TrustBlock({ place }: { place: PublicPlace | null }) {
  return (
    <>
      <section id="avaliar" className="scroll-mt-24 bg-navy px-5 py-14 text-cream sm:px-6 sm:py-20">
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

      <section id="garantia" className="scroll-mt-24 px-5 py-14 sm:px-6 sm:py-20">
        <Rise className="mx-auto max-w-3xl">
          <div>
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
          </div>
        </Rise>
      </section>

      <section id="agora" className="scroll-mt-24 bg-blush text-navy">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20">
          <Rise>
            <h2 className="max-w-lg text-3xl font-semibold tracking-tight sm:text-4xl">
              O que dá pra garantir hoje.
            </h2>
          </Rise>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {urgencies.map((item, index) => {
              const Icon = urgencyIcons[index] ?? WeekIcon;
              return (
                <li key={item.title}>
                  <Rise delay={index * 90} className="lift-card h-full rounded-[1.75rem] bg-cream px-5 py-6">
                    <span className="icon-bob inline-flex text-rose" style={{ animationDelay: `${index * 0.25}s` }}>
                      <Icon />
                    </span>
                    <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-navy/75">{item.text}</p>
                  </Rise>
                </li>
              );
            })}
          </ul>
          <OutboundLink
            href={place?.menuUrl ?? store.menuUrl}
            content="garantir-agora"
            event="InitiateCheckout"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-navy px-8 py-4 text-sm font-semibold text-cream sm:w-auto"
          >
            Garantir o meu agora
          </OutboundLink>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 px-5 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <Rise>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Antes de pedir
            </h2>
          </Rise>
          <div className="mt-8 divide-y divide-cream/15 border-y border-cream/15">
            {faqs.map((item, index) => (
              <Rise key={item.q} delay={index * 50}>
                <Disclosure question={item.q} answer={item.a} accent="blush" />
              </Rise>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function MiniIcon({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex size-10 items-center justify-center rounded-full bg-blush/40">
      {children}
    </span>
  );
}

function WeekIcon() {
  return (
    <MiniIcon>
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 3.5 13.8 8h4.7l-3.8 2.8 1.5 4.7L12 13.4 7.8 15.5l1.5-4.7L5.5 8h4.7L12 3.5Z" strokeLinejoin="round" />
      </svg>
    </MiniIcon>
  );
}

function ClockIcon() {
  return (
    <MiniIcon>
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4.5l3 2" strokeLinecap="round" />
      </svg>
    </MiniIcon>
  );
}

function CalendarIcon() {
  return (
    <MiniIcon>
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3.5v3M16 3.5v3M4 10h16" strokeLinecap="round" />
      </svg>
    </MiniIcon>
  );
}
