"use client";
import { useMemo } from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronDown } from "lucide-react";
import Link from "next/link";
import { HERO_SLIDES } from "@/constants/data";



const ORBIT_RADIUS = 150;
const ORBIT_SLIDES = [
    {
        subtitle: "Jaipur, The Pink City",
        title: "Where every\nstone tells a story",
        description: "Forts, sand and gold — five journeys, one royal thread.",
        background: "https://picsum.photos/seed/jaipur-bg/1600/1000",
        leftImage: "https://picsum.photos/seed/jaipur-left/700/900",
        centerImage: "https://picsum.photos/seed/jaipur-center/300/300",
        orbitImages: [
            "https://picsum.photos/seed/jaipur-orbit-1/200/200",
            "https://picsum.photos/seed/jaipur-orbit-2/200/200",
            "https://picsum.photos/seed/jaipur-orbit-3/200/200",
            "https://picsum.photos/seed/jaipur-orbit-4/200/200",
            "https://picsum.photos/seed/jaipur-orbit-5/200/200",
        ],
    },
    {
        subtitle: "Udaipur, City of Lakes",
        title: "Palaces that\nfloat on water",
        description: "Marble courtyards, still lakes, and sunsets in gold.",
        background: "https://picsum.photos/seed/udaipur-bg/1600/1000",
        leftImage: "https://picsum.photos/seed/udaipur-left/700/900",
        centerImage: "https://picsum.photos/seed/udaipur-center/300/300",
        orbitImages: [
            "https://picsum.photos/seed/udaipur-orbit-1/200/200",
            "https://picsum.photos/seed/udaipur-orbit-2/200/200",
            "https://picsum.photos/seed/udaipur-orbit-3/200/200",
            "https://picsum.photos/seed/udaipur-orbit-4/200/200",
            "https://picsum.photos/seed/udaipur-orbit-5/200/200",
        ],
    },
    {
        subtitle: "Jaisalmer, The Golden City",
        title: "Dunes that turn\ngold at dusk",
        description: "A living fort rising from the Thar desert sands.",
        background: "https://picsum.photos/seed/jaisalmer-bg/1600/1000",
        leftImage: "https://picsum.photos/seed/jaisalmer-left/700/900",
        centerImage: "https://picsum.photos/seed/jaisalmer-center/300/300",
        orbitImages: [
            "https://picsum.photos/seed/jaisalmer-orbit-1/200/200",
            "https://picsum.photos/seed/jaisalmer-orbit-2/200/200",
            "https://picsum.photos/seed/jaisalmer-orbit-3/200/200",
            "https://picsum.photos/seed/jaisalmer-orbit-4/200/200",
            "https://picsum.photos/seed/jaisalmer-orbit-5/200/200",
        ],
    },
];

const SLIDE_INTERVAL = 6000; // ms, matches original HeroSection

export function HeroSection2({ slides = ORBIT_SLIDES }) {
    const [current, setCurrent] = useState(0);
    const slide = slides[current];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, SLIDE_INTERVAL);
        return () => clearInterval(timer);
    }, [slides.length]);



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
                    <img
                        src={slide.background}
                        alt=""
                        className="h-full w-full object-cover blur-[6px] opacity-90"
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
                            <img
                                src={slide.leftImage}
                                alt={slide.subtitle}
                                className="h-full w-full object-cover"
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
                                    Explore Rajasthan
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
                                <span className="relative z-10">Plan Your Trip</span>
                                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* RIGHT: Floating SHM Images */}
                <div className="relative hidden w-full max-w-[400px] shrink-0 sm:block md:h-[550px] md:max-w-[550px] lg:h-[650px] lg:max-w-[650px] flex-1 mt-16 md:mt-24">
                    {slide.orbitImages.map((src, i) => {
                        // Spread them out over the larger area to prevent too much overlap
                        // Shifted downwards to avoid the navigation header
                        const staticPositions = [
                            { top: "5%", left: "-5%" },       // 0: top-left (shifted down)
                            { top: "15%", right: "-10%" },    // 1: top-right (shifted down)
                            { bottom: "-5%", left: "0%" },    // 2: bottom-left
                            { bottom: "0%", right: "0%" },    // 3: bottom-right
                            { top: "35%", left: "25%" },      // 4: center (shifted down)
                        ];

                        const pos = staticPositions[i % staticPositions.length];

                        // SHM parameters with larger movement radii
                        const yOffset = i % 2 === 0 ? [0, -40, 0] : [0, 45, 0];
                        const xOffset = i % 3 === 0 ? [0, 35, 0] : [0, -35, 0];
                        const duration = 4 + (i % 3);
                        const delay = i * 0.4;

                        // Significantly larger image sizes for desktop
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
                                    <motion.img
                                        key={`float-${current}-${i}`}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                        src={src}
                                        alt=""
                                        className="h-full w-full rounded-[2rem] border-[3px] border-white/30 object-cover shadow-[0_15px_50px_rgba(0,0,0,0.6)] backdrop-blur-sm"
                                    />
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Dot indicators — same style as original HeroSection */}
            <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
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
