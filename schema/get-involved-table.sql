-- SQL Schema for the get-involved table

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create get_involved table
CREATE TABLE IF NOT EXISTS get_involved (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Hero Section
  hero_heading TEXT NOT NULL,
  hero_subheading TEXT NOT NULL,
  hero_background_image TEXT NOT NULL,

  -- Donation Section
  donation_heading TEXT NOT NULL,
  donation_description TEXT NOT NULL,
  donation_bible_verse_text TEXT NOT NULL,
  donation_bible_verse_reference TEXT NOT NULL,
  donation_bible_verse_background_image TEXT NOT NULL,
  donation_button_text TEXT NOT NULL,
  donation_link TEXT NOT NULL,

  -- QA Section
  qa_heading TEXT NOT NULL,
  qa_description TEXT NOT NULL,
  qa_button_text TEXT NOT NULL,
  qa_button_link TEXT NOT NULL,
  qa_bible_verse_text TEXT NOT NULL,
  qa_bible_verse_reference TEXT NOT NULL,
  qa_bible_verse_background_image TEXT NOT NULL,

  -- Contact Section
  contact_heading TEXT NOT NULL,
  contact_address TEXT NOT NULL,
  contact_subtext TEXT NOT NULL,
  contact_background_image TEXT NOT NULL,
  contact_form_enabled BOOLEAN NOT NULL DEFAULT TRUE
);
