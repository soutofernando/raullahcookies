"use client";

import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import { brand, footerNav, store } from "@/lib/brand";
import { usePlace } from "@/components/landing/PlaceProvider";
import { scrollToSection } from "@/lib/lenis-instance";
import MarqueeStrip from "@/components/ui/MarqueeStrip";
import PaymentMethods from "@/components/landing/PaymentMethods";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  const place = usePlace();

  return (
    <footer className="relative z-[2] bg-navy text-cream">
      <MarqueeStrip tone="navy" />

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 sm:gap-10 sm:px-6 sm:py-16 md:grid-cols-[1.3fr_repeat(2,0.7fr)_1fr]">
        <div className="sm:col-span-2 md:col-span-1">
          <Image
            src={assetPath("/brand/logo-badge.webp")}
            alt={brand.name}
            width={72}
            height={72}
            className="size-14 rounded-full object-cover"
          />
          <p className="mt-5 font-script text-4xl">{brand.name}</p>
          <p className="mt-3 max-w-xs text-sm text-cream/70">
            Encomendas de alto padrão e delivery, feitos à mão em Campina Grande. {brand.seal}.
          </p>
        </div>

        {footerNav.map((column) => (
          <nav key={column.title}>
            <h2 className="text-xs tracking-[0.3em] uppercase text-rose">
              {column.title}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {column.links.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="text-cream/75 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="text-xs tracking-[0.3em] uppercase text-rose">Contato</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/75">
            <li>{place.addressLine || `${place.city} e região`}</li>
            {place.hoursLine ? <li>{place.hoursLine}</li> : null}
            <li>{place.serviceLine}</li>
          </ul>
          <div className="mt-4">
            <PaymentMethods kinds={place.payments} tone="cream" />
          </div>
          <div className="mt-5 flex flex-wrap gap-3 text-xs tracking-[0.2em] uppercase">
            {place.instagramUrl ? (
              <a href={place.instagramUrl} className="hover:text-rose">
                Instagram
              </a>
            ) : null}
            {place.whatsappUrl ? (
              <a href={place.whatsappUrl} className="hover:text-rose">
                WhatsApp
              </a>
            ) : null}
            <a href={store.ifood} className="hover:text-rose">
              iFood
            </a>
          </div>
        </div>
      </div>

      <div id="privacidade" className="scroll-mt-24 border-t border-cream/15">
        <div className="mx-auto max-w-6xl px-5 py-8 text-sm leading-relaxed text-cream/70 sm:px-6">
          <h2 className="text-xs tracking-[0.3em] text-rose uppercase">
            Privacidade
          </h2>
          <p className="mt-3 max-w-3xl">
            Esta página não tem formulário. Se você aceitar os cookies de medição,
            o Meta Pixel e o Google Analytics registram a visita e os cliques de
            saída para o cardápio, o iFood e o WhatsApp. Dá para recusar e seguir
            navegando. Os pedidos são concluídos no Cardápio Web ou no iFood.
          </p>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-[10px] tracking-[0.2em] uppercase text-cream/55 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:tracking-[0.25em]">
          <p>
            © {year} {brand.name}. Todos os direitos reservados.
          </p>
          <p>{brand.seal}</p>
        </div>
      </div>
    </footer>
  );
}
