import { FESTIVALS } from "@/constants/data";
import { notFound } from "next/navigation";
import FestivalDetailClient from "./FestivalDetailClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const festival = FESTIVALS.find(f => f.id === parseInt(id, 10));
  if (!festival) return { title: "Festival Not Found" };
  
  const title = festival.seo?.title || `${festival.name} | Royal Rajasthan`;
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
      canonical: `https://rajasthanplaces.in/festivals/${festival.id}`,
    },
  };
}

export default async function FestivalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const festivalId = parseInt(id, 10);
  const festival = FESTIVALS.find(f => f.id === festivalId);

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
