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

    let content = `# Rajasthan Tourism Places — Full AI Knowledge Base (llms-full.txt)
Website: ${baseUrl}
Description: Comprehensive knowledge graph and travel data for the state of Rajasthan, India.

---

# SECTION 1: ALL TOURIST PLACES & MONUMENTS (${PLACES.length} Destinations)

`;

    for (const place of PLACES) {
        const timings = place.timing 
            ? `${place.timing.open || ""} - ${place.timing.close || ""}${place.timing.closedOn ? ` (Closed on: ${place.timing.closedOn})` : ""}`
            : "";
        
        const entryFee = place.ticket 
            ? (place.ticket.isFree ? "Free Entry" : `₹${place.ticket.indian || 0} for Indians, ₹${place.ticket.foreigner || 0} for Foreigners`)
            : "";

        const bestTime = place.bestTimeToVisit 
            ? `${place.bestTimeToVisit.months || ""} (${place.bestTimeToVisit.season || ""})`
            : "";

        content += `## ${place.name}
- URL: ${baseUrl}/places/${place.slug}
- City / District: ${place.city}
- Category: ${place.category}
- Rating: ${place.rating || "4.8"}/5.0
- Summary: ${place.description}
${timings ? `- Timings: ${timings}` : ""}
${entryFee ? `- Entry Fee: ${entryFee}` : ""}
${bestTime ? `- Best Time to Visit: ${bestTime}` : ""}
${place.highlights && place.highlights.length > 0 ? `- Highlights: ${place.highlights.join(", ")}` : ""}

`;
    }

    content += `\n---\n\n# SECTION 2: ALL CULTURAL FESTIVALS (${FESTIVALS.length} Festivals)\n\n`;

    for (const f of FESTIVALS) {
        content += `## ${f.name}
- URL: ${baseUrl}/festivals/${toSlug(f.name)}
- Location: ${f.location}
- Month / Season: ${f.month || "Annual"}
${f.duration ? `- Duration: ${f.duration}` : ""}
${f.nextDate ? `- Upcoming Dates: ${f.nextDate}` : ""}
- Description: ${f.description}
${f.highlights && f.highlights.length > 0 ? `- Key Highlights: ${f.highlights.join(", ")}` : ""}

`;
    }

    content += `\n---\n\n# SECTION 3: DISTRICT SHOPPING BAZAARS (${RAJASTHAN_SHOPPING.districts.length} Districts)\n\n`;

    for (const d of RAJASTHAN_SHOPPING.districts) {
        content += `## District: ${d.district}
- URL: ${baseUrl}/shopping/${d.slug}
- Summary: ${d.description}
- Markets Count: ${d.shoppingPlaces.length}
- Bazaars & Markets:
`;
        for (const p of d.shoppingPlaces) {
            content += `  * [${p.name}](${baseUrl}/shopping/${getShoppingSlug(p.name)}): ${p.type} — ${p.description} (Timings: ${p.timings || "Open daily"})\n`;
        }
        content += "\n";
    }

    return new Response(content, {
        status: 200,
        headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
        },
    });
}
