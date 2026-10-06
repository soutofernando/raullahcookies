import type { Metadata } from "next";
import { Great_Vibes, Outfit } from "next/font/google";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const script = Great_Vibes({
  variable: "--font-great-vibes",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raullah Cookies — cookie grande, macio por dentro, feito à mão",
  description:
    "Crocante por fora, macio por dentro e do tamanho que cookie de verdade tem. Mais de 50 sabores em Campina Grande. Retirada ou delivery.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${script.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-navy font-sans text-cream">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
