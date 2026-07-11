"use client";
import Link from "next/link";
import {
    MapPin,
    Phone,
    Mail,
    ArrowRight,
    Heart,
} from "lucide-react";

const FOOTER_LINKS = {
    destinations: [
        { name: "Jaipur - Pink City", href: "/destinations/jaipur" },
        { name: "Udaipur - Lake City", href: "/destinations/udaipur" },
        { name: "Jodhpur - Blue City", href: "/destinations/jodhpur" },
        { name: "Jaisalmer - Golden City", href: "/destinations/jaisalmer" },
        { name: "Pushkar - Sacred City", href: "/destinations/pushkar" },
        { name: "Mount Abu - Hill Station", href: "/destinations/mount-abu" },
    ],
    packages: [
        { name: "Heritage Tours", href: "/packages" },
        { name: "Desert Safari", href: "/packages" },
        { name: "Honeymoon Packages", href: "/packages" },
        { name: "Family Tours", href: "/packages" },
        { name: "Luxury Tours", href: "/packages" },
        { name: "Wildlife Tours", href: "/packages" },
    ],
    quickLinks: [
        { name: "About Rajasthan", href: "/about" },
        { name: "Attractions", href: "/attractions" },
        { name: "Culture & Festivals", href: "/culture" },
        { name: "Hotels & Stays", href: "/hotels" },
        { name: "Photo Gallery", href: "/gallery" },
        { name: "Contact Us", href: "/contact" },
    ],
};

function FacebookIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    );
}

function TwitterIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

function InstagramIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
    );
}

function YoutubeIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    );
}

function WhatsAppIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}

const SOCIAL_LINKS = [
    { icon: FacebookIcon, href: "#", label: "Facebook" },
    { icon: TwitterIcon, href: "#", label: "Twitter" },
    { icon: InstagramIcon, href: "#", label: "Instagram" },
    { icon: YoutubeIcon, href: "#", label: "YouTube" },
    { icon: WhatsAppIcon, href: "https://wa.me/919876543210", label: "WhatsApp" },
];

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            {/* Newsletter */}
            {/* <div className="bg-gradient-to-r from-maroon-500 to-maroon-800 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="font-playfair text-2xl font-bold text-white">
                                Get Royal Travel Updates
                            </h3>
                            <p className="text-white/70 mt-1">
                                Subscribe for exclusive Rajasthan travel deals and tips
                            </p>
                        </div>
                        <div className="flex w-full lg:w-auto gap-2 max-w-md">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 outline-none focus:border-yellow-400 transition-all"
                            />
                            <button className="bg-gold-gradient text-white px-6 py-3 rounded-xl font-semibold hover:shadow-gold whitespace-nowrap transition-all flex items-center gap-2">
                                Subscribe
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Main Footer */}
            <div className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                        {/* Brand */}
                        <div className="lg:col-span-2">
                            <Link href="/" className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gold-gradient rounded-full flex items-center justify-center shadow-gold">
                                    <span className="text-white font-bold text-xl">R</span>
                                </div>
                                <div>
                                    <div className="font-playfair font-bold text-xl text-white">
                                        Royal Rajasthan
                                    </div>
                                    <div className="text-gold-400 text-xs tracking-widest uppercase">
                                        Tourism
                                    </div>
                                </div>
                            </Link>
                            <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
                                Your gateway to the magnificent Land of Kings. Experience
                                royal heritage, golden deserts, vibrant culture, and
                                unforgettable journeys across Rajasthan.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 text-gray-400">
                                    <MapPin
                                        size={16}
                                        className="text-gold-400 mt-0.5 flex-shrink-0"
                                    />
                                    <span className="text-sm">
                                        MI Road, Jaipur, Rajasthan 302001, India
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400">
                                    <Phone size={16} className="text-gold-400 flex-shrink-0" />
                                    <span className="text-sm">+91 98765 43210</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400">
                                    <Mail size={16} className="text-gold-400 flex-shrink-0" />
                                    <span className="text-sm">info@royalrajasthan.com</span>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-6">
                                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold-500 transition-all duration-300 hover:scale-110"
                                    >
                                        <Icon />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Destinations */}
                        <div>
                            <h4 className="font-playfair font-bold text-lg mb-6 text-white">
                                Destinations
                            </h4>
                            <ul className="space-y-3">
                                {FOOTER_LINKS.destinations.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-gold-400 text-sm transition-colors flex items-center gap-2 group"
                                        >
                                            <ArrowRight
                                                size={12}
                                                className="opacity-0 group-hover:opacity-100 transition-all"
                                            />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Packages */}
                        <div>
                            <h4 className="font-playfair font-bold text-lg mb-6 text-white">
                                Tour Packages
                            </h4>
                            <ul className="space-y-3">
                                {FOOTER_LINKS.packages.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-gold-400 text-sm transition-colors flex items-center gap-2 group"
                                        >
                                            <ArrowRight
                                                size={12}
                                                className="opacity-0 group-hover:opacity-100 transition-all"
                                            />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-playfair font-bold text-lg mb-6 text-white">
                                Quick Links
                            </h4>
                            <ul className="space-y-3">
                                {FOOTER_LINKS.quickLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-gold-400 text-sm transition-colors flex items-center gap-2 group"
                                        >
                                            <ArrowRight
                                                size={12}
                                                className="opacity-0 group-hover:opacity-100 transition-all"
                                            />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 py-6 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                        © 2025 Royal Rajasthan Tourism. Made with{" "}
                        <Heart size={14} className="text-red-500 fill-red-500" /> in
                        Rajasthan
                    </p>
                    <div className="flex gap-6">
                        {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                            (item) => (
                                <Link
                                    key={item}
                                    href="#"
                                    className="text-gray-400 hover:text-gold-400 text-sm transition-colors"
                                >
                                    {item}
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}