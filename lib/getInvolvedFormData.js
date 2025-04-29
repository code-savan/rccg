/**
 * Get Involved form data utility file
 * Maps component state to database fields and provides helper functions
 */

// Default values for get involved sections
export const defaultGetInvolvedData = {
  // Hero Section
  hero_heading: "Get involved\nwith the church",
  hero_subheading: "At RCCG Rod of God Parish, we accept everyone.",
  hero_background_image: "/images/img_group_227.png",

  // Donation Section
  donation_heading: "Help the\nchurch grow",
  donation_description: "Giving is an act of worship and a way to make a\ndifference in our community.",
  donation_bible_verse_text: '"Each of you should give what you\nhave decided in your heart to give,\nnot reluctantly or under compulsion,\nfor God loves a cheerful giver."',
  donation_bible_verse_reference: "— 2 Corinthians 9:7 (NIV)",
  donation_bible_verse_background_image: "/images/img_verse_630x738.png",
  donation_button_text: "Give today",
  donation_link: "https://www.givelify.com/donate/redeemed-christian-church-of-god-rccg-rod-of-god-parish-indianapolis-in-2j7wy5NTU0/donation/amount",

  // QA Section
  qa_heading: "Q&A and Polls",
  qa_description: "We take questions from our members anonymously and\nanswer them as a community to help them grow.",
  qa_button_text: "Go to the Q&A",
  qa_button_link: "https://app.sli.do/event/qiPxPF7zvmaw6UxmMY9kMC/live/questions",
  qa_bible_verse_text: '"Carry each other\'s burdens, and in\nthis way you will fulfill the law of\nChrist."',
  qa_bible_verse_reference: "— Galatians 6:2 (NIV)",
  qa_bible_verse_background_image: "/images/img_verse_1.png",

  // Contact Section
  contact_heading: "The Church Address",
  contact_address: "5350 Allied Blvd, Indianapolis, IN",
  contact_subtext: "Visit and Worship with us.",
  contact_background_image: "/images/img_group_138.png",
  contact_form_enabled: true
};

// Maps component state to database fields for Hero section
export function mapHeroSectionToDB(sectionContent) {
  return {
    hero_heading: sectionContent.heading,
    hero_subheading: sectionContent.subheading,
    hero_background_image: sectionContent.backgroundImage
  };
}

// Maps database fields to component state for Hero section
export function mapDBToHeroSection(dbData) {
  return {
    heading: dbData.hero_heading,
    subheading: dbData.hero_subheading,
    backgroundImage: dbData.hero_background_image
  };
}

// Maps component state to database fields for Donation section
export function mapDonationSectionToDB(sectionContent) {
  return {
    donation_heading: sectionContent.heading,
    donation_description: sectionContent.description,
    donation_bible_verse_text: sectionContent.bibleVerseText,
    donation_bible_verse_reference: sectionContent.bibleVerseReference,
    donation_bible_verse_background_image: sectionContent.bibleVerseBackgroundImage,
    donation_button_text: sectionContent.buttonText,
    donation_link: sectionContent.donationLink
  };
}

// Maps database fields to component state for Donation section
export function mapDBToDonationSection(dbData) {
  return {
    heading: dbData.donation_heading,
    description: dbData.donation_description,
    bibleVerseText: dbData.donation_bible_verse_text,
    bibleVerseReference: dbData.donation_bible_verse_reference,
    bibleVerseBackgroundImage: dbData.donation_bible_verse_background_image,
    buttonText: dbData.donation_button_text,
    donationLink: dbData.donation_link
  };
}

// Maps component state to database fields for QA section
export function mapQASectionToDB(sectionContent) {
  return {
    qa_heading: sectionContent.heading,
    qa_description: sectionContent.description,
    qa_button_text: sectionContent.buttonText,
    qa_button_link: sectionContent.buttonLink,
    qa_bible_verse_text: sectionContent.bibleVerseText,
    qa_bible_verse_reference: sectionContent.bibleVerseReference,
    qa_bible_verse_background_image: sectionContent.bibleVerseBackgroundImage
  };
}

// Maps database fields to component state for QA section
export function mapDBToQASection(dbData) {
  return {
    heading: dbData.qa_heading,
    description: dbData.qa_description,
    buttonText: dbData.qa_button_text,
    buttonLink: dbData.qa_button_link,
    bibleVerseText: dbData.qa_bible_verse_text,
    bibleVerseReference: dbData.qa_bible_verse_reference,
    bibleVerseBackgroundImage: dbData.qa_bible_verse_background_image
  };
}

// Maps component state to database fields for Contact section
export function mapContactSectionToDB(sectionContent) {
  return {
    contact_heading: sectionContent.heading,
    contact_address: sectionContent.address,
    contact_subtext: sectionContent.subtext,
    contact_background_image: sectionContent.backgroundImage,
    contact_form_enabled: sectionContent.contactFormEnabled
  };
}

// Maps database fields to component state for Contact section
export function mapDBToContactSection(dbData) {
  return {
    heading: dbData.contact_heading,
    address: dbData.contact_address,
    subtext: dbData.contact_subtext,
    backgroundImage: dbData.contact_background_image,
    contactFormEnabled: dbData.contact_form_enabled
  };
}
