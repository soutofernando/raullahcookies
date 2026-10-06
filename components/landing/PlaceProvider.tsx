"use client";

import { createContext, useContext, type ReactNode } from "react";
import { store } from "@/lib/brand";
import type { PublicPlace } from "@/lib/cardapio";

const PlaceContext = createContext<PublicPlace | null>(null);

export default function PlaceProvider({
  place,
  children,
}: {
  place: PublicPlace | null;
  children: ReactNode;
}) {
  return <PlaceContext.Provider value={place}>{children}</PlaceContext.Provider>;
}

export function usePlace(): PublicPlace {
  const live = useContext(PlaceContext);
  if (live) return live;
  return {
    menuUrl: store.menuUrl,
    whatsappUrl: store.whatsapp,
    instagramUrl: store.instagram,
    city: "Campina Grande",
    addressLine: "Campina Grande e região",
    hoursLine: store.hours,
    serviceLine: "Retirada na loja ou delivery",
    payments: ["money", "card", "pix"],
    paymentLine: "dinheiro, cartão e Pix",
    openLabel: null,
  };
}
