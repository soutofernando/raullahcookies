"use client";

import type { ReactNode } from "react";
import { track, withUtm, type TrackEvent } from "@/lib/outbound";

export default function OutboundLink({
  href,
  content,
  event,
  className,
  children,
}: {
  href: string;
  content: string;
  event: TrackEvent;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={(click) => {
        track(event, content);
        const next = withUtm(href, content);
        if (next === href) return;
        click.preventDefault();
        window.location.assign(next);
      }}
    >
      {children}
    </a>
  );
}
