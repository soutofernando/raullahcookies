import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import Rise from "@/components/landing/Rise";

export default function SolutionBlock() {
  return (
    <section id="historia" className="scroll-mt-24 bg-cream text-navy">
      <div className="mx-auto grid max-w-6xl items-center gap-4 px-1 py-1 sm:gap-10 sm:px-6 sm:py-24 lg:grid-cols-2">
        <Rise className="grid grid-cols-[auto_1fr] items-end gap-3 sm:gap-4">
          <Image
            src={assetPath("/brand/logo-badge.webp")}
            alt="Selo Homemade with love"
            width={220}
            height={220}
            className="seal-float size-16 rounded-full bg-navy object-cover sm:size-40"
          />
          <Image
            src={assetPath("/brand/packaging-box.webp")}
            alt="Caixa rosa da Raullah Cookies"
            width={800}
            height={800}
            sizes="(min-width: 1024px) 28vw, 60vw"
            className="aspect-square w-full rounded-[1.25rem] object-cover sm:rounded-[1.75rem]"
          />
        </Rise>
        <Rise delay={120}>
          <p className="font-script text-4xl leading-none text-rose sm:text-6xl">
            Homemade with Love
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight sm:mt-3 sm:text-3xl">
            Nossa história
          </h2>
          <div className="mt-3 space-y-2.5 text-sm leading-snug text-navy/80 sm:mt-6 sm:space-y-4 sm:text-base sm:leading-relaxed">
            <p>
              Tudo começou porque gostamos muito de cookies. Eu e meu filho Sebastian
              consumíamos muito as opções disponíveis no mercado, e decidi criar minhas
              próprias receitas.
            </p>
            <p>
              Passei a levar meus cookies para compartilhar com as amigas nos encontros
              da academia. Com o tempo, elas começaram a pedir que eu os levasse também
              para comprar.
            </p>
            <p>
              Foi assim, de maneira espontânea, que o que nasceu na minha cozinha
              começou a se transformar na RAULLAH COOKIES.
            </p>
          </div>
        </Rise>
      </div>
    </section>
  );
}
