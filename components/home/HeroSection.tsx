"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

const IMAGES = {
    jaipurBg: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=70",
    jaipurLeft: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&h=800&q=70",
    jaipurOrbit: [
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=200&h=200&q=60",
        "https://images.unsplash.com/photo-1477584308802-e9c378852d9a?auto=format&fit=crop&w=200&h=200&q=60",
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=200&h=200&q=60",
        "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=200&h=200&q=60",
        "https://images.unsplash.com/photo-1602491453977-63adc9f166b4?auto=format&fit=crop&w=200&h=200&q=60"
    ],

    udaipurBg: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=70",
    udaipurLeft: "https://images.unsplash.com/photo-1602491453977-63adc9f166b4?auto=format&fit=crop&w=600&h=800&q=70",
    udaipurOrbit: [
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=200&h=200&q=60",
        "https://images.unsplash.com/photo-1602491453977-63adc9f166b4?auto=format&fit=crop&w=200&h=200&q=60",
        "https://images.unsplash.com/photo-1477584308802-e9c378852d9a?auto=format&fit=crop&w=200&h=200&q=60",
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=200&h=200&q=60",
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=200&h=200&q=60"
    ],

    jaisalmerBg: "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=1600&q=70",
    jaisalmerLeft: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&h=800&q=70",
    jaisalmerOrbit: [
        "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=200&h=200&q=60",
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=200&h=200&q=60",
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=200&h=200&q=60",
        "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=200&h=200&q=60",
        "https://images.unsplash.com/photo-1477584308802-e9c378852d9a?auto=format&fit=crop&w=200&h=200&q=60"
    ]
};

const ORBIT_RADIUS = 150;
const ORBIT_SLIDES = [
    {
        subtitle: "Jaipur, The Pink City",
        title: "Where every\nstone tells a story",
        description: "Forts, sand and gold — five journeys, one royal thread.",
        background: IMAGES.jaipurBg,
        leftImage: IMAGES.jaipurLeft,
        orbitImages: IMAGES.jaipurOrbit,
    },
    {
        subtitle: "Udaipur, City of Lakes",
        title: "Palaces that\nfloat on water",
        description: "Marble courtyards, still lakes, and sunsets in gold.",
        background: IMAGES.udaipurBg,
        leftImage: IMAGES.udaipurLeft,
        orbitImages: IMAGES.udaipurOrbit,
    },
    {
        subtitle: "Jaisalmer, The Golden City",
        title: "Dunes that turn\ngold at dusk",
        description: "A living fort rising from the Thar desert sands.",
        background: IMAGES.jaisalmerBg,
        leftImage: IMAGES.jaisalmerLeft,
        orbitImages: IMAGES.jaisalmerOrbit,
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
    },
    {
        subtitle: "उदयपुर, झीलों का शहर",
        title: "महल जो\nपानी पर तैरते हैं",
        description: "संगमरमर के प्रांगण, शांत झीलें, और सुनहरे सूर्यास्त।",
        background: IMAGES.udaipurBg,
        leftImage: IMAGES.udaipurLeft,
        orbitImages: IMAGES.udaipurOrbit,
    },
    {
        subtitle: "जैसलमेर, स्वर्ण शहर",
        title: "टीले जो\nगोधूलि में सुनहरे हो जाते हैं",
        description: "थार मरुस्थल की रेत से उभरता एक जीवंत किला।",
        background: IMAGES.jaisalmerBg,
        leftImage: IMAGES.jaisalmerLeft,
        orbitImages: IMAGES.jaisalmerOrbit,
    },
];

const SLIDE_INTERVAL = 6000;

export function HeroSection() {
    const { language } = useLanguage();
    const currentSlides = language === 'hi' ? ORBIT_SLIDES_HINDI : ORBIT_SLIDES;

    const [current, setCurrent] = useState(0);
    const slide = currentSlides[current];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % currentSlides.length);
        }, SLIDE_INTERVAL);
        return () => clearInterval(timer);
    }, [currentSlides.length]);

    return (
        <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[#0b0a12]">
            {/* Blurred background — crossfades between slides */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`bg-${current}`}
                    initial={{ opacity: 0, scale: 1.15 }}
                    animate={{ opacity: 1, scale: 1.1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={slide.background}
                        alt={`Beautiful heritage view of ${slide.subtitle} tourism background`}
                        fill
                        priority={current === 0}
                        sizes="100vw"
                        className="object-cover blur-[6px] opacity-90"
                    />
                </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60" />

            <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center gap-10 px-6 md:flex-row md:justify-between md:gap-6 md:px-12">
                {/* LEFT: single framed image — crossfades between slides */}
                <div className="relative hidden shrink-0 md:block">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`left-${current}`}
                            initial={{ opacity: 0, x: -40, rotate: -6 }}
                            animate={{ opacity: 1, x: 0, rotate: -4 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                            className="relative h-[420px] w-[300px] overflow-hidden rounded-[2rem] border-4 border-gold-400/70 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                        >
                            <Image
                                src={slide.leftImage}
                                alt={`Traditional travel experience of ${slide.subtitle} in Rajasthan`}
                                fill
                                priority={current === 0}
                                sizes="(max-width: 768px) 100vw, 300px"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                        </motion.div>
                    </AnimatePresence>
                    <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full border border-gold-400/40" />
                </div>

                {/* CENTER: text + CTAs */}
                <div className="max-w-md text-center md:text-left">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={`tag-${current}`}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-lg uppercase tracking-[0.2em] text-gold-400 backdrop-blur-sm"
                        >
                            {slide.subtitle}
                        </motion.span>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={`title-${current}`}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.8, delay: 0.15 }}
                            className="whitespace-pre-line font-playfair text-4xl font-bold leading-tight text-white md:text-5xl"
                        >
                            {slide.title}
                        </motion.h1>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.p
                            key={`desc-${current}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mt-4 text-base text-white/70 md:text-md"
                        >
                            {slide.description}
                        </motion.p>
                    </AnimatePresence>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 flex flex-col gap-4 sm:flex-row md:justify-start justify-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                            <Link
                                href="/destinations"
                                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gold-gradient px-8 py-4 text-md font-semibold text-white shadow-gold transition-shadow duration-300 hover:shadow-gold-lg sm:w-auto"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {language === 'hi' ? "राजस्थान की खोज करें" : "Explore Rajasthan"}
                                    <motion.span
                                        className="inline-block"
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                    >
                                        →
                                    </motion.span>
                                </span>
                                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
                            </Link>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                            <Link
                                href="/plan-trip"
                                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 text-md font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20 sm:w-auto"
                            >
                                <span className="relative z-10">{language === 'hi' ? "यात्रा की योजना बनाएं" : "Plan Your Trip"}</span>
                                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* RIGHT: Floating SHM Images */}
                <div className="relative hidden w-full max-w-[400px] shrink-0 sm:block md:h-[550px] md:max-w-[550px] lg:h-[650px] lg:max-w-[650px] flex-1 mt-16 md:mt-24">
                    {slide.orbitImages.map((src: string, i: number) => {
                        const staticPositions = [
                            { top: "5%", left: "-5%" },
                            { top: "15%", right: "-10%" },
                            { bottom: "-5%", left: "0%" },
                            { bottom: "0%", right: "0%" },
                            { top: "35%", left: "25%" },
                        ];

                        const pos = staticPositions[i % staticPositions.length];

                        const yOffset = i % 2 === 0 ? [0, -40, 0] : [0, 45, 0];
                        const xOffset = i % 3 === 0 ? [0, 35, 0] : [0, -35, 0];
                        const duration = 4 + (i % 3);
                        const delay = i * 0.4;

                        const sizes = [
                            "h-32 w-32 md:h-48 md:w-48",
                            "h-40 w-40 md:h-60 md:w-60",
                            "h-36 w-36 md:h-52 md:w-52",
                            "h-28 w-28 md:h-40 md:w-40",
                            "h-48 w-48 md:h-72 md:w-72"
                        ];
                        const sizeClass = sizes[i % sizes.length];

                        return (
                            <motion.div
                                key={i}
                                className={`absolute ${sizeClass} z-10`}
                                style={pos}
                                animate={{
                                    y: yOffset,
                                    x: xOffset,
                                    rotate: i % 2 === 0 ? [0, 5, 0, -5, 0] : [0, -5, 0, 5, 0]
                                }}
                                transition={{
                                    duration: duration,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: delay,
                                }}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`float-${current}-${i}`}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        className="relative w-full h-full"
                                    >
                                        <Image
                                            src={src}
                                            alt={`Visual travel details from ${slide.subtitle} tourist destination - Image ${i + 1}`}
                                            fill
                                            sizes="(max-width: 768px) 150px, 300px"
                                            className="rounded-[2rem] border-[3px] border-white/30 object-cover shadow-[0_15px_50px_rgba(0,0,0,0.6)] backdrop-blur-sm"
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Dot indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                {currentSlides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        aria-label={`Go to slide ${i + 1} - ${currentSlides[i].subtitle}`}
                        className={`rounded-full transition-all duration-300 ${i === current
                            ? "h-2 w-8 bg-gold-500"
                            : "h-2 w-2 bg-white/40 hover:bg-white/70"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
