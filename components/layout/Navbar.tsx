"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Phone } from "lucide-react";
import { NAV_LINKS } from "@/constants/data";
import { useTheme } from "@/components/ThemeProvider";
import { usePathname } from "next/navigation";

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isHome = mounted && pathname === "/";
    const isSolid = scrolled || !isHome;

    return (
        <>
            {/* Main Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isSolid
                    ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg"
                    : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-22">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg animate-pulse-gold">
                                <span className="text-white font-bold text-lg">R</span>
                            </div>
                            <div>
                                <div
                                    className={`font-playfair font-bold text-lg leading-tight ${isSolid
                                        ? "text-maroon-500 dark:text-white"
                                        : "text-white"
                                        }`}
                                >
                                    Royal Rajasthan
                                </div>
                                <div
                                    className={`text-xs tracking-widest uppercase ${isSolid
                                        ? "text-yellow-600 dark:text-yellow-400"
                                        : "text-yellow-300"
                                        }`}
                                >
                                    Tourism
                                </div>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden lg:flex items-center gap-1">
                            {NAV_LINKS.map((link) => {
                                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                                            isActive
                                                ? isSolid
                                                    ? "text-gold-600 dark:text-gold-400 font-semibold"
                                                    : "text-white font-semibold"
                                                : isSolid
                                                    ? "text-gray-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400"
                                                    : "text-white/80 hover:text-white"
                                        }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeNavIndicator"
                                                className={`absolute inset-0 rounded-full -z-10 ${
                                                    isSolid
                                                        ? "bg-gold-500/10 dark:bg-gold-500/15"
                                                        : "bg-white/15"
                                                }`}
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-3">
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className={`relative w-14 h-7 rounded-full transition-all duration-500 ${theme === "dark"
                                    ? "bg-indigo-600"
                                    : "bg-yellow-400"
                                    }`}
                                aria-label="Toggle dark mode"
                            >
                                <motion.div
                                    layout
                                    className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center ${theme === "dark" ? "left-7" : "left-0.5"
                                        }`}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                    {theme === "dark" ? (
                                        <Moon size={14} className="text-indigo-600" />
                                    ) : (
                                        <Sun size={14} className="text-yellow-500" />
                                    )}
                                </motion.div>
                            </button>

                            {/* Explore Button */}
                            <Link
                                href="/places"
                                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                Explore Places
                            </Link>

                            {/* Mobile Menu Toggle */}
                            <button
                                className={`lg:hidden p-2 rounded-lg ${isSolid
                                    ? "text-gray-700 dark:text-white"
                                    : "text-white"
                                    }`}
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-xl"
                        >
                            <div className="px-4 py-4 space-y-1">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-all"
                                    >
                                        {link.name}
                                    </Link>
                                ))}

                                {/* Mobile Theme Toggle */}
                                <div className="px-4 py-3 flex items-center justify-between">
                                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                                        {theme === "dark" ? "Dark Mode" : "Light Mode"}
                                    </span>
                                    <button
                                        onClick={toggleTheme}
                                        className={`relative w-14 h-7 rounded-full transition-all duration-500 ${theme === "dark" ? "bg-indigo-600" : "bg-yellow-400"
                                            }`}
                                    >
                                        <motion.div
                                            layout
                                            className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center ${theme === "dark" ? "left-7" : "left-0.5"
                                                }`}
                                            transition={{
                                                type: "spring",
                                                stiffness: 500,
                                                damping: 30,
                                            }}
                                        >
                                            {theme === "dark" ? (
                                                <Moon size={14} className="text-indigo-600" />
                                            ) : (
                                                <Sun size={14} className="text-yellow-500" />
                                            )}
                                        </motion.div>
                                    </button>
                                </div>

                                <div className="pt-2">
                                    <Link
                                        href="/places"
                                        className="block text-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-3 rounded-full font-semibold"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Explore All Places
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
}