import { HeroSection2 } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturedPlaces } from "@/components/home/FeaturedPlaces";
import { ExperiencesSection } from "@/components/home/ExperiencesSection";
import Link from "next/link";
import { FAQSection } from "@/components/home/FAQ";

export default function HomePage() {
  return (
    <>
      {/* <HeroSection />
      <HeroSection1 /> */}
      <HeroSection2 />
      <FeaturedPlaces />
      <ExperiencesSection />
      <StatsSection />
      <FAQSection />
      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-yellow-500 to-yellow-600 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Explore Rajasthan?
          </h2>
          <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
            Discover magnificent forts, serene lakes, golden deserts, and sacred temples across the Land of Kings.
          </p>
          <Link
            href="/places"
            className="bg-white text-yellow-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:scale-105 inline-block"
          >
            Explore All Places →
          </Link>
        </div>
      </section>
    </>
  );
}