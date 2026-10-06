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

export const pains = [
  "Veio pequeno, seco e sem graça, e você pagou como se fosse especial.",
  "O delivery chegou frio, amassado ou com cara de dia anterior.",
  "Deu a primeira mordida e pensou: “era só isso?”",
] as const;

export const benefits = [
  {
    title: "Cookie grande de verdade",
    text: "Uma mordida que enche a boca e anima o dia.",
  },
  {
    title: "Mais de 50 sabores",
    text: "Sempre tem um clássico pra voltar e uma novidade pra descobrir.",
  },
  {
    title: "Presente pronto",
    text: "Escolha a caixa de 4, 6 ou 10 e surpreenda sem sair de casa.",
  },
  {
    title: "Retirada ou delivery",
    text: "Você escolhe o que combina com o seu dia.",
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

export const faqs = [
  {
    q: "Como faço meu pedido?",
    a: "É só clicar em “Ver o cardápio”, escolher os cookies ou a caixa e finalizar. Se preferir, também estamos no iFood.",
  },
  {
    q: "Qual o tamanho dos cookies?",
    a: "Grandes, estilo americano. O peso em gramas de cada sabor aparece no cardápio.",
  },
  {
    q: "Quanto tempo dura? Dá pra comer no dia seguinte?",
    a: "É um cookie artesanal, feito pra comer fresco. A orientação de conservação e a validade vêm com o pedido.",
  },
  {
    q: "Qual o prazo de entrega?",
    a: "Entregamos em Campina Grande e região. O prazo exato aparece antes de você finalizar o pedido.",
  },
  {
    q: "Posso montar uma caixa com sabores diferentes?",
    a: "Pode, sim. É só escolher os sabores dentro da caixa no cardápio.",
  },
  {
    q: "Tem opção de retirada na loja?",
    a: "Tem. Escolha retirada no pedido e passe no balcão. O endereço e o horário aparecem na confirmação.",
  },
  {
    q: "Quais as formas de pagamento?",
    a: "Dinheiro, cartão e Pix, direto no cardápio.",
  },
  {
    q: "Faz encomenda para eventos ou presentes em quantidade?",
    a: "Fazemos. Chame no WhatsApp e a gente monta com você.",
  },
] as const;
