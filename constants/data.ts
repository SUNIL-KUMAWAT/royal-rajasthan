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

export const CATEGORIES = [
    "All",
    "Fort",
    "Palace",
    "Temple",
    "Lake",
    "Desert",
    "Wildlife",
    "Hill Station",
    "Heritage",
    "Museum",
    "Adventure",
    "Festival",
    "Spiritual",
    "UNESCO"
];

export const CITIES = [
    "All Cities",

    // District Headquarters
    "Ajmer",
    "Alwar",
    "Anupgarh",
    "Balotra",
    "Banswara",
    "Baran",
    "Barmer",
    "Beawar",
    "Bharatpur",
    "Bhilwara",
    "Bikaner",
    "Bundi",
    "Chittorgarh",
    "Churu",
    "Dausa",
    "Deeg",
    "Dholpur",
    "Didwana-Kuchaman",
    "Dungarpur",
    "Gangapur City",
    "Hanumangarh",
    "Jaipur",
    "Jaisalmer",
    "Jalore",
    "Jhalawar",
    "Jhunjhunu",
    "Jodhpur",
    "Karauli",
    "Kekri",
    "Khairthal-Tijara",
    "Kota",
    "Kotputli-Behror",
    "Nagaur",
    "Neem Ka Thana",
    "Pali",
    "Phalodi",
    "Pratapgarh",
    "Rajsamand",
    "Salumbar",
    "Sanchore",
    "Sawai Madhopur",
    "Shahpura",
    "Sikar",
    "Sirohi",
    "Sri Ganganagar",
    "Tonk",
    "Udaipur",

    // Popular Tourist Towns
    "Pushkar",
    "Mount Abu",
    "Nathdwara",
    "Ranakpur",
    "Kumbhalgarh",
    "Osian",
    "Mandawa",
    "Nawalgarh",
    "Fatehpur",
    "Sam",
    "Pokaran",
    "Abhaneri",
    "Deogarh",
    "Rawla",
    "Lachhmangarh",
    "Rishabhdeo",
    "Kolayat",
    "Deshnok",
    "Ramdevra"
];

export const STATISTICS = [
    {
        label: "Destinations",
        value: 1200,
        suffix: "+",
    },
    {
        label: "Royal Forts",
        value: 250,
        suffix: "+",
    },
    {
        label: "Magnificent Palaces",
        value: 150,
        suffix: "+",
    },
    {
        label: "Colorful Festivals",
        value: 100,
        suffix: "+",
    },
    {
        label: "UNESCO Heritage Sites",
        value: 6,
        suffix: "",
    },
    {
        label: "Annual Tourists",
        value: 55,
        suffix: "M+",
    }
];

export const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Places", href: "/places" },
    { name: "Plan Trip", href: "/plan-trip" },
    { name: "Shopping", href: "/shopping" },
    { name: "Festivals", href: "/culture" },
];

export const HERO_SLIDES = [
    {
        id: 1,
        image: "https://picsum.photos/seed/raj-1/800/600",
        title: "Discover the Land of Kings",
        subtitle: "Amber Fort, Jaipur",
        description:
            "Experience timeless palaces, golden deserts, vibrant festivals, and unforgettable journeys",
    },
    {
        id: 2,
        image: "https://picsum.photos/seed/raj-2/800/600",
        title: "The Blue City Awaits",
        subtitle: "Mehrangarh Fort, Jodhpur",
        description:
            "Rise above the blue-painted streets and witness the majesty of Rajputana",
    },
    {
        id: 3,
        image: "https://picsum.photos/seed/raj-3/800/600",
        title: "City of Lakes & Dreams",
        subtitle: "Lake Pichola, Udaipur",
        description:
            "Float on mirror-calm waters surrounded by palaces that touch the sky",
    },
    {
        id: 4,
        image: "https://picsum.photos/seed/raj-4/800/600",
        title: "Golden City of the Desert",
        subtitle: "Jaisalmer Fort, Jaisalmer",
        description:
            "Where the golden sandstone fort glows at sunset over the vast Thar Desert",
    },
    {
        id: 5,
        image: "https://picsum.photos/seed/raj-5/800/600",
        title: "Palace of the Winds",
        subtitle: "Hawa Mahal, Jaipur",
        description:
            "Marvel at the iconic 953-windowed honeycomb facade of the magnificent Palace of the Winds",
    },
    {
        id: 6,
        image: "https://picsum.photos/seed/raj-6/800/600",
        title: "Fortress of Valor & Sacrifice",
        subtitle: "Chittorgarh Fort, Chittorgarh",
        description:
            "Walk through the legendary fortress that echoes tales of Rajput bravery and sacrifice",
    },
    {
        id: 7,
        image: "https://picsum.photos/seed/raj-7/800/600",
        title: "Wilderness of the Royal Bengal",
        subtitle: "Ranthambore National Park, Sawai Madhopur",
        description:
            "Witness the majestic Royal Bengal Tiger roaming freely in its natural jungle habitat",
    },
    {
        id: 8,
        image: "https://picsum.photos/seed/raj-8/800/600",
        title: "Sacred Heart of Rajasthan",
        subtitle: "Pushkar Lake, Pushkar",
        description:
            "Discover the holy ghats and sacred waters of one of India's most divine pilgrimage sites",
    }
];

export const GALLERY_IMAGES = [
    { id: 1, src: "https://picsum.photos/seed/raj-9/800/600", alt: "Amber Fort", category: "Forts", location: "Jaipur" },
    { id: 2, src: "https://picsum.photos/seed/raj-10/800/600", alt: "Hawa Mahal", category: "Palaces", location: "Jaipur" },
    { id: 3, src: "https://picsum.photos/seed/raj-11/800/600", alt: "Mehrangarh Fort", category: "Forts", location: "Jodhpur" },
    { id: 4, src: "https://picsum.photos/seed/raj-12/800/600", alt: "Lake Pichola", category: "Lakes", location: "Udaipur" },
    { id: 5, src: "https://picsum.photos/seed/raj-13/800/600", alt: "Jaisalmer Fort", category: "Forts", location: "Jaisalmer" },
    { id: 6, src: "https://picsum.photos/seed/raj-14/800/600", alt: "Ranthambore Tiger", category: "Wildlife", location: "Sawai Madhopur" },
    { id: 7, src: "https://picsum.photos/seed/raj-15/800/600", alt: "Pushkar Lake", category: "Temples", location: "Pushkar" },
    { id: 8, src: "https://picsum.photos/seed/raj-16/800/600", alt: "Udaipur Palace", category: "Palaces", location: "Udaipur" },
    { id: 9, src: "https://picsum.photos/seed/raj-17/800/600", alt: "Desert Dunes", category: "Desert", location: "Jaisalmer" },
    { id: 10, src: "https://picsum.photos/seed/raj-18/800/600", alt: "Jaipur City", category: "Cities", location: "Jaipur" },
    { id: 11, src: "https://picsum.photos/seed/raj-19/800/600", alt: "Festival", category: "Festivals", location: "Rajasthan" },
    { id: 12, src: "https://picsum.photos/seed/raj-20/800/600", alt: "Bikaner Fort", category: "Forts", location: "Bikaner" }
];

export const CATEGORIES_HINDI = [
    "सभी",
    "किला",
    "पैलेस",
    "मंदिर",
    "झील",
    "रेगिस्तान",
    "वन्यजीव",
    "हिल स्टेशन",
    "विरासत",
    "संग्रहालय",
    "रोमांच",
    "त्यौहार",
    "आध्यात्मिक",
    "यूनेस्को"
];

export const CITIES_HINDI = [
    "सभी शहर",
    "अजमेर",
    "अलवर",
    "अनूपगढ़",
    "बालोतरा",
    "बांसवाड़ा",
    "बारां",
    "बाड़मेर",
    "ब्यावर",
    "भरतपुर",
    "भीलवाड़ा",
    "बीकानेर",
    "बूंदी",
    "चित्तौड़गढ़",
    "चूरू",
    "दौसा",
    "डीग",
    "धौलपुर",
    "डीडवाना-कुचामन",
    "डूंगरपुर",
    "गंगापुर सिटी",
    "हनुमानगढ़",
    "जयपुर",
    "जैसलमेर",
    "जालोर",
    "झालावाड़",
    "झुंझुनू",
    "जोधपुर",
    "करौली",
    "केकड़ी",
    "खैरथल-तिजारा",
    "कोटा",
    "कोटपूतली-बहरोड़",
    "नागौर",
    "नीम का थाना",
    "पाली",
    "फलौदी",
    "प्रतापगढ़",
    "राजसमंद",
    "सलूम्बर",
    "सांचौर",
    "सवाई माधोपुर",
    "शाहपुरा",
    "सीकर",
    "सिरोही",
    "श्री गंगानगर",
    "टोंक",
    "उदयपुर",
    "पुष्कर",
    "माउंट आबू",
    "नाथद्वारा",
    "रणकपुर",
    "कुंभलगढ़",
    "ओसियां",
    "मंडावा",
    "नवलगढ़",
    "फतेहपुर",
    "सम",
    "पोकरण",
    "आभानेरी",
    "देवगढ़",
    "रावला",
    "लक्ष्मणगढ़",
    "ऋषभदेव",
    "कोलायत",
    "देशनोक",
    "रामदेवरा"
];

export const STATISTICS_HINDI = [
    {
        "label": "पर्यटन स्थल",
        "value": 1200,
        "suffix": "+"
    },
    {
        "label": "शाही किले",
        "value": 250,
        "suffix": "+"
    },
    {
        "label": "शानदार महल",
        "value": 150,
        "suffix": "+"
    },
    {
        "label": "रंगीन त्यौहार",
        "value": 100,
        "suffix": "+"
    },
    {
        "label": "यूनेस्को धरोहर",
        "value": 6,
        "suffix": ""
    },
    {
        "label": "सालाना पर्यटक",
        "value": 55,
        "suffix": "M+"
    }
];

export const NAV_LINKS_HINDI = [
    {
        "name": "Home",
        "href": "/"
    },
    {
        "name": "जगहें",
        "href": "/places"
    },
    {
        "name": "ट्रिप प्लान",
        "href": "/plan-trip"
    },
    {
        "name": "शॉपिंग",
        "href": "/shopping"
    },
    {
        "name": "त्यौहार",
        "href": "/culture"
    }
];

export const HERO_SLIDES_HINDI = [
    {
        "id": 1,
        "image": "https://picsum.photos/seed/raj-21/800/600",
        "title": "राजाओं की भूमि की खोज करें",
        "subtitle": "आमेर किला, जयपुर",
        "description": "ऐतिहासिक महलों, सुनहरे रेगिस्तानों, रंगीन त्योहारों और अविस्मरणीय यात्राओं का अनुभव करें"
    },
    {
        "id": 2,
        "image": "https://picsum.photos/seed/raj-22/800/600",
        "title": "नीला शहर आपका इंतजार कर रहा है",
        "subtitle": "मेहरानगढ़ किला, जोधपुर",
        "description": "नीली रंगी हुई सड़कों के ऊपर से राजपूताना की भव्यता को निहारें"
    },
    {
        "id": 3,
        "image": "https://picsum.photos/seed/raj-23/800/600",
        "title": "झीलों और सपनों का शहर",
        "subtitle": "पिछोला झील, उदयपुर",
        "description": "आसमान छूते महलों से घिरे शांत पानी पर तैरने का अनुभव लें"
    },
    {
        "id": 4,
        "image": "https://picsum.photos/seed/raj-24/800/600",
        "title": "रेगिस्तान का सुनहरा शहर",
        "subtitle": "जैसलमेर किला, जैसलमेर",
        "description": "जहां विशाल थार रेगिस्तान के ऊपर सूर्यास्त के समय सुनहरा बलुआ पत्थर का किला चमकता है"
    },
    {
        "id": 5,
        "image": "https://picsum.photos/seed/raj-25/800/600",
        "title": "हवा महल",
        "subtitle": "हवा महल, जयपुर",
        "description": "शानदार हवा महल की 953 खिड़कियों वाले मधुकोश जैसे ढांचे को देखें"
    },
    {
        "id": 6,
        "image": "https://picsum.photos/seed/raj-26/800/600",
        "title": "वीरता और बलिदान का किला",
        "subtitle": "चित्तौड़गढ़ किला, चित्तौड़गढ़",
        "description": "उस पौराणिक किले में चलें जो राजपूत बहादुरी और बलिदान की कहानियों को गूँजता है"
    },
    {
        "id": 7,
        "image": "https://picsum.photos/seed/raj-27/800/600",
        "title": "रॉयल बंगाल टाइगर का निवास",
        "subtitle": "रणथंभौर राष्ट्रीय उद्यान, सवाई माधोपुर",
        "description": "शानदार रॉयल बंगाल टाइगर को उसके प्राकृतिक जंगल में स्वतंत्र रूप से घूमते हुए देखें"
    },
    {
        "id": 8,
        "image": "https://picsum.photos/seed/raj-28/800/600",
        "title": "राजस्थान का पवित्र हृदय",
        "subtitle": "पुष्कर झील, पुष्कर",
        "description": "भारत के सबसे पवित्र तीर्थ स्थलों में से एक के पवित्र घाटों और जल की खोज करें"
    }
];
