// Hindi version of /shopping/[slug] — same page, Hindi metadata.
import type { Metadata } from "next";
import EnglishPage, {
    generateMetadata as englishMetadata,
    generateStaticParams as englishParams,
} from "@/app/shopping/[slug]/page";
import { RAJASTHAN_SHOPPING_HINDI } from "@/constants/shopping-hindi";
import { getShoppingDistrict, getShoppingEntry } from "@/lib/shopping";
import { hindiMetadata } from "@/lib/i18n";

type Props = { params: Promise<{ slug: string }> };
type HindiDistrict = { slug: string; district: string; shoppingPlaces: { id: unknown; name: string; description?: string }[] };

const HINDI_DISTRICTS = (RAJASTHAN_SHOPPING_HINDI as unknown as { districts: HindiDistrict[] }).districts;

export function generateStaticParams() {
    return englishParams();
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { slug } = await props.params;
    const en = await englishMetadata(props);
    const path = `/shopping/${slug}`;

    const district = getShoppingDistrict(slug);
    if (district) {
        const hi = HINDI_DISTRICTS.find((d) => d.slug === district.slug);
        if (!hi) return hindiMetadata(en, path);
        return hindiMetadata(en, path, {
            title: `${hi.district} में शॉपिंग - प्रसिद्ध बाज़ार और गाइड`,
            description: `${hi.district}, राजस्थान के प्रसिद्ध बाज़ारों, हस्तशिल्प और खरीदारी की जगहों की पूरी जानकारी - समय और विशेष उत्पादों के साथ।`,
        });
    }

    const entry = getShoppingEntry(slug);
    if (entry) {
        for (const d of HINDI_DISTRICTS) {
            const p = d.shoppingPlaces.find((x) => x.id === entry.place.id);
            if (p) {
                return hindiMetadata(en, path, {
                    title: `${p.name}, ${d.district} - समय, खरीदारी और गाइड`,
                    description: p.description?.slice(0, 155),
                });
            }
        }
    }
    return hindiMetadata(en, path);
}

export default EnglishPage;
