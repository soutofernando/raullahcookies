import SiteNavbar from "@/components/ui/SiteNavbar";
import SiteFooter from "@/components/sections/SiteFooter";
import Analytics from "@/components/landing/Analytics";
import HeroBlock from "@/components/landing/HeroBlock";
import CinematicScroll from "@/components/landing/CinematicScroll";
import FilmChapter from "@/components/landing/FilmChapter";
import Scene from "@/components/landing/Scene";
import PainBlock from "@/components/landing/PainBlock";
import SolutionBlock from "@/components/landing/SolutionBlock";
import BenefitsBlock from "@/components/landing/BenefitsBlock";
import ShowcaseBlock from "@/components/landing/ShowcaseBlock";
import FounderBlock from "@/components/landing/FounderBlock";
import TestimonialsBlock from "@/components/landing/TestimonialsBlock";
import GuaranteeBlock from "@/components/landing/GuaranteeBlock";
import FaqBlock from "@/components/landing/FaqBlock";
import UrgencyBlock from "@/components/landing/UrgencyBlock";
import CloseBlock from "@/components/landing/CloseBlock";
import ReviewBlock from "@/components/landing/ReviewBlock";
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
        <CinematicScroll>
          <FilmChapter from="down" anchor="left">
            <HeroBlock place={place} />
          </FilmChapter>
          <FilmChapter from="right" anchor="right">
            <PainBlock />
          </FilmChapter>
          <FilmChapter from="up" anchor="center">
            <BenefitsBlock />
          </FilmChapter>
          <FilmChapter from="down" anchor="center" tone="light">
            <SolutionBlock />
          </FilmChapter>
        </CinematicScroll>
        <Scene>
          <FounderBlock />
          <TestimonialsBlock place={place} />
          <ShowcaseBlock catalog={cardapio?.catalog ?? null} place={place} />
        </Scene>
        <Scene>
          <GuaranteeBlock place={place} />
          <FaqBlock />
          <UrgencyBlock place={place} />
          <CloseBlock place={place} />
        </Scene>
        <ReviewBlock />
      </main>
      <SiteFooter />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50">
        <div className="pointer-events-auto">
          <CookieNotice />
        </div>
        <StickyOrderBar />
      </div>
    </PlaceProvider>
  );
}
