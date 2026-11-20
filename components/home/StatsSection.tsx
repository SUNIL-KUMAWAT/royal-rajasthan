"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { STATISTICS, STATISTICS_HINDI } from "@/constants/ui";
import { useLanguage } from "@/components/LanguageProvider";

function CountUp({ end, duration = 1800, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const reduce = useReducedMotion();

    useEffect(() => {
        if (!inView) return;
        if (reduce) {
            setCount(end);
            return;
        }
        let frame = 0;
        const start = performance.now();
        // Ease-out cubic so numbers settle gently
        const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            setCount(Math.round(end * (1 - Math.pow(1 - p, 3))));
            if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [inView, end, duration, reduce]);

    return (
        <span ref={ref} className="tabular-nums">
            {count}
            {suffix}
        </span>
    );
}

export function StatsSection() {
    const { language } = useLanguage();
    const isHi = language === "hi";
    const stats = isHi ? STATISTICS_HINDI : STATISTICS;

    return (
        <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-[2.5rem] glass-strong p-8 md:p-14">
                    <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-400/25 blur-3xl" />
                    <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-maroon-500/20 blur-3xl" />

                    <div className="relative grid gap-12 lg:grid-cols-12 lg:items-end">
                        <div className="lg:col-span-4">
                            <span className="eyebrow">{isHi ? "आंकड़ों में" : "By the numbers"}</span>
                            <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink-900 dark:text-ivory-50 md:text-5xl">
                                {isHi ? (
                                    <>
                                        राजस्थान की <em className="italic font-normal text-gold-sheen">भव्य</em> विरासत
                                    </>
                                ) : (
                                    <>
                                        A <em className="italic font-normal text-gold-sheen">grand</em> legacy
                                    </>
                                )}
                            </h2>
                        </div>

                        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-8">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                                    className="flex flex-col-reverse border-t border-ink-900/10 pt-5 dark:border-white/10"
                                >
                                    <dt className="mt-3 text-sm text-ink-500 dark:text-ivory-200/65">{stat.label}</dt>
                                    <dd className="font-display text-5xl font-medium leading-none text-ink-900 dark:text-ivory-50 md:text-6xl">
                                        <CountUp end={stat.value} suffix={stat.suffix} />
                                    </dd>
                                </motion.div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    );
}
