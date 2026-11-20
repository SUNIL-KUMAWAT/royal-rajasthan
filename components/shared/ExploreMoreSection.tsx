// components/shared/ExploreMoreSection.tsx
import { ArrowUpRight } from "lucide-react";
import Link from "@/components/LocalizedLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const ALL_SECTIONS = [
    {
        id: "places",
        href: "/places",
        title: "Famous Places",
        titleHi: "प्रसिद्ध स्थान",
        desc: "Explore 50+ iconic forts, palaces, lakes & temples of Rajasthan with timings, tickets & maps.",
        descHi: "50+ प्रसिद्ध किले, महल, झीलें और मंदिर — समय, टिकट और नक्शे के साथ।",
        badge: "50+ Places",
        badgeHi: "50+ स्थान",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg/960px-20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg",
    },
    {
        id: "festivals",
        href: "/culture",
        title: "Festivals & Events",
        titleHi: "त्यौहार और उत्सव",
        desc: "Discover vibrant festivals — Pushkar Camel Fair, Desert Festival, Teej, Gangaur & more.",
        descHi: "पुष्कर ऊंट मेला, मरू महोत्सव, तीज, गणगौर और बहुत कुछ।",
        badge: "12+ Festivals",
        badgeHi: "12+ त्यौहार",
        img: "https://rajasthanplaces.in/Camel_Pushkar.webp",
    },
    {
        id: "culture",
        href: "/culture",
        title: "Culture & Heritage",
        titleHi: "संस्कृति और विरासत",
        desc: "Immerse in Rajasthan's rich culture — folk arts, royal traditions, cuisine & handicrafts.",
        descHi: "राजस्थान की समृद्ध संस्कृति — लोक कला, शाही परंपराएं, व्यंजन और हस्तशिल्प।",
        badge: "Rich Heritage",
        badgeHi: "समृद्ध विरासत",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Patwon_ki_haveli_18.jpg/960px-Patwon_ki_haveli_18.jpg",
    },
    {
        id: "shopping",
        href: "/shopping",
        title: "Shopping Guide",
        titleHi: "खरीदारी गाइड",
        desc: "Best bazaars & markets — Johari Bazaar, Bapu Bazaar, Sardar Market. Buy jewels, textiles & more.",
        descHi: "जोहरी बाज़ार, बापू बाज़ार, सरदार मार्केट — आभूषण, कपड़े, हस्तशिल्प खरीदें।",
        badge: "20+ Markets",
        badgeHi: "20+ बाज़ार",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/960px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg",
    },
];

// Bento placement for the (up to three) image tiles; the editorial note fills the last cell.
const TILE_LAYOUT = [
    "md:col-span-2 lg:col-span-7 lg:row-span-2 min-h-[22rem] md:min-h-[24rem] lg:min-h-0",
    "lg:col-span-5 min-h-[18rem] lg:min-h-0",
    "lg:col-span-5 xl:col-span-3 min-h-[18rem] lg:min-h-0",
];

interface Props {
    /** Pass the current page id to exclude it from the links */
    currentPage: "places" | "festivals" | "culture" | "shopping";
    language?: string;
}

export function ExploreMoreSection({ currentPage, language = "en" }: Props) {
    const isHi = language === "hi";
    const sections = ALL_SECTIONS.filter((s) => s.id !== currentPage).slice(0, TILE_LAYOUT.length);

    return (
        <section className="relative overflow-hidden py-20 md:py-28">
            <div className="hairline absolute inset-x-0 top-0" />
            <div
                className="pointer-events-none absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full bg-gold-400/10 blur-3xl dark:bg-gold-400/5"
                aria-hidden="true"
            />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <SectionHeading
                    eyebrow={isHi ? "और जानें" : "Explore More"}
                    title={
                        isHi ? (
                            <>
                                राजस्थान को <em>और</em> जानें
                            </>
                        ) : (
                            <>
                                Discover <em>More</em> of Rajasthan
                            </>
                        )
                    }
                    subtitle={
                        isHi
                            ? "स्थान, त्यौहार, संस्कृति और खरीदारी — राजस्थान के हर पहलू को जानें।"
                            : "From historic places to vibrant festivals, rich culture to unique shopping — explore every facet of Rajasthan."
                    }
                />

                {/* Bento grid */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-12 lg:auto-rows-[17rem]">
                    {sections.map((section, i) => {
                        const title = isHi ? section.titleHi : section.title;
                        const large = i === 0;
                        return (
                            <Reveal key={section.id} delay={i * 0.08} className={TILE_LAYOUT[i]}>
                                <Link
                                    href={section.href}
                                    aria-label={`Explore ${title} in Rajasthan`}
                                    className="group relative isolate flex h-full min-h-[inherit] flex-col justify-end overflow-hidden rounded-[2rem] bg-ink-900 p-6 shadow-float transition-shadow duration-700 ease-lux hover:shadow-float-lg md:p-8"
                                >
                                    {/* Image */}
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        decoding="async"
                                        src={section.img}
                                        alt={`${title} in Rajasthan`}
                                        className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.07]"
                                        loading="lazy"
                                        width={400}
                                        height={250}
                                    />
                                    <div className="absolute inset-0 -z-10 scrim-b" />
                                    <div className="absolute inset-0 -z-10 bg-ink-950/10 transition-colors duration-700 group-hover:bg-transparent" />

                                    {/* Count badge + arrow */}
                                    <div className="absolute inset-x-5 top-5 flex items-start justify-between md:inset-x-6 md:top-6">
                                        <span className="rounded-full glass-dark px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white">
                                            {isHi ? section.badgeHi : section.badge}
                                        </span>
                                        <span className="grid h-11 w-11 place-items-center rounded-full bg-ivory-50/90 text-ink-900 backdrop-blur transition-transform duration-500 ease-lux group-hover:rotate-45 group-hover:scale-110">
                                            <ArrowUpRight size={18} />
                                        </span>
                                    </div>

                                    {/* Body */}
                                    <span className="font-display text-sm italic text-gold-300" aria-hidden="true">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3
                                        className={`mt-1 font-display font-medium leading-[1.05] tracking-tight text-ivory-50 ${
                                            large ? "text-4xl md:text-5xl" : "text-3xl"
                                        }`}
                                    >
                                        {title}
                                    </h3>
                                    <p
                                        className={`mt-3 max-w-md text-sm leading-relaxed text-ivory-100/75 ${
                                            large ? "" : "line-clamp-2"
                                        }`}
                                    >
                                        {isHi ? section.descHi : section.desc}
                                    </p>
                                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-300">
                                        <span className="h-px w-6 bg-current transition-all duration-500 ease-lux group-hover:w-10" />
                                        {isHi ? "और जानें →" : "Explore Now →"}
                                    </span>
                                </Link>
                            </Reveal>
                        );
                    })}

                    {/* Editorial note tile */}
                    <Reveal
                        delay={sections.length * 0.08}
                        className="relative flex min-h-[14rem] flex-col justify-between overflow-hidden rounded-[2rem] glass p-6 md:col-span-2 md:p-8 lg:col-span-12 lg:min-h-0 xl:col-span-2"
                    >
                        <div
                            className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-gold-400/25 blur-3xl"
                            aria-hidden="true"
                        />
                        <span className="eyebrow">{isHi ? "राजस्थान गाइड" : "The Guide"}</span>
                        <p className="relative mt-6 font-display text-2xl font-medium italic leading-snug text-ink-900 dark:text-ivory-50">
                            {isHi
                                ? "राजस्थान यात्रा की पूरी जानकारी एक ही जगह"
                                : "Your complete Rajasthan travel guide — all in one place"}
                        </p>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
