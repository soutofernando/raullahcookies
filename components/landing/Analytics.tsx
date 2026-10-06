"use client";

import { useEffect } from "react";
import { consentStatus } from "@/lib/outbound";

function loadPixels() {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  if (ga && !document.querySelector("script[data-raullah-ga]")) {
    const script = document.createElement("script");
    script.async = true;
    script.dataset.raullahGa = "true";
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga)}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", ga);
  }

  if (!pixel || window.fbq) return;
  const snippet = document.createElement("script");
  snippet.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(pixel)});fbq('track','PageView');`;
  document.head.appendChild(snippet);
}

export default function Analytics() {
  useEffect(() => {
    const sync = () => {
      if (consentStatus() === "accepted") loadPixels();
    };
    sync();
    window.addEventListener("raullah-consent", sync);
    return () => window.removeEventListener("raullah-consent", sync);
  }, []);

  return null;
}
