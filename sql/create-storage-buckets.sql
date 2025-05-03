-- Create storage buckets for the RCCG website
-- Note: This SQL should be run in the Supabase SQL Editor

-- Create policies for public access to storage buckets
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (
  bucket_id IN ('get-involved-files', 'services-events-files', 'about-us-files', 'home-files')
);

-- Create policies for authenticated users to upload files
CREATE POLICY "Authenticated Users Can Upload" ON storage.objects FOR INSERT USING (
  bucket_id IN ('get-involved-files', 'services-events-files', 'about-us-files', 'home-files') 
  AND auth.role() = 'authenticated'
);

-- Create policies for authenticated users to update files
CREATE POLICY "Authenticated Users Can Update" ON storage.objects FOR UPDATE USING (
  bucket_id IN ('get-involved-files', 'services-events-files', 'about-us-files', 'home-files') 
  AND auth.role() = 'authenticated'
);

-- Create policies for authenticated users to delete files
CREATE POLICY "Authenticated Users Can Delete" ON storage.objects FOR DELETE USING (
  bucket_id IN ('get-involved-files', 'services-events-files', 'about-us-files', 'home-files') 
  AND auth.role() = 'authenticated'
);
