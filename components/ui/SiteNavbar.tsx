"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brand, navLinks, store } from "@/lib/brand";
import { lockScroll, scrollToSection } from "@/lib/lenis-instance";

gsap.registerPlugin(ScrollTrigger);

export default function SiteNavbar() {
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const hideRef = useRef<gsap.core.Tween | null>(null);
  const openRef = useRef(false);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const el = header.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        y: -24,
        opacity: 0,
        stagger: 0.07,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.2,
      });

      const solid = gsap.to(".nav-shell", {
        backgroundColor: "rgba(253, 217, 217, 0.82)",
        borderColor: "rgba(15, 51, 99, 0.12)",
        boxShadow: "0 10px 30px rgba(15, 51, 99, 0.08)",
        duration: 0.3,
        paused: true,
        ease: "power2.out",
      });

      ScrollTrigger.create({
        start: 80,
        end: "max",
        onToggle: (self) => (self.isActive ? solid.play() : solid.reverse()),
      });

      const hide = gsap.to(el, {
        yPercent: -140,
        duration: 0.4,
        paused: true,
        ease: "power2.inOut",
      });

      ScrollTrigger.create({
        start: 200,
        end: "max",
        onUpdate: (self) => {
          if (openRef.current) return;
          if (self.direction === 1) hide.play();
          else hide.reverse();
        },
      });

      hideRef.current = hide;
    }, el);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const panel = menu.current;
    if (!panel) return;
    openRef.current = open;
    lockScroll(open);

    const ctx = gsap.context(() => {
      if (open) {
        // The panel lives inside the header, so undo any hide-on-scroll offset.
        hideRef.current?.reverse();
        gsap.set(panel, { display: "flex" });
        gsap.fromTo(
          panel,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: "power3.out" },
        );
        gsap.from(".mobile-link", {
          y: 40,
          opacity: 0,
          stagger: 0.08,
          delay: 0.15,
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        gsap.to(panel, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.35,
          ease: "power3.in",
          onComplete: () => gsap.set(panel, { display: "none" }),
        });
      }
    }, panel);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      ctx.revert();
    };
  }, [open]);

  useEffect(() => () => lockScroll(false), []);

  const go = (id: string) => {
    setOpen(false);
    // Release the lock before scrolling: a stopped Lenis ignores scrollTo.
    lockScroll(false);
    requestAnimationFrame(() => scrollToSection(id));
  };

  return (
    <>
      <header
        ref={header}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 will-change-transform"
      >
      <div className="nav-shell mx-auto flex max-w-6xl items-center justify-between rounded-full border border-transparent px-4 py-2.5 backdrop-blur-md md:px-6">
        <button
          type="button"
          onClick={() => go("hero")}
          className="nav-item flex items-center gap-3"
        >
          <Image
            src={assetPath("/brand/logo-badge.webp")}
            alt={brand.name}
            width={40}
            height={40}
            className="size-9 rounded-full object-cover"
          />
          <span className="font-script text-2xl leading-none">Raullah</span>
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id)}
              className="nav-item group relative text-xs font-semibold tracking-[0.2em] uppercase"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-navy transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
            </button>
          ))}
        </nav>

        <a
          href={store.instagram}
          className="nav-item hidden rounded-full bg-navy px-5 py-2.5 text-xs font-semibold tracking-[0.2em] text-cream uppercase transition-colors hover:bg-rose hover:text-navy md:block"
        >
          Peça já
        </a>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="nav-item flex size-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`block h-px w-6 bg-navy transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-navy transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
          </button>
        </div>
      </header>

      {/* Kept outside the header: its transform would trap a fixed child. */}
      <div
        ref={menu}
        style={{ display: "none" }}
        className="fixed inset-0 z-40 hidden flex-col items-center justify-center gap-6 overflow-y-auto bg-cream px-6 py-24 md:!hidden"
      >
        {navLinks.map((link) => (
          <button
            key={link.id}
            type="button"
            onClick={() => go(link.id)}
            className="mobile-link font-script text-4xl sm:text-5xl"
          >
            {link.label}
          </button>
        ))}
        <a
          href={store.instagram}
          className="mobile-link mt-4 rounded-full bg-navy px-8 py-3 text-xs font-semibold tracking-[0.25em] text-cream uppercase"
        >
          Peça já
        </a>
      </div>
    </>
  );
}
