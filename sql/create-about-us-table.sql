-- Create the about_us table
CREATE TABLE IF NOT EXISTS about_us (
  id SERIAL PRIMARY KEY,
  hero_heading TEXT NOT NULL,
  hero_subheading TEXT NOT NULL,
  hero_background_image TEXT NOT NULL,
  
  -- Welcome Section
  welcome_heading TEXT NOT NULL,
  welcome_description TEXT NOT NULL,
  
  -- History Section
  history_heading TEXT NOT NULL,
  history_content TEXT NOT NULL,
  history_image TEXT NOT NULL,
  
  -- Ministers Section
  ministers_heading TEXT NOT NULL,
  ministers_description TEXT NOT NULL,
  ministers JSONB NOT NULL,
  
  -- Department Heads Section
  department_heads_heading TEXT NOT NULL,
  department_heads_description TEXT NOT NULL,
  department_heads JSONB NOT NULL,
  
  -- Departments Section
  departments_heading TEXT NOT NULL,
  departments_description TEXT NOT NULL,
  departments JSONB NOT NULL,
  
  -- Next Gen Ministers Section
  next_gen_ministers_heading TEXT NOT NULL,
  next_gen_ministers_description TEXT NOT NULL,
  next_gen_ministers JSONB NOT NULL,
  
  -- Worship With Us Section
  worship_with_us_heading TEXT NOT NULL,
  worship_with_us_description TEXT NOT NULL,
  worship_with_us_background_image TEXT NOT NULL,
  worship_with_us_bible_verse TEXT,
  worship_with_us_bible_reference TEXT,
  worship_with_us_buttons JSONB,
  
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

CREATE TRIGGER update_about_us_timestamp
BEFORE UPDATE ON about_us
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Insert default data
INSERT INTO about_us (
  hero_heading,
  hero_subheading,
  hero_background_image,
  
  welcome_heading,
  welcome_description,
  
  history_heading,
  history_content,
  history_image,
  
  ministers_heading,
  ministers_description,
  ministers,
  
  department_heads_heading,
  department_heads_description,
  department_heads,
  
  departments_heading,
  departments_description,
  departments,
  
  next_gen_ministers_heading,
  next_gen_ministers_description,
  next_gen_ministers,
  
  worship_with_us_heading,
  worship_with_us_description,
  worship_with_us_background_image,
  worship_with_us_bible_verse,
  worship_with_us_bible_reference,
  worship_with_us_buttons
) VALUES (
  'About Us',
  'Learn more about RCCG Rod of God Parish and our mission.',
  '/images/about-hero.jpg',
  
  'WELCOME TO ROD OF GOD PARISH',
  "We are a vibrant, Spirit-filled church committed to building a community of believers passionate about God and dedicated to making a positive impact in Indianapolis and beyond. Our church is part of the Redeemed Christian Church of God global network and upholds its values and mission.\n\nAt RCCG Rod of God Parish, we believe in the power of prayer, worship, and the Word of God. We are committed to helping individuals grow in their faith and discover their God-given purpose. Our various ministries cater to different age groups and interests, ensuring that everyone has a place where they can serve, grow, and connect.\n\nWhether you're new to faith or have been walking with God for years, we have a place for you. Our dedicated team of ministers and department heads are here to help you get connected.",
  
  'OUR HISTORY',
  'RCCG Rod of God Parish was established in [2009] as part of the Redeemed Christian Church of God (RCCG) network, a global church with millions of members worldwide. From humble beginnings, God has blessed our church to grow into a thriving community of worshippers, committed to the Great Commission.\n\nThrough prayer, faith, and dedication, we have expanded our ministries, outreach programs, and impact in Indianapolis and beyond. Today, we continue to build on the vision of holiness, evangelism, and community transformation.',
  '/images/history.jpeg',
  
  'Our Ministers',
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
  
  'Department Heads',
  'Meet the dedicated leaders who oversee various departments in our church.',
  '[
    {
      "id": 1,
      "name": "Oladipupo Baruwa",
      "role": "HOD Protocol",
      "bio": "Leads our protocol team, ensuring that our services and events run smoothly and with excellence.",
      "image": "/images/dept-head1.jpg"
    },
    {
      "id": 2,
      "name": "Oluwaseun Oladeji",
      "role": "HOD Media",
      "bio": "Oversees our media department, managing our online presence and technical aspects of our services.",
      "image": "/images/dept-head2.jpg"
    },
    {
      "id": 3,
      "name": "Adeola Akinola",
      "role": "HOD Children",
      "bio": "Leads our children\'s ministry, nurturing the spiritual growth of our youngest members.",
      "image": "/images/dept-head3.jpg"
    }
  ]',
  
  'Our Departments',
  'Explore the various departments that make our church function effectively.',
  '[
    {
      "id": 1,
      "name": "Worship",
      "description": "Our worship team leads the congregation in praise and worship, creating an atmosphere for God\'s presence.",
      "image": "/images/dept1.jpg"
    },
    {
      "id": 2,
      "name": "Children",
      "description": "Our children\'s ministry provides age-appropriate teaching and activities for kids to grow in their faith.",
      "image": "/images/dept2.jpg"
    },
    {
      "id": 3,
      "name": "Media",
      "description": "Our media team handles sound, lighting, video, and online streaming to enhance the worship experience.",
      "image": "/images/dept3.jpg"
    },
    {
      "id": 4,
      "name": "Protocol",
      "description": "Our protocol team ensures that services run smoothly and that everyone feels welcome and comfortable.",
      "image": "/images/dept4.jpg"
    }
  ]',
  
  'Next Gen Ministers',
  'Meet our Next Generation Ministers who lead and mentor our youth and young adults.',
  '[
    {
      "id": 1,
      "name": "Segun Oladeji",
      "role": "Next Gen Minister",
      "bio": "Passionate about helping young people discover their purpose and develop their leadership potential.",
      "image": "/images/nextgen1.jpg"
    },
    {
      "id": 2,
      "name": "Tolu Akinola",
      "role": "Next Gen Minister",
      "bio": "Dedicated to creating spaces where young adults can grow in their faith and build meaningful relationships.",
      "image": "/images/nextgen2.jpg"
    },
    {
      "id": 3,
      "name": "Dami Baruwa",
      "role": "Next Gen Minister",
      "bio": "Committed to equipping the next generation with biblical principles for life and leadership.",
      "image": "/images/nextgen3.jpg"
    }
  ]',
  
  'Come worship with us',
  'Join us for worship every Sunday and experience the presence of God.',
  '/images/worship.jpg',
  'For where two or three gather in my name, there am I with them.',
  'Matthew 18:20 (NIV)',
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
  ]'
);
