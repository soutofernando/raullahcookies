import { faqs } from "@/lib/landing";
import Disclosure from "@/components/landing/Disclosure";
import Rise from "@/components/landing/Rise";

export default function FaqBlock() {
  return (
    <section id="faq" className="scroll-mt-24 px-5 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <Rise>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Antes de pedir
          </h2>
        </Rise>
        <div className="mt-8 divide-y divide-cream/15 border-y border-cream/15">
          {faqs.map((item, index) => (
            <Rise key={item.q} delay={index * 50}>
              <Disclosure question={item.q} answer={item.a} accent="blush" />
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}
