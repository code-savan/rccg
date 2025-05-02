/**
 * Services and Events form data utility file
 * Maps component state to database fields and provides helper functions
 */

// Helper utility to format text with newlines for display
export function formatDisplayText(text) {
  if (!text) return "";
  return text.replace(/\\n/g, "\n");
}

// Default values for services and events sections
export const defaultServicesEventsData = {
  // Welcome Section
  welcome_heading: "Welcome to the\nRod of God Parish\nService Itenarary.",
  welcome_subheading: "At RCCG Rod of God Parish, we accept everyone.",
  welcome_background_image: "/images/img_pexels_jibarofoto_2014773.png",

  // Church Info Section
  church_info_heading: "THE YEAR OF MY GREATNESS",
  church_info_date: "Sunday Service January 19th, 2025.",
  church_info_bible_verse:
    "And there shall come forth a rod of out of the stem of Jesse and a branch shall grow out of his roots: And the Spirit of the Lord shall rest upon him, the spirit of wisdom and understanding in the fear of the LORD: and he shall not judge after the sight of his eyes, neither reprove after the hearing of his ears.",
  church_info_bible_reference: "Isaiah 11:1-3",
  church_info_contacts: JSON.stringify([
    { id: 1, label: "Pastor's Phone:", value: "317-418-7388" },
    { id: 2, label: "Pastor (Mrs) Phone:", value: "317-833-2186" },
    { id: 3, label: "General Overseer:", value: "Pastor E.A Adeboye" },
    { id: 4, label: "Chairman RCCGNA:", value: "Pastor J. Fadel" },
    {
      id: 5,
      label: "Host Ministers:",
      values: ["Pastor J.K. Balogun", "Pastor F.O. Balogun"],
    },
  ]),
  church_info_background_image: "/images/img_group_250.png",

  // Weekly Programs Section
  weekly_programs_heading: "Weekly and Monthly\nChurch Programs",
  weekly_programs_description:
    "This team maintains the cleanliness and beauty of God's house, creating a welcoming and reverent environment for worship.",
  weekly_programs: JSON.stringify([
    {
      id: 1,
      title: "Sunday Prayer Meeting",
      description:
        "Come worship with us every Sunday.\nWe promise you'll be filled with the holy spirit.",
      location: "Parish House Indianapolis.",
      day: "Sundays",
      time: "9am – 9:30am",
    },
    {
      id: 2,
      title: "Sunday School",
      description:
        "Come worship with us every Sunday.\nWe promise you'll be filled with the holy spirit.",
      location: "Parish House Indianapolis.",
      day: "Sundays",
      time: "9:30am – 10:30am",
    },
    {
      id: 3,
      title: "Sunday Service",
      description:
        "Come worship with us every Sunday.\nWe promise you'll be filled with the holy spirit.",
      location: "Parish House Indianapolis.",
      day: "Sundays",
      time: "10:30am – 1:00pm",
    },
  ]),

  // Monthly Programs Section
  monthly_programs_heading: "Monthly",
  monthly_programs: JSON.stringify([
    {
      id: 1,
      title: "Thanksgiving & Anointing\nService",
      description:
        "Come worship with us every Sunday.\nWe promise you'll be filled with the holy spirit.",
      location: "Parish House Indy",
      day: "1st Sunday of the Month",
      time: "10:30am – 1:00pm",
    },
    {
      id: 2,
      title: "Workers' Meeting",
      description:
        "Come worship with us every Sunday.\nWe promise you'll be filled with the holy spirit.",
      location: "Parish House Indy",
      day: "2nd Sunday of the Month",
      time: "1:30pm – 2:30pm",
    },
    {
      id: 3,
      title: "Holy Communion",
      description:
        "Come worship with us every Sunday.\nWe promise you'll be filled with the holy spirit.",
      location: "Parish House Indy",
      day: "Last Sunday of the Month",
      time: "10:30am – 1:00pm",
    },
  ]),

  // Upcoming Events Section
  upcoming_events_heading: "Upcoming events",
  upcoming_events: JSON.stringify([
    {
      id: 1,
      title: "Coming Soon",
      description:
        "Join us at RCCG Rod of God Parish for any of our events, a powerful gathering of worship, prayer, and spiritual renewal. Our events are designed to uplift, inspire, and bring us closer to God as a community. Expect heartfelt worship, impactful teachings, and a time of fellowship with believers.",
      location: "Parish House Indianapolis.",
      date: "To Be Dated(TBD)",
      image: "/images/img_edwin_andrade_4.png",
    },
    {
      id: 2,
      title: "Coming Soon",
      description:
        "Join us at RCCG Rod of God Parish for any of our events, a powerful gathering of worship, prayer, and spiritual renewal. Our events are designed to uplift, inspire, and bring us closer to God as a community. Expect heartfelt worship, impactful teachings, and a time of fellowship with believers.",
      location: "Parish House Indianapolis.",
      date: "To Be Dated(TBD)",
      image: "/images/img_worshae_bcy9e8uyuhu_unsplash.png",
    },
  ]),
};

// Maps component state to database fields for Welcome section
export function mapWelcomeSectionToDB(sectionContent) {
  return {
    welcome_heading: sectionContent.heading,
    welcome_subheading: sectionContent.subheading,
    welcome_background_image: sectionContent.backgroundImage,
  };
}

// Maps database fields to component state for Welcome section
export function mapDBToWelcomeSection(dbData) {
  return {
    heading: dbData.welcome_heading,
    subheading: dbData.welcome_subheading,
    backgroundImage: dbData.welcome_background_image,
  };
}

// Maps component state to database fields for Church Info section
export function mapChurchInfoSectionToDB(sectionContent) {
  return {
    church_info_heading: sectionContent.heading,
    church_info_date: sectionContent.date,
    church_info_bible_verse: sectionContent.bibleVerse,
    church_info_bible_reference: sectionContent.bibleReference,
    church_info_contacts: JSON.stringify(sectionContent.contacts),
    church_info_background_image: sectionContent.backgroundImage,
  };
}

// Maps database fields to component state for Church Info section
export function mapDBToChurchInfoSection(dbData) {
  try {
    // Safely parse the contacts data
    let contacts = [];

    if (dbData.church_info_contacts) {
      if (typeof dbData.church_info_contacts === "string") {
        try {
          contacts = JSON.parse(dbData.church_info_contacts);
        } catch (error) {
          console.error("Error parsing contacts JSON:", error);
          // If parsing fails, use empty array
        }
      } else if (Array.isArray(dbData.church_info_contacts)) {
        contacts = dbData.church_info_contacts;
      }
    }

    return {
      heading: dbData.church_info_heading || "",
      date: dbData.church_info_date || "",
      bibleVerse: dbData.church_info_bible_verse || "",
      bibleReference: dbData.church_info_bible_reference || "",
      contacts: contacts,
      backgroundImage: dbData.church_info_background_image || "",
    };
  } catch (error) {
    console.error("Error in mapDBToChurchInfoSection:", error);
    // Return a safe default object if anything goes wrong
    return {
      heading: dbData?.church_info_heading || "",
      date: dbData?.church_info_date || "",
      bibleVerse: dbData?.church_info_bible_verse || "",
      bibleReference: dbData?.church_info_bible_reference || "",
      contacts: [],
      backgroundImage: dbData?.church_info_background_image || "",
    };
  }
}

// Maps component state to database fields for Weekly Programs section
export function mapWeeklyProgramsSectionToDB(sectionContent) {
  // Format the programs data to ensure proper storage of newlines
  const formattedPrograms = sectionContent.weeklyPrograms.map((program) => ({
    ...program,
    title: program.title,
    description: program.description,
  }));

  return {
    weekly_programs_heading: sectionContent.heading,
    weekly_programs_description: sectionContent.description,
    weekly_programs: JSON.stringify(formattedPrograms),
  };
}

// Maps database fields to component state for Weekly Programs section
export function mapDBToWeeklyProgramsSection(dbData) {
  return {
    heading: dbData.weekly_programs_heading || "",
    description: dbData.weekly_programs_description || "",
    weeklyPrograms:
      typeof dbData.weekly_programs === "string"
        ? JSON.parse(dbData.weekly_programs)
        : Array.isArray(dbData.weekly_programs)
        ? dbData.weekly_programs
        : defaultServicesEventsData.weekly_programs
        ? JSON.parse(defaultServicesEventsData.weekly_programs)
        : [],
  };
}

// Maps component state to database fields for Monthly Programs section
export function mapMonthlyProgramsSectionToDB(sectionContent) {
  // Format the programs data to ensure proper storage of newlines
  const formattedPrograms = sectionContent.monthlyPrograms.map((program) => ({
    ...program,
    title: program.title,
    description: program.description,
  }));

  return {
    monthly_programs_heading: sectionContent.heading,
    monthly_programs: JSON.stringify(formattedPrograms),
  };
}

// Maps database fields to component state for Monthly Programs section
export function mapDBToMonthlyProgramsSection(dbData) {
  return {
    heading: dbData.monthly_programs_heading || "",
    monthlyPrograms:
      typeof dbData.monthly_programs === "string"
        ? JSON.parse(dbData.monthly_programs)
        : Array.isArray(dbData.monthly_programs)
        ? dbData.monthly_programs
        : defaultServicesEventsData.monthly_programs
        ? JSON.parse(defaultServicesEventsData.monthly_programs)
        : [],
  };
}

// Maps component state to database fields for Upcoming Events section
export function mapUpcomingEventsSectionToDB(sectionContent) {
  // Format the events data to ensure proper storage of newlines
  const formattedEvents = sectionContent.events.map((event) => ({
    ...event,
    title: event.title,
    description: event.description,
  }));

  return {
    upcoming_events_heading: sectionContent.heading,
    upcoming_events: JSON.stringify(formattedEvents),
  };
}

// Maps database fields to component state for Upcoming Events section
export function mapDBToUpcomingEventsSection(dbData) {
  return {
    heading: dbData.upcoming_events_heading || "",
    events:
      typeof dbData.upcoming_events === "string"
        ? JSON.parse(dbData.upcoming_events)
        : Array.isArray(dbData.upcoming_events)
        ? dbData.upcoming_events
        : defaultServicesEventsData.upcoming_events
        ? JSON.parse(defaultServicesEventsData.upcoming_events)
        : [],
  };
}
