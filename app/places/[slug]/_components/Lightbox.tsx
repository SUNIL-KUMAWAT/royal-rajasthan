"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { DetailText } from "./text";

const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
    open: boolean;
    images: string[];
    name: string;
    index: number;
    onIndexChange: (index: number) => void;
    onClose: () => void;
    t: DetailText;
};

/** Full-screen photo viewer: Esc closes, ←/→ navigate, body scroll locked while open. */
export function Lightbox({ open, images, name, index, onIndexChange, onClose, t }: Props) {
    const closeRef = useRef<HTMLButtonElement>(null);
    const count = images.length;
    const go = (delta: number) => onIndexChange((index + delta + count) % count);

    useEffect(() => {
        if (!open) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeRef.current?.focus();
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onIndexChange((index - 1 + count) % count);
            if (e.key === "ArrowRight") onIndexChange((index + 1) % count);
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener("keydown", onKey);
        };
    }, [open, index, count, onClose, onIndexChange]);

    const navBtn =
        "absolute z-10 grid h-12 w-12 place-items-center rounded-full glass-dark text-white transition-all duration-500 ease-lux hover:scale-105 hover:bg-white/20 md:h-14 md:w-14";

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-label={t.photoOf(name, index + 1)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-xl"
                    onClick={onClose}
                >
                    {/* Soft blurred echo of the current photo as ambient light */}
                    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30" aria-hidden="true">
                        <Image src={images[index]} alt="" fill sizes="10vw" className="scale-110 object-cover blur-3xl" />
                    </div>

                    {/* Top bar: title + counter + close */}
                    <div className="absolute inset-x-4 top-4 z-10 flex items-center justify-between gap-4 md:inset-x-6 md:top-6">
                        <div className="min-w-0 text-ivory-50">
                            <p className="truncate font-display text-xl font-medium md:text-2xl">{name}</p>
                            <p className="text-xs tracking-[0.2em] text-ivory-100/60" aria-hidden="true">
                                <span className="font-display text-base italic text-gold-300">
                                    {String(index + 1).padStart(2, "0")}
                                </span>{" "}
                                / {String(count).padStart(2, "0")}
                            </p>
                        </div>
                        <button
                            ref={closeRef}
                            type="button"
                            onClick={onClose}
                            aria-label={t.close}
                            className="grid h-12 w-12 shrink-0 place-items-center rounded-full glass-dark text-white transition-all duration-500 ease-lux hover:rotate-90 hover:bg-white/20"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {count > 1 && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                go(-1);
                            }}
                            aria-label={t.previous}
                            className={`${navBtn} left-3 md:left-6`}
                        >
                            <ChevronLeft size={24} />
                        </button>
                    )}

                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="relative h-[72vh] w-full max-w-5xl md:h-[78vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[index]}
                            alt={t.photoOf(name, index + 1)}
                            fill
                            sizes="(min-width: 1024px) 1024px, 100vw"
                            className="rounded-2xl object-contain"
                        />
                    </motion.div>

                    {count > 1 && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                go(1);
                            }}
                            aria-label={t.next}
                            className={`${navBtn} right-3 md:right-6`}
                        >
                            <ChevronRight size={24} />
                        </button>
                    )}

                    {count > 1 && (
                        <div className="absolute bottom-5 z-10 flex gap-0.5 rounded-full glass-dark px-2 md:bottom-8">
                            {images.map((img, i) => (
                                <button
                                    type="button"
                                    key={`${i}-${img}`}
                                    aria-label={t.goToPhoto(i + 1)}
                                    aria-current={i === index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onIndexChange(i);
                                    }}
                                    className="p-2"
                                >
                                    <span
                                        className={`block h-1.5 rounded-full transition-all duration-500 ease-lux ${
                                            i === index ? "w-6 bg-gold-300" : "w-1.5 bg-white/40 hover:bg-white/70"
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
