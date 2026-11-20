"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import Link from "@/components/LocalizedLink";
import { useLanguage } from "@/components/LanguageProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";

/** Light festival record built on the server (see app/page.tsx). */
export type MiniFestival = {
    id: number;
    name: string;
    slug: string;
    image: string;
    location: string;
    month: string;
    description: string;
};

/** Dark, cinematic band: one tall lead festival plus two stacked companions. */
export function MiniFestivals({ festivals, festivalsHi }: { festivals: MiniFestival[]; festivalsHi: MiniFestival[] }) {
    const { language } = useLanguage();
    const isHi = language === "hi";
    const list = isHi ? festivalsHi : festivals;
    const [lead, ...rest] = list;

    const t = {
        eyebrow: isHi ? "उत्सव" : "Festivals",
        knowMore: isHi ? "और जानें" : "Read the story",
        viewAll: isHi ? "सभी उत्सव देखें" : "All festivals",
    };

    if (!lead) return null;

    return (
        <section className="relative isolate overflow-hidden bg-ink-950 py-24 text-ivory-50 md:py-32">
            {/* Atmosphere: blurred festival photo + warm glow */}
            <div aria-hidden="true" className="absolute inset-0 -z-10">
                <Image src="/Camel_Pushkar.webp" alt="" fill sizes="100vw" className="object-cover opacity-25 blur-2xl scale-110" />
                <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/80 to-ink-950" />
                <div className="absolute left-1/3 top-1/4 h-[30rem] w-[30rem] rounded-full bg-gold-500/15 blur-[120px]" />
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    tone="light"
                    eyebrow={t.eyebrow}
                    title={
                        isHi ? (
                            <>
                                रंगों में डूबा <em>राजस्थान</em>
                            </>
                        ) : (
                            <>
                                A year painted in <em>colour</em>
                            </>
                        )
                    }
                    subtitle={
                        isHi
                            ? "राजस्थान के रंगों, संगीत और परंपराओं को करीब से महसूस करें।"
                            : "Camel fairs at dawn, folk music under desert stars and cities dressed in marigold."
                    }
                    action={
                        <Link href="/culture" className="btn-glass-dark">
                            {t.viewAll}
                            <ArrowUpRight size={16} />
                        </Link>
                    }
                />

                <RevealGroup className="grid gap-5 lg:grid-cols-5">
                    <motion.article variants={revealItem} className="group relative isolate min-h-[30rem] overflow-hidden rounded-[2rem] lg:col-span-3 lg:row-span-2">
                        <Image
                            src={lead.image}
                            alt={lead.name}
                            fill
                            sizes="(min-width: 1024px) 60vw, 100vw"
                            className="-z-10 object-cover transition-transform duration-[1600ms] ease-lux group-hover:scale-[1.06]"
                        />
                        <div className="absolute inset-0 -z-10 scrim-b" />
                        <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="inline-flex items-center gap-1.5 rounded-full glass-dark px-3 py-1.5">
                                    <MapPin size={12} /> {lead.location}
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-full glass-dark px-3 py-1.5">
                                    <Calendar size={12} /> {lead.month}
                                </span>
                            </div>
                            <h3 className="mt-4 font-display text-4xl font-medium leading-tight md:text-6xl">
                                <Link href={`/festivals/${lead.slug}`} className="after:absolute after:inset-0 after:content-['']">
                                    {lead.name}
                                </Link>
                            </h3>
                            <p className="mt-3 line-clamp-2 max-w-lg text-sm text-ivory-100/75 md:text-base">{lead.description}</p>
                            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-300">
                                {t.knowMore}
                                <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
                            </span>
                        </div>
                    </motion.article>

                    {rest.map((fest) => (
                        <motion.article
                            key={fest.id}
                            variants={revealItem}
                            className="group relative flex min-h-[14rem] overflow-hidden rounded-[2rem] glass-dark lg:col-span-2"
                        >
                            <div className="relative w-2/5 shrink-0 overflow-hidden">
                                <Image
                                    src={fest.image}
                                    alt={fest.name}
                                    fill
                                    sizes="(min-width: 1024px) 16vw, 40vw"
                                    className="object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-110"
                                />
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-300/80">
                                    {fest.month} · {fest.location}
                                </span>
                                <h3 className="mt-2 font-display text-2xl font-medium leading-tight md:text-3xl">
                                    <Link href={`/festivals/${fest.slug}`} className="after:absolute after:inset-0 after:content-['']">
                                        {fest.name}
                                    </Link>
                                </h3>
                                <p className="mt-2 line-clamp-2 text-sm text-ivory-100/65">{fest.description}</p>
                                <ArrowUpRight size={18} className="mt-auto self-end text-ivory-100/60 transition-all duration-500 group-hover:rotate-45 group-hover:text-gold-300" />
                            </div>
                        </motion.article>
                    ))}
                </RevealGroup>
            </div>
        </section>
    );
}
