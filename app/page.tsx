import SiteNavbar from "@/components/ui/SiteNavbar";
import SiteFooter from "@/components/sections/SiteFooter";
import Analytics from "@/components/landing/Analytics";
import HeroBlock from "@/components/landing/HeroBlock";
import PainBlock from "@/components/landing/PainBlock";
import SolutionBlock from "@/components/landing/SolutionBlock";
import BenefitsBlock from "@/components/landing/BenefitsBlock";
import ShowcaseBlock from "@/components/landing/ShowcaseBlock";
import TestimonialsBlock from "@/components/landing/TestimonialsBlock";
import TrustBlock from "@/components/landing/TrustBlock";
import CloseBlock from "@/components/landing/CloseBlock";
import CookieNotice from "@/components/landing/CookieNotice";
import StickyOrderBar from "@/components/landing/StickyOrderBar";
import PlaceProvider from "@/components/landing/PlaceProvider";
import { getCardapio } from "@/lib/cardapio";

export default async function Home() {
  const cardapio = await getCardapio();
  const place = cardapio?.place ?? null;
  return (
    <PlaceProvider place={place}>
      <Analytics />
      <SiteNavbar />
      <main className="pb-28 md:pb-0">
        <HeroBlock place={place} />
        <PainBlock />
        <SolutionBlock />
        <BenefitsBlock />
        <ShowcaseBlock catalog={cardapio?.catalog ?? null} place={place} />
        <TestimonialsBlock place={place} />
        <TrustBlock place={place} />
        <CloseBlock place={place} />
      </main>
      <SiteFooter />
      <div className="fixed inset-x-0 bottom-0 z-50">
        <CookieNotice />
        <StickyOrderBar />
      </div>
    </PlaceProvider>
  );
}
