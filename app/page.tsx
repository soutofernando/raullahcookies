import SiteNavbar from "@/components/ui/SiteNavbar";
import PageBackdrop from "@/components/ui/PageBackdrop";
import CookieCanvasLoader from "@/components/three/CookieCanvasLoader";
import HeroScene from "@/components/sections/HeroScene";
import BrandManifesto from "@/components/sections/BrandManifesto";
import FlavorShowcase from "@/components/sections/FlavorShowcase";
import MenuBoard from "@/components/sections/MenuBoard";
import HowToOrder from "@/components/sections/HowToOrder";
import StoreGallery from "@/components/sections/StoreGallery";
import BrandIdentity from "@/components/sections/BrandIdentity";
import StoreUnits from "@/components/sections/StoreUnits";
import NewsletterSignup from "@/components/sections/NewsletterSignup";
import SiteFooter from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <main>
      <SiteNavbar />
      <PageBackdrop />
      <CookieCanvasLoader />
      <HeroScene />
      <BrandManifesto />
      <FlavorShowcase />
      <MenuBoard />
      <HowToOrder />
      <StoreGallery />
      <BrandIdentity />
      <StoreUnits />
      <NewsletterSignup />
      <SiteFooter />
    </main>
  );
}
