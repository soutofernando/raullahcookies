"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { MenuCategory, MenuProduct } from "@/lib/cardapio";
import OutboundLink from "@/components/landing/OutboundLink";
import Rise from "@/components/landing/Rise";

const pageSize = 12;

type SortId = "featured" | "price-asc" | "price-desc" | "name";
type PriceId = "all" | "low" | "mid" | "high";

const sortOptions = [
  { value: "featured", label: "Destaques" },
  { value: "price-asc", label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
  { value: "name", label: "Nome" },
];

const priceOptions = [
  { value: "all", label: "Todos" },
  { value: "low", label: "Até R$ 15" },
  { value: "mid", label: "R$ 15 a R$ 40" },
  { value: "high", label: "Acima de R$ 40" },
];

function tabLabel(name: string) {
  const cut = name.split(/\s*(?:\/|–|-|aprox)/i)[0].trim();
  return cut.length > 16 ? `${cut.slice(0, 15)}…` : cut;
}

function pageList(current: number, total: number) {
  const wanted = new Set([1, total, current - 1, current, current + 1]);
  return [...wanted].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);
}

function matchesPrice(amount: number, price: PriceId) {
  if (price === "low") return amount > 0 && amount <= 15;
  if (price === "mid") return amount > 15 && amount <= 40;
  if (price === "high") return amount > 40;
  return true;
}

function sortProducts(items: MenuProduct[], sort: SortId) {
  const next = [...items];
  if (sort === "price-asc") next.sort((a, b) => a.amount - b.amount);
  else if (sort === "price-desc") next.sort((a, b) => b.amount - a.amount);
  else if (sort === "name") next.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  else next.sort((a, b) => Number(Boolean(b.badge)) - Number(Boolean(a.badge)));
  return next;
}

export default function MenuBrowser({ categories }: { categories: MenuCategory[] }) {
  const [categoryId, setCategoryId] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortId>("featured");
  const [price, setPrice] = useState<PriceId>("all");
  const [page, setPage] = useState(1);

  const active = categories.find((category) => category.id === categoryId) ?? null;
  const cover =
    active?.image ||
    categories.find((category) => category.image)?.image ||
    "";

  const products = useMemo(() => {
    const source = active ? [active] : categories;
    const term = query.trim().toLocaleLowerCase("pt-BR");
    const filtered = source
      .flatMap((category) => category.products)
      .filter((product) => matchesPrice(product.amount, price))
      .filter((product) => {
        if (!term) return true;
        return (
          product.name.toLocaleLowerCase("pt-BR").includes(term) ||
          product.description.toLocaleLowerCase("pt-BR").includes(term)
        );
      });
    return sortProducts(filtered, sort);
  }, [active, categories, price, query, sort]);

  const pageCount = Math.max(1, Math.ceil(products.length / pageSize));
  const current = Math.min(page, pageCount);
  const visible = products.slice((current - 1) * pageSize, current * pageSize);
  const pages = pageList(current, pageCount);

  const resetPage = () => setPage(1);

  const chooseCategory = (id: string) => {
    setCategoryId(id);
    resetPage();
  };

  const goTo = (next: number) => {
    setPage(next);
    document.getElementById("cardapio-lista")?.scrollIntoView({ block: "start" });
  };

  return (
    <div id="cardapio-lista" className="scroll-mt-24 mt-8">
      <div className="relative h-56 overflow-hidden rounded-[1.75rem] sm:h-72">
        {cover ? (
          // Capa da categoria cadastrada no cardápio.
          // eslint-disable-next-line @next/next/no-img-element
          <img key={cover} src={cover} alt="" className="menu-fade h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-navy" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex gap-1 overflow-x-auto px-3 pb-4 [scrollbar-width:none] sm:px-5 [&::-webkit-scrollbar]:hidden">
          <CategoryTab
            active={categoryId === "all"}
            count={categories.reduce((sum, category) => sum + category.products.length, 0)}
            label="Tudo"
            onClick={() => chooseCategory("all")}
          />
          {categories.map((category) => (
            <CategoryTab
              key={category.id}
              active={category.id === categoryId}
              count={category.products.length}
              label={tabLabel(category.name)}
              title={category.name}
              onClick={() => chooseCategory(category.id)}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-[1.75rem] bg-white px-4 py-5 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Buscar produto</span>
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                resetPage();
              }}
              placeholder="Buscar produto"
              className="w-full rounded-full border border-navy/10 bg-cream/40 py-2.5 pr-10 pl-4 text-sm outline-none placeholder:text-navy/40 focus:border-navy/30"
            />
            <SearchIcon />
          </label>
          <div className="flex flex-wrap gap-2">
            <MenuSelect
              label="Categoria"
              value={categoryId}
              options={[
                { value: "all", label: "Todas" },
                ...categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                })),
              ]}
              onChange={chooseCategory}
            />
            <MenuSelect
              label="Preço"
              value={price}
              options={priceOptions}
              onChange={(value) => {
                setPrice(value as PriceId);
                resetPage();
              }}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-navy/70">
          <p>
            {products.length} {products.length === 1 ? "produto" : "produtos"}
          </p>
          <MenuSelect
            label="Ordenar"
            value={sort}
            options={sortOptions}
            onChange={(value) => {
              setSort(value as SortId);
              resetPage();
            }}
          />
        </div>

        {visible.length === 0 ? (
          <p className="py-16 text-center text-sm text-navy/60">
            Nenhum produto com esses filtros.
          </p>
        ) : (
          <ul
            key={`${categoryId}-${current}-${sort}-${price}-${query}`}
            className="menu-fade mt-6 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-4"
          >
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        )}

        {pageCount > 1 ? (
          <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Páginas do cardápio">
            <PageButton disabled={current === 1} onClick={() => goTo(current - 1)}>
              Anterior
            </PageButton>
            {pages.map((item, index) => {
              const previous = pages[index - 1];
              return (
                <span key={item} className="flex items-center gap-2">
                  {previous && item - previous > 1 ? (
                    <span className="px-1 text-navy/40">…</span>
                  ) : null}
                  <PageButton active={item === current} onClick={() => goTo(item)}>
                    {item}
                  </PageButton>
                </span>
              );
            })}
            <PageButton disabled={current === pageCount} onClick={() => goTo(current + 1)}>
              Próxima
            </PageButton>
          </nav>
        ) : null}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: MenuProduct }) {
  return (
    <li className="h-full">
      <Rise className="h-full">
      <OutboundLink
        href={product.href}
        content={`produto-${product.id}`}
        event="AddToCart"
        className="group flex h-full flex-col"
      >
        <div className="aspect-square overflow-hidden rounded-2xl bg-cream/50">
          {/* Foto original do cadastro; o domínio muda por loja. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            width={480}
            height={480}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
        {product.badge ? (
          <p className="mt-3 text-[10px] font-semibold tracking-[0.16em] text-rose uppercase">
            {product.badge}
          </p>
        ) : (
          <p className="mt-3 text-[10px] tracking-[0.16em] uppercase" aria-hidden="true">
            &nbsp;
          </p>
        )}
        <h3 className="mt-1 text-[11px] leading-snug font-semibold tracking-[0.12em] uppercase">
          {product.name}
        </h3>
        <p className={`mt-1 text-xs ${product.compareAt ? "text-navy/40 line-through" : "invisible"}`}>
          {product.compareAt || "R$ 0,00"}
        </p>
        <p className="mt-1 text-sm text-navy/70">{product.priceLabel}</p>
        <span className="mt-auto self-start pt-3">
          <span className="inline-flex w-fit rounded-full bg-navy px-3 py-1.5 text-xs font-semibold text-cream transition-colors group-hover:bg-rose group-hover:text-navy">
            {product.soldOut ? "Ver no cardápio" : "Pedir"}
          </span>
        </span>
      </OutboundLink>
      </Rise>
    </li>
  );
}

function CategoryTab({
  label,
  title,
  count,
  active,
  onClick,
}: {
  label: string;
  title?: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={title ?? label}
      onClick={onClick}
      className={`shrink-0 px-3 py-2 text-left text-white ${
        active ? "border-b-2 border-white" : "opacity-80 hover:opacity-100"
      }`}
    >
      <span className="block text-[11px] font-semibold tracking-[0.12em] uppercase">{label}</span>
      <span className="mt-0.5 block text-[10px] text-white/80">
        {count} {count === 1 ? "item" : "itens"}
      </span>
    </button>
  );
}

function MenuSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const current = options.find((option) => option.value === value) ?? options[0];

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
    <div ref={root} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((valueOpen) => !valueOpen)}
        className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-3 py-2 text-sm text-navy"
      >
        <span className="text-navy/50">{label}</span>
        <span className="max-w-40 truncate font-medium">{current?.label}</span>
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
          className="menu-pop absolute right-0 z-30 mt-2 max-h-72 min-w-56 overflow-auto rounded-2xl border border-navy/10 bg-white p-1.5 shadow-xl"
        >
          {options.map((option) => {
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
                    selected ? "bg-navy text-cream" : "text-navy hover:bg-cream"
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

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-navy/50"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16.5 20 20" strokeLinecap="round" />
    </svg>
  );
}

function PageButton({
  children,
  onClick,
  disabled = false,
  active = false,
}: {
  children: string | number;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-current={active ? "page" : undefined}
      className={`rounded-full px-3 py-2 text-xs font-semibold disabled:opacity-40 ${
        active ? "bg-navy text-cream" : "text-navy"
      }`}
    >
      {children}
    </button>
  );
}
