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
   - `get-involved-files`: For storing files related to the Get Involved page
   - `services-events-files`: For storing files related to the Services & Events page
   - `about-us-files`: For storing files related to the About Us page

3. Set up RLS (Row Level Security) policies for each bucket:
   - For publicly viewable images, add the following policy for anonymous access:

   ```sql
   CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id IN ('get-involved-files', 'services-events-files', 'about-us-files'));
   ```

   - For authenticated users (admins) to upload files:

   ```sql
   CREATE POLICY "Authenticated Users Can Upload" ON storage.objects FOR INSERT USING (bucket_id IN ('get-involved-files', 'services-events-files', 'about-us-files') AND auth.role() = 'authenticated');
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

### About Us Table

1. Run the following SQL to create the `about_us` table:

```sql
CREATE TABLE about_us (
  id SERIAL PRIMARY KEY,
  hero_heading TEXT NOT NULL,
  hero_subheading TEXT NOT NULL,
  hero_background_image TEXT NOT NULL,
  about_text_heading TEXT NOT NULL,
  about_text_content TEXT NOT NULL,
  history_heading TEXT NOT NULL,
  history_content TEXT NOT NULL,
  history_image TEXT NOT NULL,
  ministers_heading TEXT NOT NULL,
  ministers_description TEXT NOT NULL,
  ministers JSONB NOT NULL,
  church_ministers_heading TEXT NOT NULL,
  church_ministers_description TEXT NOT NULL,
  church_ministers JSONB NOT NULL,
  department_heads_heading TEXT NOT NULL,
  department_heads_description TEXT NOT NULL,
  department_heads JSONB NOT NULL,
  departments_heading TEXT NOT NULL,
  departments_description TEXT NOT NULL,
  departments JSONB NOT NULL,
  nextgen_ministry_title TEXT NOT NULL,
  nextgen_ministry_description TEXT NOT NULL,
  nextgen_ministry_image TEXT NOT NULL,
  nextgen_ministers_heading TEXT NOT NULL,
  nextgen_ministers_description TEXT NOT NULL,
  nextgen_ministers JSONB NOT NULL,
  worship_with_us_heading TEXT NOT NULL,
  worship_with_us_description TEXT NOT NULL,
  worship_with_us_schedule JSONB NOT NULL,
  worship_with_us_location TEXT NOT NULL,
  worship_with_us_image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add default data
INSERT INTO about_us (
  hero_heading,
  hero_subheading,
  hero_background_image,
  about_text_heading,
  about_text_content,
  history_heading,
  history_content,
  history_image,
  ministers_heading,
  ministers_description,
  ministers,
  church_ministers_heading,
  church_ministers_description,
  church_ministers,
  department_heads_heading,
  department_heads_description,
  department_heads,
  departments_heading,
  departments_description,
  departments,
  nextgen_ministry_title,
  nextgen_ministry_description,
  nextgen_ministry_image,
  nextgen_ministers_heading,
  nextgen_ministers_description,
  nextgen_ministers,
  worship_with_us_heading,
  worship_with_us_description,
  worship_with_us_schedule,
  worship_with_us_location,
  worship_with_us_image
) VALUES (
  'Welcome to RCCG\nRod of God Parish',
  'A place to grow in faith and community.',
  '/images/hero.jpeg',
  'ABOUT OUR CHURCH',
  "RCCG ROG is a Bible-based, evangelistic, Spirit-empowered church.
At RCCG ROG, we're all about people, because God is all about people.\n\nOne of the ways we express our love for Him is through our love for people, and we do this by helping people who come to RCCG ROG to grow in their
relationship with the Lord.\n\nWant to get started? We'd love for you to join us for a service, and we're
here to help you get connected.",
  'OUR HISTORY',
  'RCCG Rod of God Parish was established in [2009] as part of the Redeemed Christian Church of God (RCCG) network, a global church with millions of members worldwide. From humble beginnings, God has blessed our church to grow into a thriving community of worshippers, committed to the Great Commission.\n\nThrough prayer, faith, and dedication, we have expanded our ministries, outreach programs, and impact in Indianapolis and beyond. Today, we continue to build on the vision of holiness, evangelism, and community transformation.',
  '/images/history.jpeg',
  'Our Ministers',
  'Meet our dedicated spiritual leaders who serve and guide our congregation with wisdom and compassion.',
  '[
    {
      "id": 1,
      "name": "Pastor J.K Balogun",
      "role": "Head Pastor",
      "bio": "",
      "image": "/images/img_dsc_5797.png"
    },
    {
      "id": 2,
      "name": "Pastor(Mrs) F.O Balogun",
      "role": "Head Pastor",
      "bio": "",
      "image": "/images/img_dsc_9587.png"
    }
  ]',
  'CHURCH MINISTERS',
  'Our church ministers lead various ministries and serve our congregation in specialized areas.',
  '[
    {
      "id": 1,
      "name": "Pastor Bolanle Sowole",
      "role": "Minister",
      "bio": "",
      "image": "/images/img_dsc_9310.png"
    },
    {
      "id": 2,
      "name": "Sister Omolade Babalola",
      "role": "Minister",
      "bio": "",
      "image": "/images/img_dsc_9297.png"
    },
    {
      "id": 3,
      "name": "Bro Jide Akinsole",
      "role": "Minister",
      "bio": "",
      "image": "/images/img_dsc_9242.png"
    },
    {
      "id": 4,
      "name": "Dcn. Emmanuel Onakoya",
      "role": "Minister",
      "bio": "",
      "image": "/images/img_dsc_9206.png"
    },
    {
      "id": 5,
      "name": "Dcn. Goke Fadeyi",
      "role": "Minister",
      "bio": "",
      "image": "/images/img_dsc_9251.png"
    },
    {
      "id": 6,
      "name": "Dcn. Kolade Omodele",
      "role": "Minister",
      "bio": "",
      "image": "/images/img_dsc_9350.png"
    },
    {
      "id": 7,
      "name": "Pastor Gboyega Akanle",
      "role": "Minister",
      "bio": "",
      "image": "/images/img_dsc_9348.png"
    },
    {
      "id": 8,
      "name": "PST. Temitope Owoeye",
      "role": "Minister",
      "bio": "",
      "image": "/images/img_dsc_9341.png"
    },
    {
      "id": 9,
      "name": "Dcn Bamidele Ojo",
      "role": "Minister",
      "bio": "",
      "image": "/images/img_dsc_9322.png"
    },
    {
      "id": 10,
      "name": "Dcn. Adeola Tawede",
      "role": "Minister",
      "bio": "",
      "image": "/images/img_dsc_9284.png"
    },
    {
      "id": 11,
      "name": "Dcn. Abel Makanjuola",
      "role": "Minister",
      "bio": "",
      "image": "/images/img_dsc_9277.png"
    },
    {
      "id": 12,
      "name": "Dr Yemi Ilesanmi",
      "role": "Minister",
      "bio": "",
      "image": "/images/img_dsc_9268.png"
    },
    {
      "id": 13,
      "name": "Pastor Dare Sylvester",
      "role": "Minister",
      "bio": "",
      "image": "/images/img_dsc_9256.png"
    },
    {
      "id": 14,
      "name": "Dr. Ayo Oshinnowo",
      "role": "Minister",
      "bio": "",
      "image": "/images/img_dsc_9245.png"
    },
    {
      "id": 15,
      "name": "Bro Soji Toriola",
      "role": "Minister",
      "bio": "",
      "image": "/images/img_dsc_9408.png"
    },
    {
      "id": 16,
      "name": "Bro Mfon Obot",
      "role": "Minister",
      "bio": "",
      "image": "/images/img_dsc_9293.png"
    },
    {
      "id": 17,
      "name": "Pst. Feyisayo Owoeye",
      "role": "Minister",
      "bio": "",
      "image": "/images/nhjsdkjd1.jpeg"
    },
    {
      "id": 18,
      "name": "Dcns Eniola Omodele",
      "role": "Minister",
      "bio": "",
      "image": "/images/jsdnjbjhosdh.jpeg"
    },
    {
      "id": 19,
      "name": "Dcn Isaac Ademakinwa",
      "role": "Minister",
      "bio": "",
      "image": "/images/osbhsabjhbasi.jpeg"
    }
  ]',
  'DEPARTMENT HEADS',
  'Our department heads coordinate various functions to ensure the smooth operation of our church.',
  '[
    {
      "id": 1,
      "name": "Oladipupo Baruwa",
      "role": "HOD Protocol",
      "bio": "",
      "image": "/images/img_dsc_9396.png"
    },
    {
      "id": 2,
      "name": "Yetunde Ajanaku",
      "role": "HOD Choir",
      "bio": "",
      "image": "/images/img_dsc_9388.png"
    },
    {
      "id": 3,
      "name": "Oloyede Amure",
      "role": "HOD Soccer Team",
      "bio": "",
      "image": "/images/img_dsc_9374.png"
    },
    {
      "id": 4,
      "name": "Segun Oladeji",
      "role": "HOD Publication",
      "bio": "",
      "image": "/images/img_dsc_9404.png"
    },
    {
      "id": 5,
      "name": "David Ayodele",
      "role": "HOD Drama",
      "bio": "",
      "image": "/images/img_dsc_9420.png"
    },
    {
      "id": 6,
      "name": "Pastor(Mrs) F.O Balogun",
      "role": "HOD Sanctuary",
      "bio": "",
      "image": "/images/img_dsc_9495.png"
    },
    {
      "id": 7,
      "name": "Bro Ademola Karonwi",
      "role": "HOD Children''s Dept.",
      "bio": "",
      "image": "/images/img_dsc_9511.png"
    }
  ]',
  'OUR DEPARTMENTS',
  'Our church operates through various departments, each playing a vital role in our ministry.',
  '[
    {
      "id": 1,
      "name": "Choir",
      "description": "Our Choir leads the congregation in heartfelt worship, creating an atmosphere where God''s presence is felt through spirit-filled songs and praise.",
      "image": "/images/img_pexels_cottonbro_7520369.png",
      "head": "Yetunde Ajanaku"
    },
    {
      "id": 2,
      "name": "Sunday School",
      "description": "Sunday School is a time of deep biblical teaching, helping believers grow in faith, understanding, and practical Christian living.",
      "image": "/images/img_dsc_9200.png",
      "head": ""
    },
    {
      "id": 3,
      "name": "Welfare",
      "description": "The Welfare Department extends God''s love through acts of kindness, providing support and care to those in need within the church and community.",
      "image": "/images/img_dsc_9539.png",
      "head": ""
    },
    {
      "id": 4,
      "name": "Ushering",
      "description": "Our Ushers ensure a warm and welcoming worship experience by assisting with seating, orderliness, and ensuring a smooth flow during services.",
      "image": "/images/img_pexels_kawerodr.png",
      "head": ""
    },
    {
      "id": 5,
      "name": "Sound & Media",
      "description": "The Sound & Media team enhances worship by managing audio, visuals, and live streaming, ensuring every message is delivered with clarity and excellence.",
      "image": "/images/img_dsc_9519.png",
      "head": "Segun Oladeji"
    },
    {
      "id": 6,
      "name": "Special Duties",
      "description": "The Special Duties team provides essential support for church programs, coordinating logistics and ensuring smooth event execution.",
      "image": "/images/img_dsc_9552.png",
      "head": ""
    },
    {
      "id": 7,
      "name": "Children''s Ministry",
      "description": "Our Children''s Ministry nurtures young hearts in the faith through age-appropriate teaching, fun activities, and spiritual development.",
      "image": "/images/img_dsc_9435.png",
      "head": "Bro Ademola Karonwi"
    },
    {
      "id": 8,
      "name": "Accounting",
      "description": "The Accounting team ensures transparency and stewardship in managing church finances, handling tithes, offerings, and budgets with integrity.",
      "image": "/images/img_dsc_9221.png",
      "head": ""
    },
    {
      "id": 9,
      "name": "Transportation",
      "description": "The Transportation team ensures that members and visitors can attend services and events with ease, providing reliable transport solutions.",
      "image": "/images/img_dsc_9484.png",
      "head": ""
    },
    {
      "id": 10,
      "name": "Sanctuary Keeper & Beautifiers",
      "description": "This team maintains the cleanliness and beauty of God''s house, creating a welcoming and reverent environment for worship.",
      "image": "/images/img_kevin_wright_4s_482x630.png",
      "head": "Pastor(Mrs) F.O Balogun"
    }
  ]',
  'THE NEXT GEN MINISTRY',
  'At RCCG Rod of God Parish, our Youth Church is a vibrant community where young people grow in faith, purpose, and fellowship. Join us and be part of a movement for God!',
  '/images/hero.jpeg',
  'NEXTGEN MINISTERS',
  'Our youth leaders guide and mentor the next generation of believers.',
  '[
    {
      "id": 1,
      "name": "Segun Oladeji",
      "role": "Next Gen Minister",
      "bio": "",
      "image": "/images/img_dsc_9404.png"
    },
    {
      "id": 2,
      "name": "Janet Oluwayomi",
      "role": "",
      "bio": "",
      "image": "/images/WhatsApp Image 2025-03-06 at 19.50.11_050ee46d.png"
    },
    {
      "id": 3,
      "name": "Temitope Ann Aluko",
      "role": "Next Gen Minister",
      "bio": "",
      "image": "/images/WhatsApp Image 2025-03-06 at 19.50.12_313e4a70.png"
    },
    {
      "id": 4,
      "name": "Susanah Amure",
      "role": "",
      "bio": "",
      "image": "/images/WhatsApp Image 2025-03-06 at 19.50.12_6dc5a47c.png"
    }
  ]',
  'Come worship\nwith us',
  'Come worship with us every Sunday.\nWe promise you''ll be filled with the holy spirit.',
  '[
    {
      "id": 1,
      "day": "Sunday",
      "services": [
        { "id": 101, "time": "9:00 AM", "name": "Sunday School" },
        { "id": 102, "time": "10:30 AM", "name": "Main Service" }
      ]
    },
    {
      "id": 2,
      "day": "Wednesday",
      "services": [
        { "id": 201, "time": "7:00 PM", "name": "Bible Study" }
      ]
    },
    {
      "id": 3,
      "day": "Friday",
      "services": [
        { "id": 301, "time": "7:00 PM", "name": "Prayer Meeting" }
      ]
    }
  ]',
  '5350 Allied Blvd, Indianapolis, IN',
  '/images/img_verse.png'
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
   - `/admin/about-us`: For the About Us page

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
- The JSON fields (contacts, weekly_programs, monthly_programs, upcoming_events, ministers, etc.) are stored as JSONB for better performance.
