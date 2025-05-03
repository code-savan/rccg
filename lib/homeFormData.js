/**
 * Home Page Form Data Utilities
 * This file contains utility functions for mapping data between database and component states,
 * as well as default values for the home page sections.
 */

// Utility function to format text with newlines for display
export function formatDisplayText(text) {
  if (!text) return "";
  
  // First, normalize newlines to ensure consistent handling
  let normalized = text.replace(/\\n/g, "\n");
  
  // Replace double newlines with a special placeholder
  normalized = normalized.replace(/\n\n/g, "{{DOUBLE_NEWLINE}}");
  
  // Replace single newlines with <br> for HTML display
  normalized = normalized.replace(/\n/g, "<br>");
  
  // Restore double newlines
  normalized = normalized.replace(/{{DOUBLE_NEWLINE}}/g, "<br><br>");
  
  return normalized;
}

// Default data for the home page sections (used as fallback if database fetch fails)
export const DEFAULT_HOME_DATA = {
  // Welcome Hero Section
  welcomeHero: {
    welcomeTitle: "Welcome to the\nRedeemed Christian\nChurch of God.",
    subtitle: "Rod Of God Parish, Indianapolis Indiana USA.",
    buttonText: "Learn more",
    bibleVerses: [
      {
        id: 1,
        verse: "From him the whole body, joined and held together by every supporting ligament, grows and builds itself up in love, as each part does its work",
        reference: "Ephesians 4:16 (NIV)",
      },
      {
        id: 2,
        verse: "For where two or three gather in my name, there am I with them.",
        reference: "Matthew 18:20 (NIV)",
      },
      {
        id: 3,
        verse: "Let us not give up meeting together, as some are in the habit of doing, but let us encourage one another.",
        reference: "Hebrews 10:25 (NIV)",
      },
    ],
    backgroundImage: "/images/img_group_5.png",
  },
  
  // About Section
  about: {
    heading: "About Us",
    content: "RCCG ROG is a Bible-based, evangelistic, Spirit-empowered church.\nAt RCCG ROG, we're all about people, because God is all about people.\n\nOne of the ways we express our love for Him is through our love for people,\nand we do this by helping people who come to RCCG ROG to grow in their\nrelationship with the Lord.\n\nWant to get started? We'd love for you to join us for a service, and we're\nhere to help you get connected.",
  },
  
  // Events Section
  events: {
    heading: "Upcoming events",
    events: [
      {
        id: 1,
        title: "Coming Soon",
        description: "Join us at RCCG Rod of God Parish for any of our events, a powerful gathering of worship, prayer, and spiritual renewal. Our events are designed to uplift, inspire, and bring us closer to God as a community. Expect heartfelt worship, impactful teachings, and a time of fellowship with believers.",
        location: "Parish House Indianapolis.",
        date: "To Be Dated(TBD)",
        image: "/images/event1.jpeg",
      },
      {
        id: 2,
        title: "Coming Soon",
        description: "Join us at RCCG Rod of God Parish for any of our events, a powerful gathering of worship, prayer, and spiritual renewal. Our events are designed to uplift, inspire, and bring us closer to God as a community. Expect heartfelt worship, impactful teachings, and a time of fellowship with believers.",
        location: "Parish House Indianapolis.",
        date: "To Be Dated(TBD)",
        image: "/images/event2.jpeg",
      },
    ],
  },
  
  // Highlights Section
  highlights: {
    heading: "Highlights from Our\nCommunity",
    description: "Experience our vibrant community through these highlights from our recent services and events.",
    highlights: [
      "/images/H1.jpeg",
      "/images/H2.jpeg",
      "/images/H3.jpeg",
      "/images/H4.jpeg",
      "/images/H5.jpeg",
      "/images/H6.jpeg",
      "/images/H7.jpeg",
      "/images/H8.jpeg",
      "/images/H9.jpeg",
      "/images/H10.jpeg",
      "/images/H11.jpeg",
      "/images/H12.jpeg",
      "/images/H13.jpeg",
      "/images/H14.jpeg",
      "/images/H15.jpeg",
      "/images/H16.jpeg",
      "/images/H17.jpeg",
      "/images/H18.jpeg",
      "/images/H19.jpeg",
      "/images/H20.jpeg",
      "/images/H21.jpeg",
      "/images/H22.jpeg",
      "/images/H23.jpeg",
      "/images/H24.jpeg",
      "/images/H25.jpeg",
      "/images/H26.jpeg",
      "/images/H27.jpeg",
      "/images/H28.jpeg",
      "/images/H29.jpeg"
    ],
  },
  
  // Ministers Section
  ministers: {
    heading: "Our Ministers",
    description: "At RCCG Rod of God Parish, our ministers are dedicated servants of God, committed to teaching His Word, nurturing spiritual growth, and supporting our community with love and prayer. They lead with wisdom, humility, and a passion for sharing the Gospel, guiding us in faith and unity.",
    ministers: [
      {
        id: 1,
        name: "Pastor J.K Balogun",
        title: "Head Pastor",
        image: "/images/img_dsc_5797.png",
      },
      {
        id: 2,
        name: "Pastor(Mrs) F.O Balogun",
        title: "Head Pastor",
        image: "/images/img_dsc_9587.png",
      },
    ],
    buttonText: "See more info",
    buttonLink: "/about-us",
  },
  
  // Service Times Section
  serviceTimes: {
    heading: "Our Service times",
    description: "Join us at RCCG Rod of God Parish for uplifting worship and powerful teachings. Our services are a time of fellowship, prayer, and spiritual growth.",
    services: [
      {
        id: 1,
        name: "Sunday Service",
        description: "Come worship with us every Sunday.\nWe promise you'll be filled with the holy spirit.",
        location: "Parish House Indianapolis.",
        schedule: "Every Sunday",
        time: "10:00 AM - 12:00 PM",
      },
      {
        id: 2,
        name: "Weekly Service",
        description: "Come worship with us every Sunday.\nWe promise you'll be filled with the holy spirit.",
        location: "Parish House Indianapolis.",
        schedule: "Every Tuesday",
        time: "7:00 PM - 8:30 PM",
      },
      {
        id: 3,
        name: "Prayer Service",
        description: "Come worship with us every Sunday.\nWe promise you'll be filled with the holy spirit.",
        location: "Parish House Indianapolis.",
        schedule: "Fridays & Saturdays",
        time: "7:00 PM - 8:30 PM",
      },
    ],
    seeMoreText: "See more",
    seeMoreLink: "/services-events",
  },
  
  // Location Section
  location: {
    heading: "Our Location",
    description: "Join us at RCCG Rod of God Parish, conveniently located in Indianapolis. We welcome you to our services and events at this address.",
    address: "6935 Lake Plaza Dr, Indianapolis, IN 46220, United States",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3064.1315384744254!2d-86.0701394!3d39.8807699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886b4c8b89c2e3df%3A0x2c0a8b2f3f0afa6e!2s6935%20Lake%20Plaza%20Dr%2C%20Indianapolis%2C%20IN%2046220%2C%20USA!5e0!3m2!1sen!2sng!4v1714751538585!5m2!1sen!2sng",
    image: "/images/location.jpeg",
  },
  
  // Worship With Us Section
  worshipWithUs: {
    heading: "Come worship\nwith us",
    description: "Come worship with us every Sunday.\nWe promise you'll be filled with the holy spirit.",
    buttons: [
      {
        id: 1,
        text: "Learn more",
        link: "/about-us",
        isPrimary: true,
      },
      {
        id: 2,
        text: "Contact us",
        link: "/contact",
        isPrimary: false,
      },
    ],
    backgroundImage: "/images/img_verse.png",
  },
};

// Mapping functions to transform data between database and component state

// Welcome Hero Section
export function mapDBToWelcomeHeroSection(dbData) {
  return {
    welcomeTitle: dbData.welcome_title || DEFAULT_HOME_DATA.welcomeHero.welcomeTitle,
    subtitle: dbData.welcome_subtitle || DEFAULT_HOME_DATA.welcomeHero.subtitle,
    buttonText: dbData.welcome_button_text || DEFAULT_HOME_DATA.welcomeHero.buttonText,
    bibleVerses: 
      typeof dbData.welcome_bible_verses === "string"
        ? JSON.parse(dbData.welcome_bible_verses)
        : Array.isArray(dbData.welcome_bible_verses)
        ? dbData.welcome_bible_verses
        : DEFAULT_HOME_DATA.welcomeHero.bibleVerses,
    backgroundImage: dbData.welcome_background_image || DEFAULT_HOME_DATA.welcomeHero.backgroundImage,
  };
}

export function mapWelcomeHeroSectionToDB(formData) {
  return {
    welcome_title: formData.welcomeTitle,
    welcome_subtitle: formData.subtitle,
    welcome_button_text: formData.buttonText,
    welcome_bible_verses: formData.bibleVerses,
    welcome_background_image: formData.backgroundImage,
  };
}

// About Section
export function mapDBToAboutSection(dbData) {
  return {
    heading: dbData.about_heading || DEFAULT_HOME_DATA.about.heading,
    content: dbData.about_content || DEFAULT_HOME_DATA.about.content,
  };
}

export function mapAboutSectionToDB(formData) {
  return {
    about_heading: formData.heading,
    about_content: formData.content,
  };
}

// Events Section
export function mapDBToEventsSection(dbData) {
  return {
    heading: dbData.events_heading || DEFAULT_HOME_DATA.events.heading,
    events: 
      typeof dbData.events === "string"
        ? JSON.parse(dbData.events)
        : Array.isArray(dbData.events)
        ? dbData.events
        : DEFAULT_HOME_DATA.events.events,
  };
}

export function mapEventsSectionToDB(formData) {
  return {
    events_heading: formData.heading,
    events: formData.events,
  };
}

// Highlights Section
export function mapDBToHighlightsSection(dbData) {
  return {
    heading: dbData.highlights_heading || DEFAULT_HOME_DATA.highlights.heading,
    description: dbData.highlights_description || DEFAULT_HOME_DATA.highlights.description,
    highlights: 
      typeof dbData.highlights === "string"
        ? JSON.parse(dbData.highlights)
        : Array.isArray(dbData.highlights)
        ? dbData.highlights
        : DEFAULT_HOME_DATA.highlights.highlights,
  };
}

export function mapHighlightsSectionToDB(formData) {
  return {
    highlights_heading: formData.heading,
    highlights_description: formData.description,
    highlights: formData.highlights,
  };
}

// Ministers Section
export function mapDBToMinistersSection(dbData) {
  return {
    heading: dbData.ministers_heading || DEFAULT_HOME_DATA.ministers.heading,
    description: dbData.ministers_description || DEFAULT_HOME_DATA.ministers.description,
    ministers: 
      typeof dbData.ministers === "string"
        ? JSON.parse(dbData.ministers)
        : Array.isArray(dbData.ministers)
        ? dbData.ministers
        : DEFAULT_HOME_DATA.ministers.ministers,
    buttonText: dbData.ministers_button_text || DEFAULT_HOME_DATA.ministers.buttonText,
    buttonLink: dbData.ministers_button_link || DEFAULT_HOME_DATA.ministers.buttonLink,
  };
}

export function mapMinistersSectionToDB(formData) {
  return {
    ministers_heading: formData.heading,
    ministers_description: formData.description,
    ministers: formData.ministers,
    ministers_button_text: formData.buttonText,
    ministers_button_link: formData.buttonLink,
  };
}

// Service Times Section
export function mapDBToServiceTimesSection(dbData) {
  return {
    heading: dbData.service_times_heading || DEFAULT_HOME_DATA.serviceTimes.heading,
    description: dbData.service_times_description || DEFAULT_HOME_DATA.serviceTimes.description,
    services: 
      typeof dbData.services === "string"
        ? JSON.parse(dbData.services)
        : Array.isArray(dbData.services)
        ? dbData.services
        : DEFAULT_HOME_DATA.serviceTimes.services,
    seeMoreText: dbData.service_times_see_more_text || DEFAULT_HOME_DATA.serviceTimes.seeMoreText,
    seeMoreLink: dbData.service_times_see_more_link || DEFAULT_HOME_DATA.serviceTimes.seeMoreLink,
  };
}

export function mapServiceTimesSectionToDB(formData) {
  return {
    service_times_heading: formData.heading,
    service_times_description: formData.description,
    services: formData.services,
    service_times_see_more_text: formData.seeMoreText,
    service_times_see_more_link: formData.seeMoreLink,
  };
}

// Location Section
export function mapDBToLocationSection(dbData) {
  return {
    heading: dbData.location_heading || DEFAULT_HOME_DATA.location.heading,
    description: dbData.location_description || DEFAULT_HOME_DATA.location.description,
    address: dbData.location_address || DEFAULT_HOME_DATA.location.address,
    mapUrl: dbData.location_map_url || DEFAULT_HOME_DATA.location.mapUrl,
    image: dbData.location_image || DEFAULT_HOME_DATA.location.image,
  };
}

export function mapLocationSectionToDB(formData) {
  return {
    location_heading: formData.heading,
    location_description: formData.description,
    location_address: formData.address,
    location_map_url: formData.mapUrl,
    location_image: formData.image,
  };
}

// Worship With Us Section
export function mapDBToWorshipWithUsSection(dbData) {
  return {
    heading: dbData.worship_heading || DEFAULT_HOME_DATA.worshipWithUs.heading,
    description: dbData.worship_description || DEFAULT_HOME_DATA.worshipWithUs.description,
    buttons: 
      typeof dbData.worship_buttons === "string"
        ? JSON.parse(dbData.worship_buttons)
        : Array.isArray(dbData.worship_buttons)
        ? dbData.worship_buttons
        : DEFAULT_HOME_DATA.worshipWithUs.buttons,
    backgroundImage: dbData.worship_background_image || DEFAULT_HOME_DATA.worshipWithUs.backgroundImage,
  };
}

export function mapWorshipWithUsSectionToDB(formData) {
  return {
    worship_heading: formData.heading,
    worship_description: formData.description,
    worship_buttons: formData.buttons,
    worship_background_image: formData.backgroundImage,
  };
}
