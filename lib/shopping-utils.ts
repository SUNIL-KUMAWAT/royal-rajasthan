// Pure helpers with no data imports, safe for client components.

export const SITE_URL = "https://rajasthanplaces.in";

export const slugify = (name: string) =>
    name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

export function getDistrictFaqs(district: { district: string; shoppingPlaces: { name: string }[] }, isHi: boolean) {
    const top = district.shoppingPlaces.slice(0, 3).map((p) => p.name).join(", ");
    const name = district.district;
    return [
        {
            q: isHi ? `${name} में खरीदारी के लिए सबसे प्रसिद्ध बाजार कौन से हैं?` : `What are the most famous shopping markets in ${name}?`,
            a: isHi
                ? `${name} में प्रसिद्ध बाजारों में ${top} शामिल हैं, जहाँ पारंपरिक हस्तशिल्प और स्थानीय उत्पाद मिलते हैं।`
                : `Top shopping destinations in ${name} include ${top}, known for authentic handicrafts and local specialties.`,
        },
        {
            q: isHi ? `${name} में बाजारों का सामान्य समय क्या है?` : `What are the general market timings in ${name}?`,
            a: isHi
                ? `अधिकांश बाजार सुबह 10:00 या 11:00 बजे खुलते हैं और रात 8:30 से 9:00 बजे तक खुले रहते हैं। कुछ बाजार रविवार या किसी निर्धारित दिन बंद रह सकते हैं।`
                : `Most markets and bazaars in ${name} open around 10:00 AM - 11:00 AM and stay open until 8:30 PM - 9:00 PM.`,
        },
        {
            q: isHi ? `क्या ${name} के बाजारों में ऑनलाइन/UPI भुगतान स्वीकार किया जाता है?` : `Are digital payments (UPI) accepted in ${name} markets?`,
            a: isHi
                ? `हाँ, अधिकांश प्रमुख दुकानों और स्टालों पर Google Pay, PhonePe, Paytm जैसे UPI विकल्प उपलब्ध हैं। फिर भी छोटे विक्रेताओं के लिए थोड़ी नकदी रखना सुविधाजनक है।`
                : `Yes, UPI payments (GPay, PhonePe, Paytm) are widely accepted across most shops in ${name}. Carrying some spare cash for small street vendors is recommended.`,
        },
    ];
}

export const mapsSearchUrl = (name: string, district: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${district}, Rajasthan`)}`;
