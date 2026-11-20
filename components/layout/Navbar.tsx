"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Home, MapPinned, CalendarHeart, ShoppingBag, Route, ArrowUpRight } from "lucide-react";
import Link from "@/components/LocalizedLink";
import { NAV_LINKS, NAV_LINKS_HINDI } from "@/constants/ui";
import { useLanguage } from "@/components/LanguageProvider";
import { useTheme } from "@/components/ThemeProvider";
import { stripLanguage } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

const DOCK = [
    { href: "/", icon: Home, en: "Home", hi: "होम" },
    { href: "/places", icon: MapPinned, en: "Places", hi: "स्थान" },
    { href: "/plan-trip", icon: Route, en: "Plan", hi: "प्लान" },
    { href: "/culture", icon: CalendarHeart, en: "Festivals", hi: "त्यौहार" },
    { href: "/shopping", icon: ShoppingBag, en: "Shop", hi: "शॉपिंग" },
];

const isActivePath = (pathname: string, href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`) || (href === "/culture" && pathname.startsWith("/festivals"));

export function Navbar() {
    // Compare against the language-neutral path so "/hi/places" highlights "Places"
    const pathname = stripLanguage(usePathname() || "/");
    const { language, toggleLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const isHi = language === "hi";
    const links = isHi ? NAV_LINKS_HINDI : NAV_LINKS;

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close the menu on route change; lock scroll + Esc while it is open
    useEffect(() => setMenuOpen(false), [pathname]);
    useEffect(() => {
        if (!menuOpen) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [menuOpen]);

    const themeLabel = theme === "dark" ? (isHi ? "लाइट मोड" : "Light mode") : isHi ? "डार्क मोड" : "Dark mode";

    return (
        <>
            {/* ───────── Floating top bar ───────── */}
            <motion.header
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
            >
                <nav
                    aria-label={isHi ? "मुख्य नेविगेशन" : "Main navigation"}
                    className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full px-3 py-2 transition-all duration-700 ease-lux sm:px-4 ${
                        scrolled ? "glass-strong shadow-float" : "glass-dark !bg-ink-950/20"
                    }`}
                >
                    <Link href="/" aria-label="Rajasthan Tourism Places" className="flex shrink-0 items-center pl-1">
                        <Image
                            src={isHi ? "/hindi-logo-bg.png" : "/english-logo-bg.png"}
                            alt="Rajasthan Tourism Places"
                            width={300}
                            height={120}
                            priority
                            className="h-10 w-auto object-contain sm:h-12"
                        />
                    </Link>

                    {/* Desktop links */}
                    <ul className="hidden items-center gap-1 lg:flex">
                        {links.map((link) => {
                            const active = isActivePath(pathname, link.href);
                            return (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        aria-current={active ? "page" : undefined}
                                        className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                                            scrolled
                                                ? active
                                                    ? "text-ivory-50 dark:text-ink-900"
                                                    : "text-ink-600 hover:text-ink-900 dark:text-ivory-200/80 dark:hover:text-ivory-50"
                                                : active
                                                ? "text-ink-900"
                                                : "text-white/85 hover:text-white"
                                        }`}
                                    >
                                        {active && (
                                            <motion.span
                                                layoutId="nav-pill"
                                                className={`absolute inset-0 -z-10 rounded-full ${
                                                    scrolled ? "bg-ink-900 dark:bg-gold-400" : "bg-ivory-50"
                                                }`}
                                                transition={{ type: "spring", stiffness: 400, damping: 34 }}
                                            />
                                        )}
                                        {link.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                            type="button"
                            onClick={toggleLanguage}
                            aria-label={isHi ? "Switch to English" : "हिंदी में देखें"}
                            className={`grid h-10 min-w-10 place-items-center rounded-full px-3 text-xs font-bold transition-all duration-300 hover:scale-105 ${
                                scrolled ? "glass text-ink-800 dark:text-ivory-100" : "bg-white/15 text-white hover:bg-white/25"
                            }`}
                        >
                            {isHi ? "EN" : "हिं"}
                        </button>

                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label={themeLabel}
                            className={`grid h-10 w-10 place-items-center rounded-full transition-all duration-300 hover:scale-105 ${
                                scrolled ? "glass text-ink-800 dark:text-ivory-100" : "bg-white/15 text-white hover:bg-white/25"
                            }`}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={theme}
                                    initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                    exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                                    transition={{ duration: 0.35 }}
                                >
                                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                                </motion.span>
                            </AnimatePresence>
                        </button>

                        <Link href="/places" className="btn-gold hidden !px-5 !py-2.5 md:inline-flex">
                            {isHi ? "खोजें" : "Explore"}
                            <ArrowUpRight size={15} />
                        </Link>

                        <button
                            type="button"
                            onClick={() => setMenuOpen(true)}
                            aria-label={isHi ? "मेनू खोलें" : "Open menu"}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-menu"
                            className={`grid h-10 w-10 place-items-center rounded-full lg:hidden ${
                                scrolled ? "glass text-ink-800 dark:text-ivory-100" : "bg-white/15 text-white"
                            }`}
                        >
                            <Menu size={18} />
                        </button>
                    </div>
                </nav>
            </motion.header>

            {/* ───────── Full-screen glass menu (mobile / tablet) ───────── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label={isHi ? "मेनू" : "Menu"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-[70] lg:hidden"
                    >
                        <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-2xl" onClick={() => setMenuOpen(false)} />
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.5, ease: EASE }}
                            className="relative m-3 flex max-h-[calc(100svh-1.5rem)] flex-col overflow-y-auto rounded-[2rem] glass-strong p-6"
                        >
                            <div className="flex items-center justify-between">
                                <span className="eyebrow">{isHi ? "मेनू" : "Menu"}</span>
                                <button
                                    type="button"
                                    onClick={() => setMenuOpen(false)}
                                    aria-label={isHi ? "मेनू बंद करें" : "Close menu"}
                                    className="grid h-11 w-11 place-items-center rounded-full glass text-ink-900 dark:text-ivory-50"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <ul className="mt-8 space-y-1">
                                {links.map((link, i) => {
                                    const active = isActivePath(pathname, link.href);
                                    return (
                                        <motion.li
                                            key={link.href}
                                            initial={{ opacity: 0, x: -16 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: EASE }}
                                        >
                                            <Link
                                                href={link.href}
                                                aria-current={active ? "page" : undefined}
                                                className={`group flex items-center justify-between border-b border-ink-900/5 py-4 font-display text-4xl font-medium transition-colors dark:border-white/5 ${
                                                    active ? "text-gold-700 dark:text-gold-400" : "text-ink-900 dark:text-ivory-50"
                                                }`}
                                            >
                                                {link.name}
                                                <ArrowUpRight size={22} className="opacity-30 transition-all group-hover:rotate-45 group-hover:opacity-100" />
                                            </Link>
                                        </motion.li>
                                    );
                                })}
                            </ul>

                            <div className="mt-8 grid grid-cols-2 gap-3">
                                <button type="button" onClick={toggleLanguage} className="btn-glass !justify-center">
                                    {isHi ? "English" : "हिंदी"}
                                </button>
                                <button type="button" onClick={toggleTheme} className="btn-glass !justify-center">
                                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                                    {themeLabel}
                                </button>
                            </div>
                            <Link href="/places" className="btn-gold mt-3 w-full">
                                {isHi ? "सभी स्थान देखें" : "Explore all places"}
                                <ArrowUpRight size={16} />
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ───────── Floating bottom dock (phones) ───────── */}
            <nav
                aria-label={isHi ? "त्वरित नेविगेशन" : "Quick navigation"}
                className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
            >
                <ul className="mx-auto flex max-w-md items-center justify-between rounded-full glass-strong px-2 py-1.5">
                    {DOCK.map(({ href, icon: Icon, en, hi }) => {
                        const active = isActivePath(pathname, href);
                        return (
                            <li key={href} className="flex-1">
                                <Link
                                    href={href}
                                    aria-current={active ? "page" : undefined}
                                    className={`relative flex flex-col items-center gap-0.5 rounded-full px-2 py-1.5 text-[10px] font-semibold transition-colors ${
                                        active ? "text-ink-900 dark:text-ink-900" : "text-ink-500 dark:text-ivory-200/70"
                                    }`}
                                >
                                    {active && (
                                        <motion.span
                                            layoutId="dock-pill"
                                            className="absolute inset-0 -z-10 rounded-full bg-gold-300"
                                            transition={{ type: "spring", stiffness: 420, damping: 34 }}
                                        />
                                    )}
                                    <Icon size={18} strokeWidth={active ? 2.2 : 1.8} />
                                    {isHi ? hi : en}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}
