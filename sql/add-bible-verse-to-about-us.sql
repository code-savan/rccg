-- Add Bible verse and buttons columns to the about_us table for the worship_with_us section
ALTER TABLE about_us 
ADD COLUMN IF NOT EXISTS worship_with_us_bible_verse TEXT,
ADD COLUMN IF NOT EXISTS worship_with_us_bible_reference TEXT,
ADD COLUMN IF NOT EXISTS worship_with_us_buttons JSONB;

-- Update the existing record with default Bible verse data and buttons
UPDATE about_us
SET 
  worship_with_us_bible_verse = 'For where two or three gather in my name, there am I with them.',
  worship_with_us_bible_reference = 'Matthew 18:20 (NIV)',
  worship_with_us_buttons = '[
    {
      "id": 1,
      "text": "RCCG Live",
      "link": "https://www.youtube.com/@RCCGRodofGodParish"
    },
    {
      "id": 2,
      "text": "Next Gen Live",
      "link": "https://www.youtube.com/@RCCGRodofGodParish"
    }
  ]'::jsonb
WHERE id = 1;

-- If no record exists, insert one with default data
INSERT INTO about_us (
  id, 
  worship_with_us_heading, 
  worship_with_us_description, 
  worship_with_us_buttons, 
  worship_with_us_image,
  worship_with_us_bible_verse,
  worship_with_us_bible_reference
)
SELECT 
  1, 
  'Come worship with us', 
  'Come worship with us every Sunday. We promise you''ll be filled with the holy spirit.', 
  '[
    {
      "id": 1,
      "text": "RCCG Live",
      "link": "https://www.youtube.com/@RCCGRodofGodParish"
    },
    {
      "id": 2,
      "text": "Next Gen Live",
      "link": "https://www.youtube.com/@RCCGRodofGodParish"
    }
  ]'::jsonb, 
  '/images/img_verse.png',
  'For where two or three gather in my name, there am I with them.',
  'Matthew 18:20 (NIV)'
WHERE NOT EXISTS (SELECT 1 FROM about_us WHERE id = 1);
