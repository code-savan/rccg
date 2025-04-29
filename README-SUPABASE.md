# Supabase Integration for Get Involved Section

This document explains how to set up the Supabase integration for the Get Involved section of the RCCG website.

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Supabase configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Database Setup

1. Create a new project in Supabase
2. Navigate to the SQL Editor in the Supabase dashboard
3. Execute the SQL scripts in the following order:

```
schema/get-involved-table.sql
schema/get-involved-trigger.sql
schema/get-involved-initial.sql
```

## API Structure

The application uses the following API endpoints:

- `GET /api/get-involved` - Get all get-involved data
- `PUT /api/get-involved` - Update all get-involved data

Section-specific endpoints:
- `GET/PUT /api/get-involved/hero` - Hero section data
- `GET/PUT /api/get-involved/donation` - Donation section data
- `GET/PUT /api/get-involved/qa` - Q&A section data
- `GET/PUT /api/get-involved/contact` - Contact section data

## Data Schema

The get-involved table includes fields for all sections:

### Hero Section
- `hero_heading` - The main heading (supports line breaks with \n)
- `hero_subheading` - The subheading text
- `hero_background_image` - Path to the background image

### Donation Section
- `donation_heading` - The section heading (supports line breaks with \n)
- `donation_description` - The description text (supports line breaks with \n)
- `donation_bible_verse_text` - The Bible verse text (supports line breaks with \n)
- `donation_bible_verse_reference` - The Bible verse reference
- `donation_bible_verse_background_image` - Path to the Bible verse background image
- `donation_button_text` - Text for the donation button
- `donation_link` - URL for the donation button

### Q&A Section
- `qa_heading` - The section heading
- `qa_description` - The description text (supports line breaks with \n)
- `qa_button_text` - Text for the Q&A button
- `qa_button_link` - URL for the Q&A button
- `qa_bible_verse_text` - The Bible verse text (supports line breaks with \n)
- `qa_bible_verse_reference` - The Bible verse reference
- `qa_bible_verse_background_image` - Path to the Bible verse background image

### Contact Section
- `contact_heading` - The section heading
- `contact_address` - The church address
- `contact_subtext` - Additional text
- `contact_background_image` - Path to the background image
- `contact_form_enabled` - Boolean flag to enable/disable the contact form

## Helper Functions

Helper functions in `lib/getInvolvedFormData.js` provide mapping between component state and database fields.

## Integration in Components

Components have been updated to use the API for loading and saving data, with example implementation in `HeroSectionEdit.jsx`.

Using the service functions in your components:

```javascript
import { fetchHeroSection, updateHeroSection } from '@/lib/services/getInvolvedService';

// In your component:
const fetchData = async () => {
  try {
    const data = await fetchHeroSection();
    setSectionContent(data);
  } catch (error) {
    console.error('Failed to load data:', error);
  }
};

const saveData = async () => {
  try {
    const updatedData = await updateHeroSection(sectionContent);
    // Handle success
  } catch (error) {
    console.error('Failed to save data:', error);
  }
};
```
