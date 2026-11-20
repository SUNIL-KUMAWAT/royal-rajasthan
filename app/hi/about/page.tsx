// Hindi version of /about — same page, Hindi metadata (language comes from the /hi URL).
import type { Metadata } from "next";
import EnglishPage, { metadata as englishMetadata } from "@/app/about/page";
import { hindiMetadata } from "@/lib/i18n";

export const metadata: Metadata = {
    ...hindiMetadata(englishMetadata, "/about", {
        title: "हमारे बारे में",
        description: "राजस्थान पर्यटन स्थल के बारे में जानें - राजस्थान के किलों, महलों, झीलों और संस्कृति की विश्वसनीय यात्रा गाइड।",
    }),
};

export default EnglishPage;
