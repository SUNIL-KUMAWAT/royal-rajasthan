// components/home/FestivalsSection.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FESTIVALS } from "@/constants/data";

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
        <div key={item.label} className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white font-bold text-xl">
            {String(item.value).padStart(2, "0")}
          </div>
          <p className="text-xs text-white/60 mt-2">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

// ============ FESTIVAL CARD ============
function FestivalCard({
  festival,
  active,
}: {
  festival: Festival;
  active: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`
        group relative h-[280px] rounded-3xl overflow-hidden
        cursor-pointer transition-all duration-500
        ${active
          ? "ring-2 ring-yellow-400 scale-[1.03]"
          : "opacity-80 hover:opacity-100"
        }
      `}
    >
      <img
        src={festival.image}
        alt={festival.name}
        className="absolute inset-0 w-full h-full object-cover
          transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <div className="absolute bottom-4 left-4 right-4 backdrop-blur-xl
        bg-black/30 border border-white/10 rounded-2xl p-4">
        <h4 className="text-white font-bold text-base md:text-lg">
          {festival.name}
        </h4>
        <div className="flex items-center gap-2 mt-2">
          <MapPin size={14} className="text-yellow-400" />
          <span className="text-white/70 text-sm">{festival.location}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ============ FESTIVAL HERO ============
function FestivalHero({ festival }: { festival: Festival }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={festival.id}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
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
        <div className="absolute left-6 md:left-12 bottom-12 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 rounded-full
              bg-yellow-500/20 border border-yellow-400/20
              text-yellow-300 mb-6 text-sm"
          >
            Featured Festival
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold
              text-white mb-4 font-playfair"
          >
            {festival.name}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-sm md:text-lg max-w-2xl
              leading-relaxed hidden md:block"
          >
            {festival.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <button className="px-6 md:px-8 py-3 md:py-4 rounded-full
              bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500
              text-white font-semibold flex items-center gap-2
              hover:scale-105 transition-all text-sm md:text-base">
              Explore Festival
              <ArrowRight size={18} />
            </button>
            <button className="px-6 md:px-8 py-3 md:py-4 rounded-full
              backdrop-blur-xl bg-white/10 border border-white/20
              text-white text-sm md:text-base">
              View Gallery
            </button>
          </motion.div>
        </div>

        {/* Countdown */}
        <div className="absolute right-4 md:right-6 bottom-4 md:bottom-6
          backdrop-blur-2xl bg-black/30 border border-white/10
          rounded-2xl md:rounded-3xl p-4 md:p-6">
          <p className="text-white/70 text-xs md:text-sm mb-3 md:mb-4">
            Next Festival Starts In
          </p>
          <Countdown targetDate={festival.nextDate} />
        </div>

        {/* Rating */}
        <div className="absolute top-6 right-6 flex items-center gap-2
          backdrop-blur-xl bg-black/30 border border-white/10
          rounded-full px-4 py-2">
          <Star size={16} className="text-yellow-400 fill-yellow-400" />
          <span className="text-white font-semibold">{festival.rating}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ============ MAIN COMPONENT (Named Export) ============
export function FestivalsSection() {
  const [active, setActive] = useState(0);
  const festival = FESTIVALS[active] as Festival;
  const progress = ((active + 1) / FESTIVALS.length) * 100;

  return (
    <section className="relative bg-[#070b16] overflow-hidden mt-16">
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-20">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="uppercase tracking-[6px] text-yellow-400
            font-semibold text-sm">
            Rajasthan Festivals
          </span>

          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl
            font-bold text-white leading-tight font-playfair">
            Discover The{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400
              to-red-400 bg-clip-text text-transparent">
              Cultural Soul
            </span>{" "}
            of Rajasthan
          </h1>

          <p className="text-white/60 mt-6 max-w-3xl mx-auto text-sm
            sm:text-base md:text-lg leading-relaxed">
            Experience centuries-old traditions, vibrant celebrations,
            royal processions and unforgettable cultural festivals.
          </p>
        </motion.div>

        {/* Festival Hero */}
        <FestivalHero festival={festival} />

        {/* Progress Bar */}
        <div className="mt-6 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400
              via-orange-500 to-red-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Featured Festivals Slider */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold
              text-white font-playfair">
              Featured Festivals
            </h2>
            <div className="flex gap-3">
              <button className="swiper-prev-btn w-12 h-12 rounded-full
                border border-white/10 bg-white/5 backdrop-blur-xl
                flex items-center justify-center text-white
                hover:bg-white/10 transition-all">
                <ChevronLeft size={20} />
              </button>
              <button className="swiper-next-btn w-12 h-12 rounded-full
                border border-white/10 bg-white/5 backdrop-blur-xl
                flex items-center justify-center text-white
                hover:bg-white/10 transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              prevEl: ".swiper-prev-btn",
              nextEl: ".swiper-next-btn",
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            centeredSlides
            loop
            breakpoints={{
              320: { slidesPerView: 1.1, spaceBetween: 16 },
              640: { slidesPerView: 1.8, spaceBetween: 18 },
              768: { slidesPerView: 2.5, spaceBetween: 20 },
              1024: { slidesPerView: 3.5, spaceBetween: 24 },
              1280: { slidesPerView: 4.2, spaceBetween: 24 },
            }}
            onSlideChange={(swiper) => setActive(swiper.realIndex)}
          >
            {FESTIVALS.map((item, index) => (
              <SwiperSlide key={item.id}>
                <div onClick={() => setActive(index)}>
                  <FestivalCard
                    festival={item as Festival}
                    active={active === index}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Festival Details */}
        <div className="mt-24 grid lg:grid-cols-2 gap-12 items-center">
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

            <h2 className="mt-4 text-2xl md:text-4xl font-bold
              text-white font-playfair mt-3">
              {festival.name}
            </h2>

            <div className="flex flex-wrap gap-6 mt-6 mb-8">
              {[
                { icon: MapPin, text: festival.location },
                { icon: Calendar, text: festival.month },
                { icon: Clock, text: festival.duration },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-yellow-400">
                  <Icon size={18} />
                  <span className="text-white/80 text-sm md:text-base">
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
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-full bg-white/10
                    border border-white/10 backdrop-blur-xl
                    text-white text-sm cursor-default"
                >
                  {item}
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
              <button className="px-6 md:px-8 py-3 md:py-4 rounded-full
                bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500
                text-white font-semibold flex items-center gap-2
                hover:scale-105 transition-all text-sm md:text-base">
                Plan Visit
                <ArrowRight size={18} />
              </button>
              <button className="px-6 md:px-8 py-3 md:py-4 rounded-full
                border border-white/20 backdrop-blur-xl text-white
                hover:bg-white/10 transition-all text-sm md:text-base">
                View Gallery
              </button>
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
                className="rounded-3xl p-6 bg-white/5 border
                  border-white/10 backdrop-blur-xl"
              >
                <h4 className="text-white/60 text-sm mb-4">{item.label}</h4>
                {item.isRating ? (
                  <div className="flex items-center gap-2">
                    <Star className="text-yellow-400 fill-yellow-400 w-6 h-6" />
                    <span className="text-3xl md:text-4xl font-bold text-white">
                      {item.value}
                    </span>
                  </div>
                ) : (
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {item.value}
                  </h3>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Festival Gallery */}
        <div className="mt-24 md:mt-32">
          <div className="text-center mb-12">
            <span className="text-yellow-400 uppercase tracking-[4px]
              font-semibold text-sm">
              Festival Gallery
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl
              font-bold text-white font-playfair">
              Experience The Magic
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {FESTIVALS.map((f) => (
              <motion.div
                key={f.id}
                whileHover={{ scale: 1.03 }}
                onClick={() => {
                  const idx = FESTIVALS.findIndex((x) => x.id === f.id);
                  setActive(idx);
                }}
                className="relative overflow-hidden rounded-2xl md:rounded-3xl
                  h-[180px] md:h-[280px] cursor-pointer"
              >
                <img
                  src={f.image}
                  alt={f.name}
                  className="w-full h-full object-cover transition-transform
                    duration-700 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t
                  from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <div className="text-white font-bold text-sm">{f.name}</div>
                  <div className="text-white/60 text-xs">{f.location}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}