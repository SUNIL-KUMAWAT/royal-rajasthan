"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { DetailText } from "./text";

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
                    className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <button
                        ref={closeRef}
                        type="button"
                        onClick={onClose}
                        aria-label={t.close}
                        className="absolute top-4 right-4 w-11 h-11 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 z-10"
                    >
                        <X size={20} />
                    </button>

                    {count > 1 && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                go(-1);
                            }}
                            aria-label={t.previous}
                            className="absolute left-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 z-10"
                        >
                            <ChevronLeft size={24} />
                        </button>
                    )}

                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-full max-w-5xl h-[85vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[index]}
                            alt={t.photoOf(name, index + 1)}
                            fill
                            sizes="(min-width: 1024px) 1024px, 100vw"
                            className="object-contain rounded-lg"
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
                            className="absolute right-4 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 z-10"
                        >
                            <ChevronRight size={24} />
                        </button>
                    )}

                    {count > 1 && (
                        <div className="absolute bottom-6 flex gap-1 z-10">
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
                                        className={`block rounded-full transition-all ${
                                            i === index ? "w-6 h-2 bg-yellow-500" : "w-2 h-2 bg-white/40"
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
