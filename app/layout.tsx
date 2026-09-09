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
  title: "Raullah Cookies",
  description:
    "Landing page da Raullah Cookies — cookies artesanais, feitos em casa e sentidos no coração.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${script.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream font-sans text-navy">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
