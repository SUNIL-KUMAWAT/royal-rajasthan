// Hindi version of /contact — same page, Hindi metadata (language comes from the /hi URL).
import type { Metadata } from "next";
import EnglishPage, { metadata as englishMetadata } from "@/app/contact/page";
import { hindiMetadata } from "@/lib/i18n";

export const metadata: Metadata = {
    ...hindiMetadata(englishMetadata, "/contact", {
        title: "संपर्क करें - अपनी राजस्थान यात्रा की योजना बनाएं",
        description: "राजस्थान यात्रा से जुड़े सवालों और सुझावों के लिए हमसे संपर्क करें।",
    }),
};

export default EnglishPage;
