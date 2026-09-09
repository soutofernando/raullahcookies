import Image from "next/image";
import { brand } from "@/lib/brand";

export default function MarqueeStrip({
  tone = "cream",
}: {
  tone?: "cream" | "navy";
}) {
  const dark = tone === "navy";
  return (
    <div
      className={`relative z-[2] overflow-hidden border-y ${
        dark
          ? "border-rose/30 bg-navy text-cream"
          : "border-navy/10 bg-cream text-navy"
      }`}
    >
      <div className="marquee-track items-center gap-8 py-3 pr-8 text-xs font-semibold tracking-[0.35em] uppercase">
        {Array.from({ length: 2 }).map((_, copy) => (
          <div key={copy} className="flex items-center gap-8">
            {Array.from({ length: 6 }).map((__, index) => (
              <span key={index} className="flex items-center gap-8">
                {brand.marquee}
                <Image
                  src="/brand/logo-badge.webp"
                  alt=""
                  width={36}
                  height={36}
                  className="size-9 rounded-full object-cover"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
