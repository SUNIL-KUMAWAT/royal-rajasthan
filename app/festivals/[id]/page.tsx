import { FESTIVALS } from "@/constants/data";
import { notFound } from "next/navigation";
import FestivalDetailClient from "./FestivalDetailClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const festival = FESTIVALS.find(f => f.id === parseInt(id, 10));
  if (!festival) return { title: "Festival Not Found" };
  
  return {
    title: `${festival.name} | Royal Rajasthan`,
    description: festival.description,
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
