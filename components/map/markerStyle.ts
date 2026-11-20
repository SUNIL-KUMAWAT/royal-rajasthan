import { Castle, Droplets, Flower2, ShoppingBag, Sparkles, Tent, TreePine, type LucideIcon } from "lucide-react";
import type { MarkerGroup } from "@/lib/map/types";

export const GROUP_STYLE: Record<MarkerGroup, { color: string; icon: LucideIcon; label: string; labelHi: string }> = {
    heritage: { color: "#D6A85C", icon: Castle, label: "Forts & Palaces", labelHi: "किले और महल" },
    lake: { color: "#6FB7B4", icon: Droplets, label: "Lakes", labelHi: "झीलें" },
    nature: { color: "#8DBA7E", icon: TreePine, label: "Nature & Wildlife", labelHi: "प्रकृति और वन्यजीव" },
    spiritual: { color: "#E59A5B", icon: Flower2, label: "Spiritual", labelHi: "आध्यात्मिक" },
    desert: { color: "#E8C27A", icon: Tent, label: "Desert", labelHi: "मरुस्थल" },
    festival: { color: "#E07F8A", icon: Sparkles, label: "Festivals", labelHi: "त्यौहार" },
    shopping: { color: "#B79BDB", icon: ShoppingBag, label: "Markets", labelHi: "बाज़ार" },
};
