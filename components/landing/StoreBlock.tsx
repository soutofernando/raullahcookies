import Image from "next/image";
import { storeVisit } from "@/lib/landing";
import Rise from "@/components/landing/Rise";

export default function StoreBlock() {
  return (
    <section id="loja" className="scroll-mt-24 bg-cream text-navy">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
        <Rise>
          <p className="font-script text-5xl leading-none text-rose sm:text-6xl">A loja</p>
          <h2 className="mt-3 max-w-md text-2xl leading-snug font-semibold tracking-tight sm:text-3xl">
            {storeVisit.title}
          </h2>
          <a
            href={storeVisit.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-navy/70 underline-offset-4 transition-colors hover:text-navy hover:underline"
          >
            <PinIcon />
            {storeVisit.address}
          </a>
          <p className="mt-4 max-w-md text-base leading-relaxed text-navy/80">
            {storeVisit.ingredients}
          </p>
        </Rise>

        <ul className="grid grid-cols-3 gap-2 sm:gap-3">
          {storeVisit.photos.map((photo, index) => (
            <li key={photo.src}>
              <Rise delay={index * 70}>
                <figure className="overflow-hidden rounded-[1.25rem] bg-navy/10 sm:rounded-[1.5rem]">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 18vw, 30vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
              </Rise>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-navy" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5a6.5 6.5 0 0 0-6.5 6.5c0 4.8 6.5 12.5 6.5 12.5s6.5-7.7 6.5-12.5A6.5 6.5 0 0 0 12 2.5Zm0 8.8a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6Z" />
    </svg>
  );
}
