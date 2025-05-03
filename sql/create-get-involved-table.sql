-- Create the get_involved table
CREATE TABLE IF NOT EXISTS get_involved (
  id SERIAL PRIMARY KEY,
  
  -- Hero Section
  hero_heading TEXT NOT NULL,
  hero_subheading TEXT NOT NULL,
  hero_background_image TEXT NOT NULL,
  
  -- Donation Section
  donation_heading TEXT NOT NULL,
  donation_description TEXT NOT NULL,
  donation_methods JSONB NOT NULL,
  
  -- Q&A Section
  qa_heading TEXT NOT NULL,
  qa_description TEXT NOT NULL,
  qa_items JSONB NOT NULL,
  
  -- Contact Section
  contact_heading TEXT NOT NULL,
  contact_description TEXT NOT NULL,
  contact_address TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_map_url TEXT NOT NULL,
  
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

CREATE TRIGGER update_get_involved_timestamp
BEFORE UPDATE ON get_involved
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Insert default data
INSERT INTO get_involved (
  -- Hero Section
  hero_heading,
  hero_subheading,
  hero_background_image,
  
  -- Donation Section
  donation_heading,
  donation_description,
  donation_methods,
  
  -- Q&A Section
  qa_heading,
  qa_description,
  qa_items,
  
  -- Contact Section
  contact_heading,
  contact_description,
  contact_address,
  contact_phone,
  contact_email,
  contact_map_url
) VALUES (
  'Get involved\nwith the church',
  'At RCCG Rod of God Parish, we accept everyone.',
  '/images/img_group_227.png',
  'THE YEAR OF MY GREATNESS',
  'We believe in the power of giving and its ability to transform lives. Your generous donations help us continue our mission of spreading God''s love and making a positive impact in our community and beyond.',
  '[
    {
      "id": 1,
      "title": "Online Giving",
      "description": "Give securely online through our website or mobile app.",
      "icon": "credit-card"
    },
    {
      "id": 2,
      "title": "Bank Transfer",
      "description": "Transfer directly to our church account.",
      "icon": "bank"
    },
    {
      "id": 3,
      "title": "In-Person",
      "description": "Give during our worship services.",
      "icon": "church"
    }
  ]',
  'Frequently Asked Questions',
  'Find answers to common questions about getting involved at RCCG Rod of God Parish.',
  '[
    {
      "id": 1,
      "question": "How can I become a member?",
      "answer": "You can become a member by attending our membership class, which is held on the first Sunday of each month after the service. Please register at the welcome desk or contact our office for more information."
    },
    {
      "id": 2,
      "question": "What ministries can I join?",
      "answer": "We have various ministries including Worship, Children, Youth, Men, Women, Outreach, and more. You can learn about each ministry and sign up to serve at our ministry fair or by contacting our office."
    },
    {
      "id": 3,
      "question": "Do you have small groups?",
      "answer": "Yes, we have small groups that meet throughout the week in different locations. These groups provide an opportunity for fellowship, Bible study, and prayer in a more intimate setting."
    },
    {
      "id": 4,
      "question": "How can I volunteer?",
      "answer": "We have many volunteer opportunities available. You can sign up to serve at the welcome desk, through our website, or by contacting our office. We'll help you find a place to serve based on your gifts and interests."
    }
  ]',
  'Contact Us',
  'We''d love to hear from you! Reach out to us with any questions, prayer requests, or to learn more about our church.',
  '5350 Allied Blvd, Indianapolis, IN 46268',
  '(317) 555-1234',
  'info@rccgrodofgod.org',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.5123660098347!2d-86.25018388461928!3d39.90607897942783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8814ade59c1a2e83%3A0x5cce2f8e1f4c49e6!2s5350%20W%2086th%20St%2C%20Indianapolis%2C%20IN%2046268!5e0!3m2!1sen!2sus!4v1620160000000!5m2!1sen!2sus'
);
