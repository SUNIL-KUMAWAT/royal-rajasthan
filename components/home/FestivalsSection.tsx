// components/home/FestivalsSection.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter
} from "lucide-react";

import { FESTIVALS, FESTIVALS_HINDI } from "@/constants/data";
import { useLanguage } from "@/components/LanguageProvider";
import { TiltCard } from "./TiltCard";

// ============ TYPES ============
interface Festival {
  id: number;
  name: string;
  image: string;
  location: string;
  month: string;
  duration: string;
  description: string;
  highlights: string[];
  rating: number;
  nextDate?: string;
  isFeatured?: boolean;
}

// ============ COUNTDOWN ============
function Countdown({ targetDate }: { targetDate?: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    if (!targetDate) return;

    const calculate = () => {
      const target = new Date(targetDate).getTime();
      if (isNaN(target)) return;

      const diff = target - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      });
    };

    calculate();
    const interval = setInterval(calculate, 60000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!targetDate) {
    return <div className="text-white/70 text-sm">Coming Soon</div>;
  }

  return (
    <div className="flex gap-3">
      {[
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Min" },
      ].map((item) => (
        <div key={item.label} className="text-center group">
          <div className="w-16 h-16 rounded-2xl bg-white/10 dark:bg-gray-900/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 flex items-center justify-center text-white font-bold text-2xl shadow-[inset_0_1px_4px_rgba(255,255,255,0.3),0_8px_16px_rgba(0,0,0,0.4)] group-hover:shadow-[inset_0_1px_4px_rgba(255,255,255,0.3),0_12px_24px_rgba(251,191,36,0.3)] transition-all duration-300">
            <span className="bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">{String(item.value).padStart(2, "0")}</span>
          </div>
          <p className="text-xs text-white/80 mt-2 font-medium uppercase tracking-wider">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

// ============ FESTIVAL HERO ============
function FestivalHero({ festival, onNext, onPrev }: { festival: Festival, onNext: () => void, onPrev: () => void }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={festival.id}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="relative h-[80vh] rounded-[40px] overflow-hidden"
      >
        <img
          src={festival.image}
          alt={festival.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* Content */}
        <div className="absolute left-6 md:left-12 bottom-24 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 rounded-full
              bg-yellow-500/20 border border-yellow-400/20
              text-yellow-300 mb-6 text-sm backdrop-blur-md"
          >
            Featured Festival
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-7xl font-bold
              text-white mb-4 font-playfair drop-shadow-xl"
          >
            {festival.name}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 mt-6 mb-6 text-white/90 font-medium"
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
              <MapPin size={16} className="text-gold-400" />
              <span className="text-sm">{festival.location}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
              <Calendar size={16} className="text-gold-400" />
              <span className="text-sm">{festival.month}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg">
              <Clock size={16} className="text-gold-400" />
              <span className="text-sm">{festival.duration}</span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 text-sm md:text-lg max-w-2xl
              leading-relaxed hidden md:block"
          >
            {festival.description}
          </motion.p>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-6 z-20">
          <button onClick={onPrev} className="w-14 h-14 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl flex items-center justify-center text-white shadow-[0_4px_12px_rgba(0,0,0,0.4)] hover:bg-white/20 hover:scale-110 hover:shadow-[0_8px_24px_rgba(251,191,36,0.5)] hover:border-gold-400/50 transition-all duration-300">
            <ChevronLeft size={28} />
          </button>
          <button onClick={onNext} className="w-14 h-14 rounded-full border border-white/20 bg-black/40 backdrop-blur-xl flex items-center justify-center text-white shadow-[0_4px_12px_rgba(0,0,0,0.4)] hover:bg-white/20 hover:scale-110 hover:shadow-[0_8px_24px_rgba(251,191,36,0.5)] hover:border-gold-400/50 transition-all duration-300">
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Countdown */}
        <div className="absolute right-4 md:right-8 bottom-8 md:bottom-12
          backdrop-blur-2xl bg-black/30 border border-white/10
          rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl">
          <p className="text-white/70 text-xs md:text-sm mb-3 md:mb-4 font-medium uppercase tracking-widest">
            Next Festival Starts In
          </p>
          <Countdown targetDate={festival.nextDate} />
        </div>

        {/* Rating */}
        <div className="absolute top-8 right-8 flex items-center gap-2
          backdrop-blur-xl bg-black/30 border border-white/20
          rounded-full px-5 py-2.5 shadow-lg">
          <Star size={18} className="text-yellow-400 fill-yellow-400" />
          <span className="text-white font-bold text-lg">{festival.rating}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ============ MAIN COMPONENT (Named Export) ============
export function FestivalsSection() {
  const { language } = useLanguage();
  const currentFestivals = language === 'hi' ? FESTIVALS_HINDI : FESTIVALS;

  const [active, setActive] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);

  const festival = currentFestivals[active] as Festival;
  const progress = ((active + 1) / currentFestivals.length) * 100;

  const handleNext = () => setActive((prev) => (prev + 1) % currentFestivals.length);
  const handlePrev = () => setActive((prev) => (prev - 1 + currentFestivals.length) % currentFestivals.length);

  const uniqueLocations = useMemo(() => {
    const locs = Array.from(new Set(currentFestivals.map((f: any) => f.location)));
    return ["All", ...locs];
  }, [currentFestivals]);

  const filteredFestivals = useMemo(() => {
    return currentFestivals.filter((f: any) => {
      let matchSearch = true;
      if (searchTerm) {
        try {
          const regex = new RegExp(searchTerm, "i");
          matchSearch = regex.test(f.name);
        } catch (e) {
          matchSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase());
        }
      }
      const matchLocation = selectedLocation === "All" || f.location === selectedLocation;
      return matchSearch && matchLocation;
    });
  }, [searchTerm, selectedLocation, currentFestivals]);

  const visibleFestivals = filteredFestivals.slice(0, visibleCount);

  const handleLoadMore = () => {
    const nextItemIndex = visibleCount;
    setVisibleCount(prev => prev + 8);
    // Smooth scroll exactly to the first newly loaded card
    setTimeout(() => {
      const element = document.getElementById(`festival-card-${nextItemIndex}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <section className="relative bg-[#070b16] overflow-hidden pt-16 pb-32">
      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px]
        bg-yellow-500/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px]
        bg-orange-500/10 rounded-full blur-[200px] pointer-events-none" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: [0, 0.4, 0], y: [0, 1200] }}
            transition={{
              duration: 15 + index,
              repeat: Infinity,
              delay: index * 0.4,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-yellow-400"
            style={{ left: `${(index * 5) % 100}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">

        {/* Festival Hero Slider */}
        <FestivalHero festival={festival} onNext={handleNext} onPrev={handlePrev} />

        {/* Progress Bar */}
        <div className="mt-8 h-1.5 bg-white/10 rounded-full overflow-hidden max-w-2xl mx-auto">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400
              via-orange-500 to-red-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Festival Details */}
        <div className="mt-32 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-yellow-400 uppercase tracking-[4px]
              font-semibold text-sm">
              Festival Details
            </span>

            <h2 className="mt-4 text-3xl md:text-5xl font-bold
              text-white font-playfair">
              {festival.name}
            </h2>

            <div className="flex flex-wrap gap-6 mt-6 mb-8">
              {[
                { icon: MapPin, text: festival.location },
                { icon: Calendar, text: festival.month },
                { icon: Clock, text: festival.duration },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-yellow-400 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                  <Icon size={18} />
                  <span className="text-white/90 text-sm md:text-base font-medium">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-white/70 leading-8 text-base md:text-lg">
              {festival.description}
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-3 mt-8">
              {festival.highlights.map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white text-sm font-medium cursor-default shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-white/10 hover:border-white/20 hover:shadow-[0_4px_12px_rgba(251,191,36,0.15)] transition-all"
                >
                  {item}
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link href="/plan-trip">
                <button className="px-6 md:px-8 py-3 md:py-4 rounded-full bg-gradient-to-r from-maroon-500 to-maroon-700 text-white font-bold flex items-center gap-2 text-sm md:text-base shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_8px_16px_rgba(153,27,27,0.3)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_24px_rgba(153,27,27,0.4)] hover:-translate-y-1 active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-300 group/btn">
                  <span>Plan Visit</span>
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-5"
          >
            {[
              {
                label: "Festival Rating",
                value: festival.rating,
                isRating: true,
              },
              {
                label: "Duration",
                value: festival.duration,
                isRating: false,
              },
              {
                label: "Best Month",
                value: festival.month,
                isRating: false,
              },
              {
                label: "Location",
                value: festival.location,
                isRating: false,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="group relative rounded-3xl p-6 bg-white/5 border border-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:bg-white/10 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:border-white/20 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
                <h4 className="text-white/60 text-sm mb-4 font-medium uppercase tracking-wider">{item.label}</h4>
                {item.isRating ? (
                  <div className="flex items-center gap-2">
                    <Star className="text-gold-400 fill-gold-400 w-6 h-6 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
                      {item.value}
                    </span>
                  </div>
                ) : (
                  <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
                    {item.value}
                  </h3>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Experience The Magic */}
        <div className="mt-32 border-t border-white/10 pt-24">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="uppercase tracking-[6px] text-yellow-400
              font-semibold text-sm">
              Rajasthan Festivals
            </span>

            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl
              font-bold text-white leading-tight font-playfair">
              Experience The{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400
                to-red-400 bg-clip-text text-transparent">
                Magic
              </span>
            </h1>
            <p className="text-white/60 mt-6 max-w-3xl mx-auto text-sm
              sm:text-base md:text-lg leading-relaxed">
              Discover The Cultural Soul of Rajasthan. Experience centuries-old traditions, vibrant celebrations,
              royal processions and unforgettable cultural festivals.
            </p>
          </motion.div>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-md">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
              <input
                type="text"
                placeholder="Search festival by name (e.g. desert|camel)"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setVisibleCount(8);
                }}
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-yellow-400/50 transition-colors shadow-inner"
              />
            </div>

            <div className="relative w-full md:w-auto min-w-[200px]">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
              <select
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  setVisibleCount(8);
                }}
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-12 pr-10 text-white focus:outline-none focus:border-yellow-400/50 transition-colors shadow-inner appearance-none cursor-pointer"
              >
                {uniqueLocations.map(loc => (
                  <option key={loc} value={loc} className="bg-gray-900 text-white">{loc}</option>
                ))}
              </select>
              {/* Custom arrow */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                <ChevronRight size={16} className="rotate-90" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {visibleFestivals.map((f: any, idx: number) => (
                <motion.div
                  key={f.id}
                  id={`festival-card-${idx}`}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ duration: 0.5 }}
                  className="scroll-mt-32"
                >
                  <TiltCard maxTilt={10} className="h-full">
                    <Link href={`/festivals/${f.id}`} className="block h-full">
                      <div
                        className="group relative overflow-hidden rounded-3xl h-[280px] cursor-pointer shadow-lg hover:shadow-[0_20px_40px_rgba(251,191,36,0.15)] transition-all duration-500 border border-white/10 hover:border-gold-400/50 transform-gpu z-10"
                        style={{ transform: "translateZ(30px)" }}
                      >
                        <img
                          src={f.image}
                          alt={f.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

                        <div className="absolute bottom-4 left-4 right-4 transform transition-transform duration-500 group-hover:-translate-y-2" style={{ transform: "translateZ(20px)" }}>
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-3">
                            <MapPin size={12} className="text-gold-400" />
                            <span className="text-white/90 text-xs font-medium">{f.location}</span>
                          </div>
                          <h4 className="text-white font-bold text-lg md:text-xl drop-shadow-md leading-tight">{f.name}</h4>
                        </div>
                      </div>
                    </Link>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredFestivals.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/60 text-lg">No festivals found matching your criteria.</p>
            </div>
          )}

          {/* ── Load More button ── */}
          {visibleCount < filteredFestivals.length && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-16 flex flex-col items-center gap-3"
            >
              <p className="text-sm text-white/50 font-medium">
                Showing {visibleFestivals.length} of {filteredFestivals.length} festivals
              </p>
              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={(e: any) => {
                  e.preventDefault();
                  handleLoadMore();
                }}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300
                  bg-transparent border-2 border-yellow-500
                  text-yellow-400
                  hover:bg-yellow-500 hover:text-black
                  shadow-md hover:shadow-yellow-500/30 group"
              >
                <Calendar size={16} className="group-hover:text-black" />
                Load More Festivals
                <span className="bg-yellow-500/20 group-hover:bg-black/20 text-yellow-400 group-hover:text-black px-2 py-0.5 rounded-full text-xs font-bold border border-transparent transition-colors">
                  +{Math.min(8, filteredFestivals.length - visibleCount)} more
                </span>
              </motion.button>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}



