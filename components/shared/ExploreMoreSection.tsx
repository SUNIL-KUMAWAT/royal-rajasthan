// components/shared/ExploreMoreSection.tsx
import Link from "next/link";

const ALL_SECTIONS = [
    {
        id: "places",
        href: "/places",
        emoji: "🏰",
        title: "Famous Places",
        titleHi: "प्रसिद्ध स्थान",
        desc: "Explore 50+ iconic forts, palaces, lakes & temples of Rajasthan with timings, tickets & maps.",
        descHi: "50+ प्रसिद्ध किले, महल, झीलें और मंदिर — समय, टिकट और नक्शे के साथ।",
        gradient: "from-amber-500 to-orange-600",
        bg: "bg-amber-50 dark:bg-amber-900/20",
        border: "border-amber-200 dark:border-amber-800",
        badge: "50+ Places",
        badgeHi: "50+ स्थान",
        img: "https://picsum.photos/seed/raj-1129/400/250",
    },
    {
        id: "festivals",
        href: "/culture",
        emoji: "🎪",
        title: "Festivals & Events",
        titleHi: "त्यौहार और उत्सव",
        desc: "Discover vibrant festivals — Pushkar Camel Fair, Desert Festival, Teej, Gangaur & more.",
        descHi: "पुष्कर ऊंट मेला, मरू महोत्सव, तीज, गणगौर और बहुत कुछ।",
        gradient: "from-pink-500 to-rose-600",
        bg: "bg-pink-50 dark:bg-pink-900/20",
        border: "border-pink-200 dark:border-pink-800",
        badge: "12+ Festivals",
        badgeHi: "12+ त्यौहार",
        img: "https://picsum.photos/seed/raj-1107/400/250",
    },
    {
        id: "culture",
        href: "/culture",
        emoji: "🎭",
        title: "Culture & Heritage",
        titleHi: "संस्कृति और विरासत",
        desc: "Immerse in Rajasthan's rich culture — folk arts, royal traditions, cuisine & handicrafts.",
        descHi: "राजस्थान की समृद्ध संस्कृति — लोक कला, शाही परंपराएं, व्यंजन और हस्तशिल्प।",
        gradient: "from-violet-500 to-purple-600",
        bg: "bg-violet-50 dark:bg-violet-900/20",
        border: "border-violet-200 dark:border-violet-800",
        badge: "Rich Heritage",
        badgeHi: "समृद्ध विरासत",
        img: "https://picsum.photos/seed/raj-1098/400/250",
    },
    {
        id: "shopping",
        href: "/shopping",
        emoji: "🛍️",
        title: "Shopping Guide",
        titleHi: "खरीदारी गाइड",
        desc: "Best bazaars & markets — Johari Bazaar, Bapu Bazaar, Sardar Market. Buy jewels, textiles & more.",
        descHi: "जोहरी बाज़ार, बापू बाज़ार, सरदार मार्केट — आभूषण, कपड़े, हस्तशिल्प खरीदें।",
        gradient: "from-emerald-500 to-teal-600",
        bg: "bg-emerald-50 dark:bg-emerald-900/20",
        border: "border-emerald-200 dark:border-emerald-800",
        badge: "20+ Markets",
        badgeHi: "20+ बाज़ार",
        img: "https://picsum.photos/seed/raj-1141/400/250",
    },
];

interface Props {
    /** Pass the current page id to exclude it from the links */
    currentPage: "places" | "festivals" | "culture" | "shopping";
    language?: string;
}

export function ExploreMoreSection({ currentPage, language = "en" }: Props) {
    const isHi = language === "hi";
    const sections = ALL_SECTIONS.filter((s) => s.id !== currentPage);

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-10">
                    <span className="inline-block text-xs font-bold tracking-widest uppercase text-yellow-600 dark:text-yellow-400 mb-3">
                        {isHi ? "और जानें" : "Explore More"}
                    </span>
                    <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        {isHi ? "राजस्थान को और जानें" : "Discover More of Rajasthan"}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm md:text-base">
                        {isHi
                            ? "स्थान, त्यौहार, संस्कृति और खरीदारी — राजस्थान के हर पहलू को जानें।"
                            : "From historic places to vibrant festivals, rich culture to unique shopping — explore every facet of Rajasthan."}
                    </p>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sections.map((section) => (
                        <Link
                            key={section.id}
                            href={section.href}
                            aria-label={`Explore ${isHi ? section.titleHi : section.title} in Rajasthan`}
                            className={`group relative flex flex-col overflow-hidden rounded-2xl border ${section.border} ${section.bg} hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300`}
                        >
                            {/* Image */}
                            <div className="relative h-44 overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={section.img}
                                    alt={`${isHi ? section.titleHi : section.title} in Rajasthan`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                    width={400}
                                    height={250}
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${section.gradient} opacity-40 group-hover:opacity-50 transition-opacity duration-300`} />

                                {/* Emoji badge */}
                                <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center text-xl shadow-md">
                                    {section.emoji}
                                </div>

                                {/* Count badge */}
                                <div className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${section.gradient} text-white shadow-md`}>
                                    {isHi ? section.badgeHi : section.badge}
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="font-playfair text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                                    {isHi ? section.titleHi : section.title}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed flex-1">
                                    {isHi ? section.descHi : section.desc}
                                </p>
                                <div className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold bg-gradient-to-r ${section.gradient} bg-clip-text text-transparent`}>
                                    {isHi ? "और जानें →" : "Explore Now →"}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-10 text-center">
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                        {isHi
                            ? "राजस्थान यात्रा की पूरी जानकारी एक ही जगह"
                            : "Your complete Rajasthan travel guide — all in one place"}
                    </p>
                </div>
            </div>
        </section>
    );
}
