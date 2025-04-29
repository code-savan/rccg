// Schema for the get-involved table based on the fields from each section

export const getInvolvedSchema = {
  // Hero Section
  hero_heading: { type: "text", required: true },
  hero_subheading: { type: "text", required: true },
  hero_background_image: { type: "text", required: true },

  // Donation Section
  donation_heading: { type: "text", required: true },
  donation_description: { type: "text", required: true },
  donation_bible_verse_text: { type: "text", required: true },
  donation_bible_verse_reference: { type: "text", required: true },
  donation_bible_verse_background_image: { type: "text", required: true },
  donation_button_text: { type: "text", required: true },
  donation_link: { type: "text", required: true },

  // QA Section
  qa_heading: { type: "text", required: true },
  qa_description: { type: "text", required: true },
  qa_button_text: { type: "text", required: true },
  qa_button_link: { type: "text", required: true },
  qa_bible_verse_text: { type: "text", required: true },
  qa_bible_verse_reference: { type: "text", required: true },
  qa_bible_verse_background_image: { type: "text", required: true },

  // Contact Section
  contact_heading: { type: "text", required: true },
  contact_address: { type: "text", required: true },
  contact_subtext: { type: "text", required: true },
  contact_background_image: { type: "text", required: true },
  contact_form_enabled: { type: "boolean", required: true, default: true },
};

// Helper function to validate get-involved data
export function validateGetInvolvedData(data) {
  const errors = {};

  Object.entries(getInvolvedSchema).forEach(([field, schema]) => {
    if (schema.required && !data[field]) {
      errors[field] = `${field.replace(/_/g, " ")} is required`;
    }
  });

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
