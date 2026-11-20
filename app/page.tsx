import { Metadata } from "next";
import { alternatesFor } from "@/lib/i18n";
import MapExperience from "@/components/map/MapExperience";
import MapListSection from "@/components/map/MapListSection";
import { getMapMarkers } from "@/lib/map/markers";

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
  // Landing page = the 3D map. The list below it is the crawlable / non-3D alternative.
  const markers = getMapMarkers();
  return (
    <>
      <MapExperience markers={markers} />
      <MapListSection markers={markers} />
    </>
  );
}