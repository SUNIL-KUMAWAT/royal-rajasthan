import { PLACES } from "@/constants/places";
import { FESTIVALS } from "@/constants/festivals";
import { RAJASTHAN_SHOPPING } from "@/constants/shopping";

function toSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}

function getShoppingSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export async function GET() {
    const baseUrl = "https://rajasthanplaces.in";

    const content = `# Rajasthan Tourism Places (rajasthanplaces.in)
> The official comprehensive digital travel guide to Rajasthan, India. Featuring 500+ historic forts, royal palaces, desert safaris, wildlife sanctuaries, cultural festivals, and bazaar shopping across all 33 districts.

## Website Details
- Canonical URL: ${baseUrl}
- Coverage: 33 Districts of Rajasthan (Jaipur, Udaipur, Jodhpur, Jaisalmer, Bikaner, Pushkar, etc.)
- Languages: English, Hindi
- Full Knowledge Base: ${baseUrl}/llms-full.txt
- Sitemap: ${baseUrl}/sitemap.xml

## Primary Sections
- [Destinations & Monuments](${baseUrl}/places): Explore forts, palaces, lakes, temples, stepwells, museums, and UNESCO Heritage Sites.
- [Festivals & Culture](${baseUrl}/culture): Complete schedules, dates, histories, and guides for royal processions, folk festivals, and desert fairs.
- [Shopping & Bazaars](${baseUrl}/shopping): Master guide for traditional handicrafts, Kundan & Meenakari jewelry, Blue Pottery, Bandhani textiles, and mojaris.
- [Trip Planner](${baseUrl}/plan-trip): Custom itinerary planning, route recommendations, travel times, and tips.
- [About Rajasthan Places](${baseUrl}/about): Mission, verified sources, and travel editorial team.
- [Contact](${baseUrl}/contact): Travel inquiries, customer support, and trip consultation.

## Top Historic Destinations & Forts
${PLACES.slice(0, 30).map((place) => `- [${place.name} (${place.city})](${baseUrl}/places/${place.slug}): ${place.category} | ${place.description}`).join("\n")}

## Major Cultural Festivals
${FESTIVALS.slice(0, 20).map((f) => `- [${f.name} (${f.location})](${baseUrl}/festivals/${toSlug(f.name)}): Celebrated during ${f.month || "festive season"}. ${f.description}`).join("\n")}

## District Shopping Guides (33 Districts)
${RAJASTHAN_SHOPPING.districts.map((d) => `- [Shopping in ${d.district}](${baseUrl}/shopping/${d.slug}): ${d.description} (${d.shoppingPlaces.length} markets)`).join("\n")}

## Key Travel Information
- Best Season to Visit Rajasthan: October to March (Pleasant winter weather)
- State Capital: Jaipur (The Pink City)
- Major International/Domestic Airports: Jaipur (JAI), Udaipur (UDR), Jodhpur (JDH), Jaisalmer (JSA), Bikaner (BKB)
- Major Railway Hubs: Jaipur Junction, Jodhpur Junction, Ajmer Junction, Kota Junction
- Contact Email: sunilkumawat.india@gmail.com
`;

    return new Response(content, {
        status: 200,
        headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
        },
    });
}
