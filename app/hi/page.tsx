// Hindi version of / — same page, Hindi metadata (language comes from the /hi URL).
import type { Metadata } from "next";
import EnglishPage, { metadata as englishMetadata } from "@/app/page";
import { hindiMetadata } from "@/lib/i18n";

export const metadata: Metadata = {
    ...hindiMetadata(englishMetadata, "/", {
        title: "राजस्थान पर्यटन स्थल - राजस्थान के प्रसिद्ध स्थान",
        description: "राजस्थान के प्रसिद्ध पर्यटन स्थलों की पूरी जानकारी - समय, टिकट, इतिहास, लोकेशन और यात्रा टिप्स। अपनी राजस्थान यात्रा की योजना आज ही बनाएं!",
    }),
    title: { absolute: "राजस्थान पर्यटन स्थल - राजस्थान के प्रसिद्ध स्थान" },
};

export default EnglishPage;
