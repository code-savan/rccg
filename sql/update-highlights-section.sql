-- SQL Update Query for Highlights Section
-- This query updates the highlights section in the home_page table to match the CommunityHighlightsSection component

UPDATE home_page
SET 
  highlights_heading = 'Highlights from Our
Community',
  highlights_description = 'Experience our vibrant community through these highlights from our recent services and events.',
  highlights = '[
    "/images/H1.jpeg",
    "/images/H2.jpeg",
    "/images/H3.jpeg",
    "/images/H4.jpeg",
    "/images/H5.jpeg",
    "/images/H6.jpeg",
    "/images/H7.jpeg",
    "/images/H8.jpeg",
    "/images/H9.jpeg",
    "/images/H10.jpeg",
    "/images/H11.jpeg",
    "/images/H12.jpeg",
    "/images/H13.jpeg",
    "/images/H14.jpeg",
    "/images/H15.jpeg",
    "/images/H16.jpeg",
    "/images/H17.jpeg",
    "/images/H18.jpeg",
    "/images/H19.jpeg",
    "/images/H20.jpeg",
    "/images/H21.jpeg",
    "/images/H22.jpeg",
    "/images/H23.jpeg",
    "/images/H24.jpeg",
    "/images/H25.jpeg",
    "/images/H26.jpeg",
    "/images/H27.jpeg",
    "/images/H28.jpeg",
    "/images/H29.jpeg"
  ]'
WHERE id = 1;

-- Note: This assumes that there is a record with id = 1 in the home_page table.
-- If using a different identifier, please adjust the WHERE clause accordingly.
