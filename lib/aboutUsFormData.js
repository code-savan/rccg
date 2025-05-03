/**
 * About Us form data utility file
 * Maps component state to database fields and provides helper functions
 */

// Helper utility to format text with newlines for display
export function formatDisplayText(text) {
  if (!text) return "";
  // First replace any incorrect /n with \n
  let fixedText = text.replace(/\/n/g, "\\n");
  // Replace double newlines with a single newline
  fixedText = fixedText.replace(/\\n\\n/g, "\\n");
  // Then replace all \n with actual newlines
  return fixedText.replace(/\\n/g, "\n");
}

// Default values for about us sections
export const defaultAboutUsData = {
  // Hero Section
  hero_heading: "Welcome to RCCG\nRod of God Parish",
  hero_subheading: "A place to grow in faith and community.",
  hero_background_image: "/images/aboutushero.png",

  // About Text Section
  about_text_heading: "ABOUT OUR CHURCH",
  about_text_content:
    "RCCG Rod of God Parish is a vibrant, Spirit-filled church committed to building a community of believers passionate about God and dedicated to making a positive impact in Indianapolis and beyond. Our church is part of the Redeemed Christian Church of God global network and upholds its values and mission.\n\nOur services combine powerful worship, prayer, and Biblical teaching in a welcoming environment where everyone belongs. We believe in nurturing spiritual growth at every age and life stage.",

  // History Section
  history_heading: "OUR HISTORY",
  history_content:
    "RCCG Rod of God Parish began as a small prayer group in Indianapolis in 2018. Through God's grace and the dedication of our founding members, we've grown into a thriving spiritual family serving our community.\n\nOver the years, we've remained committed to our founding vision of being a church where God's Word is taught with clarity and where all people can find belonging, purpose, and spiritual transformation.",
  history_image: "/images/history.jpeg",

  // Ministers Section
  ministers_heading: "OUR MINISTERS",
  ministers_description:
    "Meet our dedicated spiritual leaders who serve and guide our congregation with wisdom and compassion.",
  ministers: JSON.stringify([
    {
      id: 1,
      name: "Pastor John Smith",
      role: "Senior Pastor",
      bio: "Pastor John has served in ministry for over 20 years and is passionate about equipping believers to live out their faith.",
      image: "/images/minister1.jpeg",
    },
    {
      id: 2,
      name: "Pastor Mary Johnson",
      role: "Associate Pastor",
      bio: "Pastor Mary leads our women's ministry and counseling programs, bringing comfort and wisdom to many.",
      image: "/images/minister2.jpeg",
    },
  ]),

  // Church Ministers Section
  church_ministers_heading: "CHURCH MINISTERS",
  church_ministers_description:
    "Our church ministers lead various ministries and serve our congregation in specialized areas.",
  church_ministers: JSON.stringify([
    {
      id: 1,
      name: "Deacon Michael Williams",
      role: "Worship Leader",
      bio: "Michael has led our worship ministry for 5 years, creating an atmosphere of praise and devotion.",
      image: "/images/church-minister1.jpeg",
    },
    {
      id: 2,
      name: "Sister Rebecca Taylor",
      role: "Children's Ministry Director",
      bio: "Rebecca brings creativity and Biblical knowledge to our children's programs.",
      image: "/images/church-minister2.jpeg",
    },
  ]),

  // Department Heads Section
  department_heads_heading: "DEPARTMENT HEADS",
  department_heads_description:
    "Our department heads coordinate various functions to ensure the smooth operation of our church.",
  department_heads: JSON.stringify([
    {
      id: 1,
      name: "Brother Daniel Clark",
      role: "Technical Department Head",
      bio: "Daniel oversees our audio-visual systems and online presence.",
      image: "/images/dept-head1.jpeg",
    },
    {
      id: 2,
      name: "Sister Jennifer Adams",
      role: "Hospitality Department Head",
      bio: "Jennifer coordinates our welcoming team and ensures visitors feel at home.",
      image: "/images/dept-head2.jpeg",
    },
  ]),

  // Departments Section
  departments_heading: "OUR DEPARTMENTS",
  departments_description:
    "Our church operates through various departments, each playing a vital role in our ministry.",
  departments: JSON.stringify([
    {
      id: 1,
      name: "Worship Department",
      description:
        "Leads the congregation in praise and worship during services and events.",
      image: "/images/dept1.jpeg",
    },
    {
      id: 2,
      name: "Children's Department",
      description:
        "Provides age-appropriate spiritual education and activities for children.",
      image: "/images/dept2.jpeg",
    },
    {
      id: 3,
      name: "Ushering Department",
      description:
        "Creates an orderly, welcoming atmosphere for all church services.",
      image: "/images/dept3.jpeg",
    },
  ]),

  // NextGen Ministry Section
  nextgen_ministry_title: "THE NEXT GEN MINISTRY",
  nextgen_ministry_description:
    "At RCCG Rod of God Parish, our Youth Church is a vibrant community where young people grow in faith, purpose, and fellowship. Join us and be part of a movement for God!",
  nextgen_ministry_image: "/images/hero.jpeg",

  // NextGen Ministers Section
  nextgen_ministers_heading: "NEXTGEN MINISTERS",
  nextgen_ministers_description:
    "Our youth leaders guide and mentor the next generation of believers.",
  nextgen_ministers: JSON.stringify([
    {
      id: 1,
      name: "Brother James Wilson",
      role: "Youth Pastor",
      bio: "James has a heart for young people and helps them navigate faith in today's world.",
      image: "/images/youth-minister1.jpeg",
    },
    {
      id: 2,
      name: "Sister Sarah Brown",
      role: "Young Adults Coordinator",
      bio: "Sarah creates meaningful programs for college students and young professionals.",
      image: "/images/youth-minister2.jpeg",
    },
  ]),

  // Worship With Us Section
  worship_with_us_heading: "Join Us for Worship",
  worship_with_us_description: "We invite you to join us for worship and fellowship. Our services are designed to bring you closer to God through prayer, praise, and the Word.",
  worship_with_us_buttons: JSON.stringify([
    {
      id: 1,
      text: "Join Us",
      link: "/contact-us"
    },
    {
      id: 2,
      text: "Learn More",
      link: "/about-us"
    }
  ]),
  worship_with_us_image: "/images/img_verse.png",
  worship_with_us_bible_verse: "For where two or three gather in my name, there am I with them.",
  worship_with_us_bible_reference: "Matthew 18:20 (NIV)",
  worship_with_us_schedule: JSON.stringify([
    {
      id: 1,
      day: "Sunday",
      services: [
        { id: 101, time: "9:00 AM", name: "Sunday School" },
        { id: 102, time: "10:30 AM", name: "Main Service" },
      ],
    },
    {
      id: 2,
      day: "Wednesday",
      services: [{ id: 201, time: "7:00 PM", name: "Bible Study" }],
    },
    {
      id: 3,
      day: "Friday",
      services: [{ id: 301, time: "7:00 PM", name: "Prayer Meeting" }],
    },
  ]),
  worship_with_us_location: "5350 Allied Blvd, Indianapolis, IN",
};

// Maps component state to database fields for Hero section
export function mapHeroSectionToDB(sectionContent) {
  return {
    hero_heading: sectionContent.heading,
    hero_subheading: sectionContent.subheading,
    hero_background_image: sectionContent.backgroundImage,
  };
}

// Maps database fields to component state for Hero section
export function mapDBToHeroSection(dbData) {
  return {
    heading: dbData.hero_heading,
    subheading: dbData.hero_subheading,
    backgroundImage: dbData.hero_background_image,
  };
}

// Maps component state to database fields for About Text section
export function mapAboutTextSectionToDB(sectionContent) {
  return {
    about_text_heading: sectionContent.heading,
    about_text_content: sectionContent.content,
  };
}

// Maps database fields to component state for About Text section
export function mapDBToAboutTextSection(dbData) {
  return {
    heading: dbData.about_text_heading,
    content: dbData.about_text_content,
  };
}

// Maps component state to database fields for History section
export function mapHistorySectionToDB(sectionContent) {
  return {
    history_heading: sectionContent.heading,
    history_content: sectionContent.content,
    history_image: sectionContent.image,
  };
}

// Maps database fields to component state for History section
export function mapDBToHistorySection(dbData) {
  return {
    heading: dbData.history_heading,
    content: dbData.history_content,
    image: dbData.history_image,
  };
}

// Maps component state to database fields for Ministers section
export function mapMinistersSectionToDB(sectionContent) {
  return {
    ministers_heading: sectionContent.heading,
    ministers_description: sectionContent.description,
    ministers: JSON.stringify(sectionContent.ministers),
  };
}

// Maps database fields to component state for Ministers section
export function mapDBToMinistersSection(dbData) {
  return {
    heading: dbData.ministers_heading,
    description: dbData.ministers_description,
    ministers:
      typeof dbData.ministers === "string"
        ? JSON.parse(dbData.ministers)
        : Array.isArray(dbData.ministers)
        ? dbData.ministers
        : [],
  };
}

// Maps component state to database fields for Church Ministers section
export function mapChurchMinistersSectionToDB(sectionContent) {
  return {
    church_ministers_heading: sectionContent.heading,
    church_ministers_description: sectionContent.description,
    church_ministers: JSON.stringify(sectionContent.churchMinisters),
  };
}

// Maps database fields to component state for Church Ministers section
export function mapDBToChurchMinistersSection(dbData) {
  return {
    heading: dbData.church_ministers_heading,
    description: dbData.church_ministers_description,
    churchMinisters:
      typeof dbData.church_ministers === "string"
        ? JSON.parse(dbData.church_ministers)
        : Array.isArray(dbData.church_ministers)
        ? dbData.church_ministers
        : [],
  };
}

// Maps component state to database fields for Department Heads section
export function mapDepartmentHeadsSectionToDB(sectionContent) {
  return {
    department_heads_heading: sectionContent.heading,
    department_heads_description: sectionContent.description,
    department_heads: JSON.stringify(sectionContent.departmentHeads),
  };
}

// Maps database fields to component state for Department Heads section
export function mapDBToDepartmentHeadsSection(dbData) {
  return {
    heading: dbData.department_heads_heading,
    description: dbData.department_heads_description,
    departmentHeads:
      typeof dbData.department_heads === "string"
        ? JSON.parse(dbData.department_heads)
        : Array.isArray(dbData.department_heads)
        ? dbData.department_heads
        : [],
  };
}

// Maps component state to database fields for Departments section
export function mapDepartmentsSectionToDB(sectionContent) {
  return {
    departments_heading: sectionContent.heading,
    departments_description: sectionContent.description,
    departments: JSON.stringify(sectionContent.departments),
  };
}

// Maps database fields to component state for Departments section
export function mapDBToDepartmentsSection(dbData) {
  return {
    heading: dbData.departments_heading,
    description: dbData.departments_description,
    departments:
      typeof dbData.departments === "string"
        ? JSON.parse(dbData.departments)
        : Array.isArray(dbData.departments)
        ? dbData.departments
        : [],
  };
}

// Maps component state to database fields for NextGen Ministry section
export function mapNextGenMinistrySectionToDB(sectionContent) {
  return {
    nextgen_ministry_title: sectionContent.title,
    nextgen_ministry_description: sectionContent.description,
    nextgen_ministry_image: sectionContent.image,
  };
}

// Maps database fields to component state for NextGen Ministry section
export function mapDBToNextGenMinistrySection(dbData) {
  return {
    title: dbData.nextgen_ministry_title,
    description: dbData.nextgen_ministry_description,
    image: dbData.nextgen_ministry_image,
  };
}

// Maps component state to database fields for NextGen Ministers section
export function mapNextGenMinistersSectionToDB(sectionContent) {
  return {
    nextgen_ministers_heading: sectionContent.heading,
    nextgen_ministers_description: sectionContent.description,
    nextgen_ministers: JSON.stringify(sectionContent.nextGenMinisters),
  };
}

// Maps database fields to component state for NextGen Ministers section
export function mapDBToNextGenMinistersSection(dbData) {
  return {
    heading: dbData.nextgen_ministers_heading,
    description: dbData.nextgen_ministers_description,
    nextGenMinisters:
      typeof dbData.nextgen_ministers === "string"
        ? JSON.parse(dbData.nextgen_ministers)
        : Array.isArray(dbData.nextgen_ministers)
        ? dbData.nextgen_ministers
        : [],
  };
}

// Maps component state to database fields for Worship With Us section
export function mapWorshipWithUsSectionToDB(sectionContent) {
  return {
    worship_with_us_heading: sectionContent.heading,
    worship_with_us_description: sectionContent.description,
    worship_with_us_buttons: JSON.stringify(sectionContent.buttons),
    worship_with_us_image: sectionContent.image,
    worship_with_us_bible_verse: sectionContent.bibleVerse,
    worship_with_us_bible_reference: sectionContent.bibleReference,
    worship_with_us_schedule: JSON.stringify(sectionContent.schedule),
    worship_with_us_location: sectionContent.location,
  };
}

// Maps database fields to component state for Worship With Us section
export function mapDBToWorshipWithUsSection(dbData) {
  return {
    heading: dbData.worship_with_us_heading,
    description: dbData.worship_with_us_description,
    buttons:
      typeof dbData.worship_with_us_buttons === "string"
        ? JSON.parse(dbData.worship_with_us_buttons)
        : Array.isArray(dbData.worship_with_us_buttons)
        ? dbData.worship_with_us_buttons
        : [],
    image: dbData.worship_with_us_image,
    bibleVerse: dbData.worship_with_us_bible_verse,
    bibleReference: dbData.worship_with_us_bible_reference,
    schedule:
      typeof dbData.worship_with_us_schedule === "string"
        ? JSON.parse(dbData.worship_with_us_schedule)
        : Array.isArray(dbData.worship_with_us_schedule)
        ? dbData.worship_with_us_schedule
        : [],
    location: dbData.worship_with_us_location,
  };
}
