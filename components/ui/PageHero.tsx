"use client";
import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "@/components/LocalizedLink";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

type Props = {
    image: string;
    imageAlt: string;
    eyebrow?: string;
    /** Wrap a word in <em> for the italic gold accent */
    title: ReactNode;
    subtitle?: ReactNode;
    breadcrumbs?: Crumb[];
    /** Extra content under the title (search bar, stats, buttons) */
    children?: ReactNode;
    size?: "md" | "lg";
};

/**
 * Cinematic page header used by inner pages: full-bleed photo with slow
 * Ken Burns zoom + scroll parallax, editorial headline and an optional
 * frosted-glass slot (search, actions).
 */
export function PageHero({ image, imageAlt, eyebrow, title, subtitle, breadcrumbs, children, size = "md" }: Props) {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
    const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    return (
        <section
            ref={ref}
            className={`relative isolate flex items-end overflow-hidden bg-ink-950 ${
                size === "lg" ? "min-h-[88svh]" : "min-h-[68svh] md:min-h-[72svh]"
            }`}
        >
            <motion.div style={{ y }} className="absolute inset-0 -z-10">
                <div className="absolute inset-0 animate-kenburns">
                    <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
                </div>
                <div className="absolute inset-0 scrim-cinematic" />
            </motion.div>

            <motion.div
                style={{ opacity: fade }}
                className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-14 pt-36 md:pb-20"
            >
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <motion.nav
                        aria-label="Breadcrumb"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-6"
                    >
                        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ivory-100/70">
                            {breadcrumbs.map((c, i) => (
                                <li key={c.label} className="flex items-center gap-1.5">
                                    {c.href ? (
                                        <Link href={c.href} className="hover:text-gold-300 transition-colors">
                                            {c.label}
                                        </Link>
                                    ) : (
                                        <span aria-current="page" className="text-ivory-50">
                                            {c.label}
                                        </span>
                                    )}
                                    {i < breadcrumbs.length - 1 && <ChevronRight size={12} className="opacity-50" />}
                                </li>
                            ))}
                        </ol>
                    </motion.nav>
                )}

                {eyebrow && (
                    <motion.span
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="eyebrow !text-gold-300"
                    >
                        {eyebrow}
                    </motion.span>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-4 max-w-4xl font-display text-5xl font-medium leading-[0.98] tracking-tight text-ivory-50 sm:text-6xl md:text-7xl lg:text-8xl [&_em]:italic [&_em]:font-normal [&_em]:text-gold-sheen"
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-6 max-w-xl text-base leading-relaxed text-ivory-100/80 md:text-lg"
                    >
                        {subtitle}
                    </motion.p>
                )}

                {children && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-10"
                    >
                        {children}
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
}
