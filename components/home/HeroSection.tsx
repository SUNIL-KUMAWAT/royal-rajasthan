"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Link from "@/components/LocalizedLink";
import { useLanguage } from "@/components/LanguageProvider";

// Unsplash + Pexels — free to use under their licenses
const IMAGES = {
    jaipurBg: "https://images.unsplash.com/photo-1709883252686-fe847b56c90b?w=1200&q=80",
    jaipurLeft: "https://images.pexels.com/photos/784879/pexels-photo-784879.jpeg?auto=compress&cs=tinysrgb&w=1200",
    jaipurOrbit: [
        "https://images.pexels.com/photos/36470339/pexels-photo-36470339.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://images.pexels.com/photos/19195932/pexels-photo-19195932.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://images.pexels.com/photos/36470367/pexels-photo-36470367.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80",
        "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?w=1200&q=80",
    ],

    udaipurBg: "https://images.unsplash.com/photo-1699949967693-9b0084730462?w=1200&q=80",
    udaipurLeft: "https://images.unsplash.com/photo-1695956353120-54ce5e91632b?w=1200&q=80",
    udaipurOrbit: [
        "https://images.unsplash.com/photo-1703092289078-ff03b771237c?w=1200&q=80",
        "https://images.unsplash.com/photo-1679988555665-b1686f1b3eb7?w=1200&q=80",
        "https://images.pexels.com/photos/35455625/pexels-photo-35455625.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://images.pexels.com/photos/7362398/pexels-photo-7362398.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://images.pexels.com/photos/31866953/pexels-photo-31866953.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],

    jaisalmerBg: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&q=80",
    jaisalmerLeft: "https://images.pexels.com/photos/33823962/pexels-photo-33823962.jpeg?auto=compress&cs=tinysrgb&w=1200",
    jaisalmerOrbit: [
        "https://images.pexels.com/photos/35098427/pexels-photo-35098427.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://images.pexels.com/photos/36470442/pexels-photo-36470442.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://images.pexels.com/photos/37415400/pexels-photo-37415400.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://images.pexels.com/photos/37415412/pexels-photo-37415412.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "https://images.unsplash.com/photo-1713682995521-22ec819b50ac?w=1200&q=80",
    ]
};

const ORBIT_SLIDES = [
    {
        subtitle: "Jaipur, The Pink City",
        title: "Where every\nstone tells a story",
        description: "Forts, sand and gold — five journeys, one royal thread.",
        background: IMAGES.jaipurBg,
        leftImage: IMAGES.jaipurLeft,
        orbitImages: IMAGES.jaipurOrbit,
        slug: "amber-fort",
    },
    {
        subtitle: "Udaipur, City of Lakes",
        title: "Palaces that\nfloat on water",
        description: "Marble courtyards, still lakes, and sunsets in gold.",
        background: IMAGES.udaipurBg,
        leftImage: IMAGES.udaipurLeft,
        orbitImages: IMAGES.udaipurOrbit,
        slug: "umaid-bhawan-palace",
    },
    {
        subtitle: "Jaisalmer, The Golden City",
        title: "Dunes that turn\ngold at twilight",
        description: "A living fort rising from the Thar desert sands.",
        background: IMAGES.jaisalmerBg,
        leftImage: IMAGES.jaisalmerLeft,
        orbitImages: IMAGES.jaisalmerOrbit,
        slug: "jaisalmer-fort",
    },
];

const ORBIT_SLIDES_HINDI = [
    {
        subtitle: "जयपुर, गुलाबी शहर",
        title: "जहाँ हर\nपत्थर एक कहानी कहता है",
        description: "किले, रेत और सोना — पाँच यात्राएँ, एक शाही धागा।",
        background: IMAGES.jaipurBg,
        leftImage: IMAGES.jaipurLeft,
        orbitImages: IMAGES.jaipurOrbit,
        slug: "amber-fort",
    },
    {
        subtitle: "उदयपुर, झीलों का शहर",
        title: "महल जो\nपानी पर तैरते हैं",
        description: "संगमरमर के प्रांगण, शांत झीलें, और सुनहरे सूर्यास्त।",
        background: IMAGES.udaipurBg,
        leftImage: IMAGES.udaipurLeft,
        orbitImages: IMAGES.udaipurOrbit,
        slug: "umaid-bhawan-palace",
    },
    {
        subtitle: "जैसलमेर, स्वर्ण शहर",
        title: "टीले जो\nगोधूलि में सुनहरे हो जाते हैं",
        description: "थार मरुस्थल की रेत से उभरता एक जीवंत किला।",
        background: IMAGES.jaisalmerBg,
        leftImage: IMAGES.jaisalmerLeft,
        orbitImages: IMAGES.jaisalmerOrbit,
        slug: "jaisalmer-fort",
    },
];


const SLIDE_INTERVAL = 7000;
const EASE = [0.22, 1, 0.36, 1] as const;

const UI = {
    en: {
        explore: "Explore Rajasthan",
        details: "Discover",
        prev: "Previous slide",
        next: "Next slide",
        goTo: (n: number, name: string) => `Go to slide ${n} – ${name}`,
        region: "Featured destinations",
    },
    hi: {
        explore: "राजस्थान की खोज करें",
        details: "जानें",
        prev: "पिछली स्लाइड",
        next: "अगली स्लाइड",
        goTo: (n: number, name: string) => `स्लाइड ${n} – ${name}`,
        region: "प्रमुख गंतव्य",
    },
};

/** Splits "Line one\nline two" so the last line can be set in gold italic. */
function TitleLines({ title }: { title: string }) {
    const lines = title.split("\n");
    return (
        <>
            {lines.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.08em]">
                    <motion.span
                        className={`block ${i === lines.length - 1 && lines.length > 1 ? "italic font-normal text-gold-sheen" : ""}`}
                        initial={{ y: "105%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-105%" }}
                        transition={{ duration: 1, ease: EASE, delay: 0.1 + i * 0.09 }}
                    >
                        {line}
                    </motion.span>
                </span>
            ))}
        </>
    );
}

/**
 * Cinematic full-screen hero: crossfading photography with a slow Ken Burns
 * zoom, editorial headline, floating glass postcards and a glass control bar
 * with a per-slide progress line. Swipe, arrow keys and the bar all navigate.
 */
export function HeroSection() {
    const { language } = useLanguage();
    const isHi = language === "hi";
    const slides = isHi ? ORBIT_SLIDES_HINDI : ORBIT_SLIDES;
    const t = isHi ? UI.hi : UI.en;

    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    const touchStart = useRef<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const slide = slides[current];

    const go = useCallback((delta: number) => setCurrent((p) => (p + delta + slides.length) % slides.length), [slides.length]);

    useEffect(() => {
        if (paused) return;
        const timer = setTimeout(() => go(1), SLIDE_INTERVAL);
        return () => clearTimeout(timer);
    }, [current, paused, go]);

    // Gentle parallax + fade of the hero content as the page scrolls away
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <section
            ref={sectionRef}
            aria-roledescription="carousel"
            aria-label={t.region}
            className="relative isolate h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink-950 text-ivory-50"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={(e) => {
                touchStart.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
                if (touchStart.current === null) return;
                const dx = e.changedTouches[0].clientX - touchStart.current;
                if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
                touchStart.current = null;
            }}
            onKeyDown={(e) => {
                if (e.key === "ArrowRight") go(1);
                if (e.key === "ArrowLeft") go(-1);
            }}
        >
            {/* Photography */}
            <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
                <AnimatePresence initial={false}>
                    <motion.div
                        key={`bg-${current}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.6, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <div className="absolute inset-0 animate-kenburns">
                            <Image
                                src={slide.background}
                                alt={slide.subtitle}
                                fill
                                priority={current === 0}
                                sizes="100vw"
                                className="object-cover"
                            />
                        </div>
                    </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 scrim-cinematic" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 via-ink-950/20 to-transparent" />
            </motion.div>

            <motion.div
                style={{ y: contentY, opacity: contentOpacity }}
                className="relative mx-auto flex h-full max-w-7xl items-end px-4 pb-44 sm:px-6 md:pb-40 lg:px-8"
            >
                <div className="grid w-full items-end gap-10 lg:grid-cols-12">
                    {/* Headline */}
                    <div className="lg:col-span-7" aria-live="polite">
                        <AnimatePresence mode="wait">
                            <motion.div key={`copy-${current}-${language}`} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                                <motion.span
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: EASE }}
                                    className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold-200"
                                >
                                    <MapPin size={13} />
                                    {slide.subtitle}
                                </motion.span>
                                <h1 className="mt-6 font-display text-[3.1rem] font-medium leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[7.25rem]">
                                    <TitleLines title={slide.title} />
                                </h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
                                    className="mt-6 max-w-md text-base leading-relaxed text-ivory-100/80 md:text-lg"
                                >
                                    {slide.description}
                                </motion.p>
                            </motion.div>
                        </AnimatePresence>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
                            className="mt-9 flex flex-wrap gap-3"
                        >
                            <Link href="/places" className="btn-gold !px-7 !py-3.5">
                                {t.explore}
                                <ArrowUpRight size={17} />
                            </Link>
                            <Link href={`/places/${slide.slug}`} className="btn-glass-dark !px-7 !py-3.5">
                                {t.details} {slide.subtitle.split(",")[0]}
                            </Link>
                        </motion.div>
                    </div>

                    {/* Floating postcards */}
                    <div className="relative hidden h-[26rem] lg:col-span-5 lg:block" aria-hidden="true">
                        <AnimatePresence mode="popLayout">
                            {slide.orbitImages.slice(0, 3).map((src, i) => {
                                const layout = [
                                    "right-0 top-0 h-64 w-48 rotate-[5deg]",
                                    "right-40 top-24 h-72 w-56 -rotate-[4deg]",
                                    "right-10 bottom-0 h-44 w-60 rotate-[2deg]",
                                ][i];
                                return (
                                    <motion.div
                                        key={`card-${current}-${i}`}
                                        initial={{ opacity: 0, y: 40, scale: 0.92 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -20, scale: 0.96 }}
                                        transition={{ duration: 1, ease: EASE, delay: 0.2 + i * 0.12 }}
                                        className={`absolute ${layout}`}
                                    >
                                        <div
                                            className="relative h-full w-full overflow-hidden rounded-[1.5rem] border border-white/25 shadow-float-lg animate-float"
                                            style={{ animationDelay: `${i * 1.3}s` }}
                                        >
                                            <Image src={src} alt="" fill sizes="240px" className="object-cover" />
                                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>

            {/* Glass control bar */}
            <div className="absolute inset-x-0 bottom-24 px-4 sm:px-6 md:bottom-8 lg:px-8">
                <div className="mx-auto flex max-w-7xl items-center gap-4 rounded-full glass-dark px-3 py-2 sm:gap-6 sm:px-4">
                    <span className="pl-2 font-display text-lg tabular-nums text-ivory-50">
                        {String(current + 1).padStart(2, "0")}
                        <span className="mx-1 text-ivory-100/40">/</span>
                        <span className="text-ivory-100/50">{String(slides.length).padStart(2, "0")}</span>
                    </span>

                    <div className="flex flex-1 items-center gap-2" role="tablist" aria-label={t.region}>
                        {slides.map((s, i) => (
                            <button
                                key={s.slug + i}
                                type="button"
                                role="tab"
                                aria-selected={i === current}
                                aria-label={t.goTo(i + 1, s.subtitle)}
                                onClick={() => setCurrent(i)}
                                className="group relative flex-1 py-3"
                            >
                                <span className="block h-[2px] w-full overflow-hidden rounded-full bg-white/20">
                                    {i === current ? (
                                        <motion.span
                                            key={`p-${current}-${paused}`}
                                            className="block h-full bg-gold-300"
                                            initial={{ width: paused ? "100%" : "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: paused ? 0 : SLIDE_INTERVAL / 1000, ease: "linear" }}
                                        />
                                    ) : (
                                        <span className={`block h-full ${i < current ? "w-full bg-white/60" : "w-0"}`} />
                                    )}
                                </span>
                                <span className="mt-2 hidden truncate text-left text-[11px] font-medium text-ivory-100/60 transition-colors group-hover:text-ivory-50 sm:block">
                                    {s.subtitle}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-1.5">
                        <button
                            type="button"
                            onClick={() => go(-1)}
                            aria-label={t.prev}
                            className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-all hover:bg-white/25 active:scale-95"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            type="button"
                            onClick={() => go(1)}
                            aria-label={t.next}
                            className="grid h-10 w-10 place-items-center rounded-full bg-ivory-50 text-ink-900 transition-all hover:scale-105 active:scale-95"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
