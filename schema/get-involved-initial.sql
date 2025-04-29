-- Initial data for the get-involved table

-- Insert default values if the table is empty
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
  contact_background_image
)
SELECT
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
  '/images/img_group_138.png'
WHERE NOT EXISTS (SELECT 1 FROM get_involved);
