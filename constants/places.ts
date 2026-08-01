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
    }
            ]
