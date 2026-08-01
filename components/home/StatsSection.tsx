"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATISTICS, STATISTICS_HINDI } from "@/constants/data";
import { useLanguage } from "@/components/LanguageProvider";

function CountUp({
    end,
    duration = 2000,
    suffix = "",
}: {
    end: number;
    duration?: number;
    suffix?: string;
}) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [inView, end, duration]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}

export function StatsSection() {
    const { language } = useLanguage();
    const currentStats = language === 'hi' ? STATISTICS_HINDI : STATISTICS;

    return (
        <section className="py-20 bg-gradient-to-br from-maroon-500 via-maroon-600 to-maroon-700 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gold-500 -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gold-500 translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase">
                        {language === 'hi' ? "आंकड़ों में" : "By The Numbers"}
                    </span>
                    <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mt-3">
                        {language === 'hi' ? "राजस्थान की भव्य विरासत" : "Rajasthan's Grand Legacy"}
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-12 relative z-10">
                    {currentStats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center group"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-gold-400 font-playfair mb-2 group-hover:scale-110 transition-transform">
                                <CountUp end={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="text-white/70 text-sm font-medium">
                                {stat.label}
                            </div>
                            <div className="w-8 h-0.5 bg-gold-500/50 mx-auto mt-3" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}