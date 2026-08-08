"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Phone } from "lucide-react";
import { NAV_LINKS, NAV_LINKS_HINDI } from "@/constants/data";
import { useLanguage } from "@/components/LanguageProvider";
import { useTheme } from "@/components/ThemeProvider";
import { usePathname } from "next/navigation";

export function Navbar() {
    const pathname = usePathname();
    const { language, toggleLanguage } = useLanguage();
    const currentNavLinks = language === 'hi' ? NAV_LINKS_HINDI : NAV_LINKS;
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
                    ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
                    : "bg-transparent border-b border-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20 md:h-24">
                        {/* Logo */}
                        <Link href="/" className="flex items-center group relative z-10 transition-transform hover:scale-105">
                            <img
                                src={language === 'hi' ? "/hindi-logo-bg.png" : "/english-logo-bg.png"}
                                alt="Rajasthan Tourism Places"
                                className={`h-16 md:h-20 w-auto object-contain ${!isSolid ? "drop-shadow-lg" : ""}`}
                            />
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden lg:flex items-center gap-1">
                            {currentNavLinks.map((link) => {
                                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`relative px-4 py-2 rounded-full text-md font-medium transition-all duration-300 group overflow-hidden ${isActive
                                            ? isSolid
                                                ? "text-gold-600 dark:text-gold-400 font-semibold"
                                                : "text-white font-semibold"
                                            : isSolid
                                                ? "text-gray-700 dark:text-gray-300 hover:text-gold-600 dark:hover:text-gold-400"
                                                : "text-white/80 hover:text-white"
                                            }`}
                                    >
                                        <span className="relative z-10">{link.name}</span>
                                        {!isActive && (
                                            <span className="absolute inset-0 bg-gold-500/10 dark:bg-gold-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out origin-center" />
                                        )}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeNavIndicator"
                                                className={`absolute inset-0 rounded-full -z-0 ${isSolid
                                                    ? "bg-gold-500/15 dark:bg-gold-500/20 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]"
                                                    : "bg-white/20 shadow-[inset_0_1px_4px_rgba(255,255,255,0.2)]"
                                                    }`}
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-3">
                            {/* Language Toggle */}
                            <button
                                onClick={toggleLanguage}
                                className={`px-3 py-1 text-sm font-bold rounded-full transition-all duration-300 ${isSolid
                                    ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                                    : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                                    }`}
                            >
                                {language === "en" ? "EN" : "HI"}
                            </button>

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
                                className="hidden md:flex relative overflow-hidden items-center justify-center gap-2 bg-gradient-to-r from-maroon-500 to-maroon-700 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_6px_12px_rgba(153,27,27,0.3)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_20px_rgba(153,27,27,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-300 group/navbtn"
                            >
                                <span className="relative z-10">{language === 'hi' ? "स्थानों की खोज करें" : "Explore Places"}</span>
                                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover/navbtn:translate-x-full" />
                            </Link>

                            {/* Mobile Menu Toggle */}
                            <button
                                className={`lg:hidden p-2 rounded-lg ${isSolid
                                    ? "text-gray-700 dark:text-white"
                                    : "text-white"
                                    }`}
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label="Toggle navigation menu"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Quick Tabs */}
                <div className="lg:hidden flex items-center justify-center px-4 pb-3 gap-2">
                    {[
                        { name: language === 'hi' ? "स्थान" : "Places", href: "/places" },
                        { name: language === 'hi' ? "त्यौहार" : "Festivals", href: "/festivals" },
                        { name: language === 'hi' ? "खरीदारी" : "Shopping", href: "/shopping" },
                    ].map((tab) => {
                        const isActive = pathname === tab.href || (tab.href !== "/" && pathname.startsWith(tab.href));
                        return (
                            <Link
                                key={tab.name}
                                href={tab.href}
                                className={`flex-1 text-center px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold transition-all shadow-sm border ${isActive
                                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-yellow-400/50 shadow-yellow-500/30"
                                    : isSolid
                                        ? "bg-gray-100/80 text-gray-700 border-transparent dark:bg-gray-800/80 dark:text-gray-300"
                                        : "bg-white/20 text-white border-white/20 backdrop-blur-md"
                                    }`}
                            >
                                {tab.name}
                            </Link>
                        );
                    })}
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
                            <div className="flex flex-col space-y-1">
                                {currentNavLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-all"
                                    >
                                        {link.name}
                                    </Link>
                                ))}

                                {/* Mobile Language Toggle */}
                                <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                                        {language === 'hi' ? "भाषा" : "Language"}
                                    </span>
                                    <button
                                        onClick={toggleLanguage}
                                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-bold rounded-full"
                                    >
                                        {language === "en" ? "English" : "हिंदी"}
                                    </button>
                                </div>

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
                                        {language === 'hi' ? "सभी स्थान देखें" : "Explore All Places"}
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