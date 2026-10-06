import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import Rise from "@/components/landing/Rise";

export default function SolutionBlock() {
  return (
    <section id="historia" className="scroll-mt-24 bg-cream text-navy">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
        <Rise className="grid grid-cols-[auto_1fr] items-end gap-4">
          <Image
            src={assetPath("/brand/logo-badge.webp")}
            alt="Selo Homemade with love"
            width={220}
            height={220}
            className="seal-float size-28 rounded-full bg-navy object-cover sm:size-40"
          />
          <Image
            src={assetPath("/brand/packaging-box.webp")}
            alt="Caixa rosa da Raullah Cookies"
            width={800}
            height={800}
            sizes="(min-width: 1024px) 28vw, 60vw"
            className="aspect-square w-full rounded-[1.75rem] object-cover"
          />
        </Rise>
        <Rise delay={120}>
          <p className="font-script text-5xl leading-none text-rose sm:text-6xl">
            Homemade with Love
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Receita de casa, capricho de loja.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-navy/80">
            <p>
              Tudo começou na cozinha de casa: um forno, uma receita e a vontade de
              fazer um cookie que desse orgulho de comer.
            </p>
            <p>
              Cada cookie ainda sai da cozinha de quem criou a receita. Chega numa
              embalagem pensada pra encantar, pra comer na hora ou entregar de presente.
            </p>
          </div>
        </Rise>
      </div>
    </section>
  );
}
