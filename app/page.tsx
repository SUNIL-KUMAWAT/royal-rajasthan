import { Metadata } from "next";
import HomeClient from "@/components/home/HomeClient";

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
  alternates: {
    canonical: "https://rajasthanplaces.in",
  },
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
  return <HomeClient />;
}