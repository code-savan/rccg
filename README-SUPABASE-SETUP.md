# Supabase Setup for RCCG Website

This README provides instructions on how to set up the Supabase database tables and storage buckets for the RCCG website.

## Prerequisites

1. A Supabase account (if you don't have one, sign up at [supabase.com](https://supabase.com))
2. Access to your Supabase project dashboard

## Environment Variables

Ensure that your project has the following environment variables set in your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Replace `your-project-url` and `your-anon-key` with the values from your Supabase project settings.

## Storage Buckets Setup

1. Log in to your Supabase dashboard and navigate to the Storage section.
2. Create the following buckets:
   - `get_involved_files`: For storing files related to the Get Involved page
   - `services_events_files`: For storing files related to the Services & Events page

3. Set up RLS (Row Level Security) policies for each bucket:
   - For publicly viewable images, add the following policy for anonymous access:

   ```sql
   CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id IN ('get_involved_files', 'services_events_files'));
   ```

   - For authenticated users (admins) to upload files:

   ```sql
   CREATE POLICY "Authenticated Users Can Upload" ON storage.objects FOR INSERT USING (bucket_id IN ('get_involved_files', 'services_events_files') AND auth.role() = 'authenticated');
   ```

## Database Tables Setup

### Get Involved Table

1. From your Supabase dashboard, navigate to the SQL Editor.
2. Run the following SQL to create the `get_involved` table:

```sql
CREATE TABLE get_involved (
  id SERIAL PRIMARY KEY,
  hero_heading TEXT NOT NULL,
  hero_subheading TEXT NOT NULL,
  hero_background_image TEXT NOT NULL,
  donation_heading TEXT NOT NULL,
  donation_description TEXT NOT NULL,
  donation_bible_verse_text TEXT NOT NULL,
  donation_bible_verse_reference TEXT NOT NULL,
  donation_bible_verse_background_image TEXT NOT NULL,
  donation_button_text TEXT NOT NULL,
  donation_link TEXT NOT NULL,
  qa_heading TEXT NOT NULL,
  qa_description TEXT NOT NULL,
  qa_button_text TEXT NOT NULL,
  qa_button_link TEXT NOT NULL,
  qa_bible_verse_text TEXT NOT NULL,
  qa_bible_verse_reference TEXT NOT NULL,
  qa_bible_verse_background_image TEXT NOT NULL,
  contact_heading TEXT NOT NULL,
  contact_address TEXT NOT NULL,
  contact_subtext TEXT NOT NULL,
  contact_background_image TEXT NOT NULL,
  contact_form_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add default data
INSERT INTO get_involved (
  hero_heading,
  hero_subheading,
  hero_background_image,
  donation_heading,
  donation_description,
  donation_bible_verse_text,
  donation_bible_verse_reference,
  donation_bible_verse_background_image,
  donation_button_text,
  donation_link,
  qa_heading,
  qa_description,
  qa_button_text,
  qa_button_link,
  qa_bible_verse_text,
  qa_bible_verse_reference,
  qa_bible_verse_background_image,
  contact_heading,
  contact_address,
  contact_subtext,
  contact_background_image,
  contact_form_enabled
) VALUES (
  'Get involved\nwith the church',
  'At RCCG Rod of God Parish, we accept everyone.',
  '/images/img_group_227.png',
  'Help the\nchurch grow',
  'Giving is an act of worship and a way to make a\ndifference in our community.',
  '"Each of you should give what you\nhave decided in your heart to give,\nnot reluctantly or under compulsion,\nfor God loves a cheerful giver."',
  '— 2 Corinthians 9:7 (NIV)',
  '/images/img_verse_630x738.png',
  'Give today',
  'https://www.givelify.com/donate/redeemed-christian-church-of-god-rccg-rod-of-god-parish-indianapolis-in-2j7wy5NTU0/donation/amount',
  'Q&A and Polls',
  'We take questions from our members anonymously and\nanswer them as a community to help them grow.',
  'Go to the Q&A',
  'https://app.sli.do/event/qiPxPF7zvmaw6UxmMY9kMC/live/questions',
  '"Carry each other''s burdens, and in\nthis way you will fulfill the law of\nChrist."',
  '— Galatians 6:2 (NIV)',
  '/images/img_verse_1.png',
  'The Church Address',
  '5350 Allied Blvd, Indianapolis, IN',
  'Visit and Worship with us.',
  '/images/img_group_138.png',
  TRUE
);
```

### Services & Events Table

1. Run the following SQL to create the `services_events` table:

```sql
CREATE TABLE services_events (
  id SERIAL PRIMARY KEY,
  welcome_heading TEXT NOT NULL,
  welcome_subheading TEXT NOT NULL,
  welcome_background_image TEXT NOT NULL,
  church_info_heading TEXT NOT NULL,
  church_info_date TEXT NOT NULL,
  church_info_bible_verse TEXT NOT NULL,
  church_info_bible_reference TEXT NOT NULL,
  church_info_contacts JSONB NOT NULL,
  church_info_background_image TEXT NOT NULL,
  weekly_programs_heading TEXT NOT NULL,
  weekly_programs_description TEXT NOT NULL,
  weekly_programs JSONB NOT NULL,
  monthly_programs_heading TEXT NOT NULL,
  monthly_programs JSONB NOT NULL,
  upcoming_events_heading TEXT NOT NULL,
  upcoming_events JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add default data
INSERT INTO services_events (
  welcome_heading,
  welcome_subheading,
  welcome_background_image,
  church_info_heading,
  church_info_date,
  church_info_bible_verse,
  church_info_bible_reference,
  church_info_contacts,
  church_info_background_image,
  weekly_programs_heading,
  weekly_programs_description,
  weekly_programs,
  monthly_programs_heading,
  monthly_programs,
  upcoming_events_heading,
  upcoming_events
) VALUES (
  'Welcome to the\nRod of God Parish\nService Itenarary.',
  'At RCCG Rod of God Parish, we accept everyone.',
  '/images/img_pexels_jibarofoto_2014773.png',
  'THE YEAR OF MY GREATNESS',
  'Sunday Service January 19th, 2025.',
  'And there shall come forth a rod of out of the stem of Jesse and a branch shall grow out of his roots: And the Spirit of the Lord shall rest upon him, the spirit of wisdom and understanding in the fear of the LORD: and he shall not judge after the sight of his eyes, neither reprove after the hearing of his ears.',
  'Isaiah 11:1-3',
  '[
    { "id": 1, "label": "Pastor''s Phone:", "value": "317-418-7388" },
    { "id": 2, "label": "Pastor (Mrs) Phone:", "value": "317-833-2186" },
    { "id": 3, "label": "General Overseer:", "value": "Pastor E.A Adeboye" },
    { "id": 4, "label": "Chairman RCCGNA:", "value": "Pastor J. Fadel" },
    { "id": 5, "label": "Host Ministers:", "values": ["Pastor J.K. Balogun", "Pastor F.O. Balogun"] }
  ]',
  '/images/img_group_250.png',
  'Weekly and Monthly\nChurch Programs',
  'This team maintains the cleanliness and beauty of God''s house, creating a welcoming and reverent environment for worship.',
  '[
    {
      "id": 1,
      "title": "Sunday Prayer Meeting",
      "description": "Come worship with us every Sunday.\nWe promise you''ll be filled with the holy spirit.",
      "location": "Parish House Indianapolis.",
      "day": "Sundays",
      "time": "9am – 9:30am"
    },
    {
      "id": 2,
      "title": "Sunday School",
      "description": "Come worship with us every Sunday.\nWe promise you''ll be filled with the holy spirit.",
      "location": "Parish House Indianapolis.",
      "day": "Sundays",
      "time": "9:30am – 10:30am"
    },
    {
      "id": 3,
      "title": "Sunday Service",
      "description": "Come worship with us every Sunday.\nWe promise you''ll be filled with the holy spirit.",
      "location": "Parish House Indianapolis.",
      "day": "Sundays",
      "time": "10:30am – 1:00pm"
    }
  ]',
  'Monthly',
  '[
    {
      "id": 1,
      "title": "Thanksgiving & Anointing\nService",
      "description": "Come worship with us every Sunday.\nWe promise you''ll be filled with the holy spirit.",
      "location": "Parish House Indy",
      "day": "1st Sunday of the Month",
      "time": "10:30am – 1:00pm"
    },
    {
      "id": 2,
      "title": "Workers'' Meeting",
      "description": "Come worship with us every Sunday.\nWe promise you''ll be filled with the holy spirit.",
      "location": "Parish House Indy",
      "day": "2nd Sunday of the Month",
      "time": "1:30pm – 2:30pm"
    },
    {
      "id": 3,
      "title": "Holy Communion",
      "description": "Come worship with us every Sunday.\nWe promise you''ll be filled with the holy spirit.",
      "location": "Parish House Indy",
      "day": "Last Sunday of the Month",
      "time": "10:30am – 1:00pm"
    }
  ]',
  'Upcoming events',
  '[
    {
      "id": 1,
      "title": "Coming Soon",
      "description": "Join us at RCCG Rod of God Parish for any of our events, a powerful gathering of worship, prayer, and spiritual renewal. Our events are designed to uplift, inspire, and bring us closer to God as a community. Expect heartfelt worship, impactful teachings, and a time of fellowship with believers.",
      "location": "Parish House Indianapolis.",
      "date": "To Be Dated(TBD)",
      "image": "/images/img_edwin_andrade_4.png"
    },
    {
      "id": 2,
      "title": "Coming Soon",
      "description": "Join us at RCCG Rod of God Parish for any of our events, a powerful gathering of worship, prayer, and spiritual renewal. Our events are designed to uplift, inspire, and bring us closer to God as a community. Expect heartfelt worship, impactful teachings, and a time of fellowship with believers.",
      "location": "Parish House Indianapolis.",
      "date": "To Be Dated(TBD)",
      "image": "/images/img_worshae_bcy9e8uyuhu_unsplash.png"
    }
  ]'
);
```

## Testing the Setup

1. After completing the setup, run your development server:

```bash
npm run dev
```

2. Navigate to the admin pages to verify that the data is being loaded correctly:
   - `/admin/get-involved`: For the Get Involved page
   - `/admin/services-events`: For the Services & Events page

3. Try uploading an image and saving changes to ensure that the storage buckets and database tables are working correctly.

## Troubleshooting

If you encounter any issues:

1. Check the browser console for JavaScript errors
2. Verify that your environment variables are set correctly
3. Look at the Supabase logs in the dashboard to see if there are any API errors
4. Ensure that the RLS policies are properly configured to allow public access to images

## Additional Notes

- The application assumes that you have a `public/images` directory with the placeholder images referenced in the default data.
- All text fields that contain line breaks use the `\n` character as a delimiter.
- The JSON fields (contacts, weekly_programs, monthly_programs, upcoming_events) are stored as JSONB for better performance.
