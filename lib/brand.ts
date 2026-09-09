export const palette = {
  navy: "#0F3363",
  rose: "#E69493",
  blush: "#F3B6B5",
  cream: "#FDD9D9",
  white: "#FFFFFF",
} as const;

export const cookieTints = {
  dough: "#C47A54",
  redVelvet: "#8B1E3F",
  ninho: "#D4B48A",
  dulce: "#C47A3A",
  chocolate: "#3D2314",
} as const;

export const brand = {
  name: "Raullah Cookies",
  tagline: "Sweet moments start here",
  manifesto: "Feito em casa, sentido no coração",
  seal: "Homemade with love",
  marquee: "HOMEMADE WITH LOVE · SWEET MOMENTS START HERE · RAULLAH COOKIES · ",
} as const;

export const navLinks = [
  { id: "manifesto", label: "A marca" },
  { id: "menu", label: "Cardápio" },
  { id: "how-to-order", label: "Como pedir" },
  { id: "gallery", label: "A loja" },
  { id: "units", label: "Unidades" },
] as const;

// TODO: substituir pelos links e contatos reais da loja.
export const store = {
  headline: "A loja",
  phone: "(00) 00000-0000",
  email: "contato@raullahcookies.com",
  hours: "Terça a domingo · 12h às 20h",
  instagram: "https://instagram.com/",
  ifood: "https://www.ifood.com.br/",
  whatsapp: "https://wa.me/",
  menuUrl: "https://wa.me/",
};

export const units = [
  {
    id: "matriz",
    city: "Matriz",
    address: "Rua Exemplo, 123 — Centro",
    hours: ["Terça a sexta · 12h às 20h", "Sábado e domingo · 12h às 22h"],
  },
  {
    id: "quiosque",
    city: "Quiosque",
    address: "Shopping Exemplo, Piso L1",
    hours: ["Todos os dias · 11h às 22h"],
  },
] as const;

export const deliveryPlatforms = [
  { id: "ifood", label: "iFood", href: store.ifood },
  { id: "whatsapp", label: "WhatsApp", href: store.whatsapp },
  { id: "instagram", label: "Instagram", href: store.instagram },
] as const;

export const orderSteps = [
  {
    step: "1",
    title: "Escolha seus cookies",
    description:
      "Monte a caixa pelo cardápio ou chame no WhatsApp para combinar os sabores do dia.",
  },
  {
    step: "2",
    title: "Combine a retirada",
    description:
      "Caixas grandes e encomendas para festas saem sob agendamento — quanto antes, melhor.",
  },
  {
    step: "3",
    title: "Receba fresquinho",
    description:
      "Retire na loja ou peça entrega pelo iFood. Sai do forno para a sua mesa.",
  },
] as const;

// TODO: confirmar pesos e precos com a loja antes de publicar.
export const menu = {
  note: "Os valores podem variar no delivery conforme as taxas de cada aplicativo.",
  categories: [
    {
      id: "cookies",
      label: "Cookies",
      items: [
        {
          name: "Red Velvet",
          weight: "110g",
          price: "R$ 18,50",
          description:
            "Massa aveludada de cacau, chocolate branco e recheio cremoso de ninho.",
          badge: "Mais pedido",
        },
        {
          name: "Ninho + Oreo",
          weight: "120g",
          price: "R$ 21,50",
          description:
            "Massa de baunilha com leite ninho, pedaços de Oreo e recheio que escorre.",
        },
        {
          name: "Doce de leite e flor de sal",
          weight: "120g",
          price: "R$ 19,50",
          description:
            "Recheio de doce de leite, gotas de chocolate branco e finalização com flor de sal.",
        },
        {
          name: "Chocolate belga",
          weight: "120g",
          price: "R$ 25,90",
          description:
            "Massa de cacau intenso com chocolate ao leite e meio amargo derretendo.",
        },
        {
          name: "Lotus",
          weight: "120g",
          price: "R$ 24,50",
          description: "Massa de baunilha, creme de biscoito Lotus e chocolate branco.",
          badge: "Novidade",
        },
        {
          name: "Pistache",
          weight: "110g",
          price: "R$ 23,50",
          description:
            "Ganache de pistache com pistaches triturados e um toque de chocolate branco.",
        },
      ],
    },
    {
      id: "cold-drinks",
      label: "Bebidas geladas",
      items: [
        {
          name: "Ice pistache",
          weight: "480ml",
          price: "R$ 28,50",
          description: "Leite gelado, creme de pistache, sorvete de baunilha e chantilly.",
        },
        {
          name: "Lotus shake",
          weight: "480ml",
          price: "R$ 27,00",
          description: "Sorvete de baunilha, leite gelado e biscoito Lotus triturado.",
        },
        {
          name: "Strawberry lips",
          weight: "480ml",
          price: "R$ 25,00",
          description: "Morangos congelados, sorvete de baunilha e leite condensado.",
        },
        {
          name: "Cappuccino gelado",
          weight: "480ml",
          price: "R$ 26,00",
          description: "Sorvete de baunilha, cappuccino, caramelo e chantilly.",
        },
      ],
    },
    {
      id: "hot-drinks",
      label: "Bebidas quentes",
      items: [
        {
          name: "Café expresso",
          weight: "45ml",
          price: "R$ 5,00",
          description: "Curto, encorpado e na medida para acompanhar o cookie.",
        },
        {
          name: "Café com leite",
          weight: "200ml",
          price: "R$ 10,00",
          description: "Clássico cremoso, feito na hora.",
        },
        {
          name: "Cappuccino",
          weight: "240ml",
          price: "R$ 17,00",
          description: "Espuma aveludada com canela por cima.",
        },
        {
          name: "Hot chocolate",
          weight: "240ml",
          price: "R$ 17,00",
          description: "Chocolate quente encorpado, feito com chocolate nobre.",
        },
      ],
    },
  ],
} as const;

export const footerNav = [
  {
    title: "Navegar",
    links: [
      { label: "A marca", id: "manifesto" },
      { label: "Sabores", id: "flavors" },
      { label: "Cardápio", id: "menu" },
      { label: "Como pedir", id: "how-to-order" },
    ],
  },
  {
    title: "Visitar",
    links: [
      { label: "A loja", id: "gallery" },
      { label: "Identidade", id: "identity" },
      { label: "Unidades", id: "units" },
      { label: "Newsletter", id: "newsletter" },
    ],
  },
] as const;

export const flavors = [
  {
    id: "red-velvet",
    name: "Red Velvet",
    description: "Massa aveludada, recheio cremoso e pedaços de chocolate branco.",
    image: "/brand/cookie-red-velvet.webp",
    tint: cookieTints.redVelvet,
  },
  {
    id: "ninho-oreo",
    name: "Ninho + Oreo",
    description: "Cookie denso com leite ninho e crocância de Oreo.",
    image: "/brand/cookie-red-velvet-top.webp",
    tint: cookieTints.ninho,
  },
  {
    id: "dulce",
    name: "Doce de leite",
    description: "Miolo que escorre, borda crocante e toque de sal.",
    image: "/brand/cookie-chocolate.webp",
    tint: cookieTints.dulce,
  },
  {
    id: "belgian",
    name: "Chocolate belga",
    description: "Cacau intenso, gotas derretidas e cobertura de chocolate ao leite.",
    image: "/brand/cookie-chocolate.webp",
    tint: cookieTints.chocolate,
  },
] as const;

export const gallery = [
  {
    src: "/brand/store-counter.webp",
    alt: "Balcão rosa da loja Raullah Cookies",
    caption: "Balcão",
  },
  {
    src: "/brand/ribbon-wall.webp",
    alt: "Parede de laços da Raullah Cookies",
    caption: "Sweet moments",
  },
  {
    src: "/brand/store-lounge.webp",
    alt: "Lounge azul da loja Raullah Cookies",
    caption: "Lounge",
  },
] as const;

export const swatches = [
  { name: "Navy", hex: palette.navy },
  { name: "Rose", hex: palette.rose },
  { name: "Blush", hex: palette.blush },
  { name: "Cream", hex: palette.cream },
  { name: "White", hex: palette.white },
] as const;
