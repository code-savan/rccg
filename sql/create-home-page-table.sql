-- Create the home_page table
CREATE TABLE IF NOT EXISTS home_page (
  id SERIAL PRIMARY KEY,
  
  -- Welcome Hero Section
  welcome_title TEXT NOT NULL,
  welcome_subtitle TEXT NOT NULL,
  welcome_button_text TEXT NOT NULL,
  welcome_bible_verses JSONB NOT NULL,
  welcome_background_image TEXT NOT NULL,
  
  -- About Section
  about_title TEXT NOT NULL,
  about_content TEXT NOT NULL,
  
  -- Events Section
  events_title TEXT NOT NULL,
  events_subtitle TEXT NOT NULL,
  events JSONB NOT NULL,
  
  -- Highlights Section
  highlights_title TEXT NOT NULL,
  highlights_subtitle TEXT NOT NULL,
  highlights JSONB NOT NULL,
  
  -- Ministers Section
  ministers_title TEXT NOT NULL,
  ministers_subtitle TEXT NOT NULL,
  ministers JSONB NOT NULL,
  
  -- Service Times Section
  service_times_title TEXT NOT NULL,
  service_times_subtitle TEXT NOT NULL,
  service_times JSONB NOT NULL,
  
  -- Location Section
  location_title TEXT NOT NULL,
  location_address TEXT NOT NULL,
  location_map_url TEXT NOT NULL,
  location_image TEXT NOT NULL,
  
  -- Worship With Us Section
  worship_title TEXT NOT NULL,
  worship_description TEXT NOT NULL,
  worship_buttons JSONB NOT NULL,
  worship_bible_verse TEXT NOT NULL,
  worship_bible_reference TEXT NOT NULL,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_home_page_timestamp
BEFORE UPDATE ON home_page
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Insert default data
INSERT INTO home_page (
  -- Welcome Hero Section
  welcome_title,
  welcome_subtitle,
  welcome_button_text,
  welcome_bible_verses,
  welcome_background_image,
  
  -- About Section
  about_title,
  about_content,
  
  -- Events Section
  events_title,
  events_subtitle,
  events,
  
  -- Highlights Section
  highlights_title,
  highlights_subtitle,
  highlights,
  
  -- Ministers Section
  ministers_title,
  ministers_subtitle,
  ministers,
  
  -- Service Times Section
  service_times_title,
  service_times_subtitle,
  service_times,
  
  -- Location Section
  location_title,
  location_address,
  location_map_url,
  location_image,
  
  -- Worship With Us Section
  worship_title,
  worship_description,
  worship_buttons,
  worship_bible_verse,
  worship_bible_reference
) VALUES (
  -- Welcome Hero Section
  'Welcome to the\nRedeemed Christian\nChurch of God.',
  'Rod Of God Parish, Indianapolis Indiana USA.',
  'Learn more',
  '[
    {
      "verse": "For where two or three gather in my name, there am I with them.",
      "reference": "Matthew 18:20 (NIV)"
    },
    {
      "verse": "Come to me, all you who are weary and burdened, and I will give you rest.",
      "reference": "Matthew 11:28 (NIV)"
    },
    {
      "verse": "I can do all this through him who gives me strength.",
      "reference": "Philippians 4:13 (NIV)"
    }
  ]',
  '/images/welcome-bg.jpg',
  
  -- About Section
  'ABOUT OUR CHURCH',
  'RCCG Rod of God Parish is a vibrant, Spirit-filled church committed to building a community of believers passionate about God and dedicated to making a positive impact in Indianapolis and beyond. Our church is part of the Redeemed Christian Church of God global network and upholds its values and mission.\n\nOur services combine powerful worship, prayer, and Biblical teaching in a welcoming environment where everyone belongs. We believe in nurturing spiritual growth at every age and life stage.',
  
  -- Events Section
  'UPCOMING EVENTS',
  'Join us for these upcoming events and be part of our community.',
  '[
    {
      "id": 1,
      "title": "Sunday Service",
      "date": "Every Sunday",
      "time": "10:00 AM - 12:00 PM",
      "location": "Main Sanctuary",
      "description": "Join us for worship, prayer, and the Word.",
      "image": "/images/sunday-service.jpg"
    },
    {
      "id": 2,
      "title": "Bible Study",
      "date": "Every Wednesday",
      "time": "7:00 PM - 8:30 PM",
      "location": "Fellowship Hall",
      "description": "Deepen your understanding of Scripture.",
      "image": "/images/bible-study.jpg"
    },
    {
      "id": 3,
      "title": "Youth Night",
      "date": "Every Friday",
      "time": "6:00 PM - 8:00 PM",
      "location": "Youth Center",
      "description": "Fun, fellowship, and faith for our youth.",
      "image": "/images/youth-night.jpg"
    }
  ]',
  
  -- Highlights Section
  'COMMUNITY HIGHLIGHTS',
  'See what\'s happening in our church community.',
  '[
    "/images/highlight1.jpg",
    "/images/highlight2.jpg",
    "/images/highlight3.jpg",
    "/images/highlight4.jpg",
    "/images/highlight5.jpg",
    "/images/highlight6.jpg"
  ]',
  
  -- Ministers Section
  'OUR MINISTERS',
  'Meet our dedicated spiritual leaders who serve and guide our congregation.',
  '[
    {
      "id": 1,
      "name": "Pastor John Smith",
      "role": "Senior Pastor",
      "bio": "Pastor John has served in ministry for over 20 years and is passionate about equipping believers to live out their faith.",
      "image": "/images/minister1.jpg"
    },
    {
      "id": 2,
      "name": "Pastor Mary Johnson",
      "role": "Associate Pastor",
      "bio": "Pastor Mary leads our women\'s ministry and counseling programs, bringing comfort and wisdom to many.",
      "image": "/images/minister2.jpg"
    },
    {
      "id": 3,
      "name": "Pastor David Williams",
      "role": "Youth Pastor",
      "bio": "Pastor David has a heart for young people and works to help them build a strong foundation in Christ.",
      "image": "/images/minister3.jpg"
    }
  ]',
  
  -- Service Times Section
  'SERVICE TIMES',
  'Join us for worship and fellowship at these times.',
  '[
    {
      "id": 1,
      "day": "Sunday",
      "services": [
        {
          "name": "Sunday School",
          "time": "9:00 AM - 10:00 AM"
        },
        {
          "name": "Worship Service",
          "time": "10:30 AM - 12:30 PM"
        }
      ]
    },
    {
      "id": 2,
      "day": "Wednesday",
      "services": [
        {
          "name": "Bible Study",
          "time": "7:00 PM - 8:30 PM"
        }
      ]
    },
    {
      "id": 3,
      "day": "Friday",
      "services": [
        {
          "name": "Prayer Meeting",
          "time": "7:00 PM - 8:00 PM"
        }
      ]
    }
  ]',
  
  -- Location Section
  'OUR LOCATION',
  '5350 Allied Blvd, Indianapolis, IN 46268',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.5123660098347!2d-86.25018388461928!3d39.90607897942783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8814ade59c1a2e83%3A0x5cce2f8e1f4c49e6!2s5350%20W%2086th%20St%2C%20Indianapolis%2C%20IN%2046268!5e0!3m2!1sen!2sus!4v1620160000000!5m2!1sen!2sus',
  '/images/location.jpeg',
  
  -- Worship With Us Section
  'Come worship\nwith us',
  'Come worship with us every Sunday.\nWe promise you\'ll be filled with the holy spirit.',
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
  ]',
  'For where two or three gather in my name, there am I with them.',
  'Matthew 18:20 (NIV)'
);
