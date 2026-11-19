// constants/data.ts
import { Place, Destination } from "../types";
export type { Place, Destination };

export { PLACES } from './places';
export { PLACES_HINDI } from './places-hindi';
export { RAJASTHAN_SHOPPING } from './shopping';
export { RAJASTHAN_SHOPPING_HINDI } from './shopping-hindi';
export { FESTIVALS } from './festivals';
export { FESTIVALS_HINDI } from './festivals-hindi';
export { DESTINATIONS } from './destinations';
export {
    PLACES_FAQS_ENGLISH,
    PLACES_FAQS_HINDI,
    FESTIVALS_FAQS_ENGLISH,
    FESTIVALS_FAQS_HINDI,
    SHOPPING_FAQS_ENGLISH,
    SHOPPING_FAQS_HINDI
} from './faqs';

// Small UI constants live in ./ui (kept light for client bundles); re-exported here for compatibility.
export {
    CATEGORIES, CITIES, STATISTICS, NAV_LINKS, HERO_SLIDES, GALLERY_IMAGES,
    CATEGORIES_HINDI, CITIES_HINDI, STATISTICS_HINDI, NAV_LINKS_HINDI, HERO_SLIDES_HINDI,
} from './ui';
