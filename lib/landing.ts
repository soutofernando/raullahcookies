import { assetPath } from "./asset-path";

/**
 * Copy da landing. Itens marcados como pendência ainda precisam
 * de confirmação da loja antes de ir ao ar (nota do iFood, horário
 * de corte, depoimentos, política de garantia, sabores mistos).
 */

export const stats = [
  { value: "+9 mil", label: "pedidos pelo site" },
  { value: "+16 mil", label: "cookies vendidos" },
  { value: "+50", label: "sabores criados" },
  { value: "quase 7 anos", label: "de história" },
] as const;

export const highlights = [
  {
    title: "Textura que conquista",
    text: "Levemente crocante por fora, macio por dentro.",
  },
  {
    title: "Sabores que surpreendem",
    text: "Combinações marcantes, receitas autorais e recheios irresistíveis.",
  },
  {
    title: "Momentos que ficam",
    text: "Um convite para desacelerar e aproveitar cada mordida.",
  },
] as const;

export const benefits = [
  {
    title: "Textura que conquista",
    text: "Casquinha delicada, interior macio e uma experiência que dá vontade de repetir.",
  },
  {
    title: "Sabores com personalidade",
    text: "Dos clássicos às combinações autorais, sempre há um novo favorito à espera.",
  },
  {
    title: "Feitos para presentear",
    text: "Caixas de 4, 6 ou 10 cookies para transformar pequenos gestos em momentos especiais.",
  },
] as const;

export const flavors = [
  {
    id: "kinder",
    name: "Kinder",
    description: "A lembrança de infância em forma de cookie.",
    price: "A partir de R$ 14,50",
    image: assetPath("/brand/cookie-chocolate.webp"),
  },
  {
    id: "ice-cookie",
    name: "Ice Cookie",
    description: "O refrescante que ninguém esperava e todo mundo repete.",
    price: "A partir de R$ 14,50",
    image: assetPath("/brand/cookie-red-velvet.webp"),
  },
  {
    id: "misso",
    name: "Missô",
    description: "O toque surpreendente que vicia.",
    price: "A partir de R$ 14,50",
    image: assetPath("/brand/cookie-red-velvet-top.webp"),
  },
  {
    id: "alpino-black",
    name: "Alpino Black",
    description: "Pra quem ama chocolate intenso.",
    price: "A partir de R$ 14,50",
    image: assetPath("/brand/cookie-chocolate.webp"),
  },
  {
    id: "dark-chocolate",
    name: "Dark Chocolate",
    description: "O clássico dos amantes de cacau.",
    price: "A partir de R$ 14,50",
    image: assetPath("/brand/cookie-chocolate.webp"),
  },
  {
    id: "belga",
    name: "Belga",
    description: "Sofisticado, cremoso, daqueles de pedir bis.",
    price: "A partir de R$ 14,50",
    image: assetPath("/brand/cookie-red-velvet.webp"),
  },
] as const;

export const boxes = [
  {
    id: "caixa-4",
    name: "Caixa com 4 cookies",
    price: "R$ 49,90",
    each: "R$ 12,48 cada",
    badge: null,
  },
  {
    id: "caixa-6",
    name: "Caixa com 6 cookies",
    price: "R$ 69,90",
    each: "R$ 11,65 cada",
    badge: "Mais pedida",
  },
  {
    id: "caixa-10",
    name: "Caixa com 10 cookies",
    price: "R$ 109,90",
    each: "R$ 10,99 cada",
    badge: "Melhor custo por cookie",
  },
] as const;

export const storeVisit = {
  title: "Hoje temos um espaço minimalista e acolhedor para te receber",
  address: "Rua João Quirino, 864, Catolé",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Raullah%20Cookies%2C%20Rua%20Jo%C3%A3o%20Quirino%2C%20864%2C%20Catol%C3%A9%2C%20Campina%20Grande",
  ingredients:
    "Usamos ingredientes de alta qualidade, manteiga extra e também de fornecedores locais (buscando valorizar o nosso), chocolates nobres e de origem belga.",
  photos: [
    {
      src: assetPath("/brand/loja-externo.webp"),
      alt: "Fachada da loja física da Raullah Cookies, com letreiro azul e rosa",
    },
    {
      src: assetPath("/brand/loja-interno.webp"),
      alt: "Interior da loja, com a vitrine de cookies e as mesas junto à janela",
    },
    {
      src: assetPath("/general/na-loja.webp"),
      alt: "Raullah no balcão da loja física",
    },
  ],
} as const;

export const cityMoments = [
  {
    src: assetPath("/general/clientes.webp"),
    alt: "Clientes com a Raullah Cookies",
  },
  {
    src: assetPath("/general/cozinhando.webp"),
    alt: "Preparo dos cookies na cozinha da Raullah",
  },
  {
    src: assetPath("/general/equipe.webp"),
    alt: "Equipe da Raullah Cookies reunida",
  },
  {
    src: assetPath("/general/eventos-1.webp"),
    alt: "Raullah Cookies em um evento na cidade",
  },
  {
    src: assetPath("/general/eventos-2.webp"),
    alt: "Participação da Raullah Cookies em evento",
  },
  {
    src: assetPath("/general/eventos-3.webp"),
    alt: "Momento da Raullah Cookies em evento da cidade",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Pedi a caixa de 6 pra dividir com as meninas do trabalho e acabou em 10 minutos. Agora é pedido fixo de sexta.",
    name: "Camila R.",
    city: "Campina Grande",
  },
  {
    quote:
      "Levei de presente pro aniversário da minha mãe. Ela ficou encantada antes mesmo de abrir a caixa.",
    name: "Juliana M.",
    city: "Campina Grande",
  },
  {
    quote:
      "Achei R$ 14,50 caro, até morder. É maior e mais gostoso que qualquer cookie que já comi por aqui.",
    name: "Larissa S.",
    city: "Campina Grande",
  },
  {
    quote: "O Ice Cookie é viciante. Pedi um, voltei pra pedir mais seis.",
    name: "Beatriz A.",
    city: "Queimadas",
  },
] as const;

export const urgencies = [
  {
    title: "Sabor da Semana",
    text: "Disponível só até domingo, ou até acabar a fornada.",
  },
  {
    title: "Corte do dia",
    text: "Pedidos feitos até 16h saem hoje. Depois disso, saem amanhã.",
  },
  {
    title: "Datas especiais",
    text: "Encomendas de caixas para Natal, aniversários e eventos têm vagas limitadas por dia.",
  },
] as const;

export const occasions = [
  {
    title: "Casamentos",
    text: "Mesa de doces, caixas para os convidados e uma apresentação à altura do dia.",
  },
  {
    title: "Festas premium",
    text: "Aniversários e celebrações em que o cookie entra como parte da festa.",
  },
  {
    title: "Corporativo",
    text: "Reuniões, kits e brindes com a mesma fornada da loja, em quantidade.",
  },
] as const;

export const faqs = [
  {
    q: "Quero delivery rápido. Como peço?",
    a: "Pelo cardápio: escolha os cookies ou a caixa e finalize. Entregamos em Campina Grande e região, ou você retira na loja. O prazo aparece antes de confirmar.",
  },
  {
    q: "Fazem encomenda para casamento, festa ou evento corporativo?",
    a: "Fazemos. Casamentos, festas premium e eventos corporativos saem sob orçamento. Chame no WhatsApp com a data, a quantidade e o tipo de evento.",
  },
  {
    q: "Qual o tamanho dos cookies?",
    a: "São no estilo americano e vão de 105g até 130g.",
  },
  {
    q: "Quanto tempo dura?",
    a: "É um cookie artesanal. Indicamos o consumo em até 5 dias, bem armazenados, como ensinamos na embalagem.",
  },
  {
    q: "Posso montar sabores diferentes?",
    a: "Pode, de acordo com o que estiver disponível e com o combo escolhido. Em eventos, a seleção é combinada no orçamento.",
  },
  {
    q: "Quais as formas de pagamento?",
    a: "Dinheiro apenas na loja. No site: Pix e cartão.",
  },
] as const;
