"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent, type MouseEvent as ReactMouseEvent } from "react";
import type { MenuCategory, MenuProduct } from "@/lib/cardapio";
import OutboundLink from "@/components/landing/OutboundLink";

type SortId = "featured" | "price-asc" | "price-desc" | "name";

const sortOptions: { value: SortId; label: string }[] = [
  { value: "featured", label: "Destaques" },
  { value: "price-asc", label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
  { value: "name", label: "Nome" },
];

function shortLabel(name: string) {
  const cut = name.split(/\s*(?:\/|–|-|aprox)/i)[0].trim();
  return cut.length > 22 ? `${cut.slice(0, 21)}…` : cut;
}

function useHorizontalRail<T extends HTMLElement>(active = true) {
  const ref = useRef<T>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);
  const drag = useRef({ on: false, x: 0, left: 0, moved: false });

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(max <= 4 || el.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;
    sync();
    const onWheel = (event: WheelEvent) => {
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 4) return;
      const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      const delta = horizontal ? event.deltaX : event.deltaY;
      if (!delta) return;
      const atEdge = (delta < 0 && el.scrollLeft <= 0) || (delta > 0 && el.scrollLeft >= max - 1);
      if (atEdge && !horizontal) return;
      event.preventDefault();
      el.scrollLeft += delta;
    };
    el.addEventListener("scroll", sync, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", sync);
    };
  }, [active, sync]);

  const nudge = (direction: -1 | 1) => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: direction * Math.max(200, Math.round(el.clientWidth * 0.72)),
      behavior: reduced ? "auto" : "smooth",
    });
  };

  const pointerProps = {
    onPointerDown(event: ReactPointerEvent<T>) {
      if (event.button !== 0) return;
      const el = ref.current;
      if (!el || el.scrollWidth <= el.clientWidth + 4) return;
      drag.current = { on: true, x: event.clientX, left: el.scrollLeft, moved: false };
      el.setPointerCapture(event.pointerId);
    },
    onPointerMove(event: ReactPointerEvent<T>) {
      const el = ref.current;
      if (!drag.current.on || !el) return;
      const dx = event.clientX - drag.current.x;
      if (Math.abs(dx) > 6) drag.current.moved = true;
      el.scrollLeft = drag.current.left - dx;
    },
    onPointerUp() {
      drag.current.on = false;
    },
    onPointerCancel() {
      drag.current.on = false;
    },
    onClickCapture(event: ReactMouseEvent) {
      if (!drag.current.moved) return;
      event.preventDefault();
      event.stopPropagation();
      drag.current.moved = false;
    },
  };

  return { ref, atStart, atEnd, nudge, pointerProps, sync };
}

function sortProducts(items: MenuProduct[], sort: SortId) {
  const next = [...items];
  if (sort === "price-asc") next.sort((a, b) => a.amount - b.amount);
  else if (sort === "price-desc") next.sort((a, b) => b.amount - a.amount);
  else if (sort === "name") next.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  else {
    const rank = (badge: string | null) => {
      if (badge === "Mais pedido") return 0;
      if (badge === "Novidade") return 1;
      if (badge === "Edição limitada") return 2;
      return 3;
    };
    next.sort((a, b) => rank(a.badge) - rank(b.badge));
  }
  return next;
}

export default function ProductRail({ categories }: { categories: MenuCategory[] }) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("featured");

  const products = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("pt-BR");
    const source =
      filter.startsWith("cat:")
        ? categories.filter((category) => category.id === filter.slice(4))
        : categories;
    const filtered = source
      .flatMap((category) => category.products)
      .filter((product) => {
        if (filter === "best") return product.badge === "Mais pedido";
        if (filter === "new") return product.badge === "Novidade" || product.badge === "Edição limitada";
        return true;
      })
      .filter((product) => {
        if (!term) return true;
        const haystack = `${product.name} ${product.description}`.toLocaleLowerCase("pt-BR");
        return haystack.includes(term);
      });
    const seen = new Set<string>();
    const unique = filtered.filter((product) => {
      if (seen.has(product.id)) return false;
      seen.add(product.id);
      return true;
    });
    return sortProducts(unique, sort);
  }, [categories, filter, query, sort]);

  const chipsRail = useHorizontalRail<HTMLDivElement>(true);
  const productsRail = useHorizontalRail<HTMLUListElement>(products.length > 0);

  useEffect(() => {
    const el = productsRail.ref.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    productsRail.sync();
  }, [products, productsRail.ref, productsRail.sync]);

  const chips = [
    { id: "all", label: "Tudo" },
    { id: "best", label: "Mais pedidos" },
    { id: "new", label: "Novidades" },
    ...categories.map((category) => ({
      id: `cat:${category.id}`,
      label: shortLabel(category.name),
    })),
  ];

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Buscar produto</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar sabor"
            className="w-full rounded-full border border-navy/10 bg-white py-2.5 pr-4 pl-4 text-sm outline-none placeholder:text-navy/40 focus:border-navy/30"
          />
        </label>
        <SortMenu value={sort} onChange={setSort} />
      </div>

      <div className="relative mt-3">
        <div
          ref={chipsRail.ref}
          data-lenis-prevent-wheel=""
          className="rail flex cursor-grab gap-2 overflow-x-auto pb-1 active:cursor-grabbing"
          {...chipsRail.pointerProps}
        >
          {chips.map((chip) => {
            const active = chip.id === filter;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setFilter(chip.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-colors ${
                  active ? "bg-navy text-cream" : "bg-white text-navy hover:bg-white/70"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
        <RailArrow
          direction="left"
          label="Categorias anteriores"
          hidden={chipsRail.atStart}
          onClick={() => chipsRail.nudge(-1)}
          className="left-0"
        />
        <RailArrow
          direction="right"
          label="Próximas categorias"
          hidden={chipsRail.atEnd}
          onClick={() => chipsRail.nudge(1)}
          className="right-0"
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-sm text-navy/60">
          {products.length} {products.length === 1 ? "produto" : "produtos"} · deslize para ver mais
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            aria-label="Produtos anteriores"
            disabled={productsRail.atStart}
            onClick={() => productsRail.nudge(-1)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:bg-navy hover:text-cream disabled:pointer-events-none disabled:opacity-30"
          >
            <Arrow direction="left" />
          </button>
          <button
            type="button"
            aria-label="Próximos produtos"
            disabled={productsRail.atEnd || products.length === 0}
            onClick={() => productsRail.nudge(1)}
            className="inline-flex size-10 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors hover:bg-navy hover:text-cream disabled:pointer-events-none disabled:opacity-30"
          >
            <Arrow direction="right" />
          </button>
        </div>
      </div>

      {products.length === 0 ? (
        <p className="mt-6 rounded-[1.5rem] bg-white px-5 py-10 text-center text-sm text-navy/60">
          Nenhum produto com esse filtro.
        </p>
      ) : (
        <ul
          ref={productsRail.ref}
          data-lenis-prevent-wheel=""
          className="rail mt-4 flex cursor-grab snap-x snap-proximity gap-3 overflow-x-auto pb-2 active:cursor-grabbing sm:gap-4"
          {...productsRail.pointerProps}
        >
          {products.map((product) => (
            <li key={product.id} className="w-[78%] shrink-0 snap-start sm:w-60">
              <OutboundLink
                href={product.href}
                content={`teaser-${product.id}`}
                event="AddToCart"
                className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] bg-white"
              >
                {/* Foto do cardápio; o domínio muda por loja. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  draggable={false}
                  width={480}
                  height={480}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full object-cover"
                />
                <div className="flex flex-1 flex-col px-4 py-3.5">
                  <p className="min-h-4 text-[10px] font-semibold tracking-[0.16em] text-rose uppercase">
                    {product.badge ?? ""}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-base leading-snug font-semibold">{product.name}</h3>
                  <p className="mt-2 text-sm font-semibold">{product.priceLabel}</p>
                  <span className="mt-3 inline-flex w-fit rounded-full bg-navy px-4 py-2 text-xs font-semibold text-cream transition-colors group-hover:bg-rose group-hover:text-navy">
                    {product.soldOut ? "Ver" : "Pedir"}
                  </span>
                </div>
              </OutboundLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SortMenu({ value, onChange }: { value: SortId; onChange: (value: SortId) => void }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const current = sortOptions.find((option) => option.value === value) ?? sortOptions[0];

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className={`relative shrink-0 ${open ? "z-30" : ""}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Ordenar"
        onClick={() => setOpen((valueOpen) => !valueOpen)}
        className="inline-flex h-full w-full items-center justify-between gap-3 rounded-full border border-navy/10 bg-white px-4 py-2.5 text-sm text-navy transition-colors hover:border-navy/25 sm:w-auto"
      >
        <span className="font-medium">{current.label}</span>
        <svg
          viewBox="0 0 20 20"
          className={`size-4 text-navy/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-label="Ordenar"
          className="menu-pop absolute right-0 z-30 mt-2 min-w-44 overflow-hidden rounded-2xl border border-navy/10 bg-white p-1.5 shadow-[0_16px_40px_rgba(15,51,99,0.14)]"
        >
          {sortOptions.map((option) => {
            const selected = option.value === value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                    selected ? "bg-navy font-medium text-cream" : "text-navy hover:bg-cream"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function RailArrow({
  direction,
  label,
  hidden,
  onClick,
  className,
}: {
  direction: "left" | "right";
  label: string;
  hidden: boolean;
  onClick: () => void;
  className: string;
}) {
  if (hidden) return null;
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`absolute top-1/2 z-10 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-white text-navy shadow-[0_8px_20px_rgba(15,51,99,0.12)] transition-colors hover:bg-navy hover:text-cream ${className}`}
    >
      <Arrow direction={direction} />
    </button>
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 6 9 12l6 6" : "M9 6l6 6-6 6"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
