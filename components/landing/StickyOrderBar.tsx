"use client";

import OutboundLink from "@/components/landing/OutboundLink";
import { usePlace } from "@/components/landing/PlaceProvider";

export default function StickyOrderBar() {
  const place = usePlace();
  return (
    <div className="border-t border-cream/10 bg-navy/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <OutboundLink
        href={place.menuUrl}
        content="sticky-cardapio"
        event="InitiateCheckout"
        className="flex w-full items-center justify-center rounded-full bg-blush py-3.5 text-sm font-semibold text-navy"
      >
        Ver o cardápio
      </OutboundLink>
    </div>
  );
}
