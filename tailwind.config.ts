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
                gold: {
                    50: "#FFFBEB",
                    100: "#FEF3C7",
                    200: "#FDE68A",
                    300: "#FCD34D",
                    400: "#FBBF24",
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
                "palace-white": "#FFF8EE",
                "royal-orange": "#F97316",
            },
            fontFamily: {
                playfair: ["var(--font-playfair)", "serif"],
                inter: ["var(--font-inter)", "sans-serif"],
            },
            animation: {
                "fade-in-up": "fadeInUp 0.8s ease-out",
                float: "float 4s ease-in-out infinite",
                "pulse-gold": "pulse-gold 2s infinite",
            },
            keyframes: {
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(40px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                "pulse-gold": {
                    "0%, 100%": { boxShadow: "0 0 0 0 rgba(212, 175, 55, 0.4)" },
                    "70%": { boxShadow: "0 0 0 10px rgba(212, 175, 55, 0)" },
                },
            },
            backgroundImage: {
                "gold-gradient": "linear-gradient(135deg, #D4AF37, #F5D061)",
            },
            boxShadow: {
                gold: "0 4px 20px rgba(212, 175, 55, 0.3)",
                "gold-lg": "0 8px 40px rgba(212, 175, 55, 0.4)",
                royal: "0 20px 60px rgba(122, 31, 31, 0.2)",
            },
        },
    },
    plugins: [],
};

export default config;