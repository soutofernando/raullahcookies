"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";

const CookieCanvas = dynamic(() => import("@/components/three/CookieCanvas"), {
  ssr: false,
});

export default function CookieCanvasLoader() {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => setTarget(document.body), 50);
    return () => window.clearTimeout(id);
  }, []);

  if (!target) return null;
  return createPortal(<CookieCanvas />, target);
}
