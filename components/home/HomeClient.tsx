"use client";
import { HeroSection } from "@/components/home/HeroSection";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useLanguage } from "@/components/LanguageProvider";

const FeaturedPlaces = dynamic(() => import("@/components/home/FeaturedPlaces").then((m) => m.FeaturedPlaces), {
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-3xl" />,
});

const ExperiencesSection = dynamic(() => import("@/components/home/ExperiencesSection").then((m) => m.ExperiencesSection), {
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-900 rounded-3xl" />,
});

const StatsSection = dynamic(() => import("@/components/home/StatsSection").then((m) => m.StatsSection), {
  loading: () => <div className="h-48 w-full animate-pulse bg-maroon-600 rounded-3xl" />,
});

const FAQSection = dynamic(() => import("@/components/home/FAQ").then((m) => m.FAQSection), {
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-100 dark:bg-gray-800 rounded-3xl" />,
});

const MiniFestivals = dynamic(() => import("@/components/home/MiniFestivals").then((m) => m.MiniFestivals), {
  loading: () => <div className="h-96 w-full animate-pulse bg-gray-900" />,
});

const MiniShopping = dynamic(() => import("@/components/home/MiniShopping").then((m) => m.MiniShopping), {
  loading: () => <div className="h-96 w-full animate-pulse bg-maroon-950" />,
});

export default function HomeClient() {
  const { language } = useLanguage();

  return (
    <>
      <HeroSection />
      <FeaturedPlaces />
      <MiniFestivals />
      <MiniShopping />
      <ExperiencesSection />
      <StatsSection />
      <FAQSection />
      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-yellow-500 to-yellow-600 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white mb-6">
            {language === 'hi' ? "क्या आप राजस्थान की यात्रा के लिए तैयार हैं?" : "Ready to Explore Rajasthan?"}
          </h2>
          <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
            {language === 'hi'
              ? "राजाओं की इस पावन भूमि पर भव्य किलों, शांत झीलों, सुनहरे रेगिस्तानों और पवित्र मंदिरों का अन्वेषण करें।"
              : "Discover magnificent forts, serene lakes, golden deserts, and sacred temples across the Land of Kings."}
          </p>
          <Link
            href="/places"
            className="bg-white text-yellow-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:scale-105 inline-block"
          >
            {language === 'hi' ? "सभी स्थानों की खोज करें →" : "Explore All Places →"}
          </Link>
        </div>
      </section>
    </>
  );
}
