// Hindi version of /gallery — same page, Hindi metadata (language comes from the /hi URL).
import type { Metadata } from "next";
import EnglishPage, { metadata as englishMetadata } from "@/app/gallery/page";
import { hindiMetadata } from "@/lib/i18n";

export const metadata: Metadata = {
    ...hindiMetadata(englishMetadata, "/gallery", {
        title: "राजस्थान फोटो गैलरी - किले, महल और रेगिस्तान",
        description: "राजस्थान के शाही किलों, भव्य महलों, सुनहरे रेगिस्तान और वन्यजीवन की सुंदर तस्वीरें।",
    }),
};

export default EnglishPage;
