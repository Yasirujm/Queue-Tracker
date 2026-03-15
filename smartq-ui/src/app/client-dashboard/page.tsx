import SliderHero from "@/components/slider-hero";
import OffersCarousel from "@/components/offers-carousel";
import TopDestinations from "@/components/top-Customers";
import TopHotels from "@/components/top-hotels";
import NewsletterSubscribe from "@/components/newsletter-subscribe";

export default function HomePage() {
  return (
    <>
      {/* Full-bleed slider (no gaps) */}
      <SliderHero />
      <OffersCarousel />
      <TopDestinations />
      <TopHotels />


      {/* Constrained content with padding BELOW slider */}

      <NewsletterSubscribe />

    </>
  );
}
