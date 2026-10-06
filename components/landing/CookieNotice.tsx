"use client";

import { useEffect, useState } from "react";
import { consentStatus, setConsent } from "@/lib/outbound";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(consentStatus() === null);
  }, []);

  if (!visible) return null;

  const choose = (value: "accepted" | "essential") => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div className="border-t border-cream/15 bg-navy/95 px-4 py-4 text-cream shadow-[0_-12px_40px_rgba(0,0,0,0.25)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-cream/80">
          Usamos cookies de medição (Meta Pixel e Google Analytics) para entender
          a visita. A página não pede cadastro.{" "}
          <a href="#privacidade" className="underline decoration-rose underline-offset-4">
            Política de privacidade
          </a>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("essential")}
            className="rounded-full border border-cream/30 px-4 py-2.5 text-xs font-semibold tracking-wide"
          >
            Só o essencial
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-full bg-blush px-4 py-2.5 text-xs font-semibold tracking-wide text-navy"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
