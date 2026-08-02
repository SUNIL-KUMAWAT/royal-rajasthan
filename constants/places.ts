// constants/data.ts
import { Place, Destination } from "../types";
export type { Place, Destination };

export const PLACES: Place[] = [
    {
        id: 1,
        name: "Amber Fort",
        slug: "amber-fort",
        city: "Jaipur",
        state: "Rajasthan",
        category: "Fort",
        subcategory: "Hill Fort",
        description:
            "Amber Fort is a magnificent fortress perched on a hilltop overlooking Maota Lake. Built with red sandstone and marble, it is a stunning blend of Hindu and Mughal architecture with several palaces, halls, and gardens.",
        history: `
          <p>The magnificent <strong>Amber Fort</strong> stands as a towering testament to the rich architectural and cultural legacy of Jaipur. Recognized as a premier hill fort in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Built in 1592 by Raja Man Singh I, Amber Fort was the capital of the Kachwaha Rajput clan. The fort took over 100 years to complete and was expanded by successive rulers. It was declared a UNESCO World Heritage Site in 2013 as part of the Hill Forts of Rajasthan.</p>
          
          <p>Historically, monuments like Amber Fort were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Amber Fort truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Jaipur and the wider Rajasthan region. The walls of Amber Fort have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Amber Fort is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Jaipur, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.9,
        reviews: 25600,
        timing: {
            open: "8:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Light & Sound Show: 6:30 PM - 7:30 PM (English), 8:00 PM - 9:00 PM (Hindi). Last entry 5:00 PM.",
        },
        ticket: {
            isFree: false,
            indian: 100,
            foreigner: 500,
            childIndian: 0,
            childForeigner: 0,
            camera: 50,
            note: "Children below 7 years free. Composite ticket ₹300 (Indian) covers 7 monuments for 2 days.",
        },
        location: {
            address: "Devisinghpura, Amer, Jaipur",
            city: "Jaipur",
            pincode: "302001",
            latitude: 26.9855,
            longitude: 75.8513,
            googleMapUrl: "https://www.google.com/maps/place/Amer+Fort/@26.9855,75.8513,17z",
            nearestAirport: "Jaipur International Airport (13 km)",
            nearestRailway: "Jaipur Junction (11 km)",
            distanceFromCity: "11 km from Jaipur city center",
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant, 10°C - 25°C",
            tip: "Visit early morning 8-10 AM to avoid crowds. Sunset views from the ramparts are spectacular.",
        },
        visitDuration: {
            minimum: "1.5 Hours",
            recommended: "2-3 Hours",
            extended: "4-5 Hours (with Light & Sound Show)",
        },
        highlights: [
            "Sheesh Mahal (Mirror Palace)",
            "Ganesh Pol (Painted Gateway)",
            "Diwan-e-Aam",
            "Diwan-e-Khas",
            "Sukh Mahal",
            "Light & Sound Show",
            "Maota Lake View"
            ],
        tags: ["UNESCO", "Fort", "Architecture", "History", "Photography", "Heritage"],
        facilities: ["Parking", "Restrooms", "Guide Available", "Wheelchair (Partial)", "Souvenir Shop", "Cafe"],
        nearbyPlaces: ["Jaigarh Fort (1 km)", "Nahargarh Fort (15 km)", "Panna Meena Ka Kund (500m)"],
        dos: ["Wear comfortable shoes", "Carry water", "Hire a guide", "Visit Sheesh Mahal", "Stay for sunset"],
        donts: ["Don't litter", "Don't touch mirror work", "Don't skip audio guide"],
        isOpen: true,
        isFeatured: true,
        isPopular: true,
        isUNESCO: true,
        yearBuilt: "1592 AD",
        builtBy: "Raja Man Singh I",
        architecture: "Hindu-Mughal (Rajputana)",
        significance: "UNESCO World Heritage Site, former Kachwaha Rajput capital",
    },
    {
        id: 2,
        name: "Hawa Mahal",
        slug: "hawa-mahal",
        city: "Jaipur",
        state: "Rajasthan",
        category: "Palace",
        subcategory: "Wind Palace",
        description:
            "Hawa Mahal, the 'Palace of Winds', is Jaipur's most iconic landmark featuring 953 small windows (jharokhas) decorated with intricate latticework. Built from red and pink sandstone, it allowed royal women to observe street life without being seen.",
        history: `
          <p>The magnificent <strong>Hawa Mahal</strong> stands as a towering testament to the rich architectural and cultural legacy of Jaipur. Recognized as a premier wind palace in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Built in 1799 by Maharaja Sawai Pratap Singh, inspired by the crown of Lord Krishna. Architect Lal Chand Ustad designed this 5-story structure as an extension of the Royal City Palace. The honeycomb structure allows cool air to circulate, hence 'Palace of Winds'.</p>
          
          <p>Historically, monuments like Hawa Mahal were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Hawa Mahal truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Jaipur and the wider Rajasthan region. The walls of Hawa Mahal have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Hawa Mahal is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Jaipur, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1524413840003-0587428385ad?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.7,
        reviews: 31200,
        timing: {
            open: "9:00 AM",
            close: "4:30 PM",
            closedOn: "Open all days",
            note: "Best photography time is early morning 7-9 AM when sunlight hits the pink facade.",
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 10,
            note: "Composite ticket ₹300 (Indian) covers 7 monuments for 2 days.",
        },
        location: {
            address: "Hawa Mahal Road, Badi Choupad, Jaipur",
            city: "Jaipur",
            pincode: "302002",
            latitude: 26.9239,
            longitude: 75.8267,
            googleMapUrl: "https://www.google.com/maps/place/Hawa+Mahal/@26.9239,75.8267,17z",
            nearestAirport: "Jaipur International Airport (12 km)",
            nearestRailway: "Jaipur Junction (5 km)",
            distanceFromCity: "In the heart of Jaipur old city",
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant, 10°C - 25°C",
            tip: "Stand across the street for the full facade view. Early morning light makes it glow pink.",
        },
        visitDuration: {
            minimum: "30 Minutes",
            recommended: "1-1.5 Hours",
            extended: "2 Hours (with museum inside)",
        },
        highlights: [
            "953 Jharokha Windows",
            "Honeycomb Architecture",
            "Panoramic City Views from Top",
            "Museum Inside",
            "Pink Sandstone Facade",
            "Johari Bazaar Views"
            ],
        tags: ["Palace", "Architecture", "Photography", "Heritage", "Iconic", "Pink City"],
        facilities: ["Restrooms", "Guide Available", "Nearby Parking", "Souvenir Shops"],
        nearbyPlaces: ["City Palace (500m)", "Jantar Mantar (400m)", "Johari Bazaar (100m)"],
        dos: ["Photograph from across street", "Visit top floor for city views", "Go early for best light"],
        donts: ["Don't lean on delicate windows", "Don't skip internal museum"],
        isOpen: true,
        isFeatured: true,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "1799 AD",
        builtBy: "Maharaja Sawai Pratap Singh",
        architecture: "Rajputana (Red & Pink Sandstone)",
        significance: "Most photographed monument in Jaipur, symbol of Pink City",
    },
    {
        id: 3,
        name: "City Palace Jaipur",
        slug: "city-palace-jaipur",
        city: "Jaipur",
        state: "Rajasthan",
        category: "Palace",
        subcategory: "Royal Palace Complex",
        description:
            "City Palace of Jaipur is a stunning royal complex in the heart of the old city, occupying one-seventh of the walled city. It houses museums, courtyards, gardens and the Maharaja's residence. The palace showcases a beautiful blend of Rajput, Mughal and European architecture.",
        history: `
          <p>The magnificent <strong>City Palace Jaipur</strong> stands as a towering testament to the rich architectural and cultural legacy of Jaipur. Recognized as a premier royal palace complex in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Built between 1729 and 1732 by Maharaja Sawai Jai Singh II, the founder of Jaipur. The palace has been expanded by subsequent rulers. The current Maharaja of Jaipur still resides in a part of the palace. The Chandra Mahal section is a 7-story building and the oldest part of the complex.</p>
          
          <p>Historically, monuments like City Palace Jaipur were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes City Palace Jaipur truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Jaipur and the wider Rajasthan region. The walls of City Palace Jaipur have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to City Palace Jaipur is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Jaipur, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1477584308802-e9c378852d9a?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1524413840003-0587428385ad?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.7,
        reviews: 18900,
        timing: {
            open: "9:30 AM",
            close: "5:00 PM",
            closedOn: "Open all days",
            note: "Night tour available on Tue & Fri evenings (separate ticket). Last entry 4:30 PM.",
        },
        ticket: {
            isFree: false,
            indian: 200,
            foreigner: 700,
            childIndian: 100,
            childForeigner: 300,
            camera: 200,
            note: "Includes museum entry. Photography in some galleries requires separate permit.",
        },
        location: {
            address: "Tulsi Marg, Gangori Bazaar, Jaipur",
            city: "Jaipur",
            pincode: "302002",
            latitude: 26.9258,
            longitude: 75.8237,
            googleMapUrl: "https://www.google.com/maps/place/City+Palace+Jaipur/@26.9258,75.8237,17z",
            nearestAirport: "Jaipur International Airport (12 km)",
            nearestRailway: "Jaipur Junction (5 km)",
            distanceFromCity: "In Jaipur Old City",
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant, 10°C - 25°C",
            tip: "Combine with Hawa Mahal and Jantar Mantar as they are all walking distance.",
        },
        visitDuration: {
            minimum: "1.5 Hours",
            recommended: "2-3 Hours",
            extended: "4 Hours (with all galleries)",
        },
        highlights: [
            "Chandra Mahal (7-story palace)",
            "Mubarak Mahal",
            "Diwan-e-Khas",
            "Textile Museum",
            "Huge Silver Urns (Guinness Record)",
            "Peacock Gate",
            "Sabha Niwas"
            ],
        tags: ["Palace", "Museum", "Heritage", "Architecture", "Royal", "History"],
        facilities: ["Parking", "Restrooms", "Guide Available", "Museum", "Gift Shop"],
        nearbyPlaces: ["Jantar Mantar (200m)", "Hawa Mahal (500m)", "Albert Hall Museum (1.5 km)"],
        dos: ["See the giant silver urns (world record)", "Visit all courtyards", "Hire a guide"],
        donts: ["Don't miss Diwan-e-Khas", "Don't rush through galleries"],
        isOpen: true,
        isFeatured: true,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "1729-1732 AD",
        builtBy: "Maharaja Sawai Jai Singh II",
        architecture: "Rajput-Mughal-European Blend",
        significance: "Royal residence of Jaipur Maharaja, one of India's finest palace museums",
    },
    {
        id: 4,
        name: "Jantar Mantar Jaipur",
        slug: "jantar-mantar-jaipur",
        city: "Jaipur",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Astronomical Observatory",
        description:
            "Jantar Mantar is the world's largest stone astronomical observatory, built in 1734. It contains 19 major astronomical instruments that can measure time, track celestial bodies, and predict eclipses. It remains fully functional and is a UNESCO World Heritage Site.",
        history: `
          <p>The magnificent <strong>Jantar Mantar Jaipur</strong> stands as a towering testament to the rich architectural and cultural legacy of Jaipur. Recognized as a premier astronomical observatory in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Built by Maharaja Sawai Jai Singh II who was an avid astronomer and mathematician. He built 5 Jantar Mantars across India (Jaipur, Delhi, Varanasi, Ujjain, Mathura). The Jaipur observatory is the largest and best preserved. It was declared a UNESCO World Heritage Site in 2010.</p>
          
          <p>Historically, monuments like Jantar Mantar Jaipur were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Jantar Mantar Jaipur truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Jaipur and the wider Rajasthan region. The walls of Jantar Mantar Jaipur have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Jantar Mantar Jaipur is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Jaipur, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1477584308802-e9c378852d9a?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1524413840003-0587428385ad?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.5,
        reviews: 12400,
        timing: {
            open: "9:00 AM",
            close: "4:30 PM",
            closedOn: "Open all days",
            note: "Guided tours available every 30 minutes. Explanations of instruments very important.",
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 30,
            note: "Composite ticket covers City Palace + Jantar Mantar + Albert Hall.",
        },
        location: {
            address: "Near City Palace, Gangori Bazaar, Jaipur",
            city: "Jaipur",
            pincode: "302002",
            latitude: 26.9246,
            longitude: 75.8242,
            googleMapUrl: "https://www.google.com/maps/place/Jantar+Mantar+Jaipur/@26.9246,75.8242,17z",
            nearestAirport: "Jaipur International Airport (12 km)",
            nearestRailway: "Jaipur Junction (5 km)",
            distanceFromCity: "In Jaipur Old City",
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Visit with a guide - without explanation the instruments are just stone structures.",
        },
        visitDuration: {
            minimum: "45 Minutes",
            recommended: "1-1.5 Hours",
            extended: "2 Hours",
        },
        highlights: [
            "Samrat Yantra (World's Largest Sundial)",
            "19 Astronomical Instruments",
            "UNESCO Recognition",
            "Rashivalayas (12 Zodiac Instruments)",
            "Jai Prakash Yantra"
            ],
        tags: ["UNESCO", "Heritage", "Science", "Architecture", "History"],
        facilities: ["Restrooms", "Guide Available", "Parking Nearby"],
        nearbyPlaces: ["City Palace (200m)", "Hawa Mahal (400m)", "Johari Bazaar (300m)"],
        dos: ["Take guided tour", "Learn about each instrument", "Combine with City Palace visit"],
        donts: ["Don't skip the guide", "Don't visit without interest in astronomy"],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: true,
        yearBuilt: "1734 AD",
        builtBy: "Maharaja Sawai Jai Singh II",
        architecture: "Geometric Stone Structures",
        significance: "UNESCO World Heritage Site, world's largest stone observatory",
    },
    {
        id: 5,
        name: "Nahargarh Fort",
        slug: "nahargarh-fort",
        city: "Jaipur",
        state: "Rajasthan",
        category: "Fort",
        subcategory: "Hill Fort",
        description:
            "Nahargarh Fort stands on the edge of the Aravalli Hills offering the most spectacular panoramic views of Jaipur city. Known as the 'Abode of Tigers', it is a popular viewpoint for sunset and night city views. The fort was never attacked in its history.",
        history: `
          <p>The magnificent <strong>Nahargarh Fort</strong> stands as a towering testament to the rich architectural and cultural legacy of Jaipur. Recognized as a premier hill fort in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Built in 1734 by Maharaja Sawai Jai Singh II as a retreat and defensive fort. Legend says a Rathore prince's spirit haunted the construction site and was named Nahargarh (Tiger's Abode) to appease the spirit. In 1868, Europeans sheltered here during the Sepoy Mutiny. Madhavendra Bhawan inside has identical suites for 12 queens.</p>
          
          <p>Historically, monuments like Nahargarh Fort were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Nahargarh Fort truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Jaipur and the wider Rajasthan region. The walls of Nahargarh Fort have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Nahargarh Fort is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Jaipur, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1477584308802-e9c378852d9a?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1524413840003-0587428385ad?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.6,
        reviews: 16800,
        timing: {
            open: "10:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Road to fort accessible till late evening for sunset & night views (no entry ticket needed for road).",
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 30,
            note: "Vehicle entry: ₹50 extra. Restaurant/cafe doesn't require fort ticket.",
        },
        location: {
            address: "Krishna Nagar, Brahampuri, Jaipur",
            city: "Jaipur",
            pincode: "302002",
            latitude: 26.9378,
            longitude: 75.8150,
            googleMapUrl: "https://www.google.com/maps/place/Nahargarh+Fort/@26.9378,75.8150,17z",
            nearestAirport: "Jaipur International Airport (18 km)",
            nearestRailway: "Jaipur Junction (7 km)",
            distanceFromCity: "6 km from Jaipur city center",
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant, 10°C - 25°C",
            tip: "Visit just before sunset at 4:30-5:00 PM for the most breathtaking views of Jaipur.",
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "2-3 Hours",
            extended: "Evening + Dinner (4-5 Hours)",
        },
        highlights: [
            "Panoramic Jaipur City Views",
            "Madhavendra Bhawan (12 Queen Suites)",
            "Sunset Point",
            "Night City Views",
            "Wax Museum",
            "Rooftop Restaurant"
            ],
        tags: ["Fort", "Views", "Sunset", "Photography", "Heritage", "Romantic"],
        facilities: ["Parking", "Restaurant", "Restrooms", "Cafe", "Guide Available"],
        nearbyPlaces: ["Jaigarh Fort (1 km connected by wall)", "Amber Fort (8 km)", "Jal Mahal (4 km)"],
        dos: ["Visit at sunset", "Have dinner at rooftop", "Drive up the winding road"],
        donts: ["Don't visit only daytime", "Don't drive recklessly on winding road"],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "1734 AD",
        builtBy: "Maharaja Sawai Jai Singh II",
        architecture: "Rajputana (Stone)",
        significance: "Best sunset viewpoint in Jaipur, never conquered fort",
    },
    {
        id: 6,
        name: "Albert Hall Museum",
        slug: "albert-hall-museum",
        city: "Jaipur",
        state: "Rajasthan",
        category: "Museum",
        subcategory: "State Museum",
        description:
            "Albert Hall Museum is Rajasthan's oldest museum, housed in a stunning Indo-Saracenic building in Ram Niwas Garden. It contains an impressive collection of paintings, ivory work, stone sculpture, metal artifacts, crystal works, natural specimens and a famous Egyptian mummy.",
        history: `
          <p>The magnificent <strong>Albert Hall Museum</strong> stands as a towering testament to the rich architectural and cultural legacy of Jaipur. Recognized as a premier state museum in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Built in 1876 during the visit of Prince of Wales (later King Edward VII), designed by Sir Samuel Swinton Jacob. The foundation stone was laid by the Prince of Wales himself. It was initially planned as a town hall but converted into a museum. Opened to the public in 1887, it is the oldest museum in Rajasthan.</p>
          
          <p>Historically, monuments like Albert Hall Museum were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Albert Hall Museum truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Jaipur and the wider Rajasthan region. The walls of Albert Hall Museum have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Albert Hall Museum is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Jaipur, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1477584308802-e9c378852d9a?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1524413840003-0587428385ad?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.4,
        reviews: 9800,
        timing: {
            open: "9:00 AM",
            close: "5:00 PM",
            closedOn: "Open all days (special night viewing on selected days)",
            note: "Night viewing: 7:00 PM - 10:00 PM on Tue, Thu, Sat. Separate ticket ₹100.",
        },
        ticket: {
            isFree: false,
            indian: 40,
            foreigner: 300,
            childIndian: 20,
            childForeigner: 150,
            camera: 50,
            note: "Photography allowed in most areas. Egyptian mummy is the star attraction.",
        },
        location: {
            address: "Ram Niwas Garden, Jaipur",
            city: "Jaipur",
            pincode: "302004",
            latitude: 26.9123,
            longitude: 75.8186,
            googleMapUrl: "https://www.google.com/maps/place/Albert+Hall+Museum/@26.9123,75.8186,17z",
            nearestAirport: "Jaipur International Airport (13 km)",
            nearestRailway: "Jaipur Junction (2 km)",
            distanceFromCity: "2 km from city center",
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Visit at night when the building is beautifully illuminated - one of Jaipur's most photogenic sights.",
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "2 Hours",
            extended: "3 Hours",
        },
        highlights: [
            "Egyptian Mummy",
            "Indo-Saracenic Architecture",
            "Rajasthani Miniature Paintings",
            "Metal Artifacts Collection",
            "Ivory Carvings",
            "Night Illumination"
            ],
        tags: ["Museum", "Heritage", "Art", "Architecture", "History"],
        facilities: ["Parking", "Restrooms", "Guide Available", "Garden", "Cafeteria Nearby"],
        nearbyPlaces: ["Jaipur Zoo (Adjacent)", "City Palace (2 km)", "Hawa Mahal (2 km)"],
        dos: ["Visit at night for illumination", "See the Egyptian mummy", "Explore miniature paintings"],
        donts: ["Don't miss the night viewing", "Don't skip ground floor galleries"],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "1876-1887 AD",
        builtBy: "Sir Samuel Swinton Jacob",
        architecture: "Indo-Saracenic",
        significance: "Oldest museum in Rajasthan, houses Egyptian mummy",
    },

    // ============ JODHPUR ============
    {
        id: 7,
        name: "Mehrangarh Fort",
        slug: "mehrangarh-fort",
        city: "Jodhpur",
        state: "Rajasthan",
        category: "Fort",
        subcategory: "Hill Fort",
        description:
            "Mehrangarh Fort is one of the largest and most magnificent forts in India, rising 410 feet above Jodhpur city on a rocky cliff. The fort's museum houses one of the finest collections of Rajput art, palanquins, musical instruments, costumes, and furniture.",
        history: `
          <p>The magnificent <strong>Mehrangarh Fort</strong> stands as a towering testament to the rich architectural and cultural legacy of Jodhpur. Recognized as a premier hill fort in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Built in 1459 by Rao Jodha, founder of Jodhpur. The fort has been continuously occupied for over 560 years. Legend says a hermit cursed the fort and Rao Jodha buried a man alive in the foundations to appease the curse. The fort has 7 gates, each commemorating a victory in battle.</p>
          
          <p>Historically, monuments like Mehrangarh Fort were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Mehrangarh Fort truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Jodhpur and the wider Rajasthan region. The walls of Mehrangarh Fort have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Mehrangarh Fort is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Jodhpur, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1562141989-c5c79ac8f576?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1562141989-c5c79ac8f576?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.9,
        reviews: 19800,
        timing: {
            open: "9:00 AM",
            close: "5:00 PM",
            closedOn: "Open all days",
            note: "Last entry 4:30 PM. Zip line 9:00 AM - 5:00 PM (separate booking). Sound & Light Show in evenings.",
        },
        ticket: {
            isFree: false,
            indian: 100,
            foreigner: 600,
            childIndian: 50,
            childForeigner: 300,
            camera: 100,
            note: "Audio guide: ₹180 (Hindi), ₹200 (English). Zip line: separate ticket ₹650+.",
        },
        location: {
            address: "The Fort, Jodhpur, Rajasthan",
            city: "Jodhpur",
            pincode: "342006",
            latitude: 26.2981,
            longitude: 73.0188,
            googleMapUrl: "https://www.google.com/maps/place/Mehrangarh+Fort/@26.2981,73.0188,17z",
            nearestAirport: "Jodhpur Airport (5 km)",
            nearestRailway: "Jodhpur Junction (3 km)",
            distanceFromCity: "In the heart of Jodhpur city",
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Cool and pleasant, 8°C - 28°C",
            tip: "Visit sunset time for stunning views of Blue City below. Evening Sound & Light Show is excellent.",
        },
        visitDuration: {
            minimum: "2 Hours",
            recommended: "3-4 Hours",
            extended: "5-6 Hours (with zip line + Sound & Light Show)",
        },
        highlights: [
            "Museum with Royal Artifacts",
            "Panoramic Blue City Views",
            "Moti Mahal (Pearl Palace)",
            "Phool Mahal (Flower Palace)",
            "Sound & Light Show",
            "Flying Fox Zip Line",
            "7 Historic Gates",
            "Chamunda Mataji Temple"
            ],
        tags: ["Fort", "Museum", "Views", "Heritage", "Adventure", "Blue City"],
        facilities: ["Parking", "Restrooms", "Audio Guide", "Restaurant", "Gift Shop"],
        nearbyPlaces: ["Jaswant Thada (1 km)", "Clock Tower Market (2 km)", "Umaid Bhawan Palace (5 km)"],
        dos: ["Take audio guide", "Visit museum galleries", "Watch sunset from ramparts", "Try zip line"],
        donts: ["Don't rush", "Don't miss cannon ball marks on gates", "Don't skip Turban Gallery"],
        isOpen: true,
        isFeatured: true,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "1459 AD",
        builtBy: "Rao Jodha",
        architecture: "Rajputana (Sandstone)",
        significance: "One of India's largest forts, 560+ years continuously occupied",
    },
    {
        id: 8,
        name: "Umaid Bhawan Palace",
        slug: "umaid-bhawan-palace",
        city: "Jodhpur",
        state: "Rajasthan",
        category: "Palace",
        subcategory: "Art Deco Palace",
        description:
            "Umaid Bhawan Palace is one of the world's largest private residences, built in Art Deco style. Part of the palace is a luxury hotel (Taj Hotels), part is a museum, and part remains the residence of the Jodhpur royal family. It sits majestically on Chittar Hill overlooking Jodhpur city.",
        history: `
          <p>The magnificent <strong>Umaid Bhawan Palace</strong> stands as a towering testament to the rich architectural and cultural legacy of Jodhpur. Recognized as a premier art deco palace in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Built between 1928 and 1943 by Maharaja Umaid Singh to provide employment during a severe famine. Over 3,000 workers were employed for 15 years. The palace is built entirely of Chittar sandstone without using any mortar. Designed by Henry Vaughan Lanchester, it is the last great palace built in India.</p>
          
          <p>Historically, monuments like Umaid Bhawan Palace were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Umaid Bhawan Palace truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Jodhpur and the wider Rajasthan region. The walls of Umaid Bhawan Palace have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Umaid Bhawan Palace is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Jodhpur, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1562141989-c5c79ac8f576?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.7,
        reviews: 11200,
        timing: {
            open: "9:00 AM",
            close: "5:00 PM",
            closedOn: "Open all days (Museum section)",
            note: "Hotel guests have full access. Museum visit does not include hotel areas.",
        },
        ticket: {
            isFree: false,
            indian: 30,
            foreigner: 100,
            childIndian: 0,
            childForeigner: 0,
            camera: 50,
            note: "Museum entry only. Hotel dining is separate. Vintage car museum inside.",
        },
        location: {
            address: "Chittar Hill, Jodhpur",
            city: "Jodhpur",
            pincode: "342006",
            latitude: 26.2837,
            longitude: 73.0596,
            googleMapUrl: "https://www.google.com/maps/place/Umaid+Bhawan+Palace/@26.2837,73.0596,17z",
            nearestAirport: "Jodhpur Airport (4 km)",
            nearestRailway: "Jodhpur Junction (3 km)",
            distanceFromCity: "4 km from Jodhpur center",
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Cool, 8°C - 25°C",
            tip: "Combine with Mehrangarh Fort visit. Sunset from the palace garden is beautiful.",
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "2 Hours",
            extended: "3 Hours (with garden and vintage cars)",
        },
        highlights: [
            "Art Deco Architecture",
            "Vintage Car Museum",
            "Palace Museum",
            "Royal Artifacts Collection",
            "Majestic Palace Garden",
            "Views of Jodhpur City"
            ],
        tags: ["Palace", "Museum", "Architecture", "Heritage", "Royal", "Luxury"],
        facilities: ["Parking", "Museum", "Restaurant (Hotel)", "Gift Shop", "Garden"],
        nearbyPlaces: ["Mehrangarh Fort (5 km)", "Jodhpur Airport (4 km)", "Clock Tower (6 km)"],
        dos: ["Visit museum", "See vintage car collection", "Walk around the palace gardens"],
        donts: ["Don't confuse museum area with hotel", "Don't miss the royal artifacts"],
        isOpen: true,
        isFeatured: true,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "1928-1943 AD",
        builtBy: "Maharaja Umaid Singh",
        architecture: "Art Deco (Chittar Sandstone)",
        significance: "One of world's largest private residences, last great Indian palace",
    },

    // ============ UDAIPUR ============
    {
        id: 9,
        name: "City Palace Udaipur",
        slug: "city-palace-udaipur",
        city: "Udaipur",
        state: "Rajasthan",
        category: "Palace",
        subcategory: "Royal Palace Complex",
        description:
            "City Palace of Udaipur is the largest palace complex in Rajasthan, built over 400 years by successive Mewar rulers on the banks of Lake Pichola. It seamlessly blends Rajasthani and Mughal architectural styles with stunning lake views.",
        history: `
          <p>The magnificent <strong>City Palace Udaipur</strong> stands as a towering testament to the rich architectural and cultural legacy of Udaipur. Recognized as a premier royal palace complex in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Construction began in 1559 by Maharana Udai Singh II. The palace was expanded over 4 centuries by 22 successive Maharanas. The Mewar dynasty never submitted to the Mughals, making this palace a symbol of Rajput pride. Part is now a museum, part is a luxury hotel, and part is still the royal residence.</p>
          
          <p>Historically, monuments like City Palace Udaipur were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes City Palace Udaipur truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Udaipur and the wider Rajasthan region. The walls of City Palace Udaipur have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to City Palace Udaipur is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Udaipur, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1585141974416-24a1b0268598?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1615552980649-db3722e0325d?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1585141974416-24a1b0268598?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.8,
        reviews: 22100,
        timing: {
            open: "9:30 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Last entry 5:00 PM. Crystal Gallery has separate timing 10:00 AM - 7:30 PM.",
        },
        ticket: {
            isFree: false,
            indian: 300,
            foreigner: 700,
            childIndian: 100,
            childForeigner: 350,
            camera: 250,
            note: "Crystal Gallery extra: ₹500 (Indian), ₹700 (Foreigner). Guide: ₹200-400.",
        },
        location: {
            address: "Old City, Udaipur, Rajasthan",
            city: "Udaipur",
            pincode: "313001",
            latitude: 24.5764,
            longitude: 73.6831,
            googleMapUrl: "https://www.google.com/maps/place/City+Palace+Udaipur/@24.5764,73.6831,17z",
            nearestAirport: "Maharana Pratap Airport (24 km)",
            nearestRailway: "Udaipur City Railway Station (3 km)",
            distanceFromCity: "In the heart of old Udaipur",
        },
        bestTimeToVisit: {
            months: "September - March",
            season: "Winter / Post-Monsoon",
            weather: "Pleasant, 10°C - 30°C",
            tip: "Visit during sunset for magical Lake Pichola views. Post-monsoon (Sept-Nov) lake is fullest.",
        },
        visitDuration: {
            minimum: "2 Hours",
            recommended: "3-4 Hours",
            extended: "5-6 Hours (with Crystal Gallery and boat ride)",
        },
        highlights: [
            "Mor Chowk (Peacock Courtyard)",
            "Crystal Gallery",
            "Lake Pichola Views",
            "Amar Vilas Garden",
            "Manak Mahal (Ruby Palace)",
            "Sheesh Mahal",
            "Vintage Car Collection"
            ],
        tags: ["Palace", "Museum", "Lake View", "Heritage", "Architecture", "Royal"],
        facilities: ["Parking", "Restrooms", "Guide Available", "Cafe", "Gift Shop"],
        nearbyPlaces: ["Lake Pichola (Adjacent)", "Jagdish Temple (200m)", "Bagore Ki Haveli (500m)"],
        dos: ["Visit Crystal Gallery", "Take sunset boat ride", "Hire guide for history"],
        donts: ["Don't touch antiques", "Don't skip Mor Chowk peacock mosaics"],
        isOpen: true,
        isFeatured: true,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "1559 AD",
        builtBy: "Maharana Udai Singh II",
        architecture: "Rajasthani-Mughal Blend",
        significance: "Largest palace complex in Rajasthan, seat of Mewar dynasty",
    },
    {
        id: 10,
        name: "Lake Pichola",
        slug: "lake-pichola",
        city: "Udaipur",
        state: "Rajasthan",
        category: "Lake",
        subcategory: "Artificial Lake",
        description:
            "Lake Pichola is one of India's most picturesque artificial lakes, surrounded by hills, palaces, temples, and ghats. The famous Lake Palace (Jag Niwas) and Jag Mandir palace appear to float on the water, making it one of India's most romantic locations.",
        history: `
          <p>The magnificent <strong>Lake Pichola</strong> stands as a towering testament to the rich architectural and cultural legacy of Udaipur. Recognized as a premier artificial lake in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Created in 1362 AD by a Banjara tribesman named Pichhu. Maharana Udai Singh II was captivated by the lake and built his capital Udaipur on its banks in 1559. Later enlarged by building a dam. Two island palaces - Jag Niwas (now Lake Palace Hotel) and Jag Mandir - were built on the lake.</p>
          
          <p>Historically, monuments like Lake Pichola were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Lake Pichola truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Udaipur and the wider Rajasthan region. The walls of Lake Pichola have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Lake Pichola is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Udaipur, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1586183189334-f83f4929f5c7?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1571003123771-bd6a099d28ab?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1586183189334-f83f4929f5c7?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.8,
        reviews: 20300,
        timing: {
            open: "All Day",
            close: "All Night",
            closedOn: "Open all days",
            note: "Boat rides: 10:00 AM - 5:00 PM. Sunset boat rides most popular (book in advance).",
        },
        ticket: {
            isFree: true,
            indian: 0,
            foreigner: 0,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Lake viewing free. Boat ride: ₹400-800/person. Sunset cruise: ₹700-1200. Jag Mandir island visit extra.",
        },
        location: {
            address: "Old City, Udaipur",
            city: "Udaipur",
            pincode: "313001",
            latitude: 24.5711,
            longitude: 73.6778,
            googleMapUrl: "https://www.google.com/maps/place/Pichola+Lake/@24.5711,73.6778,15z",
            nearestAirport: "Maharana Pratap Airport (24 km)",
            nearestRailway: "Udaipur City Railway Station (3 km)",
            distanceFromCity: "In the heart of Udaipur",
        },
        bestTimeToVisit: {
            months: "September - March",
            season: "Post-Monsoon / Winter",
            weather: "Pleasant, 12°C - 28°C",
            tip: "Lake is fullest after monsoon (Sept-Nov). Book sunset boat cruise in advance.",
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "2-3 Hours (with boat ride)",
            extended: "Half Day (with ghats and temples)",
        },
        highlights: [
            "Sunset Boat Ride",
            "Lake Palace (Jag Niwas) View",
            "Jag Mandir Island",
            "City Palace Backdrop",
            "Ambrai Ghat",
            "Gangaur Ghat",
            "Mountain Reflections"
            ],
        tags: ["Lake", "Romantic", "Boat Ride", "Sunset", "Photography", "Free Entry"],
        facilities: ["Boat Rides", "Ghats", "Nearby Restaurants", "Parking", "Photography Spots"],
        nearbyPlaces: ["City Palace (Adjacent)", "Jagdish Temple (500m)", "Ambrai Ghat (200m)"],
        dos: ["Take sunset boat ride", "Visit Ambrai Ghat", "Walk along ghats at sunset"],
        donts: ["Don't throw anything in lake", "Don't swim", "Don't miss sunset"],
        isOpen: true,
        isFeatured: true,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "1362 AD",
        builtBy: "Pichhu Banjara",
        architecture: "Natural & Artificial Lake",
        significance: "Most romantic spot in Rajasthan, inspired founding of Udaipur",
    },
    {
        id: 11,
        name: "Sajjangarh Palace",
        slug: "sajjangarh-palace",
        city: "Udaipur",
        state: "Rajasthan",
        category: "Palace",
        subcategory: "Monsoon Palace",
        description:
            "Sajjangarh Palace, also known as the Monsoon Palace, sits atop Bansdara mountain at 944 meters offering breathtaking panoramic views of Udaipur, its lakes, and the Aravalli Mountains. It appears to float among the clouds during monsoon.",
        history: `
          <p>The magnificent <strong>Sajjangarh Palace</strong> stands as a towering testament to the rich architectural and cultural legacy of Udaipur. Recognized as a premier monsoon palace in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Built in 1884 by Maharana Sajjan Singh to watch the monsoon clouds and track migratory birds. The Maharana planned to build a 9-story tower but died before completion. The palace is now maintained by the Indian Forest Department. It was featured in the 1983 James Bond film 'Octopussy'.</p>
          
          <p>Historically, monuments like Sajjangarh Palace were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Sajjangarh Palace truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Udaipur and the wider Rajasthan region. The walls of Sajjangarh Palace have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Sajjangarh Palace is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Udaipur, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1585141974416-24a1b0268598?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1615552980649-db3722e0325d?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.5,
        reviews: 8700,
        timing: {
            open: "8:00 AM",
            close: "6:00 PM",
            closedOn: "Open all days",
            note: "Best visited for sunset. Get there 30 min before sunset for best views.",
        },
        ticket: {
            isFree: false,
            indian: 80,
            foreigner: 80,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Vehicle entry: ₹120. Ropeway may be available for alternate access.",
        },
        location: {
            address: "Bansdara Mountain, Udaipur",
            city: "Udaipur",
            pincode: "313001",
            latitude: 24.5720,
            longitude: 73.6507,
            googleMapUrl: "https://www.google.com/maps/place/Sajjangarh+Palace/@24.5720,73.6507,15z",
            nearestAirport: "Maharana Pratap Airport (20 km)",
            nearestRailway: "Udaipur City Railway Station (7 km)",
            distanceFromCity: "7 km from Udaipur city center",
        },
        bestTimeToVisit: {
            months: "July - March",
            season: "Monsoon/Post-Monsoon/Winter",
            weather: "Cool/Misty during monsoon, pleasant in winter",
            tip: "Monsoon visit is magical when palace is shrouded in clouds. Sunset is always spectacular.",
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5-2 Hours",
            extended: "2-3 Hours (with sunset)",
        },
        highlights: [
            "Panoramic Views of Udaipur",
            "Views of Lakes Pichola & Fateh Sagar",
            "James Bond Film Location (Octopussy)",
            "Monsoon Cloud Views",
            "Aravalli Ranges Backdrop"
            ],
        tags: ["Palace", "Views", "Sunset", "Photography", "Nature", "Romantic"],
        facilities: ["Parking", "Restrooms", "Nearby Cafe", "Guide Available"],
        nearbyPlaces: ["Fateh Sagar Lake (4 km)", "Sas Bahu Temples (6 km)", "City Palace (7 km)"],
        dos: ["Visit at sunset", "Check weather before going (fog in monsoon)", "Carry camera"],
        donts: ["Don't visit on rainy day (slippery road)", "Don't miss the panoramic view"],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "1884 AD",
        builtBy: "Maharana Sajjan Singh",
        architecture: "Rajputana Style",
        significance: "Featured in James Bond Octopussy, best viewpoint in Udaipur",
    },

    // ============ JAISALMER ============
    {
        id: 12,
        name: "Jaisalmer Fort",
        slug: "jaisalmer-fort",
        city: "Jaisalmer",
        state: "Rajasthan",
        category: "Fort",
        subcategory: "Living Fort",
        description:
            "Jaisalmer Fort (Sonar Quila/Golden Fort) is one of the world's few living forts where 3,000+ people still reside. Built entirely of golden-yellow sandstone, it glows like gold at sunrise and sunset, earning its name.",
        history: `
          <p>The magnificent <strong>Jaisalmer Fort</strong> stands as a towering testament to the rich architectural and cultural legacy of Jaisalmer. Recognized as a premier living fort in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Built in 1156 AD by Rawal Jaisal on Trikuta Hill in the Thar Desert. UNESCO World Heritage Site since 2013 (Hill Forts of Rajasthan). Strategic location on the Silk Route made Jaisalmer wealthy. Still inhabited by quarter of city's population.</p>
          
          <p>Historically, monuments like Jaisalmer Fort were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Jaisalmer Fort truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Jaisalmer and the wider Rajasthan region. The walls of Jaisalmer Fort have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Jaisalmer Fort is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Jaisalmer, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.8,
        reviews: 17500,
        timing: {
            open: "9:00 AM",
            close: "6:00 PM",
            closedOn: "Open all days",
            note: "Fort walls accessible all day. Palace Museum has fixed timings. Streets inside open 24 hours.",
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 250,
            childIndian: 0,
            childForeigner: 0,
            camera: 100,
            note: "Walking inside fort is free. Ticket for Palace Museum and Jain Temples.",
        },
        location: {
            address: "Fort Road, Jaisalmer",
            city: "Jaisalmer",
            pincode: "345001",
            latitude: 26.9124,
            longitude: 70.9083,
            googleMapUrl: "https://www.google.com/maps/place/Jaisalmer+Fort/@26.9124,70.9083,16z",
            nearestAirport: "Jaisalmer Airport (17 km)",
            nearestRailway: "Jaisalmer Railway Station (1 km)",
            distanceFromCity: "In the center of Jaisalmer city",
        },
        bestTimeToVisit: {
            months: "November - February",
            season: "Winter",
            weather: "Cool, 5°C - 25°C",
            tip: "Visit sunrise or sunset - the golden sandstone literally glows. Stay inside the fort for sunset.",
        },
        visitDuration: {
            minimum: "2 Hours",
            recommended: "3-4 Hours",
            extended: "Full Day (exploring all streets, shops, temples)",
        },
        highlights: [
            "Golden Sandstone Architecture",
            "Living Fort (3000+ residents)",
            "Jain Temples (12th-15th century)",
            "Raj Mahal (Royal Palace)",
            "Patwon Ki Haveli",
            "Fort Ramparts & Bastions",
            "Rooftop Restaurants"
            ],
        tags: ["UNESCO", "Fort", "Living Fort", "Desert", "Heritage", "Architecture"],
        facilities: ["Restrooms", "Restaurants", "Shops", "Guide Available", "ATM Inside"],
        nearbyPlaces: ["Patwon Ki Haveli (500m)", "Gadisar Lake (1 km)", "Sam Sand Dunes (42 km)"],
        dos: ["Walk narrow streets", "Visit Jain Temples", "Watch sunset from walls", "Eat at rooftop cafes"],
        donts: ["Don't use plastic inside", "Don't damage sandstone walls"],
        isOpen: true,
        isFeatured: true,
        isPopular: true,
        isUNESCO: true,
        yearBuilt: "1156 AD",
        builtBy: "Rawal Jaisal",
        architecture: "Rajputana (Golden Sandstone)",
        significance: "UNESCO World Heritage, one of world's largest living forts",
    },
    {
        id: 13,
        name: "Sam Sand Dunes",
        slug: "sam-sand-dunes",
        city: "Jaisalmer",
        state: "Rajasthan",
        category: "Desert",
        subcategory: "Sand Dunes",
        description:
            "Sam Sand Dunes is the most popular desert destination in Rajasthan, 42 km from Jaisalmer. The golden dunes rise 30-60 meters offering camel safaris, jeep rides, desert camping, folk music and dance under a sky blazing with stars.",
        history: `
          <p>The magnificent <strong>Sam Sand Dunes</strong> stands as a towering testament to the rich architectural and cultural legacy of Jaisalmer. Recognized as a premier sand dunes in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Part of the ancient Silk Route corridor. Sam village served as a rest stop for caravans between India and Central Asia. The dunes are shaped by millennia of Thar Desert wind patterns. Desert National Park nearby protects the endangered Great Indian Bustard.</p>
          
          <p>Historically, monuments like Sam Sand Dunes were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Sam Sand Dunes truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Jaisalmer and the wider Rajasthan region. The walls of Sam Sand Dunes have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Sam Sand Dunes is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Jaisalmer, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1544015759-237f2a0a8176?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.7,
        reviews: 15600,
        timing: {
            open: "All Day",
            close: "All Night",
            closedOn: "Open all days",
            note: "Best 3:30 PM onwards for camel safari and sunset. Camp overnight for sunrise experience.",
        },
        ticket: {
            isFree: true,
            indian: 0,
            foreigner: 0,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Entry free. Camel ride: ₹300-800. Desert camp: ₹1500-5000/night. Jeep safari: ₹1000-2000.",
        },
        location: {
            address: "Sam Village, Thar Desert, Jaisalmer",
            city: "Jaisalmer",
            pincode: "345001",
            latitude: 26.7763,
            longitude: 70.5283,
            googleMapUrl: "https://www.google.com/maps/place/Sam+Sand+Dunes/@26.7763,70.5283,14z",
            nearestAirport: "Jaisalmer Airport (55 km)",
            nearestRailway: "Jaisalmer Railway Station (42 km)",
            distanceFromCity: "42 km from Jaisalmer city",
        },
        bestTimeToVisit: {
            months: "November - February",
            season: "Winter",
            weather: "Cool nights 5°C, warm days 25°C",
            tip: "Stay overnight at a desert camp for the full experience. Avoid summer (45-50°C+).",
        },
        visitDuration: {
            minimum: "3-4 Hours (evening safari)",
            recommended: "Overnight (desert camping)",
            extended: "2 Days (full desert experience)",
        },
        highlights: [
            "Camel Safari at Sunset",
            "Desert Camping Under Stars",
            "Folk Music & Dance",
            "Jeep Safari",
            "Sunrise Over Sand Dunes",
            "Star Gazing",
            "Traditional Rajasthani Dinner"
            ],
        tags: ["Desert", "Safari", "Camping", "Adventure", "Free Entry", "Photography"],
        facilities: ["Desert Camps", "Camel Rides", "Jeep Safari", "Cultural Programs", "Food at Camps"],
        nearbyPlaces: ["Jaisalmer Fort (42 km)", "Desert National Park (20 km)", "Kuldhara (25 km)"],
        dos: ["Stay overnight", "Carry warm clothes", "Try dal-bati-churma", "Stargaze at night"],
        donts: ["Don't leave plastic", "Don't visit in summer", "Don't walk barefoot in daytime"],
        isOpen: true,
        isFeatured: true,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Natural Formation",
        builtBy: "Nature (Thar Desert)",
        architecture: "Natural Desert Landscape",
        significance: "Most popular desert safari destination in India",
    },
    {
        id: 14,
        name: "Patwon Ki Haveli",
        slug: "patwon-ki-haveli",
        city: "Jaisalmer",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Merchant Haveli",
        description:
            "Patwon Ki Haveli is the largest and most elaborate haveli in Jaisalmer, actually comprising 5 connected havelis built by wealthy Jain merchant Guman Chand Patwa. The intricate golden sandstone carving covering every inch of the 5-story facade is breathtaking.",
        history: `
          <p>The magnificent <strong>Patwon Ki Haveli</strong> stands as a towering testament to the rich architectural and cultural legacy of Jaisalmer. Recognized as a premier merchant haveli in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Built between 1800-1860 AD by Guman Chand Patwa, a wealthy brocade and jewellery merchant. Each of his 5 sons built one haveli, which were later connected. The havelis fell into disuse when the family moved to Ahmedabad. One is now a government museum and others are privately maintained.</p>
          
          <p>Historically, monuments like Patwon Ki Haveli were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Patwon Ki Haveli truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Jaisalmer and the wider Rajasthan region. The walls of Patwon Ki Haveli have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Patwon Ki Haveli is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Jaisalmer, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.5,
        reviews: 7800,
        timing: {
            open: "9:00 AM",
            close: "5:00 PM",
            closedOn: "Open all days",
            note: "Main government-maintained haveli open during these hours. Private sections have different timings.",
        },
        ticket: {
            isFree: false,
            indian: 30,
            foreigner: 100,
            childIndian: 0,
            childForeigner: 0,
            camera: 50,
            note: "Government section: ₹30 Indian, ₹100 Foreign. Some private havelis charge separately.",
        },
        location: {
            address: "Patwon Ki Haveli Street, Jaisalmer",
            city: "Jaisalmer",
            pincode: "345001",
            latitude: 26.9147,
            longitude: 70.9134,
            googleMapUrl: "https://www.google.com/maps/place/Patwon+Ki+Haveli/@26.9147,70.9134,17z",
            nearestAirport: "Jaisalmer Airport (17 km)",
            nearestRailway: "Jaisalmer Railway Station (1.5 km)",
            distanceFromCity: "500m from Jaisalmer Fort",
        },
        bestTimeToVisit: {
            months: "November - February",
            season: "Winter",
            weather: "Cool, 5°C - 25°C",
            tip: "Combine with Jaisalmer Fort visit. Morning light on the golden sandstone carving is magical.",
        },
        visitDuration: {
            minimum: "45 Minutes",
            recommended: "1-1.5 Hours",
            extended: "2 Hours",
        },
        highlights: [
            "Intricate Golden Sandstone Carvings",
            "5 Connected Havelis",
            "55 Jharokha Windows",
            "Rajasthani Paintings",
            "Merchant Era Artifacts",
            "Rooftop Desert Views"
            ],
        tags: ["Heritage", "Architecture", "Art", "History", "Photography"],
        facilities: ["Guide Available", "Nearby Parking", "Restrooms Nearby", "Shops Around"],
        nearbyPlaces: ["Jaisalmer Fort (500m)", "Gadisar Lake (1 km)", "Salim Singh Haveli (500m)"],
        dos: ["Look at carving details", "Compare all 5 havelis", "Visit rooftop for desert views"],
        donts: ["Don't miss the facade photography", "Don't confuse the 5 connected havelis"],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "1800-1860 AD",
        builtBy: "Guman Chand Patwa & Sons",
        architecture: "Jaisalmeri (Golden Sandstone)",
        significance: "Largest haveli in Jaisalmer, finest example of sandstone artistry",
    },

    // ============ PUSHKAR ============
    {
        id: 15,
        name: "Pushkar Lake & Brahma Temple",
        slug: "pushkar-lake-brahma-temple",
        city: "Pushkar",
        state: "Rajasthan",
        category: "Temple",
        subcategory: "Sacred Lake & Temple",
        description:
            "Pushkar Lake is one of Hinduism's most sacred lakes, believed created when Lord Brahma dropped a lotus flower. The town has 52 bathing ghats and the only Brahma Temple in the world. The annual Pushkar Camel Fair draws visitors worldwide.",
        history: `
          <p>The magnificent <strong>Pushkar Lake & Brahma Temple</strong> stands as a towering testament to the rich architectural and cultural legacy of Pushkar. Recognized as a premier sacred lake & temple in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. One of the five sacred Hindu dhams, mentioned in the Mahabharata and Padma Purana. The Brahma Temple was built in the 14th century. Pushkar has been a pilgrimage center for 2,000+ years. The Camel Fair began as a livestock trading event centuries ago and grew into a major international event.</p>
          
          <p>Historically, monuments like Pushkar Lake & Brahma Temple were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Pushkar Lake & Brahma Temple truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Pushkar and the wider Rajasthan region. The walls of Pushkar Lake & Brahma Temple have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Pushkar Lake & Brahma Temple is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Pushkar, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1575377427642-087cf684ad0c?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.6,
        reviews: 12400,
        timing: {
            open: "5:00 AM",
            close: "9:00 PM",
            closedOn: "Open all days",
            note: "Brahma Temple: 6:30 AM - 1:30 PM, 3:00 PM - 8:30 PM. Photography NOT allowed inside temple.",
        },
        ticket: {
            isFree: true,
            indian: 0,
            foreigner: 0,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Completely free. Decline unsolicited puja at ghats that demand donations.",
        },
        location: {
            address: "Pushkar Town, Ajmer District, Rajasthan",
            city: "Pushkar",
            pincode: "305022",
            latitude: 26.4899,
            longitude: 74.5511,
            googleMapUrl: "https://www.google.com/maps/place/Pushkar+Lake/@26.4899,74.5511,15z",
            nearestAirport: "Jaipur Airport (150 km)",
            nearestRailway: "Ajmer Junction (15 km)",
            distanceFromCity: "15 km from Ajmer",
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter / Festival Season",
            weather: "Pleasant, 8°C - 28°C",
            tip: "Pushkar Camel Fair (November) is the most vibrant time. Kartik Purnima (Nov full moon) is holiest.",
        },
        visitDuration: {
            minimum: "2-3 Hours",
            recommended: "Half Day",
            extended: "Full Day (during Camel Fair)",
        },
        highlights: [
            "Only Brahma Temple in World",
            "Sacred Lake with 52 Ghats",
            "Pushkar Camel Fair (November)",
            "Sunrise/Sunset Aarti",
            "Savitri Temple Hilltop",
            "Colorful Markets"
            ],
        tags: ["Temple", "Spiritual", "Lake", "Free Entry", "Festival", "Sacred"],
        facilities: ["Ghats", "Restrooms", "Nearby Hotels", "Markets", "Cafes"],
        nearbyPlaces: ["Savitri Temple (2 km trek)", "Ajmer Sharif Dargah (15 km)"],
        dos: ["Remove shoes before ghats/temple", "Visit sunrise/sunset aarti", "Try local malpua sweet"],
        donts: ["No photos inside Brahma Temple", "No non-veg/alcohol (holy town)", "Don't accept unsolicited puja"],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "14th Century (Temple), Ancient (Lake)",
        builtBy: "Various rulers over centuries",
        architecture: "Temple Architecture",
        significance: "World's only Brahma Temple, one of 5 sacred Hindu dhams",
    },

    // ============ RANTHAMBORE ============
    {
        id: 16,
        name: "Ranthambore National Park",
        slug: "ranthambore-national-park",
        city: "Sawai Madhopur",
        state: "Rajasthan",
        category: "Wildlife",
        subcategory: "National Park / Tiger Reserve",
        description:
            "Ranthambore is India's most famous tiger reserve, spread over 1,334 sq km with Bengal tigers, leopards, crocodiles and 300+ bird species. The 10th-century Ranthambore Fort within the park adds historical uniqueness.",
        history: `
          <p>The magnificent <strong>Ranthambore National Park</strong> stands as a towering testament to the rich architectural and cultural legacy of Sawai Madhopur. Recognized as a premier national park / tiger reserve in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Former hunting ground of Jaipur Maharajas. Ranthambore Fort was built by Chauhan dynasty in 10th century. Declared wildlife sanctuary 1955, Project Tiger 1973, National Park 1980. One of best places in world to see wild Bengal tigers.</p>
          
          <p>Historically, monuments like Ranthambore National Park were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Ranthambore National Park truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Sawai Madhopur and the wider Rajasthan region. The walls of Ranthambore National Park have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Ranthambore National Park is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Sawai Madhopur, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1572205628588-6c9e2a0fb5ee?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.8,
        reviews: 14200,
        timing: {
            open: "6:00 AM (Oct-Mar) / 6:30 AM (Apr-Jun)",
            close: "6:00 PM",
            closedOn: "CLOSED: July 1 - September 30 (Monsoon season)",
            note: "Morning safari: 6:00 AM - 10:00 AM. Afternoon safari: 2:30 PM - 6:00 PM. Book ONLINE at rajasthanwildlife.in well in advance.",
        },
        ticket: {
            isFree: false,
            indian: 200,
            foreigner: 1000,
            childIndian: 100,
            childForeigner: 500,
            camera: 0,
            note: "Jeep Safari: ₹2500-3000 (Indian). Canter: ₹800-1000. Book online - offline booking often unavailable.",
        },
        location: {
            address: "Ranthambore Road, Sawai Madhopur",
            city: "Sawai Madhopur",
            pincode: "322001",
            latitude: 26.0173,
            longitude: 76.5026,
            googleMapUrl: "https://www.google.com/maps/place/Ranthambore+National+Park/@26.0173,76.5026,13z",
            nearestAirport: "Jaipur Airport (180 km)",
            nearestRailway: "Sawai Madhopur Railway Station (11 km)",
            distanceFromCity: "11 km from Sawai Madhopur",
        },
        bestTimeToVisit: {
            months: "October - June (Park Open Season)",
            season: "Winter best, Summer highest tiger sightings",
            weather: "10°C - 45°C varies by season",
            tip: "April-June: highest tiger sighting probability at water holes. Book 3-4 safaris minimum.",
        },
        visitDuration: {
            minimum: "1 Safari (Half Day)",
            recommended: "2-3 Safaris (2 Days)",
            extended: "4-6 Safaris (3 Days)",
        },
        highlights: [
            "Bengal Tiger Sightings",
            "Ranthambore Fort (10th Century)",
            "Padam Lake",
            "Leopard Sightings",
            "Marsh Crocodiles",
            "300+ Bird Species",
            "Jeep & Canter Safari"
            ],
        tags: ["Wildlife", "Tiger", "Safari", "Nature", "Photography", "National Park"],
        facilities: ["Safari Booking", "Parking", "Restrooms", "Nearby Hotels", "Mandatory Guide"],
        nearbyPlaces: ["Ranthambore Fort (Inside)", "Sawai Madhopur (11 km)", "Surwal Lake (25 km)"],
        dos: ["Book online in advance", "Wear khaki/earth colors", "Carry binoculars", "Be patient and quiet"],
        donts: ["No bright colors", "No noise", "No litter", "No flash photography", "Don't stand in vehicle"],
        isOpen: true,
        isFeatured: true,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Sanctuary: 1955, National Park: 1980",
        builtBy: "Nature / Government of India",
        architecture: "Natural Forest & 10th Century Fort",
        significance: "India's best tiger reserve, Project Tiger since 1973",
    },

    // ============ MOUNT ABU ============
    {
        id: 17,
        name: "Dilwara Temples",
        slug: "dilwara-temples",
        city: "Mount Abu",
        state: "Rajasthan",
        category: "Temple",
        subcategory: "Jain Temple Complex",
        description:
            "Dilwara Temples are considered the finest examples of Jain temple architecture in India. These 5 marble temples built between 11th-13th centuries feature extraordinary marble carvings so intricate they rival the Taj Mahal in craftsmanship.",
        history: `
          <p>The magnificent <strong>Dilwara Temples</strong> stands as a towering testament to the rich architectural and cultural legacy of Mount Abu. Recognized as a premier jain temple complex in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Built by Vimal Shah (Vimal Vasahi, 1031 AD) and Tejpal Shah (Luna Vasahi, 1230 AD), ministers of the Solanki rulers of Gujarat. Despite the plain exterior, the interiors contain the most intricate marble carvings ever created by human hands.</p>
          
          <p>Historically, monuments like Dilwara Temples were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Dilwara Temples truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Mount Abu and the wider Rajasthan region. The walls of Dilwara Temples have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Dilwara Temples is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Mount Abu, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1500627869374-13ad991b1116?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.8,
        reviews: 8900,
        timing: {
            open: "12:00 PM",
            close: "5:00 PM",
            closedOn: "Open all days",
            note: "Jains only: 6:00 AM - 12:00 PM. Non-Jain visitors: 12:00 PM - 5:00 PM ONLY. STRICTLY NO photography.",
        },
        ticket: {
            isFree: true,
            indian: 0,
            foreigner: 0,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "FREE entry. STRICTLY NO photography/videography. Mobile phones must be deposited outside.",
        },
        location: {
            address: "Dilwara Road, Mount Abu, Sirohi",
            city: "Mount Abu",
            pincode: "307501",
            latitude: 24.6109,
            longitude: 72.7262,
            googleMapUrl: "https://www.google.com/maps/place/Dilwara+Temples/@24.6109,72.7262,16z",
            nearestAirport: "Udaipur Airport (185 km)",
            nearestRailway: "Abu Road Railway Station (28 km)",
            distanceFromCity: "2.5 km from Mount Abu town",
        },
        bestTimeToVisit: {
            months: "November - February",
            season: "Winter",
            weather: "Cool, 5°C - 22°C",
            tip: "Visit on weekdays to avoid crowds. Spend time slowly appreciating each carving detail.",
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "2-3 Hours",
            extended: "3-4 Hours",
        },
        highlights: [
            "Vimal Vasahi Temple (1031 AD)",
            "Luna Vasahi Temple (1230 AD)",
            "Extraordinary Marble Ceilings",
            "48 Pillars - Each Unique",
            "Elephant Procession Carving",
            "Lotus Flower Ceiling"
            ],
        tags: ["Temple", "Architecture", "Jain", "Marble", "Free Entry", "Heritage"],
        facilities: ["Shoe Storage", "Restrooms", "Guide Available", "Parking"],
        nearbyPlaces: ["Nakki Lake (2.5 km)", "Guru Shikhar (15 km)", "Achalgarh Fort (11 km)"],
        dos: ["Remove shoes & leather items", "Admire ceiling carvings", "Maintain silence"],
        donts: ["ABSOLUTELY NO photography", "No mobile phones inside", "No leather items"],
        isOpen: true,
        isFeatured: true,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "1031 - 1230 AD",
        builtBy: "Vimal Shah & Tejpal Shah",
        architecture: "Jain Temple Architecture (White Marble)",
        significance: "Finest Jain temples in India, unparalleled marble craftsmanship",
    },

    // ============ BIKANER ============
    {
        id: 18,
        name: "Junagarh Fort",
        slug: "junagarh-fort",
        city: "Bikaner",
        state: "Rajasthan",
        category: "Fort",
        subcategory: "Ground Fort",
        description:
            "Junagarh Fort is Rajasthan's only undefeated ground-level fort, built on flat desert land rather than a hill. Built with red sandstone and marble, it houses 37 palaces, temples and pavilions and has never been conquered in its history.",
        history: `
          <p>The magnificent <strong>Junagarh Fort</strong> stands as a towering testament to the rich architectural and cultural legacy of Bikaner. Recognized as a premier ground fort in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Built in 1593 by Raja Rai Singh, one of Mughal Emperor Akbar's best generals, using wealth from his military campaigns. Called 'Junagarh' (Old Fort) when Maharaja Ganga Singh moved to new Lalgarh Palace in 20th century.</p>
          
          <p>Historically, monuments like Junagarh Fort were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Junagarh Fort truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Bikaner and the wider Rajasthan region. The walls of Junagarh Fort have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Junagarh Fort is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Bikaner, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1562141989-c5c79ac8f576?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.6,
        reviews: 7800,
        timing: {
            open: "10:00 AM",
            close: "4:30 PM",
            closedOn: "Open all days",
            note: "Last entry 4:00 PM. Audio guide available in multiple languages.",
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 300,
            childIndian: 30,
            childForeigner: 150,
            camera: 50,
            note: "Audio guide: ₹100 (Hindi), ₹150 (English). Guide: ₹200-300.",
        },
        location: {
            address: "Junagarh Fort Road, Bikaner",
            city: "Bikaner",
            pincode: "334001",
            latitude: 28.0230,
            longitude: 73.3211,
            googleMapUrl: "https://www.google.com/maps/place/Junagarh+Fort/@28.0230,73.3211,17z",
            nearestAirport: "Jodhpur Airport (251 km)",
            nearestRailway: "Bikaner Junction (1 km)",
            distanceFromCity: "In the heart of Bikaner",
        },
        bestTimeToVisit: {
            months: "November - February",
            season: "Winter",
            weather: "Cool, 5°C - 22°C",
            tip: "Visit morning for fewer crowds. Golden light in evening makes fort photogenic.",
        },
        visitDuration: {
            minimum: "1.5 Hours",
            recommended: "2-3 Hours",
            extended: "3-4 Hours (museum + all palaces)",
        },
        highlights: [
            "Anup Mahal (Gold Leaf Paintings)",
            "Phool Mahal",
            "Chandra Mahal",
            "37 Palaces",
            "Never-Conquered Ground Fort",
            "Prachina Museum"
            ],
        tags: ["Fort", "Museum", "Architecture", "Heritage", "History"],
        facilities: ["Parking", "Restrooms", "Audio Guide", "Museum", "Gift Shop"],
        nearbyPlaces: ["Lalgarh Palace (2 km)", "Karni Mata Temple (33 km)", "Camel Farm (8 km)"],
        dos: ["Take audio guide", "Visit Anup Mahal", "Try Bikaneri bhujia nearby"],
        donts: ["Don't rush", "Don't touch wall paintings"],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "1593 AD",
        builtBy: "Raja Rai Singh",
        architecture: "Rajput-Mughal (Sandstone & Marble)",
        significance: "Only undefeated ground-level fort in Rajasthan",
    },

    // ============ CHITTORGARH ============
    {
        id: 19,
        name: "Chittorgarh Fort",
        slug: "chittorgarh-fort",
        city: "Chittorgarh",
        state: "Rajasthan",
        category: "Fort",
        subcategory: "Hill Fort",
        description:
            "Chittorgarh Fort is India's largest fort by area (280 hectares) and is a UNESCO World Heritage Site. The fort has witnessed 3 major sieges and is the symbol of Rajput pride, sacrifice and valor. Rani Padmini's Jauhar (self-immolation) took place here.",
        history: `
          <p>The magnificent <strong>Chittorgarh Fort</strong> stands as a towering testament to the rich architectural and cultural legacy of Chittorgarh. Recognized as a premier hill fort in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Built in 7th century by Mauryan rulers. The fort was conquered 3 times - by Alauddin Khilji (1303), Humayun (1535), and Akbar (1568). Each conquest led to mass Jauhar by Rajput women. Maharana Pratap, the legendary Rajput warrior, used this fort as his stronghold against the Mughals. UNESCO World Heritage Site since 2013.</p>
          
          <p>Historically, monuments like Chittorgarh Fort were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Chittorgarh Fort truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Chittorgarh and the wider Rajasthan region. The walls of Chittorgarh Fort have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Chittorgarh Fort is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Chittorgarh, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1562141989-c5c79ac8f576?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1585141974416-24a1b0268598?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.7,
        reviews: 14500,
        timing: {
            open: "7:00 AM",
            close: "6:00 PM",
            closedOn: "Open all days",
            note: "Light & Sound Show evenings (seasonal). Fort is 280 hectares - hiring a vehicle inside recommended.",
        },
        ticket: {
            isFree: false,
            indian: 40,
            foreigner: 600,
            childIndian: 0,
            childForeigner: 0,
            camera: 25,
            note: "Vehicle entry: ₹50. Auto/golf cart available inside. Guide strongly recommended.",
        },
        location: {
            address: "Chittorgarh Fort, Chittorgarh",
            city: "Chittorgarh",
            pincode: "312001",
            latitude: 24.8855,
            longitude: 74.6457,
            googleMapUrl: "https://www.google.com/maps/place/Chittorgarh+Fort/@24.8855,74.6457,14z",
            nearestAirport: "Udaipur Airport (115 km)",
            nearestRailway: "Chittorgarh Junction (5 km)",
            distanceFromCity: "5 km from Chittorgarh city",
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant, 10°C - 28°C",
            tip: "Hire a vehicle or guide inside - the fort is enormous (280 hectares). Full day needed.",
        },
        visitDuration: {
            minimum: "3 Hours",
            recommended: "5-6 Hours",
            extended: "Full Day",
        },
        highlights: [
            "Vijay Stambha (Victory Tower, 15th Century)",
            "Kirti Stambha (Tower of Fame)",
            "Padmini Palace",
            "Rani Padmini's Jauhar Site",
            "Meera Temple",
            "Gaumukh Reservoir",
            "Kumbhashyam Temple",
            "Kalika Mata Temple"
            ],
        tags: ["UNESCO", "Fort", "History", "Heritage", "Rajput Pride", "Archaeology"],
        facilities: ["Parking", "Restrooms", "Guide Available", "Vehicle Inside Fort", "Museum"],
        nearbyPlaces: ["Chittorgarh City (5 km)", "Bassi Wildlife Sanctuary (25 km)"],
        dos: ["Hire vehicle inside fort", "Hire guide for history", "See Vijay Stambha", "Carry water & snacks"],
        donts: ["Don't try to walk the entire fort (too large)", "Don't visit without guide"],
        isOpen: true,
        isFeatured: true,
        isPopular: true,
        isUNESCO: true,
        yearBuilt: "7th Century AD",
        builtBy: "Mauryan Rulers (expanded by Rajputs)",
        architecture: "Rajputana (Sandstone)",
        significance: "India's largest fort, UNESCO Heritage, symbol of Rajput sacrifice",
    },

    // ============ KUMBHALGARH ============
    {
        id: 20,
        name: "Kumbhalgarh Fort",
        slug: "kumbhalgarh-fort",
        city: "Rajsamand",
        state: "Rajasthan",
        category: "Fort",
        subcategory: "Hill Fort",
        description:
            "Kumbhalgarh Fort has the second-longest wall in the world (after the Great Wall of China) at 36 km long! This magnificent UNESCO World Heritage Site sits at 1,100 meters altitude and houses 360 temples within its walls. It is also the birthplace of Maharana Pratap.",
        history: `
          <p>The magnificent <strong>Kumbhalgarh Fort</strong> stands as a towering testament to the rich architectural and cultural legacy of Rajsamand. Recognized as a premier hill fort in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Built in the 15th century by Maharana Kumbha, who also built 32 other forts. The fort was the birthplace of Maharana Pratap (1540 AD), the legendary Rajput warrior who fought against Akbar. The 36 km wall was built to protect against Mughal invasion. UNESCO World Heritage Site since 2013.</p>
          
          <p>Historically, monuments like Kumbhalgarh Fort were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Kumbhalgarh Fort truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Rajsamand and the wider Rajasthan region. The walls of Kumbhalgarh Fort have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Kumbhalgarh Fort is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Rajsamand, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1562141989-c5c79ac8f576?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1585141974416-24a1b0268598?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.7,
        reviews: 9200,
        timing: {
            open: "9:00 AM",
            close: "6:00 PM",
            closedOn: "Open all days",
            note: "Sound & Light Show: 7:00 PM - 8:00 PM. Kumbhalgarh Wildlife Sanctuary surrounds the fort.",
        },
        ticket: {
            isFree: false,
            indian: 40,
            foreigner: 600,
            childIndian: 0,
            childForeigner: 0,
            camera: 25,
            note: "Sound & Light Show: ₹100. Wildlife Sanctuary visit has separate permit.",
        },
        location: {
            address: "Kumbhalgarh, Kelwara, Rajsamand",
            city: "Rajsamand",
            pincode: "313325",
            latitude: 25.1524,
            longitude: 73.5877,
            googleMapUrl: "https://www.google.com/maps/place/Kumbhalgarh+Fort/@25.1524,73.5877,15z",
            nearestAirport: "Udaipur Airport (90 km)",
            nearestRailway: "Udaipur City Railway Station (90 km)",
            distanceFromCity: "90 km from Udaipur",
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Cool, 8°C - 25°C",
            tip: "Combine with Ranakpur Temples (40 km away). Sound & Light Show in evening is excellent.",
        },
        visitDuration: {
            minimum: "2 Hours",
            recommended: "3-4 Hours",
            extended: "Full Day (with wildlife sanctuary)",
        },
        highlights: [
            "36 km Long Wall (2nd Longest in World)",
            "360 Temples Inside",
            "Birthplace of Maharana Pratap",
            "Kumbhalgarh Wildlife Sanctuary",
            "Badal Mahal (Cloud Palace)",
            "Sound & Light Show"
            ],
        tags: ["UNESCO", "Fort", "Heritage", "History", "Maharana Pratap", "Architecture"],
        facilities: ["Parking", "Restrooms", "Guide Available", "Nearby Hotels"],
        nearbyPlaces: ["Ranakpur Temples (40 km)", "Udaipur (90 km)", "Nathdwara (50 km)"],
        dos: ["Walk the massive walls", "Visit Badal Mahal", "See Sound & Light Show", "Hire guide"],
        donts: ["Don't underestimate the walking distance", "Don't miss the fort wall walk"],
        isOpen: true,
        isFeatured: true,
        isPopular: true,
        isUNESCO: true,
        yearBuilt: "15th Century (1443-1458 AD)",
        builtBy: "Maharana Kumbha",
        architecture: "Rajputana (Sandstone)",
        significance: "World's 2nd longest wall, birthplace of Maharana Pratap",
    },

    // ============ RANAKPUR ============
    {
        id: 21,
        name: "Ranakpur Jain Temple",
        slug: "ranakpur-jain-temple",
        city: "Pali",
        state: "Rajasthan",
        category: "Temple",
        subcategory: "Jain Temple",
        description:
            "Ranakpur Jain Temple is one of the most magnificent Jain temples in India, dedicated to Adinath (first Jain Tirthankara). Built with white marble in 15th century, the temple has 1,444 carved marble pillars - each uniquely different. The carving intricacy is unparalleled.",
        history: `
          <p>The magnificent <strong>Ranakpur Jain Temple</strong> stands as a towering testament to the rich architectural and cultural legacy of Pali. Recognized as a premier jain temple in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Built in 1439 AD during the reign of Rana Kumbha by a wealthy Jain merchant named Dharana Shah. The temple has 29 halls, 80 domes and 1,444 pillars. Located in a valley surrounded by the Aravalli Hills in a wildlife sanctuary, the setting adds to its spiritual atmosphere.</p>
          
          <p>Historically, monuments like Ranakpur Jain Temple were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Ranakpur Jain Temple truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Pali and the wider Rajasthan region. The walls of Ranakpur Jain Temple have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Ranakpur Jain Temple is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Pali, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1477584308802-e9c378852d9a?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1524413840003-0587428385ad?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.8,
        reviews: 10600,
        timing: {
            open: "12:00 PM",
            close: "5:00 PM",
            closedOn: "Open all days",
            note: "For Jains only: 6:00 AM - 12:00 PM. Non-Jains: 12:00 PM - 5:00 PM. Remove leather items.",
        },
        ticket: {
            isFree: true,
            indian: 0,
            foreigner: 0,
            childIndian: 0,
            childForeigner: 0,
            camera: 100,
            note: "Entry free. Camera allowed (₹100 fee). No photography during prayers.",
        },
        location: {
            address: "Ranakpur, Sadri, Pali District",
            city: "Pali",
            pincode: "306702",
            latitude: 25.1167,
            longitude: 73.4736,
            googleMapUrl: "https://www.google.com/maps/place/Ranakpur+Jain+Temple/@25.1167,73.4736,15z",
            nearestAirport: "Udaipur Airport (130 km)",
            nearestRailway: "Falna Railway Station (30 km)",
            distanceFromCity: "90 km from Udaipur, 100 km from Jodhpur",
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant, 10°C - 28°C",
            tip: "Combine with Kumbhalgarh Fort (40 km). A perfect day trip from Udaipur.",
        },
        visitDuration: {
            minimum: "1.5 Hours",
            recommended: "2-3 Hours",
            extended: "3-4 Hours",
        },
        highlights: [
            "1,444 Unique Carved Pillars",
            "29 Halls",
            "80 Domes",
            "Adinath Main Temple",
            "Intricate Marble Carvings",
            "Forest Setting in Valley"
            ],
        tags: ["Temple", "Architecture", "Jain", "Marble", "Heritage", "Spiritual"],
        facilities: ["Parking", "Restrooms", "Shoe Storage", "Guide Available", "Cafeteria"],
        nearbyPlaces: ["Kumbhalgarh Fort (40 km)", "Udaipur (90 km)", "Falna (30 km)"],
        dos: ["Remove shoes & leather", "Count the pillars", "Admire ceiling details", "Maintain silence"],
        donts: ["No photography during prayers", "No leather items inside", "No non-veg nearby"],
        isOpen: true,
        isFeatured: true,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "1439 AD",
        builtBy: "Dharana Shah (merchant), under Rana Kumbha",
        architecture: "Jain Temple (White Marble, Rajputana style)",
        significance: "One of India's 5 principal Jain temples, 1444 unique pillars",
    },

    // ============ BHARATPUR ============
    {
        id: 22,
        name: "Keoladeo National Park",
        slug: "keoladeo-national-park",
        city: "Bharatpur",
        state: "Rajasthan",
        category: "Wildlife",
        subcategory: "Bird Sanctuary / National Park",
        description:
            "Keoladeo National Park (Bharatpur Bird Sanctuary) is a UNESCO World Heritage Site and one of the world's best bird sanctuaries. It is home to 230+ species of birds including rare migratory Siberian Cranes. A paradise for birdwatchers and photographers.",
        history: `
          <p>The magnificent <strong>Keoladeo National Park</strong> stands as a towering testament to the rich architectural and cultural legacy of Bharatpur. Recognized as a premier bird sanctuary / national park in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Created as a hunting reserve by Maharaja Suraj Mal of Bharatpur in 1760. Declared a protected forest in 1956, wildlife sanctuary in 1971, national park in 1982, and UNESCO World Heritage Site in 1985. Named after the Keoladeo (Shiva) temple inside. Once a duck-hunting ground for Viceroy of India.</p>
          
          <p>Historically, monuments like Keoladeo National Park were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Keoladeo National Park truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Bharatpur and the wider Rajasthan region. The walls of Keoladeo National Park have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Keoladeo National Park is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Bharatpur, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1500627869374-13ad991b1116?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.6,
        reviews: 8900,
        timing: {
            open: "6:00 AM",
            close: "6:00 PM",
            closedOn: "Open all days",
            note: "Best birding: November-February. Inside only by cycle-rickshaw, bicycle or walking (no motor vehicles).",
        },
        ticket: {
            isFree: false,
            indian: 75,
            foreigner: 500,
            childIndian: 0,
            childForeigner: 0,
            camera: 50,
            note: "Cycle rickshaw: ₹100-200/hour. Bicycle rental: ₹50-100/day. Expert bird guide: ₹200-400.",
        },
        location: {
            address: "Bharatpur Bird Sanctuary, Bharatpur",
            city: "Bharatpur",
            pincode: "321001",
            latitude: 27.1606,
            longitude: 77.5216,
            googleMapUrl: "https://www.google.com/maps/place/Keoladeo+National+Park/@27.1606,77.5216,14z",
            nearestAirport: "Jaipur Airport (185 km) or Agra Airport (55 km)",
            nearestRailway: "Bharatpur Railway Station (4 km)",
            distanceFromCity: "4 km from Bharatpur city, 55 km from Agra",
        },
        bestTimeToVisit: {
            months: "November - February",
            season: "Winter (peak migratory season)",
            weather: "Cool, 5°C - 22°C",
            tip: "November-February for migratory birds. Early morning 6-10 AM best for birdwatching.",
        },
        visitDuration: {
            minimum: "2 Hours",
            recommended: "Half Day",
            extended: "Full Day (for serious birdwatchers)",
        },
        highlights: [
            "230+ Bird Species",
            "Migratory Siberian Cranes",
            "Painted Storks",
            "Sarus Cranes",
            "Python Sightings",
            "Deer & Nilgai",
            "Cycle Rickshaw Rides"
            ],
        tags: ["UNESCO", "Wildlife", "Birds", "Photography", "Nature", "Birdwatching"],
        facilities: ["Parking", "Cycle Rickshaws", "Bicycles", "Guide Available", "Interpretation Center"],
        nearbyPlaces: ["Agra (55 km)", "Fatehpur Sikri (45 km)", "Deeg Palace (32 km)"],
        dos: ["Hire expert bird guide", "Go early morning", "Carry binoculars & telephoto lens", "Rent bicycle"],
        donts: ["No motor vehicles inside", "No noise", "Don't disturb birds", "No plastic inside"],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: true,
        yearBuilt: "Reserve: 1760, National Park: 1982",
        builtBy: "Maharaja Suraj Mal of Bharatpur",
        architecture: "Natural Wetland Ecosystem",
        significance: "UNESCO World Heritage, Asia's finest bird sanctuary",
    },
    {
        id: 23,
        name: "Jaigarh Fort",
        slug: "jaigarh-fort",
        city: "Jaipur",
        state: "Rajasthan",
        category: "Fort",
        subcategory: "Hill Fort",
        description:
            "Jaigarh Fort stands high above Amber Fort and was built as a military stronghold to protect the Amber kingdom. It is famous for housing Jaivana Cannon, once considered the world's largest cannon on wheels.",
        history: `
          <p>The magnificent <strong>Jaigarh Fort</strong> stands as a towering testament to the rich architectural and cultural legacy of Jaipur. Recognized as a premier hill fort in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Built in 1726 by Maharaja Sawai Jai Singh II, Jaigarh Fort was designed as the main defense fort for Amber. It was connected to Amber Fort through subterranean passages and served as a treasury and arms storage for the Kachwaha rulers.</p>
          
          <p>Historically, monuments like Jaigarh Fort were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Jaigarh Fort truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Jaipur and the wider Rajasthan region. The walls of Jaigarh Fort have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Jaigarh Fort is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Jaipur, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1477584308802-e9c378852d9a?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1524413840003-0587428385ad?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.6,
        reviews: 9800,
        timing: {
            open: "9:00 AM",
            close: "5:00 PM",
            closedOn: "Open all days",
            note: "Best combined with Amber Fort. Fort offers panoramic views over Jaipur and Amber.",
        },
        ticket: {
            isFree: false,
            indian: 85,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 50,
            note: "Combo tickets may be available with Amber Fort depending on season.",
        },
        location: {
            address: "Devisinghpura, Amer, Jaipur",
            city: "Jaipur",
            pincode: "302028",
            latitude: 26.9851,
            longitude: 75.8507,
            googleMapUrl: "https://www.google.com/maps/place/Jaigarh+Fort/@26.9851,75.8507,17z",
            nearestAirport: "Jaipur International Airport (22 km)",
            nearestRailway: "Jaipur Junction (15 km)",
            distanceFromCity: "15 km from Jaipur city center",
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant and cool",
            tip: "Visit in the morning or late afternoon for the best views and cooler weather.",
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "2 Hours",
            extended: "3 Hours",
        },
        highlights: [
            "Jaivana Cannon",
            "Panoramic Hill Views",
            "Underground Passages to Amber",
            "Watch Towers",
            "Water Reservoir System"
            ],
        tags: ["Fort", "History", "Views", "Architecture", "Military"],
        facilities: ["Parking", "Restrooms", "Guide Available", "Small Cafeteria"],
        nearbyPlaces: ["Amber Fort (1 km)", "Nahargarh Fort (12 km)", "Panna Meena Ka Kund (2 km)"],
        dos: ["Carry water", "Visit with Amber Fort", "Climb up for views"],
        donts: ["Don't rush the upper sections", "Don't ignore the cannon area"],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "1726 AD",
        builtBy: "Maharaja Sawai Jai Singh II",
        architecture: "Rajput Military Architecture",
        significance: "Main defensive fort of Amber kingdom",
    },
    {
        id: 24,
        name: "Jal Mahal",
        slug: "jal-mahal",
        city: "Jaipur",
        state: "Rajasthan",
        category: "Palace",
        subcategory: "Water Palace",
        description:
            "Jal Mahal is a beautiful water palace located in the middle of Man Sagar Lake. Though visitors cannot enter the palace interior, it is one of Jaipur’s most photographed landmarks, especially at sunrise and sunset.",
        history: `
          <p>The magnificent <strong>Jal Mahal</strong> stands as a towering testament to the rich architectural and cultural legacy of Jaipur. Recognized as a premier water palace in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. The palace was built in the 18th century by Maharaja Madho Singh as a hunting lodge and summer retreat. The lower floors remain submerged when the lake is full, giving the illusion that the palace floats on water.</p>
          
          <p>Historically, monuments like Jal Mahal were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Jal Mahal truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Jaipur and the wider Rajasthan region. The walls of Jal Mahal have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Jal Mahal is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Jaipur, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1477584308802-e9c378852d9a?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1524413840003-0587428385ad?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.5,
        reviews: 14500,
        timing: {
            open: "View from outside all day",
            close: "View from outside all night",
            closedOn: "Open all days",
            note: "Palace interior is not open to public. Best seen from roadside promenade.",
        },
        ticket: {
            isFree: true,
            indian: 0,
            foreigner: 0,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "No entry fee for the viewpoint area.",
        },
        location: {
            address: "Amer Road, Jaipur",
            city: "Jaipur",
            pincode: "302002",
            latitude: 26.9539,
            longitude: 75.8468,
            googleMapUrl: "https://www.google.com/maps/place/Jal+Mahal/@26.9539,75.8468,17z",
            nearestAirport: "Jaipur International Airport (18 km)",
            nearestRailway: "Jaipur Junction (8 km)",
            distanceFromCity: "6 km from Jaipur city center",
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Visit at sunrise or sunset for the best reflection photographs.",
        },
        visitDuration: {
            minimum: "20 Minutes",
            recommended: "45 Minutes",
            extended: "1 Hour",
        },
        highlights: [
            "Floating Palace View",
            "Man Sagar Lake",
            "Sunset Photography",
            "Bird Watching in Winter"
            ],
        tags: ["Palace", "Lake", "Photography", "Free Entry", "Sunset"],
        facilities: ["Roadside Parking", "Viewpoint", "Street Food Nearby"],
        nearbyPlaces: ["Amber Fort (6 km)", "Nahargarh Fort (7 km)", "Hawa Mahal (5 km)"],
        dos: ["Bring camera", "Visit early morning", "Try the lakeside viewpoint"],
        donts: ["Don't expect palace interior entry", "Don't litter near the lake"],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "18th Century",
        builtBy: "Maharaja Madho Singh",
        architecture: "Rajput Water Palace",
        significance: "Iconic floating palace of Jaipur",
    },
    {
        id: 25,
        name: "Panna Meena Ka Kund",
        slug: "panna-meena-ka-kund",
        city: "Jaipur",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Stepwell",
        description:
            "Panna Meena Ka Kund is a beautifully symmetrical stepwell near Amber Fort, famous for its geometric stairways and yellow-toned walls. It is one of Jaipur’s hidden gems and a favorite photography spot.",
        history: `
          <p>The magnificent <strong>Panna Meena Ka Kund</strong> stands as a towering testament to the rich architectural and cultural legacy of Jaipur. Recognized as a premier stepwell in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. This historic stepwell dates back several centuries and was used as a community gathering place and water storage structure. It reflects the ingenuity of traditional rainwater harvesting architecture in arid Rajasthan.</p>
          
          <p>Historically, monuments like Panna Meena Ka Kund were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Panna Meena Ka Kund truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Jaipur and the wider Rajasthan region. The walls of Panna Meena Ka Kund have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Panna Meena Ka Kund is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Jaipur, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1477584308802-e9c378852d9a?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1524413840003-0587428385ad?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.5,
        reviews: 6200,
        timing: {
            open: "7:00 AM",
            close: "6:00 PM",
            closedOn: "Open all days",
            note: "Best visited in early morning for fewer crowds and softer light.",
        },
        ticket: {
            isFree: true,
            indian: 0,
            foreigner: 0,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "No official ticket required.",
        },
        location: {
            address: "Near Amber Fort, Amer, Jaipur",
            city: "Jaipur",
            pincode: "302028",
            latitude: 26.9864,
            longitude: 75.8586,
            googleMapUrl: "https://www.google.com/maps/place/Panna+Meena+ka+Kund/@26.9864,75.8586,17z",
            nearestAirport: "Jaipur International Airport (22 km)",
            nearestRailway: "Jaipur Junction (14 km)",
            distanceFromCity: "14 km from Jaipur city center",
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Visit with Amber Fort and Jagat Shiromani Temple nearby.",
        },
        visitDuration: {
            minimum: "20 Minutes",
            recommended: "45 Minutes",
            extended: "1 Hour",
        },
        highlights: [
            "Geometric Stepwell Architecture",
            "Photography Spot",
            "Historic Water Storage",
            "Quiet Atmosphere"
            ],
        tags: ["Stepwell", "Heritage", "Architecture", "Photography", "Free Entry"],
        facilities: ["Limited Street Parking"],
        nearbyPlaces: ["Amber Fort (500m)", "Jaigarh Fort (2 km)", "Jagat Shiromani Temple (300m)"],
        dos: ["Take wide-angle photos", "Visit with Amber Fort"],
        donts: ["Don't climb unsafe edges", "Don't throw waste inside"],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "16th Century (approx.)",
        builtBy: "Local Rajput Patrons",
        architecture: "Traditional Stepwell Architecture",
        significance: "One of Jaipur's finest stepwells",
    },
    {
        id: 26,
        name: "Jaswant Thada",
        slug: "jaswant-thada",
        city: "Jodhpur",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Memorial Cenotaph",
        description:
            "Jaswant Thada is a serene white marble cenotaph built in memory of Maharaja Jaswant Singh II. Located near Mehrangarh Fort, it is often called the 'Taj Mahal of Marwar' for its delicate marble work.",
        history: `
          <p>The magnificent <strong>Jaswant Thada</strong> stands as a towering testament to the rich architectural and cultural legacy of Jodhpur. Recognized as a premier memorial cenotaph in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Built in 1899 by Maharaja Sardar Singh in memory of his father Maharaja Jaswant Singh II. It serves as the cremation ground for the royal family of Marwar.</p>
          
          <p>Historically, monuments like Jaswant Thada were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Jaswant Thada truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Jodhpur and the wider Rajasthan region. The walls of Jaswant Thada have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Jaswant Thada is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Jodhpur, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1562141989-c5c79ac8f576?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.6,
        reviews: 7400,
        timing: {
            open: "9:00 AM",
            close: "5:00 PM",
            closedOn: "Open all days",
            note: "Best combined with Mehrangarh Fort visit.",
        },
        ticket: {
            isFree: false,
            indian: 30,
            foreigner: 50,
            childIndian: 0,
            childForeigner: 0,
            camera: 20,
            note: "Low-cost entry, quick visit.",
        },
        location: {
            address: "Near Mehrangarh Fort, Jodhpur",
            city: "Jodhpur",
            pincode: "342006",
            latitude: 26.3042,
            longitude: 73.0243,
            googleMapUrl: "https://www.google.com/maps/place/Jaswant+Thada/@26.3042,73.0243,17z",
            nearestAirport: "Jodhpur Airport (6 km)",
            nearestRailway: "Jodhpur Junction (3 km)",
            distanceFromCity: "3 km from city center",
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Visit in the morning when the white marble glows beautifully.",
        },
        visitDuration: {
            minimum: "30 Minutes",
            recommended: "45 Minutes",
            extended: "1 Hour",
        },
        highlights: [
            "White Marble Architecture",
            "Peaceful Garden",
            "Views of Mehrangarh Fort",
            "Royal Family Memorials"
            ],
        tags: ["Heritage", "Memorial", "Photography", "Marble", "History"],
        facilities: ["Parking", "Restrooms", "Guide Available"],
        nearbyPlaces: ["Mehrangarh Fort (1 km)", "Clock Tower (3 km)", "Umaid Bhawan Palace (5 km)"],
        dos: ["Combine with Mehrangarh", "Photograph fort backdrop"],
        donts: ["Don't rush past the lake and gardens"],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "1899 AD",
        builtBy: "Maharaja Sardar Singh",
        architecture: "Rajput Marble Memorial",
        significance: "Royal cenotaph of Marwar rulers",
    },
    {
        id: 27,
        name: "Fateh Sagar Lake",
        slug: "fateh-sagar-lake",
        city: "Udaipur",
        state: "Rajasthan",
        category: "Lake",
        subcategory: "Artificial Lake",
        description:
            "Fateh Sagar Lake is one of Udaipur’s most scenic lakes, surrounded by hills and home to Nehru Park, a solar observatory, and boating facilities. It is a favorite local promenade.",
        history: `
          <p>The magnificent <strong>Fateh Sagar Lake</strong> stands as a towering testament to the rich architectural and cultural legacy of Udaipur. Recognized as a premier artificial lake in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Originally constructed in 1678 by Maharana Jai Singh, it was later rebuilt and expanded by Maharana Fateh Singh after a flood destroyed the original embankment.</p>
          
          <p>Historically, monuments like Fateh Sagar Lake were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Fateh Sagar Lake truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Udaipur and the wider Rajasthan region. The walls of Fateh Sagar Lake have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Fateh Sagar Lake is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Udaipur, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1585141974416-24a1b0268598?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1615552980649-db3722e0325d?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.7,
        reviews: 11000,
        timing: {
            open: "All Day",
            close: "All Night",
            closedOn: "Open all days",
            note: "Boating available during daytime only. Sunset is the best time.",
        },
        ticket: {
            isFree: true,
            indian: 0,
            foreigner: 0,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Lakefront free. Boating charges separate.",
        },
        location: {
            address: "North of Lake Pichola, Udaipur",
            city: "Udaipur",
            pincode: "313001",
            latitude: 24.6000,
            longitude: 73.6780,
            googleMapUrl: "https://www.google.com/maps/place/Fateh+Sagar+Lake/@24.6000,73.6780,15z",
            nearestAirport: "Maharana Pratap Airport (25 km)",
            nearestRailway: "Udaipur City Railway Station (5 km)",
            distanceFromCity: "4 km from city center",
        },
        bestTimeToVisit: {
            months: "September - March",
            season: "Post-Monsoon / Winter",
            weather: "Pleasant",
            tip: "Visit in the evening for boating and lakeside snacks.",
        },
        visitDuration: {
            minimum: "45 Minutes",
            recommended: "1-2 Hours",
            extended: "Half Day",
        },
        highlights: [
            "Boating",
            "Nehru Park Island",
            "Sunset Views",
            "Lakeside Drive",
            "Photography"
            ],
        tags: ["Lake", "Free Entry", "Boating", "Sunset", "Photography"],
        facilities: ["Parking", "Food Stalls", "Boating", "Walkway"],
        nearbyPlaces: ["Sajjangarh Palace (4 km)", "Saheliyon Ki Bari (2 km)", "Lake Pichola (3 km)"],
        dos: ["Go during sunset", "Try boat ride", "Walk along the promenade"],
        donts: ["Don't miss the evening lake views"],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "1678 AD",
        builtBy: "Maharana Jai Singh / Rebuilt by Fateh Singh",
        architecture: "Artificial Lake",
        significance: "One of Udaipur’s most scenic public lakes",
    },
    {
        id: 28,
        name: "Saheliyon Ki Bari",
        slug: "saheliyon-ki-bari",
        city: "Udaipur",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Royal Garden",
        description:
            "Saheliyon Ki Bari is a historic garden built for the royal ladies of Udaipur. It is famous for lotus pools, marble pavilions, elephant fountains and manicured lawns.",
        history: `
          <p>The magnificent <strong>Saheliyon Ki Bari</strong> stands as a towering testament to the rich architectural and cultural legacy of Udaipur. Recognized as a premier royal garden in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Built in the 18th century by Maharana Sangram Singh for the queen and her 48 maids. It served as a leisure retreat for the royal women.</p>
          
          <p>Historically, monuments like Saheliyon Ki Bari were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Saheliyon Ki Bari truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Udaipur and the wider Rajasthan region. The walls of Saheliyon Ki Bari have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Saheliyon Ki Bari is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Udaipur, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1585141974416-24a1b0268598?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1615552980649-db3722e0325d?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.4,
        reviews: 8700,
        timing: {
            open: "9:00 AM",
            close: "7:00 PM",
            closedOn: "Open all days",
            note: "Beautiful in monsoon and winter seasons.",
        },
        ticket: {
            isFree: false,
            indian: 20,
            foreigner: 50,
            childIndian: 0,
            childForeigner: 0,
            camera: 20,
            note: "Low entry fee. Great short visit in city itinerary.",
        },
        location: {
            address: "Panchwati, Udaipur",
            city: "Udaipur",
            pincode: "313001",
            latitude: 24.6040,
            longitude: 73.6881,
            googleMapUrl: "https://www.google.com/maps/place/Saheliyon-ki-Bari/@24.6040,73.6881,17z",
            nearestAirport: "Maharana Pratap Airport (25 km)",
            nearestRailway: "Udaipur City Railway Station (5 km)",
            distanceFromCity: "3 km from city center",
        },
        bestTimeToVisit: {
            months: "July - March",
            season: "Monsoon / Winter",
            weather: "Cool and lush",
            tip: "Visit early morning for quiet gardens and fresh light.",
        },
        visitDuration: {
            minimum: "30 Minutes",
            recommended: "1 Hour",
            extended: "1.5 Hours",
        },
        highlights: [
            "Lotus Pools",
            "Marble Pavilions",
            "Elephant Fountains",
            "Royal Ladies’ Garden"
            ],
        tags: ["Garden", "Heritage", "Photography", "Royal", "Nature"],
        facilities: ["Parking", "Restrooms", "Garden Benches"],
        nearbyPlaces: ["Fateh Sagar Lake (2 km)", "City Palace (4 km)", "Sajjangarh Palace (6 km)"],
        dos: ["Visit in monsoon or winter", "Photograph fountains"],
        donts: ["Don't step on lawns", "Don't rush through garden corners"],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "18th Century",
        builtBy: "Maharana Sangram Singh",
        architecture: "Royal Garden Design",
        significance: "Leisure garden for royal women of Udaipur",
    },
    {
        id: 29,
        name: "Gadisar Lake",
        slug: "gadisar-lake",
        city: "Jaisalmer",
        state: "Rajasthan",
        category: "Lake",
        subcategory: "Artificial Lake",
        description:
            "Gadisar Lake is a historic man-made reservoir that once served as the main water source of Jaisalmer. Surrounded by temples, ghats, chhatris and carved gateways, it is especially beautiful in the early morning and evening.",
        history: `
          <p>The magnificent <strong>Gadisar Lake</strong> stands as a towering testament to the rich architectural and cultural legacy of Jaisalmer. Recognized as a premier artificial lake in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Originally built in the 14th century by Rawal Gadsi Singh, the lake was crucial for water supply in the arid desert region. Later rulers and wealthy patrons added shrines and cenotaphs around it.</p>
          
          <p>Historically, monuments like Gadisar Lake were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Gadisar Lake truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Jaisalmer and the wider Rajasthan region. The walls of Gadisar Lake have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Gadisar Lake is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Jaisalmer, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.5,
        reviews: 6900,
        timing: {
            open: "All Day",
            close: "All Night",
            closedOn: "Open all days",
            note: "Boating usually available 8:00 AM - 7:00 PM.",
        },
        ticket: {
            isFree: true,
            indian: 0,
            foreigner: 0,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "No lake entry fee. Boating charges separate.",
        },
        location: {
            address: "Gadisar Road, Jaisalmer",
            city: "Jaisalmer",
            pincode: "345001",
            latitude: 26.9083,
            longitude: 70.9111,
            googleMapUrl: "https://www.google.com/maps/place/Gadisar+Lake/@26.9083,70.9111,16z",
            nearestAirport: "Jaisalmer Airport (17 km)",
            nearestRailway: "Jaisalmer Railway Station (2 km)",
            distanceFromCity: "1 km from Jaisalmer Fort",
        },
        bestTimeToVisit: {
            months: "November - February",
            season: "Winter",
            weather: "Pleasant",
            tip: "Best visited at sunrise when the golden city reflects in the calm water.",
        },
        visitDuration: {
            minimum: "30 Minutes",
            recommended: "1 Hour",
            extended: "2 Hours",
        },
        highlights: [
            "Historic Water Reservoir",
            "Boat Ride",
            "Temple Architecture",
            "Sunrise Reflections",
            "Photography"
            ],
        tags: ["Lake", "Free Entry", "Photography", "Heritage", "Boating"],
        facilities: ["Boating", "Parking", "Small Shops", "Rest Areas"],
        nearbyPlaces: ["Jaisalmer Fort (1 km)", "Patwon Ki Haveli (1 km)", "Bada Bagh (6 km)"],
        dos: ["Visit early morning", "Take boat ride", "Explore temples around the lake"],
        donts: ["Don't litter near the lake", "Don't skip the entrance gateway"],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "14th Century",
        builtBy: "Rawal Gadsi Singh",
        architecture: "Artificial Lake with Ghats",
        significance: "Historic lifeline water source of Jaisalmer",
    },
    {
        id: 30,
        name: "Karni Mata Temple",
        slug: "karni-mata-temple",
        city: "Deshnok",
        state: "Rajasthan",
        category: "Temple",
        subcategory: "Folk Deity Temple",
        description:
            "Karni Mata Temple at Deshnok is world-famous as the 'Rat Temple', home to thousands of sacred rats considered holy. Devotees revere them as manifestations of Karni Mata’s family and followers.",
        history: `
          <p>The magnificent <strong>Karni Mata Temple</strong> stands as a towering testament to the rich architectural and cultural legacy of Deshnok. Recognized as a premier folk deity temple in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. The current temple structure was built in the early 20th century by Maharaja Ganga Singh of Bikaner, though the shrine dates back centuries. Karni Mata is a revered incarnation of Goddess Durga in local tradition.</p>
          
          <p>Historically, monuments like Karni Mata Temple were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Karni Mata Temple truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Deshnok and the wider Rajasthan region. The walls of Karni Mata Temple have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Karni Mata Temple is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Deshnok, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1477584308802-e9c378852d9a?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1524413840003-0587428385ad?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.3,
        reviews: 8300,
        timing: {
            open: "4:00 AM",
            close: "10:00 PM",
            closedOn: "Open all days",
            note: "Most active during morning and evening aarti. Footwear must be removed.",
        },
        ticket: {
            isFree: true,
            indian: 0,
            foreigner: 0,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "No entry fee. Donations optional.",
        },
        location: {
            address: "Deshnok, Bikaner District",
            city: "Deshnok",
            pincode: "334801",
            latitude: 27.7987,
            longitude: 73.3422,
            googleMapUrl: "https://www.google.com/maps/place/Karni+Mata+Temple/@27.7987,73.3422,17z",
            nearestAirport: "Jodhpur Airport (220 km)",
            nearestRailway: "Deshnok Railway Station (1 km)",
            distanceFromCity: "30 km from Bikaner",
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Morning visits are calmer and cooler. Respect temple customs.",
        },
        visitDuration: {
            minimum: "30 Minutes",
            recommended: "1 Hour",
            extended: "1.5 Hours",
        },
        highlights: [
            "Sacred Rats (Kabas)",
            "Silver Doors and Marble Work",
            "Temple Aarti",
            "Unique Spiritual Experience"
            ],
        tags: ["Temple", "Spiritual", "Free Entry", "Unique", "Pilgrimage"],
        facilities: ["Parking", "Restrooms", "Prasad Shops"],
        nearbyPlaces: ["Bikaner (30 km)", "Junagarh Fort (32 km)", "Camel Farm (35 km)"],
        dos: ["Respect temple traditions", "Walk carefully barefoot"],
        donts: ["Don't harm or disturb the rats", "Don't wear shoes inside"],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Early 20th Century",
        builtBy: "Maharaja Ganga Singh",
        architecture: "Marble Temple Architecture",
        significance: "World-famous rat temple of Rajasthan",
    },
    {
        id: 31,
        name: "Chand Baori",
        slug: "chand-baori",
        city: "Abhaneri",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Stepwell",
        description:
            "Chand Baori in Abhaneri is one of India’s deepest and most visually striking stepwells, with 3,500 perfectly symmetrical steps descending 13 stories. It is a masterpiece of ancient water architecture.",
        history: `
          <p>The magnificent <strong>Chand Baori</strong> stands as a towering testament to the rich architectural and cultural legacy of Abhaneri. Recognized as a premier stepwell in Rajasthan, it draws thousands of history enthusiasts, researchers, and tourists annually. Built in the 8th-9th century by King Chanda of the Nikumbha dynasty, Chand Baori was designed to conserve water and provide a cool retreat from Rajasthan’s extreme heat.</p>
          
          <p>Historically, monuments like Chand Baori were not just built for utility or defense, but were symbols of royal prestige and dynastic power. The intricate craftsmanship visible in its corridors and facades reflects the zenith of regional artisanship. Master builders and stone carvers from across the Rajputana region dedicated decades of their lives to constructing this marvel, blending local sandstone with imported marble and precious gems.</p>
          
          <h3>Architectural Brilliance and Heritage</h3>
          <p>What makes Chand Baori truly exceptional is its architectural vocabulary. The structure perfectly harmonizes indigenous Rajput design principles with broader influences, creating a visual symphony of domes, arches, and intricately carved pillars. Every courtyard and pavilion was meticulously planned to serve specific climatic and administrative purposes, demonstrating an advanced understanding of environmental design centuries before modern engineering.</p>
          
          <p>During the medieval and early modern periods, this site was a bustling epicenter of political and cultural activity. It hosted royal durbars, grand festivities, and crucial diplomatic negotiations that shaped the destiny of Abhaneri and the wider Rajasthan region. The walls of Chand Baori have silently witnessed the rise and fall of empires, epic sieges, and eras of unprecedented prosperity.</p>
          
          <h3>A Timeless Journey</h3>
          <p>Today, a visit to Chand Baori is akin to stepping into a time machine. The meticulous conservation efforts by heritage bodies have preserved its soul, allowing modern visitors to walk the same stone-paved paths once tread by kings and queens. As one of the most vital historical anchors of Abhaneri, it continues to inspire awe and stands as an enduring symbol of India's glorious and regal past.</p>
    `,
        images: [
            "https://images.unsplash.com/photo-1477584308802-e9c378852d9a?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1524413840003-0587428385ad?auto=format&fit=crop&w=1200&q=80"
        ],
        rating: 4.8,
        reviews: 7600,
        timing: {
            open: "8:00 AM",
            close: "6:00 PM",
            closedOn: "Open all days",
            note: "Best in the morning for good light and fewer visitors.",
        },
        ticket: {
            isFree: true,
            indian: 0,
            foreigner: 0,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Entry usually free under ASI site access.",
        },
        location: {
            address: "Abhaneri Village, Dausa District",
            city: "Abhaneri",
            pincode: "303326",
            latitude: 27.0070,
            longitude: 76.6050,
            googleMapUrl: "https://www.google.com/maps/place/Chand+Baori/@27.0070,76.6050,17z",
            nearestAirport: "Jaipur International Airport (95 km)",
            nearestRailway: "Bandikui Junction (35 km)",
            distanceFromCity: "95 km from Jaipur",
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Excellent half-day trip from Jaipur on the Jaipur-Agra highway route.",
        },
        visitDuration: {
            minimum: "30 Minutes",
            recommended: "1 Hour",
            extended: "1.5 Hours",
        },
        highlights: [
            "3,500 Symmetrical Steps",
            "13-Storey Depth",
            "Ancient Water Engineering",
            "Harshat Mata Temple Nearby"
            ],
        tags: ["Stepwell", "Heritage", "Architecture", "Photography", "Free Entry"],
        facilities: ["Parking", "Guide Available (sometimes)"],
        nearbyPlaces: ["Harshat Mata Temple (Adjacent)", "Jaipur (95 km)", "Agra route"],
        dos: ["Take wide-angle photos", "Visit nearby temple", "Go in the morning"],
        donts: ["Don't cross barriers", "Don't climb restricted zones"],
        isOpen: true,
        isFeatured: true,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "8th-9th Century AD",
        builtBy: "King Chanda",
        architecture: "Ancient Stepwell Architecture",
        significance: "One of India’s deepest and most beautiful stepwells",
    },
    {
        id: 32,
        name: "Ajmer Sharif Dargah",
        slug: "ajmer-sharif-dargah",
        city: "Ajmer",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Sufi Shrine",
        description: "Ajmer Sharif Dargah is the holy shrine of Sufi saint Khwaja Moinuddin Chishti. It is one of the most revered pilgrimage sites in India, visited by millions of devotees of all faiths.",
        history: `
          <p><strong>Ajmer Sharif Dargah</strong> stands as a testament to the rich architectural and cultural legacy of Ajmer. Recognized as a premier sufi shrine in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 4740,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Ajmer Sharif Dargah Area, Ajmer",
            city: "Ajmer",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Ajmer%20Sharif%20Dargah",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Ajmer Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Ajmer Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Ajmer"
    },
    {
        id: 33,
        name: "Bhangarh Fort",
        slug: "bhangarh-fort",
        city: "Alwar",
        state: "Rajasthan",
        category: "Fort",
        subcategory: "Haunted Fort ruins",
        description: "Bhangarh Fort is a 17th-century fort renowned as India's most haunted place. Located at the border of the Sariska Tiger Reserve, it contains beautiful ruins of temples, palaces, and markets.",
        history: `
          <p><strong>Bhangarh Fort</strong> stands as a testament to the rich architectural and cultural legacy of Alwar. Recognized as a premier haunted fort ruins in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 4860,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Bhangarh Fort Area, Alwar",
            city: "Alwar",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Bhangarh%20Fort",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Alwar Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Fort",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Alwar Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Alwar"
    },
    {
        id: 34,
        name: "Kuldhara Village",
        slug: "kuldhara-village",
        city: "Jaisalmer",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Abandoned Ghost Village",
        description: "Kuldhara is an abandoned ghost village near Jaisalmer. Established in the 13th century by Paliwal Brahmins, it was mysteriously abandoned overnight in the 19th century and remains untouched.",
        history: `
          <p><strong>Kuldhara Village</strong> stands as a testament to the rich architectural and cultural legacy of Jaisalmer. Recognized as a premier abandoned ghost village in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 4980,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Kuldhara Village Area, Jaisalmer",
            city: "Jaisalmer",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Kuldhara%20Village",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaisalmer Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaisalmer Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaisalmer"
    },
    {
        id: 35,
        name: "Taragarh Fort Bundi",
        slug: "taragarh-fort-bundi",
        city: "Bundi",
        state: "Rajasthan",
        category: "Fort",
        subcategory: "Hill Fort",
        description: "Taragarh Fort, or 'Star Fort', is a spectacular hilltop fortress in Bundi. Known for its massive battlements, tunnels, and ancient stepwells, it offers breathtaking views of Bundi town.",
        history: `
          <p><strong>Taragarh Fort Bundi</strong> stands as a testament to the rich architectural and cultural legacy of Bundi. Recognized as a premier hill fort in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 5100,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Taragarh Fort Bundi Area, Bundi",
            city: "Bundi",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Taragarh%20Fort%20Bundi",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Bundi Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Fort",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Bundi Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Bundi"
    },
    {
        id: 36,
        name: "Nakki Lake",
        slug: "nakki-lake",
        city: "Mount Abu",
        state: "Rajasthan",
        category: "Lake",
        subcategory: "Natural Freshwater Lake",
        description: "Nakki Lake is a serene freshwater lake in Mount Abu hill station. Surrounded by lush hills and strange rock formations, it is considered sacred by the local Garacia tribe.",
        history: `
          <p><strong>Nakki Lake</strong> stands as a testament to the rich architectural and cultural legacy of Mount Abu. Recognized as a premier natural freshwater lake in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 5220,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Nakki Lake Area, Mount Abu",
            city: "Mount Abu",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Nakki%20Lake",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Mount Abu Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Lake",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Mount Abu Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Mount Abu"
    },
    {
        id: 37,
        name: "Birla Mandir Jaipur",
        slug: "birla-mandir-jaipur",
        city: "Jaipur",
        state: "Rajasthan",
        category: "Temple",
        subcategory: "Modern Marble Temple",
        description: "Birla Mandir (Laxmi Narayan Temple) is a magnificent Hindu temple built entirely of pure white marble. Located at the base of Moti Dungri hill, it is famous for its carvings, stained glass windows, and calm vibe.",
        history: `
          <p><strong>Birla Mandir Jaipur</strong> stands as a testament to the rich architectural and cultural legacy of Jaipur. Recognized as a premier modern marble temple in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 5340,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Birla Mandir Jaipur Area, Jaipur",
            city: "Jaipur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Birla%20Mandir%20Jaipur",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaipur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Temple",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaipur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaipur"
    },
    {
        id: 38,
        name: "Jaisamand Lake",
        slug: "jaisamand-lake",
        city: "Udaipur",
        state: "Rajasthan",
        category: "Lake",
        subcategory: "Artificial freshwater lake",
        description: "Jaisamand Lake (Dhebar Lake) is India's second-largest artificial lake. Built in the 17th century, it features massive marble dams, cenotaphs, a wildlife sanctuary, and palaces.",
        history: `
          <p><strong>Jaisamand Lake</strong> stands as a testament to the rich architectural and cultural legacy of Udaipur. Recognized as a premier artificial freshwater lake in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 5460,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Jaisamand Lake Area, Udaipur",
            city: "Udaipur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Jaisamand%20Lake",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Udaipur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Lake",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Udaipur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Udaipur"
    },
    {
        id: 39,
        name: "Ranthambore Fort",
        slug: "ranthambore-fort",
        city: "Sawai Madhopur",
        state: "Rajasthan",
        category: "Fort",
        subcategory: "Hill Fort",
        description: "A majestic UNESCO World Heritage hill fort situated inside the Ranthambore National Park, known for its temples and rich historical battles.",
        history: `
          <p><strong>Ranthambore Fort</strong> stands as a testament to the rich architectural and cultural legacy of Sawai Madhopur. Recognized as a premier hill fort in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 5580,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Ranthambore Fort Area, Sawai Madhopur",
            city: "Sawai Madhopur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Ranthambore%20Fort",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Sawai Madhopur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Fort",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Sawai Madhopur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Sawai Madhopur"
    },
    {
        id: 40,
        name: "Deeg Palace",
        slug: "deeg-palace",
        city: "Deeg",
        state: "Rajasthan",
        category: "Palace",
        subcategory: "Garden Palace",
        description: "Famous for its magnificent Mughal-style gardens, beautiful fountains, and spectacular architecture built by Jat rulers.",
        history: `
          <p><strong>Deeg Palace</strong> stands as a testament to the rich architectural and cultural legacy of Deeg. Recognized as a premier garden palace in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 5700,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Deeg Palace Area, Deeg",
            city: "Deeg",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Deeg%20Palace",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Deeg Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Palace",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Deeg Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Deeg"
    },
    {
        id: 41,
        name: "Neemrana Fort Palace",
        slug: "neemrana-fort-palace",
        city: "Neemrana",
        state: "Rajasthan",
        category: "Palace",
        subcategory: "Heritage Hotel Fort",
        description: "A stunning 15th-century fort palace converted into a luxury heritage hotel, offering zip-lining and panoramic views.",
        history: `
          <p><strong>Neemrana Fort Palace</strong> stands as a testament to the rich architectural and cultural legacy of Neemrana. Recognized as a premier heritage hotel fort in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 5820,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Neemrana Fort Palace Area, Neemrana",
            city: "Neemrana",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Neemrana%20Fort%20Palace",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Neemrana Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Palace",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Neemrana Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Neemrana"
    },
    {
        id: 42,
        name: "Kalibangan Museum",
        slug: "kalibangan-museum",
        city: "Hanumangarh",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Archaeological Site",
        description: "An ancient site of the Indus Valley Civilization featuring pre-Harappan and Harappan relics, pottery, and agricultural finds.",
        history: `
          <p><strong>Kalibangan Museum</strong> stands as a testament to the rich architectural and cultural legacy of Hanumangarh. Recognized as a premier archaeological site in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 5940,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Kalibangan Museum Area, Hanumangarh",
            city: "Hanumangarh",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Kalibangan%20Museum",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Hanumangarh Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Hanumangarh Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Hanumangarh"
    },
    {
        id: 43,
        name: "Sariska National Park",
        slug: "sariska-national-park",
        city: "Alwar",
        state: "Rajasthan",
        category: "Wildlife",
        subcategory: "Tiger Reserve",
        description: "A famous tiger reserve nestled in the Aravalli hills, home to leopards, wild boars, and historic ruins.",
        history: `
          <p><strong>Sariska National Park</strong> stands as a testament to the rich architectural and cultural legacy of Alwar. Recognized as a premier tiger reserve in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 6060,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Sariska National Park Area, Alwar",
            city: "Alwar",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Sariska%20National%20Park",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Alwar Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Wildlife",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Alwar Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Alwar"
    },
    {
        id: 44,
        name: "Garbhaji Waterfall",
        slug: "garbhaji-waterfall",
        city: "Alwar",
        state: "Rajasthan",
        category: "Nature",
        subcategory: "Waterfall",
        description: "A beautiful natural waterfall surrounded by steep rocky cliffs, popular for trekking and picnics near Alwar.",
        history: `
          <p><strong>Garbhaji Waterfall</strong> stands as a testament to the rich architectural and cultural legacy of Alwar. Recognized as a premier waterfall in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 6180,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Garbhaji Waterfall Area, Alwar",
            city: "Alwar",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Garbhaji%20Waterfall",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Alwar Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Nature",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Alwar Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Alwar"
    },
    {
        id: 45,
        name: "Sambhar Salt Lake",
        slug: "sambhar-salt-lake",
        city: "Sambhar",
        state: "Rajasthan",
        category: "Nature",
        subcategory: "Salt Lake",
        description: "India's largest inland salt lake, famous for salt production, scenic white horizons, and migratory flamingos.",
        history: `
          <p><strong>Sambhar Salt Lake</strong> stands as a testament to the rich architectural and cultural legacy of Sambhar. Recognized as a premier salt lake in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 6300,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Sambhar Salt Lake Area, Sambhar",
            city: "Sambhar",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Sambhar%20Salt%20Lake",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Sambhar Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Nature",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Sambhar Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Sambhar"
    },
    {
        id: 46,
        name: "Khimsar Fort",
        slug: "khimsar-fort",
        city: "Nagaur",
        state: "Rajasthan",
        category: "Fort",
        subcategory: "Heritage Fort",
        description: "A beautiful 16th-century fortress on the edge of the Thar Desert, offering sand dune safaris and royal hospitality.",
        history: `
          <p><strong>Khimsar Fort</strong> stands as a testament to the rich architectural and cultural legacy of Nagaur. Recognized as a premier heritage fort in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 6420,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Khimsar Fort Area, Nagaur",
            city: "Nagaur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Khimsar%20Fort",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Nagaur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Fort",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Nagaur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Nagaur"
    },
    {
        id: 47,
        name: "Samode Palace",
        slug: "samode-palace",
        city: "Jaipur",
        state: "Rajasthan",
        category: "Palace",
        subcategory: "Heritage Palace",
        description: "A beautiful heritage palace near Jaipur, famous for its mirror-decorated halls (Sheesh Mahal) and courtly architecture.",
        history: `
          <p><strong>Samode Palace</strong> stands as a testament to the rich architectural and cultural legacy of Jaipur. Recognized as a premier heritage palace in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 6540,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Samode Palace Area, Jaipur",
            city: "Jaipur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Samode%20Palace",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaipur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Palace",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaipur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaipur"
    },
    {
        id: 48,
        name: "Rambagh Palace",
        slug: "rambagh-palace",
        city: "Jaipur",
        state: "Rajasthan",
        category: "Palace",
        subcategory: "Luxury Heritage Hotel",
        description: "Known as the 'Jewel of Jaipur', this former royal residence of the Maharaja is now one of the world's finest luxury hotels.",
        history: `
          <p><strong>Rambagh Palace</strong> stands as a testament to the rich architectural and cultural legacy of Jaipur. Recognized as a premier luxury heritage hotel in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 6660,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Rambagh Palace Area, Jaipur",
            city: "Jaipur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Rambagh%20Palace",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaipur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Palace",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaipur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaipur"
    },
    {
        id: 49,
        name: "Sisodia Rani Ka Bagh",
        slug: "sisodia-rani-ka-bagh",
        city: "Jaipur",
        state: "Rajasthan",
        category: "Nature",
        subcategory: "Royal Garden",
        description: "A terraced royal garden decorated with water fountains, pavilions, and beautiful wall paintings depicting Radha-Krishna love stories.",
        history: `
          <p><strong>Sisodia Rani Ka Bagh</strong> stands as a testament to the rich architectural and cultural legacy of Jaipur. Recognized as a premier royal garden in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 6780,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Sisodia Rani Ka Bagh Area, Jaipur",
            city: "Jaipur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Sisodia%20Rani%20Ka%20Bagh",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaipur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Nature",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaipur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaipur"
    },
    {
        id: 50,
        name: "Pandu Pol Temple",
        slug: "pandu-pol-temple",
        city: "Alwar",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Hanuman Temple",
        description: "An ancient temple inside Sariska Tiger Reserve, linked to the Pandavas from the Mahabharata epic.",
        history: `
          <p><strong>Pandu Pol Temple</strong> stands as a testament to the rich architectural and cultural legacy of Alwar. Recognized as a premier hanuman temple in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 6900,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Pandu Pol Temple Area, Alwar",
            city: "Alwar",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Pandu%20Pol%20Temple",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Alwar Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Alwar Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Alwar"
    },
    {
        id: 51,
        name: "Bagru Block Printing Village",
        slug: "bagru-block-printing-village",
        city: "Bagru",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Artisanal Craft Village",
        description: "A world-famous traditional hand block-printing center using natural dyes and centuries-old wooden stamp patterns.",
        history: `
          <p><strong>Bagru Block Printing Village</strong> stands as a testament to the rich architectural and cultural legacy of Bagru. Recognized as a premier artisanal craft village in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 7020,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Bagru Block Printing Village Area, Bagru",
            city: "Bagru",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Bagru%20Block%20Printing%20Village",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Bagru Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Bagru Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Bagru"
    },
    {
        id: 52,
        name: "Kishangarh Dumping Yard",
        slug: "kishangarh-dumping-yard",
        city: "Kishangarh",
        state: "Rajasthan",
        category: "Nature",
        subcategory: "Scenic White Landscape",
        description: "A popular photography spot with a snow-like white landscape formed by marble slurry deposits near Kishangarh.",
        history: `
          <p><strong>Kishangarh Dumping Yard</strong> stands as a testament to the rich architectural and cultural legacy of Kishangarh. Recognized as a premier scenic white landscape in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 7140,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Kishangarh Dumping Yard Area, Kishangarh",
            city: "Kishangarh",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Kishangarh%20Dumping%20Yard",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Kishangarh Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Nature",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Kishangarh Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Kishangarh"
    },
    {
        id: 53,
        name: "Trinetra Ganesh Temple",
        slug: "trinetra-ganesh-temple",
        city: "Sawai Madhopur",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Ganesha Temple",
        description: "A highly revered temple inside Ranthambore Fort housing the three-eyed idol of Lord Ganesha.",
        history: `
          <p><strong>Trinetra Ganesh Temple</strong> stands as a testament to the rich architectural and cultural legacy of Sawai Madhopur. Recognized as a premier ganesha temple in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 7260,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Trinetra Ganesh Temple Area, Sawai Madhopur",
            city: "Sawai Madhopur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Trinetra%20Ganesh%20Temple",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Sawai Madhopur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Sawai Madhopur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Sawai Madhopur"
    },
    {
        id: 54,
        name: "Fateh Prakash Palace",
        slug: "fateh-prakash-palace",
        city: "Udaipur",
        state: "Rajasthan",
        category: "Palace",
        subcategory: "Heritage Palace Hotel",
        description: "Located inside the City Palace complex of Udaipur, famous for its magnificent crystal gallery and lake views.",
        history: `
          <p><strong>Fateh Prakash Palace</strong> stands as a testament to the rich architectural and cultural legacy of Udaipur. Recognized as a premier heritage palace hotel in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 7380,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Fateh Prakash Palace Area, Udaipur",
            city: "Udaipur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Fateh%20Prakash%20Palace",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Udaipur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Palace",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Udaipur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Udaipur"
    },
    {
        id: 55,
        name: "Haldighati Pass",
        slug: "haldighati-pass",
        city: "Rajsamand",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Historical Battleground",
        description: "A narrow mountain pass with yellow soil resembling turmeric, famous for the battle between Maharana Pratap and Akbar's forces.",
        history: `
          <p><strong>Haldighati Pass</strong> stands as a testament to the rich architectural and cultural legacy of Rajsamand. Recognized as a premier historical battleground in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 7500,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Haldighati Pass Area, Rajsamand",
            city: "Rajsamand",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Haldighati%20Pass",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Rajsamand Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Rajsamand Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Rajsamand"
    },
    {
        id: 56,
        name: "Vintage Car Museum",
        slug: "vintage-car-museum",
        city: "Udaipur",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Automobile Museum",
        description: "Houses a rare collection of classic royal vintage cars once owned by the Mewar Maharanas.",
        history: `
          <p><strong>Vintage Car Museum</strong> stands as a testament to the rich architectural and cultural legacy of Udaipur. Recognized as a premier automobile museum in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 7620,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Vintage Car Museum Area, Udaipur",
            city: "Udaipur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Vintage%20Car%20Museum",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Udaipur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Udaipur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Udaipur"
    },
    {
        id: 57,
        name: "Clock Tower Jodhpur",
        slug: "clock-tower-jodhpur",
        city: "Jodhpur",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Historical Clock Tower",
        description: "A prominent landmark in Jodhpur surrounded by the bustling Sardar Market, famous for spices and local shopping.",
        history: `
          <p><strong>Clock Tower Jodhpur</strong> stands as a testament to the rich architectural and cultural legacy of Jodhpur. Recognized as a premier historical clock tower in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 7740,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Clock Tower Jodhpur Area, Jodhpur",
            city: "Jodhpur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Clock%20Tower%20Jodhpur",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jodhpur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jodhpur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jodhpur"
    },
    {
        id: 58,
        name: "Nawalgarh Havelis",
        slug: "nawalgarh-havelis",
        city: "Nawalgarh",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Painted Havelis",
        description: "Known as the golden city of Shekhawati, famous for beautifully painted frescos on historic grand havelis.",
        history: `
          <p><strong>Nawalgarh Havelis</strong> stands as a testament to the rich architectural and cultural legacy of Nawalgarh. Recognized as a premier painted havelis in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 7860,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Nawalgarh Havelis Area, Nawalgarh",
            city: "Nawalgarh",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Nawalgarh%20Havelis",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Nawalgarh Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Nawalgarh Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Nawalgarh"
    },
    {
        id: 59,
        name: "Eklingji Temple",
        slug: "eklingji-temple",
        city: "Udaipur",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Shiva Temple",
        description: "An ancient and highly revered Hindu temple complex dedicated to Lord Eklingji, the ruling deity of Mewar.",
        history: `
          <p><strong>Eklingji Temple</strong> stands as a testament to the rich architectural and cultural legacy of Udaipur. Recognized as a premier shiva temple in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 7980,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Eklingji Temple Area, Udaipur",
            city: "Udaipur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Eklingji%20Temple",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Udaipur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Udaipur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Udaipur"
    },
    {
        id: 60,
        name: "Bagore Ki Haveli",
        slug: "bagore-ki-haveli",
        city: "Udaipur",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Museum & Cultural Center",
        description: "An 18th-century waterfront haveli hosting dynamic folk dance shows and heritage museum galleries.",
        history: `
          <p><strong>Bagore Ki Haveli</strong> stands as a testament to the rich architectural and cultural legacy of Udaipur. Recognized as a premier museum & cultural center in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 8100,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Bagore Ki Haveli Area, Udaipur",
            city: "Udaipur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Bagore%20Ki%20Haveli",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Udaipur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Udaipur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Udaipur"
    },
    {
        id: 61,
        name: "Toorji Ka Jhalra",
        slug: "toorji-ka-jhalra",
        city: "Jodhpur",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Historical Stepwell",
        description: "A beautifully restored 18th-century stepwell showcasing intricate Rajput water management architecture.",
        history: `
          <p><strong>Toorji Ka Jhalra</strong> stands as a testament to the rich architectural and cultural legacy of Jodhpur. Recognized as a premier historical stepwell in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 8220,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Toorji Ka Jhalra Area, Jodhpur",
            city: "Jodhpur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Toorji%20Ka%20Jhalra",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jodhpur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jodhpur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jodhpur"
    },
    {
        id: 62,
        name: "Salim Singh Ki Haveli",
        slug: "salim-singh-ki-haveli",
        city: "Jaisalmer",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Historic Haveli",
        description: "A uniquely designed haveli in Jaisalmer with an peacock-shaped arched roof and intricate stone carvings.",
        history: `
          <p><strong>Salim Singh Ki Haveli</strong> stands as a testament to the rich architectural and cultural legacy of Jaisalmer. Recognized as a premier historic haveli in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 8340,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Salim Singh Ki Haveli Area, Jaisalmer",
            city: "Jaisalmer",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Salim%20Singh%20Ki%20Haveli",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaisalmer Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaisalmer Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaisalmer"
    },
    {
        id: 63,
        name: "Nathmal Ki Haveli",
        slug: "nathmal-ki-haveli",
        city: "Jaisalmer",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Historic Haveli",
        description: "Famous Jaisalmer haveli carved by two architect brothers, featuring identical halves with subtle design differences.",
        history: `
          <p><strong>Nathmal Ki Haveli</strong> stands as a testament to the rich architectural and cultural legacy of Jaisalmer. Recognized as a premier historic haveli in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 8460,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Nathmal Ki Haveli Area, Jaisalmer",
            city: "Jaisalmer",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Nathmal%20Ki%20Haveli",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaisalmer Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaisalmer Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaisalmer"
    },
    {
        id: 64,
        name: "Khuri Sand Dunes",
        slug: "khuri-sand-dunes",
        city: "Jaisalmer",
        state: "Rajasthan",
        category: "Nature",
        subcategory: "Desert Sand Dunes",
        description: "Peaceful sand dunes near Jaisalmer offering traditional mud home stays, camel rides, and clear desert starry nights.",
        history: `
          <p><strong>Khuri Sand Dunes</strong> stands as a testament to the rich architectural and cultural legacy of Jaisalmer. Recognized as a premier desert sand dunes in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 8580,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Khuri Sand Dunes Area, Jaisalmer",
            city: "Jaisalmer",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Khuri%20Sand%20Dunes",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaisalmer Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Nature",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaisalmer Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaisalmer"
    },
    {
        id: 65,
        name: "Vyas Chhatri",
        slug: "vyas-chhatri",
        city: "Jaisalmer",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Cenotaph monument",
        description: "An array of golden sandstone cenotaphs dedicated to sage Vyas, popular for capturing stunning sunset photographs.",
        history: `
          <p><strong>Vyas Chhatri</strong> stands as a testament to the rich architectural and cultural legacy of Jaisalmer. Recognized as a premier cenotaph monument in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 8700,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Vyas Chhatri Area, Jaisalmer",
            city: "Jaisalmer",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Vyas%20Chhatri",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaisalmer Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaisalmer Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaisalmer"
    },
    {
        id: 66,
        name: "Pokhran Fort",
        slug: "pokhran-fort",
        city: "Pokhran",
        state: "Rajasthan",
        category: "Fort",
        subcategory: "Heritage Fort",
        description: "A 14th-century red sandstone fortress of the Marwar clan, housing a heritage museum and temple.",
        history: `
          <p><strong>Pokhran Fort</strong> stands as a testament to the rich architectural and cultural legacy of Pokhran. Recognized as a premier heritage fort in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 8820,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Pokhran Fort Area, Pokhran",
            city: "Pokhran",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Pokhran%20Fort",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Pokhran Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Fort",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Pokhran Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Pokhran"
    },
    {
        id: 67,
        name: "Desert National Park",
        slug: "desert-national-park",
        city: "Jaisalmer",
        state: "Rajasthan",
        category: "Wildlife",
        subcategory: "National Park",
        description: "One of India's largest national parks, showcasing Thar Desert wildlife and the endangered Great Indian Bustard.",
        history: `
          <p><strong>Desert National Park</strong> stands as a testament to the rich architectural and cultural legacy of Jaisalmer. Recognized as a premier national park in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 8940,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Desert National Park Area, Jaisalmer",
            city: "Jaisalmer",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Desert%20National%20Park",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaisalmer Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Wildlife",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaisalmer Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaisalmer"
    },
    {
        id: 68,
        name: "Bada Bagh",
        slug: "bada-bagh",
        city: "Jaisalmer",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Royal Cenotaphs",
        description: "A historical garden complex housing carved golden sandstone cenotaphs of Jaisalmer's royal family.",
        history: `
          <p><strong>Bada Bagh</strong> stands as a testament to the rich architectural and cultural legacy of Jaisalmer. Recognized as a premier royal cenotaphs in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 9060,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Bada Bagh Area, Jaisalmer",
            city: "Jaisalmer",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Bada%20Bagh",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaisalmer Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaisalmer Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaisalmer"
    },
    {
        id: 69,
        name: "Tanot Mata Temple",
        slug: "tanot-mata-temple",
        city: "Jaisalmer",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Border Temple",
        description: "A famous border temple managed by BSF, where bombs dropped in the 1965 war miraculously did not explode.",
        history: `
          <p><strong>Tanot Mata Temple</strong> stands as a testament to the rich architectural and cultural legacy of Jaisalmer. Recognized as a premier border temple in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 9180,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Tanot Mata Temple Area, Jaisalmer",
            city: "Jaisalmer",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Tanot%20Mata%20Temple",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaisalmer Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaisalmer Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaisalmer"
    },
    {
        id: 70,
        name: "Ana Sagar Lake",
        slug: "ana-sagar-lake",
        city: "Ajmer",
        state: "Rajasthan",
        category: "Lake",
        subcategory: "Artificial Lake",
        description: "A scenic artificial lake in Ajmer featuring beautiful marble pavilions (Baradari) built by Mughal Emperor Shah Jahan.",
        history: `
          <p><strong>Ana Sagar Lake</strong> stands as a testament to the rich architectural and cultural legacy of Ajmer. Recognized as a premier artificial lake in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 9300,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Ana Sagar Lake Area, Ajmer",
            city: "Ajmer",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Ana%20Sagar%20Lake",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Ajmer Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Lake",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Ajmer Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Ajmer"
    },
    {
        id: 71,
        name: "Balsamand Lake",
        slug: "balsamand-lake",
        city: "Jodhpur",
        state: "Rajasthan",
        category: "Lake",
        subcategory: "Historic Palace Lake",
        description: "A 12th-century artificial lake surrounded by lush gardens and a grand red sandstone palace hotel.",
        history: `
          <p><strong>Balsamand Lake</strong> stands as a testament to the rich architectural and cultural legacy of Jodhpur. Recognized as a premier historic palace lake in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 9420,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Balsamand Lake Area, Jodhpur",
            city: "Jodhpur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Balsamand%20Lake",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jodhpur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Lake",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jodhpur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jodhpur"
    },
    {
        id: 72,
        name: "Savitri Temple",
        slug: "savitri-temple",
        city: "Pushkar",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Hill Temple",
        description: "Perched atop Ratnagiri Hill, this temple dedicated to Goddess Savitri offers beautiful sunrise and ropeway views of Pushkar.",
        history: `
          <p><strong>Savitri Temple</strong> stands as a testament to the rich architectural and cultural legacy of Pushkar. Recognized as a premier hill temple in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 9540,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Savitri Temple Area, Pushkar",
            city: "Pushkar",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Savitri%20Temple",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Pushkar Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Pushkar Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Pushkar"
    },
    {
        id: 73,
        name: "Akbar Palace and Museum",
        slug: "akbar-palace-and-museum",
        city: "Ajmer",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Fort Museum",
        description: "Built by Emperor Akbar in 1570, this fort houses a rich museum of Mughal weapons, sculptures, and art.",
        history: `
          <p><strong>Akbar Palace and Museum</strong> stands as a testament to the rich architectural and cultural legacy of Ajmer. Recognized as a premier fort museum in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 9660,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Akbar Palace and Museum Area, Ajmer",
            city: "Ajmer",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Akbar%20Palace%20and%20Museum",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Ajmer Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Ajmer Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Ajmer"
    },
    {
        id: 74,
        name: "Nasiyan Jain Temple",
        slug: "nasiyan-jain-temple",
        city: "Ajmer",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Golden Temple",
        description: "Also known as the Red Temple, famous for its magnificent double-story hall depicting golden representations of Jain cosmology.",
        history: `
          <p><strong>Nasiyan Jain Temple</strong> stands as a testament to the rich architectural and cultural legacy of Ajmer. Recognized as a premier golden temple in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 9780,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Nasiyan Jain Temple Area, Ajmer",
            city: "Ajmer",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Nasiyan%20Jain%20Temple",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Ajmer Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Ajmer Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Ajmer"
    },
    {
        id: 75,
        name: "Nareli Jain Temple",
        slug: "nareli-jain-temple",
        city: "Ajmer",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "आधुनिक जैन मंदिर",
        description: "A beautiful modern Jain temple complex carved out of pink sandstone, located on the outskirts of Ajmer.",
        history: `
          <p><strong>Nareli Jain Temple</strong> stands as a testament to the rich architectural and cultural legacy of Ajmer. Recognized as a premier आधुनिक जैन मंदिर in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 9900,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Nareli Jain Temple Area, Ajmer",
            city: "Ajmer",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Nareli%20Jain%20Temple",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Ajmer Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Ajmer Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Ajmer"
    },
    {
        id: 76,
        name: "Adhai Din Ka Jhopra",
        slug: "adhai-din-ka-jhopra",
        city: "Ajmer",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Ancient Mosque ruins",
        description: "An ancient mosque in Ajmer converted from a Sanskrit college in 1192, featuring highly intricate arched screens.",
        history: `
          <p><strong>Adhai Din Ka Jhopra</strong> stands as a testament to the rich architectural and cultural legacy of Ajmer. Recognized as a premier ancient mosque ruins in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 10020,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Adhai Din Ka Jhopra Area, Ajmer",
            city: "Ajmer",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Adhai%20Din%20Ka%20Jhopra",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Ajmer Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Ajmer Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Ajmer"
    },
    {
        id: 77,
        name: "Salasar Balaji Temple",
        slug: "salasar-balaji-temple",
        city: "Sikar",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Hanuman Temple",
        description: "A highly sacred and popular pilgrimage site dedicated to Lord Hanuman, featuring a unique bearded deity idol.",
        history: `
          <p><strong>Salasar Balaji Temple</strong> stands as a testament to the rich architectural and cultural legacy of Sikar. Recognized as a premier hanuman temple in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 10140,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Salasar Balaji Temple Area, Sikar",
            city: "Sikar",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Salasar%20Balaji%20Temple",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Sikar Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Sikar Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Sikar"
    },
    {
        id: 78,
        name: "Siliserh Lake",
        slug: "siliserh-lake",
        city: "Alwar",
        state: "Rajasthan",
        category: "Lake",
        subcategory: "Scenic Lake",
        description: "A beautiful, serene lake surrounded by the Aravalli hills, featuring a historic lake palace converted into a heritage hotel.",
        history: `
          <p><strong>Siliserh Lake</strong> stands as a testament to the rich architectural and cultural legacy of Alwar. Recognized as a premier scenic lake in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 10260,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Siliserh Lake Area, Alwar",
            city: "Alwar",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Siliserh%20Lake",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Alwar Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Lake",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Alwar Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Alwar"
    },
    {
        id: 79,
        name: "Gaib Sagar Lake",
        slug: "gaib-sagar-lake",
        city: "Dungarpur",
        state: "Rajasthan",
        category: "Lake",
        subcategory: "Historic Lake",
        description: "A famous lake in Dungarpur known for its unique shrines, palace ruins, and diverse bird species migrating here.",
        history: `
          <p><strong>Gaib Sagar Lake</strong> stands as a testament to the rich architectural and cultural legacy of Dungarpur. Recognized as a premier historic lake in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 10380,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Gaib Sagar Lake Area, Dungarpur",
            city: "Dungarpur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Gaib%20Sagar%20Lake",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Dungarpur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Lake",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Dungarpur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Dungarpur"
    },
    {
        id: 80,
        name: "Beneshwar Dham",
        slug: "beneshwar-dham",
        city: "Dungarpur",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Holy Pilgrimage",
        description: "A highly revered delta site situated at the confluence of Som, Mahi, and Jakham rivers, famous for its tribal fair.",
        history: `
          <p><strong>Beneshwar Dham</strong> stands as a testament to the rich architectural and cultural legacy of Dungarpur. Recognized as a premier holy pilgrimage in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 10500,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Beneshwar Dham Area, Dungarpur",
            city: "Dungarpur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Beneshwar%20Dham",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Dungarpur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Dungarpur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Dungarpur"
    },
    {
        id: 81,
        name: "Deo Somnath Temple",
        slug: "deo-somnath-temple",
        city: "Dungarpur",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Ancient Temple",
        description: "A unique 12th-century stone temple dedicated to Lord Shiva, built entirely of stone blocks without mortar.",
        history: `
          <p><strong>Deo Somnath Temple</strong> stands as a testament to the rich architectural and cultural legacy of Dungarpur. Recognized as a premier ancient temple in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 10620,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Deo Somnath Temple Area, Dungarpur",
            city: "Dungarpur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Deo%20Somnath%20Temple",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Dungarpur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Dungarpur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Dungarpur"
    },
    {
        id: 82,
        name: "Menal Waterfall",
        slug: "menal-waterfall",
        city: "Chittorgarh",
        state: "Rajasthan",
        category: "Nature",
        subcategory: "Waterfall",
        description: "A breathtaking waterfall surrounded by lush green forests and ancient Shiva temples dating back to the 12th century.",
        history: `
          <p><strong>Menal Waterfall</strong> stands as a testament to the rich architectural and cultural legacy of Chittorgarh. Recognized as a premier waterfall in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 10740,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Menal Waterfall Area, Chittorgarh",
            city: "Chittorgarh",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Menal%20Waterfall",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Chittorgarh Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Nature",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Chittorgarh Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Chittorgarh"
    },
    {
        id: 83,
        name: "Bhimlat Waterfall",
        slug: "bhimlat-waterfall",
        city: "Bundi",
        state: "Rajasthan",
        category: "Nature",
        subcategory: "Waterfall",
        description: "A gorgeous 60-meter high monsoon waterfall located near Bundi, associated with the Mahabharata legend.",
        history: `
          <p><strong>Bhimlat Waterfall</strong> stands as a testament to the rich architectural and cultural legacy of Bundi. Recognized as a premier waterfall in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 10860,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Bhimlat Waterfall Area, Bundi",
            city: "Bundi",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Bhimlat%20Waterfall",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Bundi Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Nature",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Bundi Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Bundi"
    },
    {
        id: 84,
        name: "Garadiya Mahadev",
        slug: "garadiya-mahadev",
        city: "Kota",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Scenic Gorge Temple",
        description: "A clifftop temple offering a breathtaking panoramic view of the horseshoe bend of the Chambal River canyon.",
        history: `
          <p><strong>Garadiya Mahadev</strong> stands as a testament to the rich architectural and cultural legacy of Kota. Recognized as a premier scenic gorge temple in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 10980,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Garadiya Mahadev Area, Kota",
            city: "Kota",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Garadiya%20Mahadev",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Kota Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Kota Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Kota"
    },
    {
        id: 85,
        name: "Chuliya Waterfall",
        slug: "chuliya-waterfall",
        city: "Rawatbhata",
        state: "Rajasthan",
        category: "Nature",
        subcategory: "Waterfall & Gorge",
        description: "A scenic natural waterfall formed by the Chambal River cutting through circular rocks near Rawatbhata.",
        history: `
          <p><strong>Chuliya Waterfall</strong> stands as a testament to the rich architectural and cultural legacy of Rawatbhata. Recognized as a premier waterfall & gorge in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 11100,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Chuliya Waterfall Area, Rawatbhata",
            city: "Rawatbhata",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Chuliya%20Waterfall",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Rawatbhata Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Nature",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Rawatbhata Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Rawatbhata"
    },
    {
        id: 86,
        name: "Mahi Bajaj Sagar Dam",
        slug: "mahi-bajaj-sagar-dam",
        city: "Banswara",
        state: "Rajasthan",
        category: "Nature",
        subcategory: "Dam & Reservoir",
        description: "The second largest dam in Rajasthan, featuring scenic view of multiple green islands on the Mahi River.",
        history: `
          <p><strong>Mahi Bajaj Sagar Dam</strong> stands as a testament to the rich architectural and cultural legacy of Banswara. Recognized as a premier dam & reservoir in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 11220,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Mahi Bajaj Sagar Dam Area, Banswara",
            city: "Banswara",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Mahi%20Bajaj%20Sagar%20Dam",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Banswara Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Nature",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Banswara Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Banswara"
    },
    {
        id: 87,
        name: "Kaylana Lake",
        slug: "kaylana-lake",
        city: "Jodhpur",
        state: "Rajasthan",
        category: "Lake",
        subcategory: "Artificial Lake",
        description: "A peaceful lake in Jodhpur, popular for capturing sunsets, boating, and observing local wildlife.",
        history: `
          <p><strong>Kaylana Lake</strong> stands as a testament to the rich architectural and cultural legacy of Jodhpur. Recognized as a premier artificial lake in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 11340,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Kaylana Lake Area, Jodhpur",
            city: "Jodhpur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Kaylana%20Lake",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jodhpur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Lake",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jodhpur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jodhpur"
    },
    {
        id: 88,
        name: "Machia Biological Park",
        slug: "machia-biological-park",
        city: "Jodhpur",
        state: "Rajasthan",
        category: "Wildlife",
        subcategory: "Biological Park & Zoo",
        description: "Located near Kaylana Lake, home to desert animals like wolves, lions, leopards, and various deer species.",
        history: `
          <p><strong>Machia Biological Park</strong> stands as a testament to the rich architectural and cultural legacy of Jodhpur. Recognized as a premier biological park & zoo in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 11460,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Machia Biological Park Area, Jodhpur",
            city: "Jodhpur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Machia%20Biological%20Park",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jodhpur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Wildlife",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jodhpur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jodhpur"
    },
    {
        id: 89,
        name: "Machkund Dholpur",
        slug: "machkund-dholpur",
        city: "Dholpur",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Holy Tank & Temples",
        description: "A highly sacred place known as the 'King of Pilgrimages' (Tirthraj), featuring an ancient sacred pond and temples.",
        history: `
          <p><strong>Machkund Dholpur</strong> stands as a testament to the rich architectural and cultural legacy of Dholpur. Recognized as a premier holy tank & temples in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 11580,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Machkund Dholpur Area, Dholpur",
            city: "Dholpur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Machkund%20Dholpur",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Dholpur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Dholpur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Dholpur"
    },
    {
        id: 90,
        name: "Lodurva Jain Temple",
        slug: "lodurva-jain-temple",
        city: "Jaisalmer",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Jain Temple ruins",
        description: "A beautiful yellow sandstone Jain temple, famous for its ornate archway (Torana) and mythical wishes-granting tree.",
        history: `
          <p><strong>Lodurva Jain Temple</strong> stands as a testament to the rich architectural and cultural legacy of Jaisalmer. Recognized as a premier jain temple ruins in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 11700,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Lodurva Jain Temple Area, Jaisalmer",
            city: "Jaisalmer",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Lodurva%20Jain%20Temple",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaisalmer Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaisalmer Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaisalmer"
    },
    {
        id: 91,
        name: "Kiradu Temples",
        slug: "kiradu-temples",
        city: "Barmer",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Ancient ruins",
        description: "Known as the Khajuraho of Rajasthan, featuring gorgeous ruins of Solanki-style temples in the desert.",
        history: `
          <p><strong>Kiradu Temples</strong> stands as a testament to the rich architectural and cultural legacy of Barmer. Recognized as a premier ancient ruins in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 11820,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Kiradu Temples Area, Barmer",
            city: "Barmer",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Kiradu%20Temples",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Barmer Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Barmer Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Barmer"
    },
    {
        id: 92,
        name: "Nakoda Jain Temple",
        slug: "nakoda-jain-temple",
        city: "Barmer",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Pilgrimage center",
        description: "A highly popular Jain pilgrimage site located on a hill in Barmer, dedicated to Lord Parsvanath.",
        history: `
          <p><strong>Nakoda Jain Temple</strong> stands as a testament to the rich architectural and cultural legacy of Barmer. Recognized as a premier pilgrimage center in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 11940,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Nakoda Jain Temple Area, Barmer",
            city: "Barmer",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Nakoda%20Jain%20Temple",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Barmer Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Barmer Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Barmer"
    },
    {
        id: 93,
        name: "Govind Dev Ji Temple",
        slug: "govind-dev-ji-temple",
        city: "Jaipur",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Krishna Temple",
        description: "Located inside the City Palace complex, housing the highly revered Krishna deity once worshiped by the royals.",
        history: `
          <p><strong>Govind Dev Ji Temple</strong> stands as a testament to the rich architectural and cultural legacy of Jaipur. Recognized as a premier krishna temple in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 12060,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Govind Dev Ji Temple Area, Jaipur",
            city: "Jaipur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Govind%20Dev%20Ji%20Temple",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaipur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaipur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaipur"
    },
    {
        id: 94,
        name: "Khatu Shyam Ji Temple",
        slug: "khatu-shyam-ji-temple",
        city: "Sikar",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Shyam Baba Temple",
        description: "One of the most visited temples in Rajasthan, dedicated to Barbarika (revered as Shyam Baba), drawing millions of devotees.",
        history: `
          <p><strong>Khatu Shyam Ji Temple</strong> stands as a testament to the rich architectural and cultural legacy of Sikar. Recognized as a premier shyam baba temple in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 12180,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Khatu Shyam Ji Temple Area, Sikar",
            city: "Sikar",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Khatu%20Shyam%20Ji%20Temple",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Sikar Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Sikar Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Sikar"
    },
    {
        id: 95,
        name: "Kaila Devi Temple",
        slug: "kaila-devi-temple",
        city: "Karauli",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Durga Temple",
        description: "A highly sacred temple situated on the banks of Kalisil River, dedicated to the tutelary deity of Karauli state.",
        history: `
          <p><strong>Kaila Devi Temple</strong> stands as a testament to the rich architectural and cultural legacy of Karauli. Recognized as a premier durga temple in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 12300,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Kaila Devi Temple Area, Karauli",
            city: "Karauli",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Kaila%20Devi%20Temple",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Karauli Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Karauli Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Karauli"
    },
    {
        id: 96,
        name: "Mehandipur Balaji Temple",
        slug: "mehandipur-balaji-temple",
        city: "Dausa",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Hanuman Temple",
        description: "A widely popular temple dedicated to Lord Hanuman, renowned for ritualistic healing and exorcism of evil spirits.",
        history: `
          <p><strong>Mehandipur Balaji Temple</strong> stands as a testament to the rich architectural and cultural legacy of Dausa. Recognized as a premier hanuman temple in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 12420,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Mehandipur Balaji Temple Area, Dausa",
            city: "Dausa",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Mehandipur%20Balaji%20Temple",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Dausa Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Dausa Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Dausa"
    },
    {
        id: 97,
        name: "Sukh Mahal Bundi",
        slug: "sukh-mahal-bundi",
        city: "Bundi",
        state: "Rajasthan",
        category: "Palace",
        subcategory: "Lake Palace",
        description: "A scenic summer palace located on the banks of Jait Sagar lake, where Rudyard Kipling stayed and wrote 'Kim'.",
        history: `
          <p><strong>Sukh Mahal Bundi</strong> stands as a testament to the rich architectural and cultural legacy of Bundi. Recognized as a premier lake palace in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 12540,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Sukh Mahal Bundi Area, Bundi",
            city: "Bundi",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Sukh%20Mahal%20Bundi",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Bundi Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Palace",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Bundi Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Bundi"
    },
    {
        id: 98,
        name: "Garh Palace Bundi",
        slug: "garh-palace-bundi",
        city: "Bundi",
        state: "Rajasthan",
        category: "Palace",
        subcategory: "Hill Palace Complex",
        description: "A majestic hill palace complex famous for its miniature paintings, grand gateways, and traditional Rajput architecture.",
        history: `
          <p><strong>Garh Palace Bundi</strong> stands as a testament to the rich architectural and cultural legacy of Bundi. Recognized as a premier hill palace complex in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 12660,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Garh Palace Bundi Area, Bundi",
            city: "Bundi",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Garh%20Palace%20Bundi",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Bundi Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Palace",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Bundi Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Bundi"
    },
    {
        id: 99,
        name: "Rani Ji Ki Baori",
        slug: "rani-ji-ki-baori",
        city: "Bundi",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Decorated Stepwell",
        description: "The largest and most beautiful stepwell in Bundi, built in 1699 by Rani Nathavati, featuring gorgeous stone pillars.",
        history: `
          <p><strong>Rani Ji Ki Baori</strong> stands as a testament to the rich architectural and cultural legacy of Bundi. Recognized as a premier decorated stepwell in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 12780,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Rani Ji Ki Baori Area, Bundi",
            city: "Bundi",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Rani%20Ji%20Ki%20Baori",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Bundi Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Bundi Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Bundi"
    },
    {
        id: 100,
        name: "Vijay Stambh Chittorgarh",
        slug: "vijay-stambh-chittorgarh",
        city: "Chittorgarh",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Victory Tower",
        description: "A historic 9-storey Victory Tower built by Maharana Kumbha in 1448 to commemorate victory over Malwa and Gujarat armies.",
        history: `
          <p><strong>Vijay Stambh Chittorgarh</strong> stands as a testament to the rich architectural and cultural legacy of Chittorgarh. Recognized as a premier victory tower in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 12900,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Vijay Stambh Chittorgarh Area, Chittorgarh",
            city: "Chittorgarh",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Vijay%20Stambh%20Chittorgarh",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Chittorgarh Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Chittorgarh Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Chittorgarh"
    },
    {
        id: 101,
        name: "Kirti Stambh Chittorgarh",
        slug: "kirti-stambh-chittorgarh",
        city: "Chittorgarh",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Tower of Fame",
        description: "A 22-meter high 12th-century tower dedicated to the first Jain Tirthankara Adinath, featuring beautiful Jain carvings.",
        history: `
          <p><strong>Kirti Stambh Chittorgarh</strong> stands as a testament to the rich architectural and cultural legacy of Chittorgarh. Recognized as a premier tower of fame in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 13020,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Kirti Stambh Chittorgarh Area, Chittorgarh",
            city: "Chittorgarh",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Kirti%20Stambh%20Chittorgarh",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Chittorgarh Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Chittorgarh Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Chittorgarh"
    },
    {
        id: 102,
        name: "Jawai Bandh",
        slug: "jawai-bandh",
        city: "Pali",
        state: "Rajasthan",
        category: "Nature",
        subcategory: "Dam & Leopard Sanctuary",
        description: "A scenic dam on Jawai river, famous for leopard safaris, migratory crocodiles, and rugged granite hills.",
        history: `
          <p><strong>Jawai Bandh</strong> stands as a testament to the rich architectural and cultural legacy of Pali. Recognized as a premier dam & leopard sanctuary in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 13140,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Jawai Bandh Area, Pali",
            city: "Pali",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Jawai%20Bandh",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Pali Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Nature",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Pali Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Pali"
    },
    {
        id: 103,
        name: "Bahubali Hills Udaipur",
        slug: "bahubali-hills-udaipur",
        city: "Udaipur",
        state: "Rajasthan",
        category: "Nature",
        subcategory: "Scenic Viewpoint",
        description: "A popular trekking viewpoint near Udaipur, offering 360-degree views of the scenic Badi Lake and surrounding Aravalli hills.",
        history: `
          <p><strong>Bahubali Hills Udaipur</strong> stands as a testament to the rich architectural and cultural legacy of Udaipur. Recognized as a premier scenic viewpoint in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 13260,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Bahubali Hills Udaipur Area, Udaipur",
            city: "Udaipur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Bahubali%20Hills%20Udaipur",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Udaipur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Nature",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Udaipur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Udaipur"
    },
    {
        id: 104,
        name: "Om Banna Temple",
        slug: "om-banna-temple",
        city: "Pali",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Bullet Baba Shrine",
        description: "A unique shrine on Pali highway dedicated to a 350cc Royal Enfield motorcycle and its owner Om Banna.",
        history: `
          <p><strong>Om Banna Temple</strong> stands as a testament to the rich architectural and cultural legacy of Pali. Recognized as a premier bullet baba shrine in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 13380,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Om Banna Temple Area, Pali",
            city: "Pali",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Om%20Banna%20Temple",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Pali Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Pali Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Pali"
    },
    {
        id: 105,
        name: "Longewala War Memorial",
        slug: "longewala-war-memorial",
        city: "Jaisalmer",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "War Memorial Museum",
        description: "A historical border site commemorating the famous 1971 battle of Longewala, featuring captured enemy tanks.",
        history: `
          <p><strong>Longewala War Memorial</strong> stands as a testament to the rich architectural and cultural legacy of Jaisalmer. Recognized as a premier war memorial museum in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 13500,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Longewala War Memorial Area, Jaisalmer",
            city: "Jaisalmer",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Longewala%20War%20Memorial",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaisalmer Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaisalmer Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaisalmer"
    },
    {
        id: 106,
        name: "Khaba Fort Jaisalmer",
        slug: "khaba-fort-jaisalmer",
        city: "Jaisalmer",
        state: "Rajasthan",
        category: "Fort",
        subcategory: "Desert Fort ruins",
        description: "An abandoned desert fort offering scenic views of empty Paliwal Brahmin village ruins and the vast Thar Desert.",
        history: `
          <p><strong>Khaba Fort Jaisalmer</strong> stands as a testament to the rich architectural and cultural legacy of Jaisalmer. Recognized as a premier desert fort ruins in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 13620,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Khaba Fort Jaisalmer Area, Jaisalmer",
            city: "Jaisalmer",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Khaba%20Fort%20Jaisalmer",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaisalmer Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Fort",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaisalmer Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaisalmer"
    },
    {
        id: 107,
        name: "Tal Chhapar Sanctuary",
        slug: "tal-chhapar-sanctuary",
        city: "Churu",
        state: "Rajasthan",
        category: "Wildlife",
        subcategory: "Blackbuck Sanctuary",
        description: "A unique grassland wildlife sanctuary in Churu district, famous for blackbucks and a variety of migratory raptors.",
        history: `
          <p><strong>Tal Chhapar Sanctuary</strong> stands as a testament to the rich architectural and cultural legacy of Churu. Recognized as a premier blackbuck sanctuary in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 13740,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Tal Chhapar Sanctuary Area, Churu",
            city: "Churu",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Tal%20Chhapar%20Sanctuary",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Churu Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Wildlife",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Churu Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Churu"
    },
    {
        id: 108,
        name: "National Chambal Sanctuary",
        slug: "national-chambal-sanctuary",
        city: "Kota",
        state: "Rajasthan",
        category: "Wildlife",
        subcategory: "River Sanctuary",
        description: "A riverine sanctuary established along the Chambal river, home to gharials, red-crowned turtles, and dolphins.",
        history: `
          <p><strong>National Chambal Sanctuary</strong> stands as a testament to the rich architectural and cultural legacy of Kota. Recognized as a premier river sanctuary in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 13860,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "National Chambal Sanctuary Area, Kota",
            city: "Kota",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/National%20Chambal%20Sanctuary",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Kota Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Wildlife",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Kota Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Kota"
    },
    {
        id: 109,
        name: "Ramdevra Temple Jaisalmer",
        slug: "ramdevra-temple-jaisalmer",
        city: "Jaisalmer",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Baba Ramdev Shrine",
        description: "A highly popular shrine of folk deity Baba Ramdev, visited by millions during the annual Ramdevra Fair.",
        history: `
          <p><strong>Ramdevra Temple Jaisalmer</strong> stands as a testament to the rich architectural and cultural legacy of Jaisalmer. Recognized as a premier baba ramdev shrine in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 13980,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Ramdevra Temple Jaisalmer Area, Jaisalmer",
            city: "Jaisalmer",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Ramdevra%20Temple%20Jaisalmer",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaisalmer Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaisalmer Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaisalmer"
    },
    {
        id: 110,
        name: "Mangarh Dham Banswara",
        slug: "mangarh-dham-banswara",
        city: "Banswara",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Tribal Martyrs Memorial",
        description: "A historical hilltop memorial dedicated to the tribal freedom fighters who were massacred here in 1913.",
        history: `
          <p><strong>Mangarh Dham Banswara</strong> stands as a testament to the rich architectural and cultural legacy of Banswara. Recognized as a premier tribal martyrs memorial in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 14100,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Mangarh Dham Banswara Area, Banswara",
            city: "Banswara",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Mangarh%20Dham%20Banswara",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Banswara Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Banswara Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Banswara"
    },
    {
        id: 111,
        name: "Sariska Palace Alwar",
        slug: "sariska-palace-alwar",
        city: "Alwar",
        state: "Rajasthan",
        category: "Palace",
        subcategory: "Royal Hunting Lodge",
        description: "Built by Maharaja Jai Singh of Alwar in 1892 as a royal hunting lodge, now converted into a heritage resort.",
        history: `
          <p><strong>Sariska Palace Alwar</strong> stands as a testament to the rich architectural and cultural legacy of Alwar. Recognized as a premier royal hunting lodge in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 14220,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Sariska Palace Alwar Area, Alwar",
            city: "Alwar",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Sariska%20Palace%20Alwar",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Alwar Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Palace",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Alwar Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Alwar"
    },
    {
        id: 112,
        name: "Mandore Gardens",
        slug: "mandore-gardens",
        city: "Jodhpur",
        state: "Rajasthan",
        category: "Nature",
        subcategory: "Historic Garden & Cenotaphs",
        description: "The ancient capital of Marwar, featuring grand red sandstone cenotaphs, lush green gardens, and the Hall of Heroes.",
        history: `
          <p><strong>Mandore Gardens</strong> stands as a testament to the rich architectural and cultural legacy of Jodhpur. Recognized as a premier historic garden & cenotaphs in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 14340,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Mandore Gardens Area, Jodhpur",
            city: "Jodhpur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Mandore%20Gardens",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jodhpur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Nature",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jodhpur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jodhpur"
    },
    {
        id: 113,
        name: "Rao Jodha Desert Rock Park",
        slug: "rao-jodha-desert-rock-park",
        city: "Jodhpur",
        state: "Rajasthan",
        category: "Nature",
        subcategory: "Desert Ecological Park",
        description: "A beautifully restored volcanic rock park at the foot of Mehrangarh Fort, showcasing native Thar Desert ecology.",
        history: `
          <p><strong>Rao Jodha Desert Rock Park</strong> stands as a testament to the rich architectural and cultural legacy of Jodhpur. Recognized as a premier desert ecological park in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 14460,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Rao Jodha Desert Rock Park Area, Jodhpur",
            city: "Jodhpur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Rao%20Jodha%20Desert%20Rock%20Park",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jodhpur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Nature",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jodhpur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jodhpur"
    },
    {
        id: 114,
        name: "Balsamand Palace",
        slug: "balsamand-palace",
        city: "Jodhpur",
        state: "Rajasthan",
        category: "Palace",
        subcategory: "Heritage Palace Resort",
        description: "A historic red sandstone palace overlooking Balsamand Lake, famous for Rajput architecture and sprawling orchards.",
        history: `
          <p><strong>Balsamand Palace</strong> stands as a testament to the rich architectural and cultural legacy of Jodhpur. Recognized as a premier heritage palace resort in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 14580,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Balsamand Palace Area, Jodhpur",
            city: "Jodhpur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Balsamand%20Palace",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jodhpur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Palace",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jodhpur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jodhpur"
    },
    {
        id: 115,
        name: "Juna Mahal",
        slug: "juna-mahal",
        city: "Dungarpur",
        state: "Rajasthan",
        category: "Palace",
        subcategory: "Historic Fort Palace",
        description: "A 13th-century fort palace in Dungarpur, renowned for its elaborate frescos, murals, and intricate glasswork inside.",
        history: `
          <p><strong>Juna Mahal</strong> stands as a testament to the rich architectural and cultural legacy of Dungarpur. Recognized as a premier historic fort palace in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 14700,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Juna Mahal Area, Dungarpur",
            city: "Dungarpur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Juna%20Mahal",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Dungarpur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Palace",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Dungarpur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Dungarpur"
    },
    {
        id: 116,
        name: "Udai Bilas Palace",
        slug: "udai-bilas-palace",
        city: "Dungarpur",
        state: "Rajasthan",
        category: "Palace",
        subcategory: "Lakefront Palace",
        description: "A stunning lakefront palace showcasing classic Rajput architecture, detailed stone carvings, and blue grey marble construction.",
        history: `
          <p><strong>Udai Bilas Palace</strong> stands as a testament to the rich architectural and cultural legacy of Dungarpur. Recognized as a premier lakefront palace in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 14820,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Udai Bilas Palace Area, Dungarpur",
            city: "Dungarpur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Udai%20Bilas%20Palace",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Dungarpur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Palace",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Dungarpur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Dungarpur"
    },
    {
        id: 117,
        name: "Tripura Sundari Temple",
        slug: "tripura-sundari-temple",
        city: "Banswara",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Shakti Peeth Temple",
        description: "A highly sacred temple dedicated to Goddess Tripura Sundari, featuring a black stone idol worshiped by millions.",
        history: `
          <p><strong>Tripura Sundari Temple</strong> stands as a testament to the rich architectural and cultural legacy of Banswara. Recognized as a premier shakti peeth temple in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 14940,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Tripura Sundari Temple Area, Banswara",
            city: "Banswara",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Tripura%20Sundari%20Temple",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Banswara Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Banswara Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Banswara"
    },
    {
        id: 118,
        name: "Arthuna Temples",
        slug: "arthuna-temples",
        city: "Banswara",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Temple Ruins Complex",
        description: "A historic cluster of ruined Hindu and Jain temples dating back to the 11th century, displaying exquisite stone carvings.",
        history: `
          <p><strong>Arthuna Temples</strong> stands as a testament to the rich architectural and cultural legacy of Banswara. Recognized as a premier temple ruins complex in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 15060,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Arthuna Temples Area, Banswara",
            city: "Banswara",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Arthuna%20Temples",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Banswara Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Banswara Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Banswara"
    },
    {
        id: 119,
        name: "Amar Sagar Lake",
        slug: "amar-sagar-lake",
        city: "Jaisalmer",
        state: "Rajasthan",
        category: "Lake",
        subcategory: "Oasis Lake & Palace",
        description: "A scenic lake oasis near Jaisalmer, featuring a beautifully carved palace, cenotaphs, and an ancient Jain temple.",
        history: `
          <p><strong>Amar Sagar Lake</strong> stands as a testament to the rich architectural and cultural legacy of Jaisalmer. Recognized as a premier oasis lake & palace in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 15180,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Amar Sagar Lake Area, Jaisalmer",
            city: "Jaisalmer",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Amar%20Sagar%20Lake",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaisalmer Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Lake",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaisalmer Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaisalmer"
    },
    {
        id: 120,
        name: "Gajner Wildlife Sanctuary",
        slug: "gajner-wildlife-sanctuary",
        city: "Bikaner",
        state: "Rajasthan",
        category: "Wildlife",
        subcategory: "Wildlife Sanctuary",
        description: "A lakefront reserve near Bikaner, home to imperial sand grouse, blackbucks, nilgai, and wild boars.",
        history: `
          <p><strong>Gajner Wildlife Sanctuary</strong> stands as a testament to the rich architectural and cultural legacy of Bikaner. Recognized as a premier wildlife sanctuary in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 15300,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Gajner Wildlife Sanctuary Area, Bikaner",
            city: "Bikaner",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Gajner%20Wildlife%20Sanctuary",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Bikaner Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Wildlife",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Bikaner Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Bikaner"
    },
    {
        id: 121,
        name: "Kolayat Lake",
        slug: "kolayat-lake",
        city: "Bikaner",
        state: "Rajasthan",
        category: "Lake",
        subcategory: "Holy Pilgrimage Lake",
        description: "A sacred lake in Bikaner, where Kapil Muni performed penance, famous for its historic bathing ghats and temple.",
        history: `
          <p><strong>Kolayat Lake</strong> stands as a testament to the rich architectural and cultural legacy of Bikaner. Recognized as a premier holy pilgrimage lake in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 15420,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Kolayat Lake Area, Bikaner",
            city: "Bikaner",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Kolayat%20Lake",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Bikaner Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Lake",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Bikaner Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Bikaner"
    },
    {
        id: 122,
        name: "Jeen Mata Temple",
        slug: "jeen-mata-temple",
        city: "Sikar",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Folk Goddess Temple",
        description: "An ancient temple dedicated to Jeen Mata, situated amidst scenic hills, highly revered in Rajasthani folklore.",
        history: `
          <p><strong>Jeen Mata Temple</strong> stands as a testament to the rich architectural and cultural legacy of Sikar. Recognized as a premier folk goddess temple in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 15540,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Jeen Mata Temple Area, Sikar",
            city: "Sikar",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Jeen%20Mata%20Temple",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Sikar Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Sikar Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Sikar"
    },
    {
        id: 123,
        name: "Harshnath Temple Sikar",
        slug: "harshnath-temple-sikar",
        city: "Sikar",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Ancient Hill Temple Ruins",
        description: "A historic 10th-century Shiva temple ruin situated atop Harsh Giri hill, showcasing beautiful stone sculptures.",
        history: `
          <p><strong>Harshnath Temple Sikar</strong> stands as a testament to the rich architectural and cultural legacy of Sikar. Recognized as a premier ancient hill temple ruins in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 15660,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Harshnath Temple Sikar Area, Sikar",
            city: "Sikar",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Harshnath%20Temple%20Sikar",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Sikar Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Sikar Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Sikar"
    },
    {
        id: 124,
        name: "Devyani Kund",
        slug: "devyani-kund",
        city: "Sambhar",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Sacred Bathing Pool",
        description: "A holy water tank near Sambhar Lake, known as the 'mother of all pilgrimages' (Tirtho ki Nani) with ancient shrines.",
        history: `
          <p><strong>Devyani Kund</strong> stands as a testament to the rich architectural and cultural legacy of Sambhar. Recognized as a premier sacred bathing pool in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 15780,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Devyani Kund Area, Sambhar",
            city: "Sambhar",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Devyani%20Kund",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Sambhar Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Sambhar Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Sambhar"
    },
    {
        id: 125,
        name: "Chandlai Lake",
        slug: "chandlai-lake",
        city: "Jaipur",
        state: "Rajasthan",
        category: "Nature",
        subcategory: "Bird Watching Lake",
        description: "A peaceful lake on the outskirts of Jaipur, highly popular for watching migratory birds and flamingos.",
        history: `
          <p><strong>Chandlai Lake</strong> stands as a testament to the rich architectural and cultural legacy of Jaipur. Recognized as a premier bird watching lake in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 15900,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Chandlai Lake Area, Jaipur",
            city: "Jaipur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Chandlai%20Lake",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaipur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Nature",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaipur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaipur"
    },
    {
        id: 126,
        name: "Galta Ji Temple",
        slug: "galta-ji-temple",
        city: "Jaipur",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Monkey Temple & Springs",
        description: "A historic Hindu pilgrimage site featuring natural mountain springs, sacred pools, and thousands of resident monkeys.",
        history: `
          <p><strong>Galta Ji Temple</strong> stands as a testament to the rich architectural and cultural legacy of Jaipur. Recognized as a premier monkey temple & springs in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 16020,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Galta Ji Temple Area, Jaipur",
            city: "Jaipur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Galta%20Ji%20Temple",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaipur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaipur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaipur"
    },
    {
        id: 127,
        name: "Gatore Ki Chhatriyan",
        slug: "gatore-ki-chhatriyan",
        city: "Jaipur",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Royal Royal Cenotaphs",
        description: "The royal crematorium complex of Jaipur's Kachwaha kings, featuring beautifully carved marble and sandstone cenotaphs.",
        history: `
          <p><strong>Gatore Ki Chhatriyan</strong> stands as a testament to the rich architectural and cultural legacy of Jaipur. Recognized as a premier royal royal cenotaphs in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 16140,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Gatore Ki Chhatriyan Area, Jaipur",
            city: "Jaipur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Gatore%20Ki%20Chhatriyan",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaipur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaipur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaipur"
    },
    {
        id: 128,
        name: "Kanak Vrindavan Garden",
        slug: "kanak-vrindavan-garden",
        city: "Jaipur",
        state: "Rajasthan",
        category: "Nature",
        subcategory: "Royal Valley Garden",
        description: "A beautiful garden at the foothills of Nahargarh, resembling the mythological Vrindavan where Lord Krishna played.",
        history: `
          <p><strong>Kanak Vrindavan Garden</strong> stands as a testament to the rich architectural and cultural legacy of Jaipur. Recognized as a premier royal valley garden in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 16260,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Kanak Vrindavan Garden Area, Jaipur",
            city: "Jaipur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Kanak%20Vrindavan%20Garden",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaipur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Nature",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaipur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaipur"
    },
    {
        id: 129,
        name: "Nahargarh Biological Park",
        slug: "nahargarh-biological-park",
        city: "Jaipur",
        state: "Rajasthan",
        category: "Wildlife",
        subcategory: "Biological Park & Safari",
        description: "A large biological park near Jaipur hosting tigers, lions, leopards, bears, and exotic birds in spacious enclosures.",
        history: `
          <p><strong>Nahargarh Biological Park</strong> stands as a testament to the rich architectural and cultural legacy of Jaipur. Recognized as a premier biological park & safari in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 16380,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Nahargarh Biological Park Area, Jaipur",
            city: "Jaipur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Nahargarh%20Biological%20Park",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaipur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Wildlife",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaipur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaipur"
    },
    {
        id: 130,
        name: "Patrika Gate",
        slug: "patrika-gate",
        city: "Jaipur",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Artistic Monument Gate",
        description: "A highly colorful and artistic entrance gate at Jawahar Circle, showcasing hand-painted murals of Rajasthan's history.",
        history: `
          <p><strong>Patrika Gate</strong> stands as a testament to the rich architectural and cultural legacy of Jaipur. Recognized as a premier artistic monument gate in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 16500,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Patrika Gate Area, Jaipur",
            city: "Jaipur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Patrika%20Gate",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaipur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaipur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaipur"
    },
    {
        id: 131,
        name: "Khole Ke Hanuman Ji",
        slug: "khole-ke-hanuman-ji",
        city: "Jaipur",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Hilltop Temple",
        description: "A popular hilltop temple dedicated to Lord Hanuman, offering panoramic views of the surrounding hills.",
        history: `
          <p><strong>Khole Ke Hanuman Ji</strong> stands as a testament to the rich architectural and cultural legacy of Jaipur. Recognized as a premier hilltop temple in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 16620,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Khole Ke Hanuman Ji Area, Jaipur",
            city: "Jaipur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Khole%20Ke%20Hanuman%20Ji",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaipur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaipur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaipur"
    },
    {
        id: 132,
        name: "Moti Dungri Ganesh Temple",
        slug: "moti-dungri-ganesh-temple",
        city: "Jaipur",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Ganesha Temple",
        description: "One of Jaipur's most famous temples situated next to Moti Dungri Fort, dedicated to Lord Ganesha.",
        history: `
          <p><strong>Moti Dungri Ganesh Temple</strong> stands as a testament to the rich architectural and cultural legacy of Jaipur. Recognized as a premier ganesha temple in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 16740,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Moti Dungri Ganesh Temple Area, Jaipur",
            city: "Jaipur",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Moti%20Dungri%20Ganesh%20Temple",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jaipur Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jaipur Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jaipur"
    },
    {
        id: 133,
        name: "Charbhuja Temple Rajsamand",
        slug: "charbhuja-temple-rajsamand",
        city: "Rajsamand",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Ancient Vishnu Temple",
        description: "An ancient temple dedicated to Lord Vishnu, built in 1444 AD, highly popular pilgrimage in Mewar region.",
        history: `
          <p><strong>Charbhuja Temple Rajsamand</strong> stands as a testament to the rich architectural and cultural legacy of Rajsamand. Recognized as a premier ancient vishnu temple in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 16860,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Charbhuja Temple Rajsamand Area, Rajsamand",
            city: "Rajsamand",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Charbhuja%20Temple%20Rajsamand",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Rajsamand Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Rajsamand Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Rajsamand"
    },
    {
        id: 134,
        name: "Parshuram Mahadev Cave Temple",
        slug: "parshuram-mahadev-cave-temple",
        city: "Pali",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Cave Temple",
        description: "A sacred Lord Shiva cave temple situated in the Aravalli hills, reached by walking down 500 steep stairs.",
        history: `
          <p><strong>Parshuram Mahadev Cave Temple</strong> stands as a testament to the rich architectural and cultural legacy of Pali. Recognized as a premier cave temple in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 16980,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Parshuram Mahadev Cave Temple Area, Pali",
            city: "Pali",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Parshuram%20Mahadev%20Cave%20Temple",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Pali Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Pali Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Pali"
    },
    {
        id: 135,
        name: "Timangarh Fort",
        slug: "timangarh-fort",
        city: "Karauli",
        state: "Rajasthan",
        category: "Fort",
        subcategory: "Ancient Fort ruins",
        description: "An ancient 11th-century fort in Karauli, famous for exquisite stone carvings and archaeological ruins.",
        history: `
          <p><strong>Timangarh Fort</strong> stands as a testament to the rich architectural and cultural legacy of Karauli. Recognized as a premier ancient fort ruins in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 17100,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Timangarh Fort Area, Karauli",
            city: "Karauli",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Timangarh%20Fort",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Karauli Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Fort",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Karauli Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Karauli"
    },
    {
        id: 136,
        name: "Bundi Palace Complex",
        slug: "bundi-palace-complex",
        city: "Bundi",
        state: "Rajasthan",
        category: "Palace",
        subcategory: "Heritage Palace",
        description: "Famous for its spectacular murals, the Chitrashala art gallery, and traditional Rajput palace chambers.",
        history: `
          <p><strong>Bundi Palace Complex</strong> stands as a testament to the rich architectural and cultural legacy of Bundi. Recognized as a premier heritage palace in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 17220,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Bundi Palace Complex Area, Bundi",
            city: "Bundi",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Bundi%20Palace%20Complex",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Bundi Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Palace",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Bundi Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Bundi"
    },
    {
        id: 137,
        name: "84 Pillared Cenotaph",
        slug: "84-pillared-cenotaph",
        city: "Bundi",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Cenotaph monument",
        description: "A magnificent 17th-century double-story royal cenotaph supported by 84 intricately carved stone pillars.",
        history: `
          <p><strong>84 Pillared Cenotaph</strong> stands as a testament to the rich architectural and cultural legacy of Bundi. Recognized as a premier cenotaph monument in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 17340,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "84 Pillared Cenotaph Area, Bundi",
            city: "Bundi",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/84%20Pillared%20Cenotaph",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Bundi Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Bundi Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Bundi"
    },
    {
        id: 138,
        name: "Bijolia Temples",
        slug: "bijolia-temples",
        city: "Bijolia",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Ancient Temple Complex",
        description: "A group of ancient 12th-century Shiva temples featuring fine stone craftsmanship in Bhilwara district.",
        history: `
          <p><strong>Bijolia Temples</strong> stands as a testament to the rich architectural and cultural legacy of Bijolia. Recognized as a premier ancient temple complex in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 17460,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Bijolia Temples Area, Bijolia",
            city: "Bijolia",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Bijolia%20Temples",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Bijolia Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Bijolia Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Bijolia"
    },
    {
        id: 139,
        name: "Badnor Fort",
        slug: "badnor-fort",
        city: "Bhilwara",
        state: "Rajasthan",
        category: "Fort",
        subcategory: "Hilltop Fort ruins",
        description: "A grand 16th-century fortress situated on a hill, presenting classical military architecture of Mewar.",
        history: `
          <p><strong>Badnor Fort</strong> stands as a testament to the rich architectural and cultural legacy of Bhilwara. Recognized as a premier hilltop fort ruins in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 17580,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Badnor Fort Area, Bhilwara",
            city: "Bhilwara",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Badnor%20Fort",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Bhilwara Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Fort",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Bhilwara Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Bhilwara"
    },
    {
        id: 140,
        name: "Seven Wonders Park Kota",
        slug: "seven-wonders-park-kota",
        city: "Kota",
        state: "Rajasthan",
        category: "Nature",
        subcategory: "Theme Park & Lake",
        description: "A popular theme park on Kishore Sagar lake featuring replicas of the Seven Wonders of the World.",
        history: `
          <p><strong>Seven Wonders Park Kota</strong> stands as a testament to the rich architectural and cultural legacy of Kota. Recognized as a premier theme park & lake in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 17700,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Seven Wonders Park Kota Area, Kota",
            city: "Kota",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Seven%20Wonders%20Park%20Kota",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Kota Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Nature",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Kota Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Kota"
    },
    {
        id: 141,
        name: "Mukundra Hills National Park",
        slug: "mukundra-hills-national-park",
        city: "Kota",
        state: "Rajasthan",
        category: "Wildlife",
        subcategory: "Tiger Reserve",
        description: "A sprawling national park and tiger reserve nestled along the Chambal river valley.",
        history: `
          <p><strong>Mukundra Hills National Park</strong> stands as a testament to the rich architectural and cultural legacy of Kota. Recognized as a premier tiger reserve in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 17820,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Mukundra Hills National Park Area, Kota",
            city: "Kota",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Mukundra%20Hills%20National%20Park",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Kota Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Wildlife",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Kota Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Kota"
    },
    {
        id: 142,
        name: "Bhainsrorgarh Fort",
        slug: "bhainsrorgarh-fort",
        city: "Chittorgarh",
        state: "Rajasthan",
        category: "Fort",
        subcategory: "Heritage Fort Resort",
        description: "A spectacular fort built on a cliff overlooking the Chambal River, often called the 'Vellore of Rajasthan'.",
        history: `
          <p><strong>Bhainsrorgarh Fort</strong> stands as a testament to the rich architectural and cultural legacy of Chittorgarh. Recognized as a premier heritage fort resort in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 17940,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Bhainsrorgarh Fort Area, Chittorgarh",
            city: "Chittorgarh",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Bhainsrorgarh%20Fort",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Chittorgarh Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Fort",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Chittorgarh Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Chittorgarh"
    },
    {
        id: 143,
        name: "Gagron Fort",
        slug: "gagron-fort",
        city: "Jhalawar",
        state: "Rajasthan",
        category: "Fort",
        subcategory: "Water Fort (UNESCO)",
        description: "A unique UNESCO World Heritage hill and water fort, surrounded by the waters of Ahu and Kali Sindh rivers.",
        history: `
          <p><strong>Gagron Fort</strong> stands as a testament to the rich architectural and cultural legacy of Jhalawar. Recognized as a premier water fort (unesco) in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 18060,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Gagron Fort Area, Jhalawar",
            city: "Jhalawar",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Gagron%20Fort",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jhalawar Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Fort",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jhalawar Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jhalawar"
    },
    {
        id: 144,
        name: "Kolvi Caves",
        slug: "kolvi-caves",
        city: "Jhalawar",
        state: "Rajasthan",
        category: "Heritage",
        subcategory: "Buddhist Rock-Cut Caves",
        description: "An ancient site containing 50-plus rock-cut Buddhist caves, stupas, and meditation cells from the 5th century.",
        history: `
          <p><strong>Kolvi Caves</strong> stands as a testament to the rich architectural and cultural legacy of Jhalawar. Recognized as a premier buddhist rock-cut caves in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 18180,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Kolvi Caves Area, Jhalawar",
            city: "Jhalawar",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Kolvi%20Caves",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Jhalawar Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Heritage",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Jhalawar Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Jhalawar"
    },
    {
        id: 145,
        name: "Sitabari",
        slug: "sitabari",
        city: "Baran",
        state: "Rajasthan",
        category: "Spiritual",
        subcategory: "Holy Oasis & Springs",
        description: "A sacred pilgrimage site linked to Goddess Sita, featuring hot water springs and hosting the Sahariya tribal fair.",
        history: `
          <p><strong>Sitabari</strong> stands as a testament to the rich architectural and cultural legacy of Baran. Recognized as a premier holy oasis & springs in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 18300,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Sitabari Area, Baran",
            city: "Baran",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Sitabari",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Baran Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Spiritual",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Baran Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Baran"
    },
    {
        id: 146,
        name: "Ramgarh Crater",
        slug: "ramgarh-crater",
        city: "Baran",
        state: "Rajasthan",
        category: "Nature",
        subcategory: "Meteorite Impact Crater",
        description: "A unique ring-shaped structure created by a meteorite impact millions of years ago, containing ancient temples.",
        history: `
          <p><strong>Ramgarh Crater</strong> stands as a testament to the rich architectural and cultural legacy of Baran. Recognized as a premier meteorite impact crater in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 18420,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Ramgarh Crater Area, Baran",
            city: "Baran",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Ramgarh%20Crater",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Baran Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Nature",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Baran Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Baran"
    },
    {
        id: 147,
        name: "Guru Shikhar Peak",
        slug: "guru-shikhar-peak",
        city: "Mount Abu",
        state: "Rajasthan",
        category: "Nature",
        subcategory: "Highest Peak in Rajasthan",
        description: "The highest peak in Rajasthan (1,722 meters), offering stunning panoramic views of the Aravalli hills and a temple.",
        history: `
          <p><strong>Guru Shikhar Peak</strong> stands as a testament to the rich architectural and cultural legacy of Mount Abu. Recognized as a premier highest peak in rajasthan in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 18540,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Guru Shikhar Peak Area, Mount Abu",
            city: "Mount Abu",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Guru%20Shikhar%20Peak",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Mount Abu Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Nature",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Mount Abu Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Mount Abu"
    },
    {
        id: 148,
        name: "Achalgarh Fort",
        slug: "achalgarh-fort",
        city: "Mount Abu",
        state: "Rajasthan",
        category: "Fort",
        subcategory: "Hilltop Fort ruins",
        description: "A historic fort built by Paramara rulers and later rebuilt by Rana Kumbha, housing ancient temples and scenic views.",
        history: `
          <p><strong>Achalgarh Fort</strong> stands as a testament to the rich architectural and cultural legacy of Mount Abu. Recognized as a premier hilltop fort ruins in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 18660,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Achalgarh Fort Area, Mount Abu",
            city: "Mount Abu",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Achalgarh%20Fort",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Mount Abu Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Fort",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Mount Abu Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Mount Abu"
    },
    {
        id: 149,
        name: "Trevor's Tank",
        slug: "trevor-s-tank",
        city: "Mount Abu",
        state: "Rajasthan",
        category: "Wildlife",
        subcategory: "Crocodile breeding park",
        description: "A peaceful man-made wildlife reserve in Mount Abu, famous for crocodile watching, birding, and lush green paths.",
        history: `
          <p><strong>Trevor's Tank</strong> stands as a testament to the rich architectural and cultural legacy of Mount Abu. Recognized as a premier crocodile breeding park in Rajasthan, it draws thousands of history enthusiasts and tourists annually.</p>
    `,
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_of_Hawa_Mahal_Jaipur_2011.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/1/1d/Amer_Fort_Jaipur.jpg"
        ],
        rating: 4.5,
        reviews: 18780,
        timing: {
            open: "9:00 AM",
            close: "5:30 PM",
            closedOn: "Open all days",
            note: "Best visited during daylight hours."
        },
        ticket: {
            isFree: false,
            indian: 50,
            foreigner: 200,
            childIndian: 0,
            childForeigner: 0,
            camera: 0,
            note: "Standard entry charges apply."
        },
        location: {
            address: "Trevor's Tank Area, Mount Abu",
            city: "Mount Abu",
            pincode: "302001",
            latitude: 26.922,
            longitude: 75.806,
            googleMapUrl: "https://www.google.com/maps/place/Trevor's%20Tank",
            nearestAirport: "Jaipur International Airport",
            nearestRailway: "Mount Abu Station",
            distanceFromCity: "Within region limits"
        },
        bestTimeToVisit: {
            months: "October - March",
            season: "Winter",
            weather: "Pleasant",
            tip: "Hire a local guide to learn more about the historical significance."
        },
        visitDuration: {
            minimum: "1 Hour",
            recommended: "1.5 Hours",
            extended: "2 Hours"
        },
        highlights: [
            "Historical Architecture",
            "Scenic Views",
            "Cultural Importance"
        ],
        tags: [
            "Wildlife",
            "Heritage",
            "History"
        ],
        facilities: [
            "Parking",
            "Restrooms"
        ],
        nearbyPlaces: [
            "Mount Abu Center"
        ],
        dos: [
            "Wear comfortable shoes",
            "Carry water"
        ],
        donts: [
            "Don't litter",
            "Don't write on walls"
        ],
        isOpen: true,
        isFeatured: false,
        isPopular: true,
        isUNESCO: false,
        yearBuilt: "Historical",
        builtBy: "Royal Rulers of Rajasthan",
        architecture: "Traditional Rajasthani Architecture",
        significance: "Important landmark in Mount Abu"
    }
];
