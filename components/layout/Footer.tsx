"use client";
import Image from "next/image";
import { ArrowUpRight, Heart } from "lucide-react";
import Link from "@/components/LocalizedLink";
import { NAV_LINKS, NAV_LINKS_HINDI } from "@/constants/ui";
import { useLanguage } from "@/components/LanguageProvider";
import { Reveal } from "@/components/ui/Reveal";

const FAMOUS_PLACES = [
    { name: "Amber Fort", nameHi: "आमेर किला", href: "/places/amber-fort" },
    { name: "Hawa Mahal", nameHi: "हवा महल", href: "/places/hawa-mahal" },
    { name: "Mehrangarh Fort", nameHi: "मेहरानगढ़ किला", href: "/places/mehrangarh-fort" },
    { name: "City Palace", nameHi: "सिटी पैलेस", href: "/places/city-palace-udaipur" },
    { name: "Lake Pichola", nameHi: "पिछोला झील", href: "/places/lake-pichola" },
    { name: "Jaisalmer Fort", nameHi: "जैसलमेर किला", href: "/places/jaisalmer-fort" },
];

const FESTIVALS = [
    { name: "Pushkar Camel Fair", nameHi: "पुष्कर मेला", href: "/festivals/pushkar-camel-fair" },
    { name: "Desert Festival", nameHi: "मरु महोत्सव", href: "/festivals/desert-festival" },
    { name: "Teej Festival", nameHi: "तीज महोत्सव", href: "/festivals/teej-festival" },
    { name: "Mewar Festival", nameHi: "मेवाड़ महोत्सव", href: "/festivals/mewar-festival" },
    { name: "View All Festivals", nameHi: "सभी त्यौहार", href: "/culture" },
];

const SHOPPING = [
    { name: "Johari Bazaar", nameHi: "जौहरी बाज़ार", href: "/shopping/johari-bazaar" },
    { name: "Bapu Bazaar", nameHi: "बापू बाज़ार", href: "/shopping/bapu-bazaar" },
    { name: "Sardar Market", nameHi: "सरदार मार्केट", href: "/shopping/sardar-market-clock-tower" },
    { name: "Hathi Pol", nameHi: "हाथी पोल", href: "/shopping/hathi-pol-bazaar" },
    { name: "Shopping Guide", nameHi: "शॉपिंग गाइड", href: "/shopping" },
];

const MARQUEE = {
    en: ["Jaipur", "Udaipur", "Jodhpur", "Jaisalmer", "Pushkar", "Bikaner", "Mount Abu", "Chittorgarh", "Ranthambore", "Bundi"],
    hi: ["जयपुर", "उदयपुर", "जोधपुर", "जैसलमेर", "पुष्कर", "बीकानेर", "माउंट आबू", "चित्तौड़गढ़", "रणथंभौर", "बूंदी"],
};

const LEGAL = [
    { en: "Privacy Policy", hi: "गोपनीयता नीति", href: "/privacy-policy" },
    { en: "Terms of Service", hi: "सेवा की शर्तें", href: "/terms-of-service" },
    { en: "Cookie Policy", hi: "कुकी नीति", href: "/cookie-policy" },
];

function LinkColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
    return (
        <div>
            <h4 className="mb-5 font-sans text-[11px] font-semibold uppercase tracking-eyebrow text-gold-300/80">{title}</h4>
            <ul className="space-y-3">
                {items.map((item) => (
                    <li key={item.href}>
                        <Link
                            href={item.href}
                            className="group inline-flex items-center gap-1 text-sm text-ivory-100/65 transition-colors duration-300 hover:text-ivory-50"
                        >
                            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-lux group-hover:bg-[length:100%_1px]">
                                {item.label}
                            </span>
                            <ArrowUpRight size={13} className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function Footer() {
    const { language } = useLanguage();
    const isHi = language === "hi";
    const navLinks = isHi ? NAV_LINKS_HINDI : NAV_LINKS;
    const towns = isHi ? MARQUEE.hi : MARQUEE.en;

    return (
        <footer className="relative isolate mt-24 overflow-hidden bg-ink-950 pb-28 text-ivory-50 md:pb-0">
            {/* Ambient light */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-1/3 left-1/4 h-[40rem] w-[40rem] rounded-full bg-gold-500/10 blur-[140px]" />
                <div className="absolute -bottom-1/3 -right-20 h-[36rem] w-[36rem] rounded-full bg-maroon-500/20 blur-[140px]" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
            </div>

            {/* Editorial call to action */}
            <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 md:pt-28 lg:px-8">
                <Reveal className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
                    <h2 className="max-w-3xl font-display text-5xl font-medium leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                        {isHi ? (
                            <>
                                आपकी शाही <em className="italic text-gold-sheen">यात्रा</em> यहीं से शुरू होती है
                            </>
                        ) : (
                            <>
                                Your royal <em className="font-normal italic text-gold-sheen">journey</em> begins here
                            </>
                        )}
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/plan-trip" className="btn-gold">
                            {isHi ? "यात्रा प्लान करें" : "Plan your trip"}
                            <ArrowUpRight size={16} />
                        </Link>
                        <Link href="/places" className="btn-glass-dark">
                            {isHi ? "स्थान देखें" : "Browse places"}
                        </Link>
                    </div>
                </Reveal>
            </div>

            {/* Destination marquee */}
            <div className="mt-16 border-y border-white/10 py-6 mask-fade-x" aria-hidden="true">
                <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
                    {[...towns, ...towns].map((town, i) => (
                        <span key={i} className="flex items-center gap-12 font-display text-3xl italic text-ivory-100/40 md:text-4xl">
                            {town}
                            <span className="h-1.5 w-1.5 rounded-full bg-gold-400/60" />
                        </span>
                    ))}
                </div>
            </div>

            {/* Link columns */}
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-4 py-16 sm:px-6 md:grid-cols-6 lg:px-8">
                <div className="col-span-2">
                    <Link href="/" className="inline-block">
                        <Image
                            src={isHi ? "/hindi-logo-bg.png" : "/english-logo-bg.png"}
                            alt="Rajasthan Tourism Places"
                            width={300}
                            height={120}
                            className="h-20 w-auto object-contain"
                        />
                    </Link>
                    <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory-100/60">
                        {isHi
                            ? "राजाओं की शानदार भूमि के लिए आपका प्रवेश द्वार। शाही विरासत, सुनहरे रेगिस्तान और जीवंत संस्कृति का अनुभव करें।"
                            : "Your gateway to the magnificent Land of Kings. Royal heritage, golden deserts and living culture — curated with care."}
                    </p>
                </div>
                <LinkColumn title={isHi ? "त्वरित लिंक" : "Explore"} items={navLinks.map((l) => ({ label: l.name, href: l.href }))} />
                <LinkColumn
                    title={isHi ? "प्रसिद्ध स्थान" : "Famous places"}
                    items={FAMOUS_PLACES.map((p) => ({ label: isHi ? p.nameHi : p.name, href: p.href }))}
                />
                <LinkColumn
                    title={isHi ? "त्यौहार" : "Festivals"}
                    items={FESTIVALS.map((f) => ({ label: isHi ? f.nameHi : f.name, href: f.href }))}
                />
                <LinkColumn
                    title={isHi ? "शॉपिंग" : "Shopping"}
                    items={SHOPPING.map((s) => ({ label: isHi ? s.nameHi : s.name, href: s.href }))}
                />
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-ivory-100/50 sm:px-6 md:flex-row lg:px-8">
                    <p className="flex flex-wrap items-center justify-center gap-1.5">
                        © {new Date().getFullYear()} Rajasthan Tourism Places.
                        <span className="inline-flex items-center gap-1.5">
                            {isHi ? "राजस्थान में" : "Made with"}
                            <Heart size={12} className="fill-rose-500 text-rose-500" />
                            {isHi ? "से बना" : "in Rajasthan"}
                        </span>
                    </p>
                    <ul className="flex flex-wrap justify-center gap-5">
                        {LEGAL.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href} className="transition-colors hover:text-gold-300">
                                    {isHi ? item.hi : item.en}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}
