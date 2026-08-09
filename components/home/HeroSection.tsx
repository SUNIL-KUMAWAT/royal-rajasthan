"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
        title: "Dunes that turn\ngold at twilight",
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
        <section className="relative h-[550px] md:h-screen min-h-[550px] md:min-h-[640px] w-full overflow-hidden bg-[#0b0a12]">


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
                        className="object-cover blur-[6px] opacity-90 w-full h-full absolute inset-0"
                    />
                </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60" />

            <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-start md:justify-center pt-48 pb-48 md:pt-0 md:pb-0 gap-6 md:gap-10 px-3 md:flex-row md:justify-between md:gap-6 md:px-12">
                {/* LEFT: single framed image — crossfades between slides */}
                <div className="relative hidden shrink-0 xl:block">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`left-${current}`}
                            initial={{ opacity: 0, x: -40, rotate: -6 }}
                            animate={{ opacity: 1, x: 0, rotate: -4 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                            className="relative h-[420px] w-[280px] overflow-hidden rounded-[2rem] border-4 border-gold-400/70 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                        >
                            <Image
                                src={slide.leftImage}
                                alt={`Traditional travel experience of ${slide.subtitle} in Rajasthan`}
                                fill
                                className="object-cover w-full h-full absolute inset-0"
                            />
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* CENTER: text + CTAs */}
                <div className="max-w-md mt-[-50px] lg:max-w-lg text-center md:text-left z-20 flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={`tag-${current}`}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className=" w-fit  mb-4 md:mb-6 mx-auto md:mx-0 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-2 py-1.5 text-xs sm:text-sm md:text-md lg:text-lg uppercase tracking-[0.2em] text-gold-400 backdrop-blur-sm"
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
                            className="whitespace-pre-line font-playfair text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white"
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
                            className="mt-3 md:mt-4 text-xs sm:text-sm text-white/70 md:text-base"
                        >
                            {slide.description}
                        </motion.p>
                    </AnimatePresence>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 md:mt-8 flex flex-row gap-2 sm:gap-4 md:justify-start justify-center "
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        >
                            <Link
                                href="/destinations"
                                className="group relative flex w-full items-center justify-center gap-1 sm:gap-2 overflow-hidden rounded-full bg-gold-gradient px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 lg:px-8 md:py-3 lg:py-4 text-[11px] sm:text-xs md:text-sm lg:text-base font-semibold text-white shadow-gold transition-shadow duration-300 hover:shadow-gold-lg sm:w-auto"
                            >
                                <span className="relative z-10 flex items-center gap-1 sm:gap-2 whitespace-nowrap">
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
                                className="group relative flex w-auto items-center justify-center gap-1 sm:gap-2 overflow-hidden rounded-full border-2 border-white/40 bg-white/10 px-3 py-2.5 sm:px-4 sm:py-3 md:px-6 lg:px-8 md:py-3 lg:py-4 text-[11px] sm:text-xs md:text-sm lg:text-base font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20 whitespace-nowrap"
                            >
                                <span className="relative z-10">{language === 'hi' ? "यात्रा की योजना बनाएं" : "Plan Your Trip"}</span>
                                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>



                {/* RIGHT: Floating SHM Images */}
                <div className=" relative hidden w-full md:w-[45%] max-w-[400px] shrink-0 md:block md:h-[400px] lg:h-[550px] lg:max-w-[550px] xl:h-[650px] xl:max-w-[650px] flex-1 mt-16 md:mt-24">
                    {slide.orbitImages.map((src: string, i: number) => {
                        const staticPositions = [
                            { top: "5%", left: "-5%" },
                            { top: "0%", right: "-20%" },
                            { bottom: "0%", left: "0%" },
                            { bottom: "2%", right: "0%" },
                            { top: "35%", left: "25%" },
                        ];

                        const pos = staticPositions[i % staticPositions.length];

                        const yOffset = i % 2 === 0 ? [0, -40, 0] : [0, 45, 0];
                        const xOffset = i % 3 === 0 ? [0, 35, 0] : [0, -35, 0];
                        const duration = 4 + (i % 3);
                        const delay = i * 0.4;

                        const sizes = [
                            "h-32 w-32 md:h-36 md:w-36 lg:h-48 lg:w-48",
                            "h-40 w-40 md:h-44 md:w-44 lg:h-60 lg:w-60",
                            "h-36 w-36 md:h-40 md:w-40 lg:h-52 lg:w-52",
                            "h-28 w-28 md:h-32 md:w-32 lg:h-40 lg:w-40",
                            "h-48 w-48 md:h-52 md:w-52 lg:h-72 lg:w-72"
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
                                            className="rounded-[2rem] border-[3px] border-white/30 object-cover shadow-[0_15px_50px_rgba(0,0,0,0.6)] backdrop-blur-sm w-full h-full absolute inset-0"
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* MOBILE ONLY: Small images row between buttons and dots */}
            <div className="flex md:hidden absolute bottom-[4.5rem] left-1/2 -translate-x-1/2 w-full justify-center gap-4 px-4 z-20">
                {currentSlides[current].orbitImages.slice(0, 3).map((src: string, i: number) => (
                    <motion.div
                        key={`mobile-img-${current}-${i}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="relative h-20 w-[30%] max-w-[120px] rounded-xl overflow-hidden border-2 border-white/30 shadow-[0_8px_16px_rgba(0,0,0,0.4)] backdrop-blur-sm"
                    >
                        <Image
                            src={src}
                            alt={`Rajasthan preview ${i + 1}`}
                            fill
                            className="object-cover w-full h-full absolute inset-0"
                        />
                    </motion.div>
                ))}
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
