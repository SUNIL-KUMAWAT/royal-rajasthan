// Hindi version of /plan-trip — same page, Hindi metadata (language comes from the /hi URL).
import type { Metadata } from "next";
import EnglishPage, { metadata as englishMetadata } from "@/app/plan-trip/page";
import { hindiMetadata } from "@/lib/i18n";

export const metadata: Metadata = {
    ...hindiMetadata(englishMetadata, "/plan-trip", {
        title: "राजस्थान ट्रिप प्लानर - अपनी यात्रा की योजना बनाएं",
        description: "कुछ ही मिनटों में अपनी राजस्थान यात्रा का दिन-प्रतिदिन प्लान बनाएं - शहर, अवधि और रुचि चुनें।",
    }),
};

export default EnglishPage;
