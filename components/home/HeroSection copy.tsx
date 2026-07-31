"use client";
import { useMemo } from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronDown } from "lucide-react";
import Link from "next/link";
import { HERO_SLIDES } from "@/constants/data";
/**
 * OrbitHeroSection
 * -----------------
 * - Full-bleed blurred background photo (dusk fort vibe)
 * - Left: single framed "postcard" image
 * - Right: 5 images orbiting clockwise around one fixed center image
 *
 * Replace the placeholder URLs below with real assets from your
 * `HERO_SLIDES` / destinations data — every image prop is swappable.
 */

const DEFAULTS = {
    background:
        "https://picsum.photos/seed/rajasthan-fort/1600/1000",
    leftImage:
        "https://picsum.photos/seed/rajasthan-left/700/900",
    centerImage:
        "https://picsum.photos/seed/rajasthan-center/300/300",
    orbitImages: [
        "https://picsum.photos/seed/rajasthan-orbit-1/200/200",
        "https://picsum.photos/seed/rajasthan-orbit-2/200/200",
        "https://picsum.photos/seed/rajasthan-orbit-3/200/200",
        "https://picsum.photos/seed/rajasthan-orbit-4/200/200",
        "https://picsum.photos/seed/rajasthan-orbit-5/200/200",
    ],
};

// how long one full clockwise loop takes (seconds) — bigger = slower
const ORBIT_DURATION = 36;
const ORBIT_RADIUS = 150; // px, distance of small circles from center

export function HeroSection({
    background = DEFAULTS.background,
    leftImage = DEFAULTS.leftImage,
    centerImage = DEFAULTS.centerImage,
    orbitImages = DEFAULTS.orbitImages,
    eyebrow = "Rajasthan, India",
    title = "Where every\nstone tells a story",
    description = "Forts, sand and gold — five journeys, one royal thread.",
}) {
    const positions = useMemo(() => {
        const count = orbitImages.length;
        return orbitImages.map((_, i) => {
            const angle = (360 / count) * i - 90; // start at top
            const rad = (angle * Math.PI) / 180;
            return {
                x: ORBIT_RADIUS * Math.cos(rad),
                y: ORBIT_RADIUS * Math.sin(rad),
            };
        });
    }, [orbitImages]);

    return (
        <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[#0b0a12]">
            {/* Blurred background */}
            <div className="absolute inset-0">
                <img
                    src={background}
                    alt=""
                    className="h-full w-full scale-110 object-cover blur-xl opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60" />
            </div>

            <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center gap-10 px-6 md:flex-row md:justify-between md:gap-6 md:px-12">
                {/* LEFT: single framed image */}
                <motion.div
                    initial={{ opacity: 0, x: -40, rotate: -6 }}
                    animate={{ opacity: 1, x: 0, rotate: -4 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                    className="relative hidden shrink-0 md:block"
                >
                    <div className="relative h-[420px] w-[300px] rotate-[-4deg] overflow-hidden rounded-[2rem] border-4 border-gold-400/70 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                        <img
                            src={leftImage}
                            alt="Rajasthan"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                    </div>
                    <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full border border-gold-400/40" />
                </motion.div>

                {/* CENTER: text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                    className="max-w-md text-center md:text-left"
                >
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold-300 backdrop-blur-sm">
                        {eyebrow}
                    </span>
                    <h1 className="whitespace-pre-line font-playfair text-4xl font-bold leading-tight text-white md:text-5xl">
                        {title}
                    </h1>
                    <p className="mt-4 text-base text-white/70 md:text-lg">
                        {description}
                    </p>
                </motion.div>

                {/* RIGHT: orbit */}
                <div className="relative h-[380px] w-[380px] shrink-0">
                    {/* faint guide ring */}
                    <div
                        className="absolute rounded-full border border-white/10"
                        style={{
                            top: "50%",
                            left: "50%",
                            width: ORBIT_RADIUS * 2 + 90,
                            height: ORBIT_RADIUS * 2 + 90,
                            transform: "translate(-50%, -50%)",
                        }}
                    />

                    {/* rotating wrapper — carries the 5 images clockwise */}
                    <motion.div
                        className="absolute inset-0"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: ORBIT_DURATION,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {orbitImages.map((src, i) => (
                            // NOTE: x/y only work on a motion component, not a plain <div>,
                            // so this positioning wrapper must be `motion.div`. We offset by
                            // -40 (half of h-20/w-20 = 80px) instead of a Tailwind translate
                            // class, since Tailwind's transform utility would otherwise be
                            // overwritten by framer-motion's own transform.
                            <motion.div
                                key={i}
                                className="absolute left-1/2 top-1/2 h-20 w-20"
                                style={{
                                    x: positions[i].x - 40,
                                    y: positions[i].y - 40,
                                }}
                            >
                                {/* counter-rotate so each photo stays upright */}
                                <motion.div
                                    className="h-full w-full"
                                    animate={{ rotate: -360 }}
                                    transition={{
                                        duration: ORBIT_DURATION,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                >
                                    <img
                                        src={src}
                                        alt=""
                                        className="h-full w-full rounded-full border-2 border-gold-400/80 object-cover shadow-lg shadow-black/40"
                                    />
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* fixed center image */}
                    <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2">
                        <div className="h-full w-full overflow-hidden rounded-full border-4 border-gold-400 shadow-[0_0_0_6px_rgba(0,0,0,0.35),0_20px_50px_rgba(0,0,0,0.5)]">
                            <img
                                src={centerImage}
                                alt="Rajasthan"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}





// In image paths ko apni actual images se replace kar dena
const LEFT_SIDE_IMAGE = "/images/hero/left-side.jpg";
const CENTER_ORBIT_IMAGE = "/images/hero/center-image.jpg";

const ORBIT_IMAGES = [
    "/images/hero/orbit-1.jpg",
    "/images/hero/orbit-2.jpg",
    "/images/hero/orbit-3.jpg",
    "/images/hero/orbit-4.jpg",
    "/images/hero/orbit-5.jpg",
];

export function HeroSection1() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 6000);

        return () => clearInterval(timer);
    }, []);

    const slide = HERO_SLIDES[current];
    const orbitRadius = 120;

    return (
        <section className="relative min-h-screen overflow-hidden bg-black">
            {/* Background slider with blur */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ scale: 1.08, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.96, opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="h-full w-full scale-110 object-cover blur-sm"
                    />
                    <div className="absolute inset-0 bg-black/45" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
                </motion.div>
            </AnimatePresence>

            {/* Main content */}
            <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-10 px-4 py-16 lg:grid-cols-[240px_1fr_420px] lg:items-center">

                {/* Left Side Image */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="order-2 mx-auto lg:order-1 lg:mx-0"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="relative h-[320px] w-[240px] overflow-hidden rounded-[30px] border border-white/20 bg-white/10 p-2 backdrop-blur-md shadow-2xl"
                    >
                        <img
                            src={LEFT_SIDE_IMAGE}
                            alt="Left side"
                            className="h-full w-full rounded-[24px] object-cover"
                        />
                        <div className="absolute inset-0 rounded-[30px] bg-gradient-to-t from-black/25 to-transparent" />
                    </motion.div>
                </motion.div>

                {/* Center Text Content */}
                <div className="order-1 text-center lg:order-2 lg:text-left">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`tag-${current}`}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm"
                        >
                            <MapPin size={14} className="text-yellow-400" />
                            {slide.subtitle}
                        </motion.div>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={`title-${current}`}
                            initial={{ opacity: 0, y: 35 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -35 }}
                            transition={{ duration: 0.8 }}
                            className="mb-6 font-playfair text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl xl:text-7xl"
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
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="mx-auto mb-10 max-w-2xl text-base text-white/80 sm:text-lg lg:mx-0"
                        >
                            {slide.description}
                        </motion.p>
                    </AnimatePresence>

                    <motion.div
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col items-center gap-4 sm:flex-row lg:items-start"
                    >
                        <Link
                            href="/destinations"
                            className="rounded-full bg-gold-gradient px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:scale-105"
                        >
                            Explore Rajasthan
                        </Link>

                        <Link
                            href="/plan-trip"
                            className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                        >
                            Plan Your Trip
                        </Link>
                    </motion.div>
                </div>

                {/* Right Orbit Images */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="order-3 flex items-center justify-center"
                >
                    <div className="relative h-[340px] w-[340px] sm:h-[400px] sm:w-[400px]">
                        {/* orbit rings */}
                        <div className="absolute inset-8 rounded-full border border-white/10" />
                        <div className="absolute inset-0 rounded-full border border-white/5" />

                        {/* Center image */}
                        <div className="absolute left-1/2 top-1/2 h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-white/30 bg-white/10 p-2 backdrop-blur-md shadow-[0_0_35px_rgba(255,255,255,0.12)] sm:h-[190px] sm:w-[190px]">
                            <img
                                src={CENTER_ORBIT_IMAGE}
                                alt="Center"
                                className="h-full w-full rounded-full object-cover"
                            />
                        </div>

                        {/* 5 orbit images rotating clockwise */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                                repeat: Infinity,
                                duration: 28,
                                ease: "linear",
                            }}
                            className="absolute inset-0"
                        >
                            {ORBIT_IMAGES.map((image, index) => {
                                const angle = (360 / ORBIT_IMAGES.length) * index - 90;
                                const x = orbitRadius * Math.cos((angle * Math.PI) / 180);
                                const y = orbitRadius * Math.sin((angle * Math.PI) / 180);

                                return (
                                    <div
                                        key={index}
                                        className="absolute"
                                        style={{
                                            left: `calc(50% + ${x}px)`,
                                            top: `calc(50% + ${y}px)`,
                                            transform: "translate(-50%, -50%)",
                                        }}
                                    >
                                        {/* reverse rotate so image seedhi rahe */}
                                        <motion.div
                                            animate={{ rotate: -360 }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 28,
                                                ease: "linear",
                                            }}
                                            className="h-20 w-20 overflow-hidden rounded-full border-4 border-white/20 bg-white/10 p-1.5 backdrop-blur-md shadow-xl sm:h-24 sm:w-24"
                                        >
                                            <img
                                                src={image}
                                                alt={`Orbit ${index + 1}`}
                                                className="h-full w-full rounded-full object-cover"
                                            />
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom indicators */}
            <div className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                {HERO_SLIDES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`rounded-full transition-all duration-300 ${i === current
                            ? "h-2 w-8 bg-yellow-400"
                            : "h-2 w-2 bg-white/40 hover:bg-white/70"
                            }`}
                    />
                ))}
            </div>

            {/* Scroll icon */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center text-white"
            >
                <ChevronDown size={20} className="text-yellow-400" />
            </motion.div>
        </section>
    );
}



/**
 * OrbitHeroSlider
 * ----------------
 * Same visual language as the original <HeroSection /> (auto-advancing
 * slides, crossfade, dot indicators, gold CTA buttons) but rebuilt with
 * the blurred-bg / left-image / orbiting-circle layout.
 *
 * Replace ORBIT_SLIDES below with real data — ideally extend your existing
 * HERO_SLIDES entries in @/constants/data with `leftImage`, `centerImage`
 * and `orbitImages` fields and import that instead.
 */

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

    const positions = useMemo(() => {
        const count = slide.orbitImages.length;
        return slide.orbitImages.map((_, i) => {
            const angle = (360 / count) * i - 90; // start at top
            const rad = (angle * Math.PI) / 180;
            return {
                x: ORBIT_RADIUS * Math.cos(rad),
                y: ORBIT_RADIUS * Math.sin(rad),
            };
        });
    }, [slide.orbitImages]);

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
                            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold-300 backdrop-blur-sm"
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
                            className="mt-4 text-base text-white/70 md:text-lg"
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
                                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gold-gradient px-8 py-4 text-lg font-semibold text-white shadow-gold transition-shadow duration-300 hover:shadow-gold-lg sm:w-auto"
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
                                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20 sm:w-auto"
                            >
                                <span className="relative z-10">Plan Your Trip</span>
                                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* RIGHT: orbit — keeps rotating continuously, images swap per slide */}
                <div className="relative h-[380px] w-[380px] shrink-0">
                    <div
                        className="absolute rounded-full border border-white/10"
                        style={{
                            top: "50%",
                            left: "50%",
                            width: ORBIT_RADIUS * 2 + 90,
                            height: ORBIT_RADIUS * 2 + 90,
                            transform: "translate(-50%, -50%)",
                        }}
                    />

                    <motion.div
                        className="absolute inset-0"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: ORBIT_DURATION,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {slide.orbitImages.map((src, i) => (
                            <motion.div
                                key={i}
                                className="absolute left-1/2 top-1/2 h-20 w-20"
                                style={{
                                    x: positions[i].x - 40,
                                    y: positions[i].y - 40,
                                }}
                            >
                                <motion.div
                                    className="h-full w-full"
                                    animate={{ rotate: -360 }}
                                    transition={{
                                        duration: ORBIT_DURATION,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={`orbit-${current}-${i}`}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.6 }}
                                            src={src}
                                            alt=""
                                            className="h-full w-full rounded-full border-2 border-gold-400/80 object-cover shadow-lg shadow-black/40"
                                        />
                                    </AnimatePresence>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2">
                        <div className="h-full w-full overflow-hidden rounded-full border-4 border-gold-400 shadow-[0_0_0_6px_rgba(0,0,0,0.35),0_20px_50px_rgba(0,0,0,0.5)]">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={`center-${current}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6 }}
                                    src={slide.centerImage}
                                    alt={slide.subtitle}
                                    className="h-full w-full object-cover"
                                />
                            </AnimatePresence>
                        </div>
                    </div>
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


// "use client";
// import { useMemo } from "react";
// import { motion } from "framer-motion";

// /**
//  * OrbitHeroSection
//  * -----------------
//  * - Full-bleed blurred background photo (dusk fort vibe)
//  * - Left: single framed "postcard" image
//  * - Right: 5 images orbiting clockwise around one fixed center image
//  *
//  * Replace the placeholder URLs below with real assets from your
//  * `HERO_SLIDES` / destinations data — every image prop is swappable.
//  */

// const DEFAULTS = {
//     background:
//         "https://picsum.photos/seed/rajasthan-fort/1600/1000",
//     leftImage:
//         "https://picsum.photos/seed/rajasthan-left/700/900",
//     centerImage:
//         "https://picsum.photos/seed/rajasthan-center/300/300",
//     orbitImages: [
//         "https://picsum.photos/seed/rajasthan-orbit-1/200/200",
//         "https://picsum.photos/seed/rajasthan-orbit-2/200/200",
//         "https://picsum.photos/seed/rajasthan-orbit-3/200/200",
//         "https://picsum.photos/seed/rajasthan-orbit-4/200/200",
//         "https://picsum.photos/seed/rajasthan-orbit-5/200/200",
//     ],
// };

// // how long one full clockwise loop takes (seconds) — bigger = slower
// const ORBIT_DURATION = 36;
// const ORBIT_RADIUS = 150; // px, distance of small circles from center

// export function HeroSection
//     ({
//         background = DEFAULTS.background,
//         leftImage = DEFAULTS.leftImage,
//         centerImage = DEFAULTS.centerImage,
//         orbitImages = DEFAULTS.orbitImages,
//         eyebrow = "Rajasthan, India",
//         title = "Where every\nstone tells a story",
//         description = "Forts, sand and gold — five journeys, one royal thread.",
//     }) {
//     const positions = useMemo(() => {
//         const count = orbitImages.length;
//         return orbitImages.map((_, i) => {
//             const angle = (360 / count) * i - 90; // start at top
//             const rad = (angle * Math.PI) / 180;
//             return {
//                 x: ORBIT_RADIUS * Math.cos(rad),
//                 y: ORBIT_RADIUS * Math.sin(rad),
//             };
//         });
//     }, [orbitImages]);

//     return (
//         <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[#0b0a12]">
//             {/* Blurred background */}
//             <div className="absolute inset-0">
//                 <img
//                     src={background}
//                     alt=""
//                     className="h-full w-full scale-110 object-cover blur-2xl opacity-50"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />
//             </div>

//             <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center gap-10 px-6 md:flex-row md:justify-between md:gap-6 md:px-12">
//                 {/* LEFT: single framed image */}
//                 <motion.div
//                     initial={{ opacity: 0, x: -40, rotate: -6 }}
//                     animate={{ opacity: 1, x: 0, rotate: -4 }}
//                     transition={{ duration: 0.9, ease: "easeOut" }}
//                     className="relative hidden shrink-0 md:block"
//                 >
//                     <div className="relative h-[420px] w-[300px] rotate-[-4deg] overflow-hidden rounded-[2rem] border-4 border-gold-400/70 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
//                         <img
//                             src={leftImage}
//                             alt="Rajasthan"
//                             className="h-full w-full object-cover"
//                         />
//                         <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
//                     </div>
//                     <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full border border-gold-400/40" />
//                 </motion.div>

//                 {/* CENTER: text */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
//                     className="max-w-md text-center md:text-left"
//                 >
//                     <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold-300 backdrop-blur-sm">
//                         {eyebrow}
//                     </span>
//                     <h1 className="whitespace-pre-line font-playfair text-4xl font-bold leading-tight text-white md:text-5xl">
//                         {title}
//                     </h1>
//                     <p className="mt-4 text-base text-white/70 md:text-lg">
//                         {description}
//                     </p>
//                 </motion.div>

//                 {/* RIGHT: orbit */}
//                 <div className="relative h-[380px] w-[380px] shrink-0">
//                     {/* faint guide ring */}
//                     <div
//                         className="absolute rounded-full border border-white/10"
//                         style={{
//                             top: "50%",
//                             left: "50%",
//                             width: ORBIT_RADIUS * 2 + 90,
//                             height: ORBIT_RADIUS * 2 + 90,
//                             transform: "translate(-50%, -50%)",
//                         }}
//                     />

//                     {/* rotating wrapper — carries the 5 images clockwise */}
//                     <motion.div
//                         className="absolute inset-0"
//                         animate={{ rotate: 360 }}
//                         transition={{
//                             duration: ORBIT_DURATION,
//                             repeat: Infinity,
//                             ease: "linear",
//                         }}
//                     >
//                         {orbitImages.map((src, i) => (
//                             <div
//                                 key={i}
//                                 className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2"
//                                 style={{
//                                     x: positions[i].x,
//                                     y: positions[i].y,
//                                 }}
//                             >
//                                 {/* counter-rotate so each photo stays upright */}
//                                 <motion.div
//                                     className="h-full w-full"
//                                     animate={{ rotate: -360 }}
//                                     transition={{
//                                         duration: ORBIT_DURATION,
//                                         repeat: Infinity,
//                                         ease: "linear",
//                                     }}
//                                 >
//                                     <img
//                                         src={src}
//                                         alt=""
//                                         className="h-full w-full rounded-full border-2 border-gold-400/80 object-cover shadow-lg shadow-black/40"
//                                     />
//                                 </motion.div>
//                             </div>
//                         ))}
//                     </motion.div>

//                     {/* fixed center image */}
//                     <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2">
//                         <div className="h-full w-full overflow-hidden rounded-full border-4 border-gold-400 shadow-[0_0_0_6px_rgba(0,0,0,0.35),0_20px_50px_rgba(0,0,0,0.5)]">
//                             <img
//                                 src={centerImage}
//                                 alt="Rajasthan"
//                                 className="h-full w-full object-cover"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }


// "use client";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Search, MapPin, Calendar, Users, ChevronDown, Play } from "lucide-react";
// import Link from "next/link";
// import { HERO_SLIDES } from "@/constants/data";



// export function HeroSection() {
//     const [current, setCurrent] = useState(0);
//     const [showVideo, setShowVideo] = useState(false);

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
//         }, 6000);
//         return () => clearInterval(timer);
//     }, []);

//     const slide = HERO_SLIDES[current];

//     return (
//         <section className="relative h-screen min-h-[600px] overflow-hidden">
//             <AnimatePresence mode="wait">
//                 <motion.div
//                     key={current}
//                     initial={{ scale: 1.1, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     exit={{ scale: 0.9, opacity: 0 }}
//                     transition={{ duration: 1.5, ease: "easeInOut" }}
//                     className="absolute inset-0"
//                 >
//                     <img
//                         src={slide.image}
//                         alt={slide.subtitle}
//                         className="w-full h-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
//                 </motion.div>
//             </AnimatePresence>

//             <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
//                 <div className="text-center max-w-5xl mx-auto">
//                     <AnimatePresence mode="wait">
//                         <motion.div
//                             key={`tag-${current}`}
//                             initial={{ opacity: 0, y: -20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: 20 }}
//                             className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm mb-6"
//                         >
//                             <MapPin size={14} className="text-gold-400" />
//                             {slide.subtitle}
//                         </motion.div>
//                     </AnimatePresence>

//                     <AnimatePresence mode="wait">
//                         <motion.h1
//                             key={`title-${current}`}
//                             initial={{ opacity: 0, y: 40 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -40 }}
//                             transition={{ duration: 0.8, delay: 0.2 }}
//                             className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
//                         >
//                             {slide.title}
//                         </motion.h1>
//                     </AnimatePresence>

//                     <AnimatePresence mode="wait">
//                         <motion.p
//                             key={`desc-${current}`}
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0 }}
//                             transition={{ duration: 0.8, delay: 0.4 }}
//                             className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10"
//                         >
//                             {slide.description}
//                         </motion.p>
//                     </AnimatePresence>

//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.6 }}
//                         className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
//                     >
//                         <motion.div
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.98 }}
//                             transition={{ type: "spring", stiffness: 400, damping: 15 }}
//                             className="w-full sm:w-auto"
//                         >
//                             <Link
//                                 href="/destinations"
//                                 className="w-full bg-gold-gradient text-white px-8 py-4 rounded-full font-semibold text-lg shadow-gold hover:shadow-gold-lg transition-shadow duration-300 flex items-center gap-2 justify-center relative overflow-hidden group"
//                             >
//                                 <span className="relative z-10 flex items-center gap-2">
//                                     Explore Rajasthan
//                                     <motion.span
//                                         className="inline-block"
//                                         animate={{ x: [0, 4, 0] }}
//                                         transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
//                                     >
//                                         →
//                                     </motion.span>
//                                 </span>
//                                 <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
//                             </Link>
//                         </motion.div>

//                         <motion.div
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.98 }}
//                             transition={{ type: "spring", stiffness: 400, damping: 15 }}
//                             className="w-full sm:w-auto"
//                         >
//                             <Link
//                                 href="/plan-trip"
//                                 className="w-full bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-colors duration-300 flex items-center gap-2 justify-center relative overflow-hidden group"
//                             >
//                                 <span className="relative z-10">Plan Your Trip</span>
//                                 <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
//                             </Link>
//                         </motion.div>
//                     </motion.div>

//                     {/* <motion.div
//                         initial={{ opacity: 0, y: 30 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.8 }}
//                         className="max-w-4xl mx-auto"
//                     >
//                         <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2">
//                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
//                                 <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3">
//                                     <MapPin size={18} className="text-gold-500 flex-shrink-0" />
//                                     <div>
//                                         <div className="text-xs text-gray-400 font-medium">
//                                             Destination
//                                         </div>
//                                         <select className="text-gray-700 font-medium text-sm bg-transparent outline-none w-full">
//                                             <option>Where to go?</option>
//                                             <option>Jaipur</option>
//                                             <option>Udaipur</option>
//                                             <option>Jodhpur</option>
//                                             <option>Jaisalmer</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3">
//                                     <Calendar size={18} className="text-gold-500 flex-shrink-0" />
//                                     <div>
//                                         <div className="text-xs text-gray-400 font-medium">
//                                             Duration
//                                         </div>
//                                         <select className="text-gray-700 font-medium text-sm bg-transparent outline-none w-full">
//                                             <option>How long?</option>
//                                             <option>Weekend (2-3 Days)</option>
//                                             <option>Short (4-6 Days)</option>
//                                             <option>Week (7-9 Days)</option>
//                                             <option>Long (10+ Days)</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3">
//                                     <Users size={18} className="text-gold-500 flex-shrink-0" />
//                                     <div>
//                                         <div className="text-xs text-gray-400 font-medium">
//                                             Travelers
//                                         </div>
//                                         <select className="text-gray-700 font-medium text-sm bg-transparent outline-none w-full">
//                                             <option>How many?</option>
//                                             <option>Solo</option>
//                                             <option>Couple</option>
//                                             <option>Family (3-5)</option>
//                                             <option>Group (6+)</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <button className="bg-gold-gradient text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-gold-lg transition-all hover:scale-[1.02]">
//                                     <Search size={18} />
//                                     Search
//                                 </button>
//                             </div>
//                         </div>
//                     </motion.div> */}
//                 </div>

//                 <motion.div
//                     animate={{ y: [0, 10, 0] }}
//                     transition={{ repeat: Infinity, duration: 2 }}
//                     className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-1"
//                 >
//                     {/* <span className="text-xs text-white/60 tracking-widest uppercase">
//                         Scroll
//                     </span> */}
//                     <ChevronDown size={20} className="text-gold-400" />
//                 </motion.div>
//             </div>

//             <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-20">
//                 {HERO_SLIDES.map((_, i) => (
//                     <button
//                         key={i}
//                         onClick={() => setCurrent(i)}
//                         className={`transition-all duration-300 rounded-full ${i === current
//                             ? "w-8 h-2 bg-gold-500"
//                             : "w-2 h-2 bg-white/40 hover:bg-white/70"
//                             }`}
//                     />
//                 ))}
//             </div>

//             <AnimatePresence>
//                 {showVideo && (
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
//                         onClick={() => setShowVideo(false)}
//                     >
//                         <motion.div
//                             initial={{ scale: 0.8 }}
//                             animate={{ scale: 1 }}
//                             exit={{ scale: 0.8 }}
//                             className="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
//                             onClick={(e) => e.stopPropagation()}
//                         >
//                             <iframe
//                                 className="w-full h-full"
//                                 src="https://www.youtube.com/embed/gB0J5x6b7kI?autoplay=1"
//                                 title="Rajasthan Tourism"
//                                 allowFullScreen
//                             />
//                         </motion.div>
//                         <button
//                             onClick={() => setShowVideo(false)}
//                             className="absolute top-4 right-4 text-white text-3xl hover:text-gold-400"
//                         >
//                             ×
//                         </button>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </section>
//     );
// }