import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Warm near-black and ivory: the editorial base of the design
                ink: {
                    DEFAULT: "#0E0C0A",
                    50: "#F6F4F1",
                    100: "#E7E2DB",
                    200: "#CFC6BA",
                    300: "#A89C8C",
                    400: "#7D7163",
                    500: "#5A5046",
                    600: "#3F3831",
                    700: "#2A2520",
                    800: "#1A1713",
                    900: "#0E0C0A",
                    950: "#080706",
                },
                ivory: {
                    DEFAULT: "#F8F3EA",
                    50: "#FDFBF7",
                    100: "#F8F3EA",
                    200: "#F0E6D4",
                    300: "#E6D5B8",
                },
                gold: {
                    50: "#FFFBEB",
                    100: "#FEF3C7",
                    200: "#FDE68A",
                    300: "#F2D27A",
                    400: "#E5BC5C",
                    500: "#D4AF37",
                    600: "#B8960C",
                    700: "#92740A",
                    800: "#78600A",
                    900: "#64500B",
                },
                maroon: {
                    50: "#FFF1F1",
                    100: "#FFE1E1",
                    200: "#FFC7C7",
                    300: "#FF9B9B",
                    400: "#FF6060",
                    500: "#7A1F1F",
                    600: "#6B1C1C",
                    700: "#5C1919",
                    800: "#4D1616",
                    900: "#3E1212",
                },
                sand: "#E9D5A1",
                "palace-white": "#F8F3EA",
                "royal-orange": "#F97316",
            },
            fontFamily: {
                // Classical display serif (Latin) with a Devanagari display face for Hindi
                display: ["var(--font-display)", "var(--font-display-hi)", "Georgia", "serif"],
                // Kept for existing markup that uses `font-playfair`
                playfair: ["var(--font-display)", "var(--font-display-hi)", "Georgia", "serif"],
                sans: ["var(--font-body)", "var(--font-body-hi)", "system-ui", "sans-serif"],
                inter: ["var(--font-body)", "var(--font-body-hi)", "system-ui", "sans-serif"],
            },
            letterSpacing: {
                eyebrow: "0.28em",
            },
            animation: {
                "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                float: "float 6s ease-in-out infinite",
                "float-slow": "float 9s ease-in-out infinite",
                "pulse-gold": "pulse-gold 2s infinite",
                aurora: "aurora 22s ease-in-out infinite alternate",
                "aurora-slow": "aurora 34s ease-in-out infinite alternate-reverse",
                kenburns: "kenburns 18s ease-out both",
                shimmer: "shimmer 2.4s linear infinite",
                marquee: "marquee 40s linear infinite",
            },
            keyframes: {
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(32px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-12px)" },
                },
                "pulse-gold": {
                    "0%, 100%": { boxShadow: "0 0 0 0 rgba(212, 175, 55, 0.4)" },
                    "70%": { boxShadow: "0 0 0 10px rgba(212, 175, 55, 0)" },
                },
                aurora: {
                    "0%": { transform: "translate3d(0,0,0) scale(1) rotate(0deg)" },
                    "50%": { transform: "translate3d(6%,-4%,0) scale(1.15) rotate(12deg)" },
                    "100%": { transform: "translate3d(-4%,6%,0) scale(0.95) rotate(-8deg)" },
                },
                kenburns: {
                    "0%": { transform: "scale(1.12) translate3d(0,0,0)" },
                    "100%": { transform: "scale(1) translate3d(0,-1.5%,0)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                marquee: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
            },
            backgroundImage: {
                "gold-gradient": "linear-gradient(135deg, #D4AF37, #F5D061)",
                "gold-sheen": "linear-gradient(110deg, #B8960C 0%, #F2D27A 35%, #D4AF37 55%, #92740A 100%)",
            },
            boxShadow: {
                gold: "0 4px 20px rgba(212, 175, 55, 0.3)",
                "gold-lg": "0 8px 40px rgba(212, 175, 55, 0.4)",
                royal: "0 20px 60px rgba(122, 31, 31, 0.2)",
                // Soft, layered depth for floating glass surfaces
                float: "0 1px 1px rgba(14,12,10,0.04), 0 8px 24px -6px rgba(14,12,10,0.10), 0 30px 60px -20px rgba(14,12,10,0.18)",
                "float-lg": "0 2px 2px rgba(14,12,10,0.05), 0 18px 40px -10px rgba(14,12,10,0.16), 0 50px 100px -30px rgba(14,12,10,0.30)",
                glass: "inset 0 1px 0 0 rgba(255,255,255,0.55), 0 10px 30px -10px rgba(14,12,10,0.18)",
            },
            transitionTimingFunction: {
                lux: "cubic-bezier(0.22, 1, 0.36, 1)",
            },
        },
    },
    plugins: [],
};

export default config;
