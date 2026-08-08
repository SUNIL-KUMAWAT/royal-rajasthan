"use client";
import Link from "next/link";
import {
    MapPin,
    Phone,
    Mail,
    ArrowRight,
    Heart,
} from "lucide-react";
import { NAV_LINKS, NAV_LINKS_HINDI } from "@/constants/data";
import { useLanguage } from "@/components/LanguageProvider";

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
    { name: "Teej Festival", nameHi: "तीज महोत्सव", href: "/festivals/teej" },
    { name: "Mewar Festival", nameHi: "मेवाड़ महोत्सव", href: "/festivals/mewar" },
    { name: "View All Festivals", nameHi: "सभी त्यौहार", href: "/culture" },
];

const SHOPPING = [
    { name: "Johari Bazaar", nameHi: "जौहरी बाज़ार", href: "/shopping/johari-bazaar" },
    { name: "Bapu Bazaar", nameHi: "बापू बाज़ार", href: "/shopping/bapu-bazaar" },
    { name: "Sardar Market", nameHi: "सरदार मार्केट", href: "/shopping/sardar-market" },
    { name: "Hathi Pol", nameHi: "हाथी पोल", href: "/shopping/hathi-pol" },
    { name: "Shopping Guide", nameHi: "शॉपिंग गाइड", href: "/shopping" },
];

export function Footer() {
    const { language } = useLanguage();
    const currentNavLinks = language === 'hi' ? NAV_LINKS_HINDI : NAV_LINKS;

    return (
        <footer className="relative bg-[#070b16] text-white overflow-hidden pt-20">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 -left-40 w-96 h-96 bg-maroon-700/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-12">
                {/* 5 Column Grid for perfect distribution */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

                    {/* 1. Brand Section */}
                    <div>
                        <Link href="/" className="inline-flex items-center group relative z-10 transition-transform hover:scale-105 mb-6">
                            <img
                                src={language === 'hi' ? "/hindi-logo-bg.png" : "/english-logo-bg.png"}
                                alt="Rajasthan Tourism Places"
                                className="h-24 md:h-28 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            {language === 'hi'
                                ? "राजाओं की शानदार भूमि के लिए आपका प्रवेश द्वार। शाही विरासत, सुनहरे रेगिस्तान और जीवंत संस्कृति का अनुभव करें।"
                                : "Your gateway to the magnificent Land of Kings. Experience royal heritage, golden deserts, and vibrant culture."}
                        </p>
                    </div>

                    {/* 2. Quick Links */}
                    <div className="lg:justify-self-center">
                        <h4 className="font-playfair font-semibold text-lg mb-6 text-white flex items-center gap-2">
                            <span className="w-3 h-[2px] bg-gold-500 rounded-full"></span>
                            {language === 'hi' ? 'त्वरित लिंक' : 'Quick Links'}
                        </h4>
                        <ul className="space-y-3">
                            {currentNavLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-gold-400 text-sm transition-all duration-300 flex items-center gap-2 group w-fit"
                                    >
                                        <ArrowRight
                                            size={14}
                                            className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-gold-500"
                                        />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            {link.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Famous Places */}
                    <div className="lg:justify-self-center">
                        <h4 className="font-playfair font-semibold text-lg mb-6 text-white flex items-center gap-2">
                            <span className="w-3 h-[2px] bg-gold-500 rounded-full"></span>
                            {language === 'hi' ? 'प्रसिद्ध स्थान' : 'Famous Places'}
                        </h4>
                        <ul className="space-y-3">
                            {FAMOUS_PLACES.map((place) => (
                                <li key={place.name}>
                                    <Link
                                        href={place.href}
                                        className="text-gray-400 hover:text-gold-400 text-sm transition-all duration-300 flex items-center gap-2 group w-fit"
                                    >
                                        <ArrowRight
                                            size={14}
                                            className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-gold-500"
                                        />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            {language === 'hi' ? place.nameHi : place.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 4. Festivals */}
                    <div className="lg:justify-self-center">
                        <h4 className="font-playfair font-semibold text-lg mb-6 text-white flex items-center gap-2">
                            <span className="w-3 h-[2px] bg-gold-500 rounded-full"></span>
                            {language === 'hi' ? 'त्यौहार' : 'Festivals'}
                        </h4>
                        <ul className="space-y-3">
                            {FESTIVALS.map((fest) => (
                                <li key={fest.name}>
                                    <Link
                                        href={fest.href}
                                        className="text-gray-400 hover:text-gold-400 text-sm transition-all duration-300 flex items-center gap-2 group w-fit"
                                    >
                                        <ArrowRight
                                            size={14}
                                            className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-gold-500"
                                        />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            {language === 'hi' ? fest.nameHi : fest.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 5. Shopping */}
                    <div className="lg:justify-self-center">
                        <h4 className="font-playfair font-semibold text-lg mb-6 text-white flex items-center gap-2">
                            <span className="w-3 h-[2px] bg-gold-500 rounded-full"></span>
                            {language === 'hi' ? 'शॉपिंग' : 'Shopping'}
                        </h4>
                        <ul className="space-y-3">
                            {SHOPPING.map((shop) => (
                                <li key={shop.name}>
                                    <Link
                                        href={shop.href}
                                        className="text-gray-400 hover:text-gold-400 text-sm transition-all duration-300 flex items-center gap-2 group w-fit"
                                    >
                                        <ArrowRight
                                            size={14}
                                            className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-gold-500"
                                        />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            {language === 'hi' ? shop.nameHi : shop.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-400 text-sm flex items-center gap-1.5">
                        © {new Date().getFullYear()} Rajasthan Tourism Places. Made with{" "}
                        <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> in
                        Rajasthan
                    </p>
                    <div className="flex gap-6">
                        {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="text-gray-500 hover:text-gold-400 text-sm transition-colors duration-300"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}