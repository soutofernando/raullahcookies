import Rise from "@/components/landing/Rise";

export default function StoryBlock() {
  return (
    <section id="historia" className="scroll-mt-24 bg-cream text-navy">
      <div className="arch-veil mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-24">
        <Rise>
        <p className="text-[11px] font-semibold tracking-[0.28em] text-rose uppercase">
          Como começou
        </p>
        <div className="mt-6 space-y-5 text-base leading-relaxed sm:text-lg">
          <p>
            Tudo começou na cozinha de casa: um forno, uma receita e a vontade de
            fazer um cookie que desse orgulho de comer.
          </p>
          <p>
            Hoje a Raullah tem loja física, mais de 50 sabores e mais de 9 mil
            pedidos feitos pelo site. O jeito continua o mesmo: feito à mão, com
            ingrediente bom e muito carinho.
          </p>
          <p>
            Aqui você escolhe o sabor, pede em poucos cliques e recebe em casa (ou
            retira na loja) um cookie que faz o seu dia valer a pena.
          </p>
        </div>
        </Rise>
      </div>
    </section>
  );
}
