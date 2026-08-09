import { FESTIVALS } from "@/constants/data";
import { notFound } from "next/navigation";
// import FestivalDetailClient from "./FestivalDetailClient";
import { Metadata } from "next";
import FestivalDetailClient from "./FestivalDetailClient";

// Helper: Convert festival name to URL slug
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// Generate all static params for SSG
export async function generateStaticParams() {
  return FESTIVALS.map((festival) => ({
    slug: toSlug(festival.name),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const festival = FESTIVALS.find(f => toSlug(f.name) === slug);
  if (!festival) return { title: "Festival Not Found" };

  const title = festival.seo?.title || `${festival.name} | Rajasthan Tourism Places`;
  const description = festival.seo?.description || festival.description;
  const customKeywords = festival.seo?.keywords || festival.keywords || [];

  return {
    title,
    description,
    keywords: [
      festival.name,
      `${festival.name} festival`,
      `${festival.name} dates`,
      festival.location,
      ...customKeywords
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "geo.region": "IN-RJ",
      "geo.placename": `${festival.location}, Rajasthan, India`,
    },
    openGraph: {
      title,
      description,
      images: [festival.image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [festival.image],
    },
    alternates: {
      canonical: `https://rajasthanplaces.in/festivals/${toSlug(festival.name)}`,
    },
  };
}

export default async function FestivalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const festival = FESTIVALS.find(f => toSlug(f.name) === slug);

  if (!festival) {
    notFound();
  }

  // Find related festivals (same location or month, exclude self)
  const related = FESTIVALS.filter(f =>
    f.id !== festival.id &&
    (f.location === festival.location || f.month === festival.month)
  ).slice(0, 4);

  // If not enough related by location/month, fill with random ones
  if (related.length < 4) {
    const additional = FESTIVALS.filter(f =>
      f.id !== festival.id && !related.find(r => r.id === f.id)
    ).slice(0, 4 - related.length);
    related.push(...additional);
  }

  return (
    <FestivalDetailClient festival={festival} related={related} />
  );
}
