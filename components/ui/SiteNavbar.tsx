"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brand, navLinks } from "@/lib/brand";
import { usePlace } from "@/components/landing/PlaceProvider";
import OutboundLink from "@/components/landing/OutboundLink";
import { lockScroll, scrollToSection } from "@/lib/lenis-instance";

gsap.registerPlugin(ScrollTrigger);

export default function SiteNavbar() {
  const place = usePlace();
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const hideRef = useRef<gsap.core.Tween | null>(null);
  const openRef = useRef(false);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const el = header.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const solid = gsap.to(".nav-shell", {
        backgroundColor: "rgba(15, 51, 99, 0.92)",
        borderColor: "rgba(253, 217, 217, 0.16)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.22)",
        duration: 0.45,
        paused: true,
        ease: "power2.out",
      });

      const scene = document.getElementById("cena");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const phone = window.matchMedia("(max-width: 1023px)").matches;
      let revealed = reduced || !scene || phone;
      let allowHide = false;

      if (revealed) {
        gsap.set(el, { autoAlpha: 1, yPercent: 0 });
        solid.progress(1);
      } else {
        gsap.set(el, { autoAlpha: 0, yPercent: -120 });
      }

      if (scene && !reduced && !phone) {
        ScrollTrigger.create({
          trigger: scene,
          start: "bottom bottom",
          onEnter: () => {
            revealed = true;
            gsap.to(el, {
              autoAlpha: 1,
              yPercent: 0,
              duration: 0.6,
              ease: "power3.out",
              overwrite: "auto",
            });
            solid.play();
          },
          onLeaveBack: () => {
            revealed = false;
            allowHide = false;
            gsap.to(el, {
              autoAlpha: 0,
              yPercent: -120,
              duration: 0.35,
              ease: "power2.in",
              overwrite: "auto",
            });
          },
        });
      }

      const hide = gsap.to(el, {
        yPercent: -140,
        duration: 0.4,
        paused: true,
        ease: "power2.inOut",
      });

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (!revealed || openRef.current) return;
          if (self.direction === -1) allowHide = true;
          if (!allowHide) return;
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
        className="site-header fixed inset-x-0 top-0 z-50 px-4 pt-4 invisible max-lg:visible"
      >
      <div className="nav-shell mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-transparent bg-transparent px-4 py-2.5 text-cream lg:gap-4 lg:px-6">
        <button
          type="button"
          onClick={() => go("cena")}
          className="nav-item flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
        >
          <Image
            src={assetPath("/brand/logo-badge.webp")}
            alt={brand.name}
            width={40}
            height={40}
            className="block size-9 shrink-0 rounded-full object-cover"
          />
          <span className="nav-brand-name font-script text-lg leading-none whitespace-nowrap sm:text-xl lg:text-2xl">
            {brand.name}
          </span>
        </button>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-4 lg:flex xl:gap-7">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id)}
              className="nav-item group relative shrink-0 text-[10px] font-semibold tracking-[0.16em] uppercase lg:text-xs lg:tracking-[0.2em]"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-blush transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
            </button>
          ))}
        </nav>

        <OutboundLink
          href={place.menuUrl}
          content="nav-cardapio"
          event="InitiateCheckout"
          className="nav-item hidden shrink-0 rounded-full bg-blush px-4 py-2.5 text-[10px] font-semibold tracking-[0.16em] text-navy uppercase transition-colors hover:bg-rose lg:block lg:px-5 lg:text-xs lg:tracking-[0.2em]"
        >
          Pedir agora
        </OutboundLink>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="nav-item flex size-10 shrink-0 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`block h-px w-6 bg-cream transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-cream transition-transform duration-300 ${
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
        className="fixed inset-0 z-40 hidden flex-col items-center justify-center gap-6 overflow-y-auto bg-navy px-6 py-24 text-cream lg:!hidden"
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
        <OutboundLink
          href={place.menuUrl}
          content="menu-mobile-cardapio"
          event="InitiateCheckout"
          className="mobile-link mt-4 rounded-full bg-blush px-8 py-3 text-xs font-semibold tracking-[0.25em] text-navy uppercase"
        >
          Pedir agora
        </OutboundLink>
      </div>
    </>
  );
}
