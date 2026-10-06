import type { ReactNode } from "react";
import { benefits } from "@/lib/landing";
import Rise from "@/components/landing/Rise";

const icons = [BiteIcon, FlavorIcon, GiftIcon, RouteIcon];

export default function BenefitsBlock() {
  return (
    <section id="beneficios" className="scroll-mt-24 px-5 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <Rise>
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            O que muda quando o cookie é de verdade.
          </h2>
        </Rise>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item, index) => {
            const Icon = icons[index] ?? BiteIcon;
            return (
              <li key={item.title}>
                <Rise
                  delay={index * 80}
                  className="lift-card h-full rounded-3xl border border-cream/15 bg-cream/5 px-5 py-5"
                >
                  <span className="icon-bob inline-flex" style={{ animationDelay: `${index * 0.2}s` }}>
                    <Icon />
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-blush">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/75">{item.text}</p>
                </Rise>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function IconFrame({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex size-10 items-center justify-center rounded-full bg-blush/20 text-blush">
      {children}
    </span>
  );
}

function BiteIcon() {
  return (
    <IconFrame>
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 4a8 8 0 1 0 7.2 11.5 3 3 0 0 1-3.4-3.4A8 8 0 0 0 12 4Z" />
        <path d="M14 8.5h.01M10 11h.01M13.5 13.5h.01" strokeLinecap="round" />
      </svg>
    </IconFrame>
  );
}

function FlavorIcon() {
  return (
    <IconFrame>
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 3v3M12 18v3M4.9 6.5l2.1 2.1M17 15.4l2.1 2.1M3 12h3M18 12h3M4.9 17.5l2.1-2.1M17 8.6l2.1-2.1" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    </IconFrame>
  );
}

function GiftIcon() {
  return (
    <IconFrame>
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="4" y="10" width="16" height="9" rx="1.5" />
        <path d="M4 14h16M12 10v9M12 10c-2 0-3.5-2.2-2.2-3.6S12 7.2 12 10Zm0 0c2 0 3.5-2.2 2.2-3.6S12 7.2 12 10Z" strokeLinejoin="round" />
      </svg>
    </IconFrame>
  );
}

function RouteIcon() {
  return (
    <IconFrame>
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="6" cy="7" r="2" />
        <circle cx="17" cy="17" r="2" />
        <path d="M8 8.5c2 1 3 2.5 3 4.5s1.2 3.2 3.2 4" strokeLinecap="round" />
      </svg>
    </IconFrame>
  );
}
