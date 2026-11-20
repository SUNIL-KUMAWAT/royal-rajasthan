// Hindi version of /destinations — same page, Hindi metadata (language comes from the /hi URL).
import type { Metadata } from "next";
import EnglishPage, { metadata as englishMetadata } from "@/app/destinations/page";
import { hindiMetadata } from "@/lib/i18n";

export const metadata: Metadata = {
    ...hindiMetadata(englishMetadata, "/destinations", {
        title: "राजस्थान के प्रमुख पर्यटन शहर",
        description: "जयपुर, उदयपुर, जोधपुर, जैसलमेर, पुष्कर और अन्य शहरों की पूरी यात्रा गाइड - रेटिंग, बजट और मुख्य आकर्षण।",
    }),
};

export default EnglishPage;
