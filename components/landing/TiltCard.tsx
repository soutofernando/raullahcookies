"use client";

import { useRef, type ReactNode } from "react";

export default function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const card = useRef<HTMLDivElement>(null);

  const tilt = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = card.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = node.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    node.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
  };

  const reset = () => {
    if (card.current) card.current.style.transform = "";
  };

  return (
    <div className="h-full [perspective:900px]" onPointerMove={tilt} onPointerLeave={reset}>
      <div
        ref={card}
        className={`h-full transition-transform duration-200 ease-out [transform-style:preserve-3d] ${className ?? ""}`}
      >
        {children}
      </div>
    </div>
  );
}
