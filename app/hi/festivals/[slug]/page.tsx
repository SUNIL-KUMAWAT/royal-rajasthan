// Hindi version of /festivals/[slug] — same page, Hindi metadata.
import type { Metadata } from "next";
import EnglishPage, {
    generateMetadata as englishMetadata,
    generateStaticParams as englishParams,
} from "@/app/festivals/[slug]/page";
import { FESTIVALS } from "@/constants/festivals";
import { FESTIVALS_HINDI } from "@/constants/festivals-hindi";
import { hindiMetadata } from "@/lib/i18n";

type Props = { params: Promise<{ slug: string }> };

const toSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");

export function generateStaticParams() {
    return englishParams();
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { slug } = await props.params;
    const en = await englishMetadata(props);
    const festival = FESTIVALS.find((f) => toSlug(f.name) === slug);
    const hi = festival && (FESTIVALS_HINDI as { id: number; name: string; description?: string }[]).find(
        (f) => f.id === festival.id
    );
    const path = `/festivals/${festival ? toSlug(festival.name) : slug}`;
    if (!hi) return hindiMetadata(en, path);
    return hindiMetadata(en, path, {
        title: `${hi.name} - तिथियां, मुख्य आकर्षण और गाइड`,
        description: hi.description?.slice(0, 155),
    });
}

export default EnglishPage;
