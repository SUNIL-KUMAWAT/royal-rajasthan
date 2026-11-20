// Hindi version of /shopping — same page, Hindi metadata (language comes from the /hi URL).
import type { Metadata } from "next";
import EnglishPage, { metadata as englishMetadata } from "@/app/shopping/page";
import { hindiMetadata } from "@/lib/i18n";

export const metadata: Metadata = {
    ...hindiMetadata(englishMetadata, "/shopping", {
        title: "राजस्थान शॉपिंग गाइड - प्रसिद्ध बाज़ार",
        description: "राजस्थान के प्रसिद्ध बाज़ारों की पूरी गाइड - असली कपड़े, आभूषण और हस्तशिल्प कहाँ से खरीदें।",
    }),
};

export default EnglishPage;
