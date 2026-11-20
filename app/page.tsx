import { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n";
import HomeClient from "@/components/home/HomeClient";
import { PLACES } from "@/constants/places";
import { PLACES_HINDI } from "@/constants/places-hindi";
import { FESTIVALS } from "@/constants/festivals";
import { FESTIVALS_HINDI } from "@/constants/festivals-hindi";
import { toPlaceCards } from "@/lib/places";
import type { MiniFestival } from "@/components/home/MiniFestivals";

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const HOME_FESTIVAL_COUNT = 3;

function toMiniFestivals(list: typeof FESTIVALS): MiniFestival[] {
  return list.slice(0, HOME_FESTIVAL_COUNT).map((f) => {
    // Slugs always come from the English name so Hindi cards link to the same page
    const en = FESTIVALS.find((e) => e.id === f.id) ?? f;
    return {
      id: f.id,
      name: f.name,
      slug: toSlug(en.name),
      image: f.image,
      location: f.location,
      month: f.month,
      description: f.description,
    };
  });
}

export const metadata: Metadata = {
  title: "Rajasthan Tourism Places - Explore Famous Places of Rajasthan",
  description: "Discover the most famous tourist places in Rajasthan with complete details - timing, ticket prices, history, location & travel tips. Plan your perfect Rajasthan trip today!",
  keywords: [
    "Rajasthan tourism",
    "places to visit in Rajasthan",
    "Rajasthan tourist places",
    "Rajasthan travel guide",
    "Rajasthan trip planner"
  ],
  alternates: alternatesFor("/"),
  openGraph: {
    title: "Rajasthan Tourism Places - Explore Famous Places",
    description: "Discover the most famous tourist places in Rajasthan with complete details - timing, ticket prices, history, location & travel tips.",
    url: "https://rajasthanplaces.in",
    siteName: "Rajasthan Tourism Places",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajasthan Tourism Places",
    description: "Discover the most famous tourist places in Rajasthan with complete details.",
  }
};

export default function HomePage() {
  return (
    <HomeClient
      places={toPlaceCards(PLACES)}
      placesHi={toPlaceCards(PLACES_HINDI)}
      festivals={toMiniFestivals(FESTIVALS)}
      festivalsHi={toMiniFestivals(FESTIVALS_HINDI)}
    />
  );
}