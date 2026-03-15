import SliderHero from "@/components/slider-hero";
import OffersCarousel from "@/components/offers-carousel";
import TopDestinations from "@/components/top-Customers";
import TopHotels from "@/components/top-hotels";
import NewsletterSubscribe from "@/components/newsletter-subscribe";
import SignInPage from "./auth/sign-in/page";
import CreateAccountPage from "./auth/create-account/page";

export default function HomePage() {
  return (
    <>
      {/* Full-bleed slider (no gaps) */}
      <SliderHero />
      <OffersCarousel />
      <TopDestinations />
      <SignInPage/>
      <CreateAccountPage/>
      

      {/* Constrained content with padding BELOW slider */}

      <NewsletterSubscribe />

    </>
  );
}
