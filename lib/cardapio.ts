import { assetPath } from "./asset-path";

const PRODUCTION_API = "https://integracao.cardapioweb.com";

const fallbackImages = [
  "/brand/cookie-chocolate.webp",
  "/brand/cookie-red-velvet.webp",
  "/brand/cookie-red-velvet-top.webp",
] as const;

type CatalogImage = {
  image_url?: string | null;
  thumbnail_url?: string | null;
} | null;

type CatalogItem = {
  id: number;
  name?: string | null;
  description?: string | null;
  price?: number | null;
  promotional_price_active?: boolean | null;
  promotional_price?: number | null;
  status?: string | null;
  kind?: string | null;
  badge?: string | null;
  image?: CatalogImage;
  active_stock_control?: boolean | null;
  stock?: number | null;
  option_groups?: {
    status?: string | null;
    options?: { status?: string | null; price?: number | null }[] | null;
  }[] | null;
};

type CatalogCategory = {
  id: number;
  name?: string | null;
  status?: string | null;
  image?: CatalogImage;
  items?: CatalogItem[] | null;
};

type CatalogResponse = {
  categories?: CatalogCategory[] | null;
};

export type MenuProduct = {
  id: string;
  name: string;
  description: string;
  priceLabel: string;
  compareAt: string | null;
  image: string;
  href: string;
  amount: number;
  soldOut: boolean;
  kind: "regular" | "combo";
  badge: string | null;
};

export type PaymentKind = "money" | "card" | "pix";

export type PublicPlace = {
  menuUrl: string;
  whatsappUrl: string;
  instagramUrl: string;
  city: string;
  addressLine: string;
  hoursLine: string;
  serviceLine: string;
  paymentLine: string;
  payments: PaymentKind[];
  openLabel: string | null;
};

export type CardapioSnapshot = {
  place: PublicPlace;
  catalog: MenuCatalog | null;
};

export type MenuCategory = {
  id: string;
  name: string;
  image: string | null;
  products: MenuProduct[];
};

export type MenuCatalog = {
  categories: MenuCategory[];
  priceFrom: string | null;
};

function brl(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function isActive(status: string | null | undefined) {
  return (status ?? "ACTIVE").toUpperCase() === "ACTIVE";
}

const badgeNames: Record<string, string> = {
  BEST_SELLER: "Mais pedido",
  NEW: "Novidade",
  NEW_ITEM: "Novidade",
  "NEW ITEM": "Novidade",
  LIMITED_EDITION: "Edição limitada",
  "LIMITED EDITION": "Edição limitada",
  VEGETARIAN: "Vegetariano",
  VEGAN: "Vegano",
  SPICY: "Picante",
  COLD: "Gelado",
  ALCOHOLIC: "Alcoólico",
  GLUTEN_FREE: "Sem glúten",
  LACTOSE_FREE: "Sem lactose",
  SUGAR_FREE: "Sem açúcar",
};

function badgeLabel(raw: string | null | undefined) {
  const value = raw?.trim();
  if (!value) return null;
  return badgeNames[value.toUpperCase()] ?? value.replaceAll("_", " ");
}

function cleanDescription(name: string, raw: string) {
  const text = raw.trim();
  if (text.toLowerCase().startsWith(name.toLowerCase())) {
    return text.slice(name.length).replace(/^[\s:–-]+/, "").trim();
  }
  return text;
}

function authHeaders(): Record<string, string> | null {
  const token = process.env.CARDAPIO_WEB_TOKEN?.trim();
  if (!token) return null;

  const mode = process.env.CARDAPIO_WEB_AUTH?.trim().toLowerCase();
  if (mode === "bearer") {
    return {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };
  }

  const headers: Record<string, string> = {
    "X-API-KEY": token,
    Accept: "application/json",
  };
  const partner = process.env.CARDAPIO_WEB_PARTNER_KEY?.trim();
  if (partner) headers["X-PARTNER-KEY"] = partner;
  return headers;
}

function priceOf(item: CatalogItem) {
  const base = Number(item.price ?? 0);
  const onSale =
    item.promotional_price_active && item.promotional_price != null;
  const current = onSale ? Number(item.promotional_price) : base;
  const optionPrices = (item.option_groups ?? [])
    .filter((group) => isActive(group.status))
    .flatMap((group) => group.options ?? [])
    .filter((option) => isActive(option.status))
    .map((option) => Number(option.price ?? 0))
    .filter((price) => price > 0);
  const startsAt = optionPrices.length > 0;
  const amount = startsAt ? current + Math.min(...optionPrices) : current;

  return {
    label: `${startsAt ? "A partir de " : ""}${brl(amount)}`,
    compareAt: onSale && !startsAt ? brl(base) : null,
    amount,
  };
}

function toCatalog(payload: CatalogResponse, menuUrl: string): MenuCatalog | null {
  let imageIndex = 0;
  const prices: number[] = [];

  const categories = (payload.categories ?? [])
    .filter((category) => isActive(category.status))
    .map((category) => {
      const products = (category.items ?? [])
        .filter((item) => isActive(item.status) && item.name)
        .map((item) => {
          const price = priceOf(item);
          if (price.amount > 0) prices.push(price.amount);
          const remote = item.image?.image_url || item.image?.thumbnail_url || "";
          const image = remote.startsWith("https://")
            ? remote
            : assetPath(fallbackImages[imageIndex++ % fallbackImages.length]);
          const soldOut = Boolean(
            item.active_stock_control && Number(item.stock ?? 0) <= 0,
          );

          return {
            id: String(item.id),
            name: item.name!.trim(),
            description: cleanDescription(item.name!.trim(), item.description ?? ""),
            priceLabel: soldOut ? "Esgotado" : price.label,
            compareAt: soldOut ? null : price.compareAt,
            image,
            href: productHref(menuUrl, item.id),
            amount: price.amount,
            soldOut,
            kind: item.kind === "combo" ? "combo" : "regular",
            badge: badgeLabel(item.badge),
          } satisfies MenuProduct;
        });

      const cover =
        category.image?.image_url ||
        category.image?.thumbnail_url ||
        products.find((product) => product.image.startsWith("https://"))?.image ||
        null;

      return {
        id: String(category.id),
        name: (category.name ?? "Cardápio").trim(),
        image: cover,
        products,
      } satisfies MenuCategory;
    })
    .filter((category) => category.products.length > 0);

  if (categories.length === 0) return null;

  return {
    categories,
    priceFrom: prices.length > 0 ? brl(Math.min(...prices)) : null,
  };
}

type Merchant = {
  name?: string | null;
  slug?: string | null;
  instagram?: string | null;
  whatsapp?: string | null;
  custom_domain?: string | null;
  operation_modes?: {
    delivery?: boolean;
    takeout?: boolean;
  } | null;
  address?: {
    street?: string | null;
    number?: string | null;
    neighborhood?: string | null;
    city?: string | null;
    state?: string | null;
  } | null;
  opening_hours?: OpeningHours | null;
  payment_methods?: {
    payment_method?: string | null;
    active?: boolean | null;
    available_on_menu?: boolean | null;
  }[] | null;
};

type OpeningHours = {
  monday?: string[][] | null;
  tuesday?: string[][] | null;
  wednesday?: string[][] | null;
  thursday?: string[][] | null;
  friday?: string[][] | null;
  saturday?: string[][] | null;
  sunday?: string[][] | null;
  custom_dates?: Record<string, { intervals?: string[][] | null }> | null;
  temporary_state?: string | null;
  temporary_state_end_at?: string | null;
  timezone?: string | null;
};

const week = [
  ["monday", "Segunda"],
  ["tuesday", "Terça"],
  ["wednesday", "Quarta"],
  ["thursday", "Quinta"],
  ["friday", "Sexta"],
  ["saturday", "Sábado"],
  ["sunday", "Domingo"],
] as const;

function productHref(menuUrl: string, id: number) {
  const url = new URL(menuUrl);
  url.searchParams.set("id", String(id));
  url.hash = "produto";
  return url.toString();
}

function menuOrigin(merchant: Merchant) {
  const slug = merchant.slug?.trim();
  const domain = merchant.custom_domain?.trim();
  if (domain && slug) {
    const host = domain.replace(/^https?:\/\//i, "").replace(/\/+$/, "");
    return `https://${host}/${slug}`;
  }
  if (domain) {
    const withProtocol = /^https?:\/\//i.test(domain) ? domain : `https://${domain}`;
    return withProtocol.replace(/\/+$/, "");
  }
  if (slug) return `https://app.cardapioweb.com/${slug}`;
  return "https://app.cardapioweb.com/";
}

function whatsappUrl(raw: string | null | undefined) {
  const digits = (raw ?? "").replace(/\D/g, "");
  if (!digits) return "";
  const withCountry = digits.length <= 11 ? `55${digits}` : digits;
  return `https://wa.me/${withCountry}`;
}

function instagramUrl(raw: string | null | undefined) {
  const value = raw?.trim() ?? "";
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `https://instagram.com/${value.replace(/^@/, "")}`;
}

function clock(value: string) {
  const [hour, minute] = value.split(":");
  if (!hour) return value;
  return minute && minute !== "00" ? `${Number(hour)}h${minute}` : `${Number(hour)}h`;
}

function slotsLabel(slots: string[][]) {
  if (slots.length === 0) return "fechada";
  return slots
    .filter((slot) => slot.length >= 2)
    .map(([start, end]) => `${clock(start)} às ${clock(end)}`)
    .join(" e ");
}

function hoursLine(hours: OpeningHours | null | undefined) {
  if (!hours) return "";
  const groups: { start: string; end: string; label: string }[] = [];
  for (const [key, name] of week) {
    const label = slotsLabel(hours[key] ?? []);
    const last = groups.at(-1);
    if (last && last.label === label) last.end = name;
    else groups.push({ start: name, end: name, label });
  }
  return groups
    .map((group) =>
      group.start === group.end
        ? `${group.start}, ${group.label}`
        : `${group.start} a ${group.end.toLowerCase()}, ${group.label}`,
    )
    .join(" · ");
}

function zonedParts(timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  const weekday = get("weekday").toLowerCase();
  return {
    weekday,
    date: `${get("year")}-${get("month")}-${get("day")}`,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

function openLabel(hours: OpeningHours | null | undefined) {
  if (!hours) return null;
  if (
    hours.temporary_state === "closed" &&
    (!hours.temporary_state_end_at ||
      new Date(hours.temporary_state_end_at).getTime() > Date.now())
  ) {
    return "Fechada no momento";
  }

  const zone = hours.timezone || "America/Sao_Paulo";
  const now = zonedParts(zone);
  const custom = hours.custom_dates?.[now.date]?.intervals;
  const key = week.find(([day]) => day === now.weekday)?.[0];
  const slots = (custom ?? (key ? hours[key] : []) ?? []).filter(
    (slot) => slot.length >= 2,
  );
  if (slots.length === 0) return "Fechada hoje";

  const toMinutes = (value: string) => {
    const [hour, minute] = value.split(":");
    return Number(hour) * 60 + Number(minute);
  };
  const current = slots.find((slot) => {
    const start = toMinutes(slot[0]);
    const end = toMinutes(slot[1]);
    return now.minutes >= start && now.minutes < end;
  });
  if (current) return `Aberta até ${clock(current[1])}`;
  const next = slots.find((slot) => toMinutes(slot[0]) > now.minutes);
  if (next) return `Abre hoje às ${clock(next[0])}`;
  return "Fechada hoje";
}

const paymentLabels: Record<PaymentKind, string> = {
  money: "dinheiro",
  card: "cartão",
  pix: "Pix",
};

function paymentKinds(merchant: Merchant): PaymentKind[] {
  const map: Record<string, PaymentKind> = {
    money: "money",
    pix: "pix",
    pix_auto: "pix",
    credit_card: "card",
    debit_card: "card",
    online_credit_card: "card",
  };
  const found = new Set<PaymentKind>();
  for (const method of merchant.payment_methods ?? []) {
    if (!method.active || !method.available_on_menu) continue;
    const kind = map[method.payment_method ?? ""];
    if (kind) found.add(kind);
  }
  return (["money", "card", "pix"] as const).filter((kind) => found.has(kind));
}

function paymentLine(kinds: PaymentKind[]) {
  const names = kinds.map((kind) => paymentLabels[kind]);
  if (names.length === 0) return "Pagamento no cardápio";
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(", ")} e ${names.at(-1)}`;
}

function serviceLine(merchant: Merchant) {
  const delivery = merchant.operation_modes?.delivery;
  const takeout = merchant.operation_modes?.takeout;
  if (delivery && takeout) return "Retirada na loja ou delivery";
  if (delivery) return "Delivery";
  if (takeout) return "Retirada na loja";
  return "Peça pelo cardápio";
}

function addressLine(merchant: Merchant) {
  const address = merchant.address;
  if (!address) return "";
  const street = [address.street, address.number].filter(Boolean).join(", ");
  const area = [address.neighborhood, address.city].filter(Boolean).join(", ");
  return [street, area].filter(Boolean).join(" · ");
}

function toPlace(merchant: Merchant): PublicPlace {
  const payments = paymentKinds(merchant);
  return {
    menuUrl: menuOrigin(merchant),
    whatsappUrl: whatsappUrl(merchant.whatsapp),
    instagramUrl: instagramUrl(merchant.instagram),
    city: merchant.address?.city?.trim() || "Campina Grande",
    addressLine: addressLine(merchant),
    hoursLine: hoursLine(merchant.opening_hours),
    serviceLine: serviceLine(merchant),
    payments,
    paymentLine: paymentLine(payments),
    openLabel: openLabel(merchant.opening_hours),
  };
}

async function cardapioGet<T>(path: string): Promise<T | null> {
  const headers = authHeaders();
  if (!headers) return null;

  const base = process.env.CARDAPIO_WEB_API_BASE?.trim() || PRODUCTION_API;
  const exporting = process.env.GITHUB_PAGES === "true";

  try {
    const response = await fetch(`${base}${path}`, {
      headers,
      ...(exporting
        ? { cache: "force-cache" as const }
        : { next: { revalidate: 120 } }),
    });
    if (!response.ok) {
      console.error(`Cardápio Web ${path} respondeu ${response.status}.`);
      return null;
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error(`Cardápio Web: falha em ${path}.`, error);
    return null;
  }
}

export async function getCardapio(): Promise<CardapioSnapshot | null> {
  const headers = authHeaders();
  if (!headers) return null;

  const [merchant, catalog] = await Promise.all([
    cardapioGet<Merchant>("/api/partner/v1/merchant"),
    cardapioGet<CatalogResponse>("/api/partner/v1/catalog"),
  ]);

  if (!merchant) return null;
  const place = toPlace(merchant);
  return {
    place,
    catalog: catalog ? toCatalog(catalog, place.menuUrl) : null,
  };
}
