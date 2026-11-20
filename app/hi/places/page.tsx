// Hindi version of /places — same page, Hindi metadata (language comes from the /hi URL).
import type { Metadata } from "next";
import EnglishPage, { metadata as englishMetadata } from "@/app/places/page";
import { hindiMetadata } from "@/lib/i18n";

export const metadata: Metadata = {
    ...hindiMetadata(englishMetadata, "/places", {
        title: "राजस्थान के प्रसिद्ध पर्यटन स्थल - पूरी गाइड",
        description: "राजस्थान के प्रसिद्ध पर्यटन स्थलों की पूरी जानकारी - समय, टिकट की कीमत, इतिहास, घूमने का सबसे अच्छा समय और गूगल मैप्स लोकेशन।",
    }),
};

export default EnglishPage;
