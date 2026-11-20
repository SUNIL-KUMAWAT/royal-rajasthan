// Hindi version of /places/[slug] — same page, Hindi metadata.
import type { Metadata } from "next";
import EnglishPage, {
    generateMetadata as englishMetadata,
    generateStaticParams as englishParams,
} from "@/app/places/[slug]/page";
import { PLACES_HINDI } from "@/constants/places-hindi";
import { hindiMetadata } from "@/lib/i18n";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return englishParams();
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { slug } = await props.params;
    const en = await englishMetadata(props);
    const hi = (PLACES_HINDI as { slug: string; name: string; city?: string; description?: string }[]).find(
        (p) => p.slug === slug
    );
    if (!hi) return hindiMetadata(en, `/places/${slug}`);
    return hindiMetadata(en, `/places/${slug}`, {
        title: `${hi.name} - समय, टिकट और यात्रा गाइड`,
        description: hi.description?.slice(0, 155),
    });
}

export default EnglishPage;
