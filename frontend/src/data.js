export const packages = [
  {
    id: 1,
    name: "Complimentary Bliss",
    price: "FREE",
    sub: "With qualifying room block",
    color: "from-slate-50 to-slate-100",
    border: "#94a3b8",
    accent: "#64748b",
    badge: null,
    features: [
      "Ceremony décor & setup",
      "Wedding cake for two",
      "Bridal bouquet & boutonnière",
      "Romantic honeymoon suite touches",
      "Marriage document preparation",
      "Dedicated onsite coordinator",
    ],
    note: "Available when you reserve 15+ rooms for a 7-night stay",
  },
  {
    id: 2,
    name: "All-Inclusive Paradise",
    price: "$5,999",
    sub: "Most popular choice",
    color: "from-amber-50 to-yellow-50",
    border: "#d97706",
    accent: "#b45309",
    badge: "✨ Best Value",
    features: [
      "Up to 150 guests",
      "Luxury ceremony & reception décor",
      "2 Professional photographers",
      "5-course gourmet dinner",
      "Open bar throughout reception",
      "Live band or DJ",
      "Floral arrangements",
      "Video cinematography",
      "Anniversary stay credit",
    ],
    note: "Includes all meals, drinks & activities at resort",
  },
  {
    id: 3,
    name: "Diamond Eternity",
    price: "$12,999",
    sub: "Ultimate luxury experience",
    color: "from-rose-50 to-pink-50",
    border: "#e11d48",
    accent: "#be123c",
    badge: "👑 Premium",
    features: [
      "Unlimited guests",
      "Bespoke décor & custom florals",
      "Full photography + video team",
      "Michelin-inspired private dinner",
      "Private villa BBQ (valued at $13,860)",
      "Orchestra & entertainment",
      "Free anniversary stay (up to $5,000)",
      "Dedicated Specialist team",
    ],
    note: "Our most exclusive, fully-customized experience",
  },
];

export const destinations = [
  { id:1, name:"Riviera Maya, Mexico", img:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80", tag:"🏛 Mayan Ruins", tagline:"A pristine stretch of Caribbean coastline, home to preserved ancient Mayan ruins and world-class all-inclusive resorts.", climate:"Warm year-round · 80–90°F", bestFor:"Beach, Culture, All-inclusive", startingPrice:"From $500", lgbtFriendly:true, highlights:["White-sand beaches","Snorkeling & cenotes","Mayan ruins excursions","Top all-inclusive resorts"] },
  { id:2, name:"Punta Cana, Dominican Republic", img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", tag:"🌊 Caribbean Hotspot", tagline:"A popular Caribbean hotspot with scenic beaches and beautiful backdrops. One of the best prices for destination wedding packages.", climate:"Tropical · 85°F average", bestFor:"Beach, Romance, Budget-friendly", startingPrice:"From $0*", lgbtFriendly:true, highlights:["23 miles of white sand","Luxury all-inclusives","Affordable packages","Vibrant nightlife"] },
  { id:3, name:"Cancun, Mexico", img:"https://images.unsplash.com/photo-1514481538271-cf9f99627524?w=800&q=80", tag:"🌴 White Sand & Fun", tagline:"A customer favorite with white-sand beaches, fun nightlife, and excellent shopping. Great for couples who want it all.", climate:"Sunny · 82°F average", bestFor:"Party, Beach, Shopping", startingPrice:"From $800", lgbtFriendly:true, highlights:["Hotel Zone venues","Great shopping","Catholic chapels available","Golf nearby"] },
  { id:4, name:"Aruba, Caribbean", img:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80", tag:"☀️ One Happy Island", tagline:"One Happy Island with endless sunshine and boundless hospitality. No hurricane season — perfect year-round.", climate:"Dry & sunny · Low hurricanes", bestFor:"Sun, Wind, Watersports", startingPrice:"From $2,000", lgbtFriendly:true, highlights:["No hurricane season","Turquoise waters","Windsurfing paradise","Unique desert landscapes"] },
  { id:5, name:"Jamaica", img:"https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=800&q=80", tag:"🎵 Reggae & Romance", tagline:"Get a lot of bang for your buck with Jamaica's all-inclusive wedding packages. Lush rainforest meets gorgeous beaches.", climate:"Tropical · 85°F year-round", bestFor:"Culture, Beach, Value", startingPrice:"From $3,000", lgbtFriendly:false, highlights:["Lush rainforest","Dunn's River Falls","All-inclusive value","Vibrant local culture"] },
  { id:6, name:"Santorini, Greece", img:"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80", tag:"🏛 Cliffside Romance", tagline:"Picturesque villages, stunning caldera views — the most photographed wedding destination in the world.", climate:"Mediterranean · Dry summers", bestFor:"Luxury, Views, Photography", startingPrice:"From $8,000", lgbtFriendly:true, highlights:["Iconic blue domes","Sunset caldera views","Luxury boutique venues","Wine tasting"] },
];

export const resortShowcase = [
  { name:"Royalton Riviera Cancun", location:"Mexico", img:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&q=80", offer:"Up to $4,000 off wedding package", rating:4.9, badge:"Exclusive Deal" },
  { name:"Dreams Macao Beach Punta Cana", location:"Dominican Republic", img:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700&q=80", offer:"Free Sky Wedding Package in Paradise", rating:4.8, badge:"Free Package" },
  { name:"Majestic Resorts", location:"Punta Cana & Costa Mujeres", img:"https://images.unsplash.com/photo-1551882547-ff40c4a49f72?w=700&q=80", offer:"Free anniversary stay up to $5,000", rating:4.7, badge:"Anniversary Gift" },
];

export const vendors = [
  { id:1, icon:"📸", name:"Lumière Photography", category:"Photography", rating:4.9, price:"From $800", tags:["Fine Art","Editorial"], img:"https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&q=80" },
  { id:2, icon:"🌸", name:"Bloom & Co.", category:"Floral Décor", rating:4.8, price:"From $400", tags:["Romantic","Botanical"], img:"https://images.unsplash.com/photo-1487530811015-780780aae6e3?w=400&q=80" },
  { id:3, icon:"🍽️", name:"Saveur Kitchen", category:"Catering", rating:4.7, price:"From $55/head", tags:["Gourmet","Vegan-friendly"], img:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80" },
  { id:4, icon:"🎵", name:"Symphony Strings", category:"Entertainment", rating:5.0, price:"From $1,200", tags:["Live Music","Jazz"], img:"https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&q=80" },
  { id:5, icon:"🎂", name:"Sweet Endings", category:"Cake & Desserts", rating:4.9, price:"From $300", tags:["Custom Cakes","Artisan"], img:"https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&q=80" },
  { id:6, icon:"🚗", name:"Elite Rides", category:"Transportation", rating:4.8, price:"From $200", tags:["Luxury Cars","Vintage"], img:"https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80" },
];

export const testimonials = [
  { quote:"Our Specialist was always very responsive and available for any and all questions. With her help and guidance, we found the most amazing location for our destination wedding.", couple:"Emma & James", location:"Riviera Maya, Mexico", img:"https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=200&q=80", stars:5 },
  { quote:"Everything from booking our travel to planning out every detail of the wedding was so easy. Our wedding was perfect and all of our guests had an absolute blast!", couple:"Sofia & Luca", location:"Punta Cana, Dominican Republic", img:"https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=200&q=80", stars:5 },
  { quote:"Using Destination Weddings was the best decision and experience. Having a Specialist to help field all the questions and logistics was a huge help.", couple:"Priya & Arjun", location:"Cancun, Mexico", img:"https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=200&q=80", stars:5 },
];

export const initialGuests = [
  { id:1, name:"Emma Thompson", email:"emma@email.com", rsvp:"confirmed", side:"Bride" },
  { id:2, name:"James Wilson", email:"james@email.com", rsvp:"pending", side:"Groom" },
  { id:3, name:"Sophia Martinez", email:"sophia@email.com", rsvp:"confirmed", side:"Bride" },
  { id:4, name:"Liam Johnson", email:"liam@email.com", rsvp:"declined", side:"Groom" },
];

export const navItems = ["Home","Destinations","Packages","Vendors","Guest List","Payments","Invitations","My Bookings"];

export const HERO_SLIDES = [
  { img:"https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=85", title:"Say I Do", sub:"in Paradise", caption:"Over 200 all-inclusive resorts in Mexico & the Caribbean" },
  { img:"https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1600&q=85", title:"Your Perfect", sub:"Celebration", caption:"Certified Destination Wedding Specialists at no cost to you" },
  { img:"https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1600&q=85", title:"Every Detail", sub:"Perfected", caption:"From venue to vendors — we handle everything" },
];

