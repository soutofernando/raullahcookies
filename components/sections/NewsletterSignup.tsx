"use client";

import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NewsletterSignup() {
  const section = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  useLayoutEffect(() => {
    const el = section.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(".news-item", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  // TODO: conectar a um provedor de e-mail; hoje apenas confirma na interface.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
  };

  return (
    <section
      id="newsletter"
      ref={section}
      className="relative z-[2] px-5 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="news-item text-[10px] tracking-[0.3em] uppercase sm:text-xs sm:tracking-[0.4em]">
          Newsletter
        </p>
        <h2 className="news-item mt-3 font-script text-4xl sm:text-5xl md:text-6xl">
          Sabores novos antes de todo mundo
        </h2>
        <p className="news-item mt-4 text-sm text-navy/70 sm:text-base">
          Lançamentos, edições limitadas e avisos de fornada. Sem spam, prometido.
        </p>

        <form
          onSubmit={onSubmit}
          className="news-item mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Seu e-mail
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="seu@email.com"
            className="flex-1 rounded-full border border-navy/20 bg-white/80 px-5 py-3 text-base outline-none placeholder:text-navy/40 focus:border-navy sm:text-sm"
          />
          <button
            type="submit"
            className="rounded-full bg-navy px-6 py-3 text-xs font-semibold tracking-[0.2em] text-cream uppercase transition-colors hover:bg-rose hover:text-navy"
          >
            Quero receber
          </button>
        </form>

        <p
          aria-live="polite"
          className="news-item mt-4 h-5 text-sm text-navy/70"
        >
          {sent ? "Pronto! Você está na lista." : ""}
        </p>
      </div>
    </section>
  );
}
