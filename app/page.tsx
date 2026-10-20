import SiteNavbar from "@/components/ui/SiteNavbar";
import SiteFooter from "@/components/sections/SiteFooter";
import Analytics from "@/components/landing/Analytics";
import HeroBlock from "@/components/landing/HeroBlock";
import CinematicScroll from "@/components/landing/CinematicScroll";
import FilmChapter from "@/components/landing/FilmChapter";
import Scene from "@/components/landing/Scene";
import SolutionBlock from "@/components/landing/SolutionBlock";
import PathsBlock from "@/components/landing/PathsBlock";
import ShowcaseBlock from "@/components/landing/ShowcaseBlock";
import EventsBlock from "@/components/landing/EventsBlock";
import TestimonialsBlock from "@/components/landing/TestimonialsBlock";
import FaqBlock from "@/components/landing/FaqBlock";
import CloseBlock from "@/components/landing/CloseBlock";
import CookieNotice from "@/components/landing/CookieNotice";
import PlaceProvider from "@/components/landing/PlaceProvider";
import { eventQuoteHref } from "@/lib/brand";
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
          <FilmChapter from="right" anchor="center" tone="light">
            <SolutionBlock />
          </FilmChapter>
        </CinematicScroll>
        <Scene>
          <PathsBlock place={place} />
          <ShowcaseBlock catalog={cardapio?.catalog ?? null} place={place} />
          <EventsBlock quoteHref={eventQuoteHref(place?.whatsappUrl)} />
          <TestimonialsBlock place={place} reviews={reviews} />
        </Scene>
        <Scene>
          <FaqBlock />
          <CloseBlock place={place} />
        </Scene>
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
