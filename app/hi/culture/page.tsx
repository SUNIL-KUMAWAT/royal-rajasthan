// Hindi version of /culture — same page, Hindi metadata (language comes from the /hi URL).
import type { Metadata } from "next";
import EnglishPage, { metadata as englishMetadata } from "@/app/culture/page";
import { hindiMetadata } from "@/lib/i18n";

export const metadata: Metadata = {
    ...hindiMetadata(englishMetadata, "/culture", {
        title: "राजस्थान के त्योहार और संस्कृति",
        description: "पुष्कर मेला, मरु महोत्सव, तीज और गणगौर सहित राजस्थान के प्रमुख त्योहारों, परंपराओं और संस्कृति की पूरी जानकारी।",
    }),
};

export default EnglishPage;
