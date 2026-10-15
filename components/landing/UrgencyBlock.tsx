import type { ReactNode } from "react";
import { store } from "@/lib/brand";
import type { PublicPlace } from "@/lib/cardapio";
import { urgencies } from "@/lib/landing";
import Rise from "@/components/landing/Rise";
import OutboundLink from "@/components/landing/OutboundLink";

const urgencyIcons = [WeekIcon, ClockIcon, CalendarIcon];

export default function UrgencyBlock({ place }: { place: PublicPlace | null }) {
  return (
    <section id="agora" className="scroll-mt-24 bg-blush text-navy">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
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
