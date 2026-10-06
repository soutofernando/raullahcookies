import type { ReactNode } from "react";
import type { PaymentKind } from "@/lib/cardapio";

const methods: Record<PaymentKind, { label: string; icon: ReactNode }> = {
  money: { label: "Dinheiro", icon: <MoneyIcon /> },
  card: { label: "Cartão", icon: <CardIcon /> },
  pix: { label: "Pix", icon: <PixIcon /> },
};

export default function PaymentMethods({
  kinds,
  tone = "navy",
}: {
  kinds: PaymentKind[];
  tone?: "navy" | "cream";
}) {
  if (kinds.length === 0) return null;
  const ink = tone === "cream" ? "text-cream" : "text-navy";
  const chip = tone === "cream" ? "bg-cream/10" : "bg-cream";

  return (
    <ul className="flex flex-wrap gap-2">
      {kinds.map((kind, index) => (
        <li
          key={kind}
          className={`icon-bob inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${chip} ${ink}`}
          style={{ animationDelay: `${index * 0.35}s` }}
        >
          {methods[kind].icon}
          {methods[kind].label}
        </li>
      ))}
    </ul>
  );
}

function MoneyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.2" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function PixIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
      <path d="M12 3.2 15.4 6.6 12 10 8.6 6.6 12 3.2Zm5.4 5.4 3.4 3.4-3.4 3.4L13.9 12l3.5-3.4ZM6.6 8.6 10 12 6.6 15.4 3.2 12 6.6 8.6ZM12 14l3.4 3.4L12 20.8 8.6 17.4 12 14Z" />
    </svg>
  );
}
