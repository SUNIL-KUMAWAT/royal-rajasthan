"use client";
import { HeroSection } from "@/components/home/HeroSection";
import dynamic from "next/dynamic";
import type { PlaceCard } from "@/lib/places";
import type { MiniFestival } from "@/components/home/MiniFestivals";

const FeaturedPlaces = dynamic(() => import("@/components/home/FeaturedPlaces").then((m) => m.FeaturedPlaces), {
  loading: () => <div className="h-96 w-full skeleton mx-auto max-w-7xl my-24 !rounded-[2rem]" />,
});

const ExperiencesSection = dynamic(() => import("@/components/home/ExperiencesSection").then((m) => m.ExperiencesSection), {
  loading: () => <div className="h-96 w-full skeleton mx-auto max-w-7xl my-24 !rounded-[2rem]" />,
});

const StatsSection = dynamic(() => import("@/components/home/StatsSection").then((m) => m.StatsSection), {
  loading: () => <div className="h-48 w-full skeleton mx-auto max-w-7xl my-24 !rounded-[2rem]" />,
});

const FAQSection = dynamic(() => import("@/components/home/FAQ").then((m) => m.FAQSection), {
  loading: () => <div className="h-96 w-full skeleton mx-auto max-w-7xl my-24 !rounded-[2rem]" />,
});

const MiniFestivals = dynamic(() => import("@/components/home/MiniFestivals").then((m) => m.MiniFestivals), {
  loading: () => <div className="h-96 w-full skeleton mx-auto max-w-7xl my-24 !rounded-[2rem]" />,
});

const MiniShopping = dynamic(() => import("@/components/home/MiniShopping").then((m) => m.MiniShopping), {
  loading: () => <div className="h-96 w-full skeleton mx-auto max-w-7xl my-24 !rounded-[2rem]" />,
});

type HomeClientProps = {
  places: PlaceCard[];
  placesHi: PlaceCard[];
  festivals: MiniFestival[];
  festivalsHi: MiniFestival[];
};

export default function HomeClient({ places, placesHi, festivals, festivalsHi }: HomeClientProps) {
  return (
    <>
      <HeroSection />
      <FeaturedPlaces places={places} placesHi={placesHi} />
      <MiniFestivals festivals={festivals} festivalsHi={festivalsHi} />
      <MiniShopping />
      <ExperiencesSection />
      <StatsSection />
      <FAQSection />
    </>
  );
}
