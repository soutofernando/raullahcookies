import { pains } from "@/lib/landing";
import Rise from "@/components/landing/Rise";

export default function PainBlock() {
  return (
    <section id="vontade" className="scroll-mt-24 px-5 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto grid max-w-xl gap-8">
        <Rise>
        <h2 className="max-w-md text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
          Sabe aquela vontade de um cookie de verdade, daqueles que você lembra no
          dia seguinte? E aí você pede um e se decepciona.
        </h2>
        </Rise>
        <ul className="divide-y divide-cream/15 border-y border-cream/15">
          {pains.map((pain, index) => (
            <li key={pain}>
              <Rise delay={index * 70} className="flex items-start gap-3 py-4 text-base leading-relaxed text-cream/80">
                <span className="icon-bob mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-blush/20 text-xs font-semibold text-blush" style={{ animationDelay: `${index * 0.25}s` }}>
                  {index + 1}
                </span>
                {pain}
              </Rise>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
