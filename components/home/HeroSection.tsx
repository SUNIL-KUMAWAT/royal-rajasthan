"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Calendar, Users, ChevronDown, Play } from "lucide-react";
import Link from "next/link";
import { HERO_SLIDES } from "@/constants/data";



export function HeroSection() {
    const [current, setCurrent] = useState(0);
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const slide = HERO_SLIDES[current];

    return (
        <section className="relative h-screen min-h-[600px] overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src={slide.image}
                        alt={slide.subtitle}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
                </motion.div>
            </AnimatePresence>

            <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
                <div className="text-center max-w-5xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`tag-${current}`}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm mb-6"
                        >
                            <MapPin size={14} className="text-gold-400" />
                            {slide.subtitle}
                        </motion.div>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={`title-${current}`}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
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
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10"
                        >
                            {slide.description}
                        </motion.p>
                    </AnimatePresence>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                    >
                        <Link
                            href="/destinations"
                            className="bg-gold-gradient text-white px-8 py-4 rounded-full font-semibold text-lg shadow-gold hover:shadow-gold-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-center"
                        >
                            Explore Rajasthan →
                        </Link>
                        {/* <Link
                            href="/packages"
                            className="bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2 justify-center"
                        >
                            Plan Your Trip
                        </Link> */}
                        <Link
                            href="/plan-trip"
                            className="bg-white/10 backdrop-blur-sm border-2 border-white/40 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2 justify-center"
                        >
                            Plan Your Trip
                        </Link>
                    </motion.div>

                    {/* <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                                <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3">
                                    <MapPin size={18} className="text-gold-500 flex-shrink-0" />
                                    <div>
                                        <div className="text-xs text-gray-400 font-medium">
                                            Destination
                                        </div>
                                        <select className="text-gray-700 font-medium text-sm bg-transparent outline-none w-full">
                                            <option>Where to go?</option>
                                            <option>Jaipur</option>
                                            <option>Udaipur</option>
                                            <option>Jodhpur</option>
                                            <option>Jaisalmer</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3">
                                    <Calendar size={18} className="text-gold-500 flex-shrink-0" />
                                    <div>
                                        <div className="text-xs text-gray-400 font-medium">
                                            Duration
                                        </div>
                                        <select className="text-gray-700 font-medium text-sm bg-transparent outline-none w-full">
                                            <option>How long?</option>
                                            <option>Weekend (2-3 Days)</option>
                                            <option>Short (4-6 Days)</option>
                                            <option>Week (7-9 Days)</option>
                                            <option>Long (10+ Days)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3">
                                    <Users size={18} className="text-gold-500 flex-shrink-0" />
                                    <div>
                                        <div className="text-xs text-gray-400 font-medium">
                                            Travelers
                                        </div>
                                        <select className="text-gray-700 font-medium text-sm bg-transparent outline-none w-full">
                                            <option>How many?</option>
                                            <option>Solo</option>
                                            <option>Couple</option>
                                            <option>Family (3-5)</option>
                                            <option>Group (6+)</option>
                                        </select>
                                    </div>
                                </div>
                                <button className="bg-gold-gradient text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-gold-lg transition-all hover:scale-[1.02]">
                                    <Search size={18} />
                                    Search
                                </button>
                            </div>
                        </div>
                    </motion.div> */}
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-1"
                >
                    {/* <span className="text-xs text-white/60 tracking-widest uppercase">
                        Scroll
                    </span> */}
                    <ChevronDown size={20} className="text-gold-400" />
                </motion.div>
            </div>

            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {HERO_SLIDES.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`transition-all duration-300 rounded-full ${i === current
                            ? "w-8 h-2 bg-gold-500"
                            : "w-2 h-2 bg-white/40 hover:bg-white/70"
                            }`}
                    />
                ))}
            </div>

            <AnimatePresence>
                {showVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        onClick={() => setShowVideo(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/gB0J5x6b7kI?autoplay=1"
                                title="Rajasthan Tourism"
                                allowFullScreen
                            />
                        </motion.div>
                        <button
                            onClick={() => setShowVideo(false)}
                            className="absolute top-4 right-4 text-white text-3xl hover:text-gold-400"
                        >
                            ×
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}