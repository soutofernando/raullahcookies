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
import EventsBlock from "@/components/landing/EventsBlock";
import StoreBlock from "@/components/landing/StoreBlock";
import TestimonialsBlock from "@/components/landing/TestimonialsBlock";
import GuaranteeBlock from "@/components/landing/GuaranteeBlock";
import FaqBlock from "@/components/landing/FaqBlock";
import CloseBlock from "@/components/landing/CloseBlock";
import ReviewBlock from "@/components/landing/ReviewBlock";
import CookieNotice from "@/components/landing/CookieNotice";
import PlaceProvider from "@/components/landing/PlaceProvider";
import { getCardapio } from "@/lib/cardapio";
import { getGoogleReviews } from "@/lib/google-reviews";

export default async function Home() {
  const [cardapio, reviews] = await Promise.all([getCardapio(), getGoogleReviews()]);
  const place = cardapio?.place ?? null;
  return (
    <PlaceProvider place={place}>
      <Analytics />
      <SiteNavbar />
      <main>
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
          <EventsBlock />
          <StoreBlock />
          <TestimonialsBlock place={place} reviews={reviews} />
          <ShowcaseBlock catalog={cardapio?.catalog ?? null} place={place} />
        </Scene>
        <Scene>
          <GuaranteeBlock place={place} />
          <FaqBlock />
          <CloseBlock place={place} />
        </Scene>
        <ReviewBlock />
      </main>
      <SiteFooter />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50">
        <div className="pointer-events-auto">
          <CookieNotice />
        </div>
      </div>
    </PlaceProvider>
  );
}
