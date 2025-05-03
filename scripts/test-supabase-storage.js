// Test script for Supabase storage connection
import { createClient } from '@supabase/supabase-js';

async function testSupabaseStorage() {
  try {
    console.log('Testing Supabase storage connection...');
    
    // Get environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    console.log('Supabase URL:', supabaseUrl);
    console.log('Supabase key available:', !!supabaseKey);
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return;
    }
    
    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // List buckets
    console.log('Listing storage buckets...');
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      return;
    }
    
    console.log('Available buckets:', buckets.map(b => b.name));
    
    // Check if home-files bucket exists
    const homeBucket = buckets.find(b => b.name === 'home-files');
    
    if (!homeBucket) {
      console.log('Creating home-files bucket...');
      const { error: createError } = await supabase.storage.createBucket('home-files', {
        public: true,
        fileSizeLimit: 5242880 // 5MB
      });
      
      if (createError) {
        console.error('Error creating home-files bucket:', createError);
      } else {
        console.log('Successfully created home-files bucket');
      }
    } else {
      console.log('home-files bucket already exists');
    }
    
    // Test uploading a small file
    const testContent = new Blob(['test content'], { type: 'text/plain' });
    const testPath = 'test-file.txt';
    
    console.log('Testing file upload to home-files bucket...');
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('home-files')
      .upload(testPath, testContent, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (uploadError) {
      console.error('Error uploading test file:', uploadError);
    } else {
      console.log('Successfully uploaded test file');
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('home-files')
        .getPublicUrl(testPath);
      
      console.log('Test file public URL:', urlData.publicUrl);
      
      // Clean up test file
      const { error: removeError } = await supabase.storage
        .from('home-files')
        .remove([testPath]);
      
      if (removeError) {
        console.error('Error removing test file:', removeError);
      } else {
        console.log('Successfully removed test file');
      }
    }
    
    console.log('Supabase storage test complete');
  } catch (error) {
    console.error('Unexpected error during test:', error);
  }
}

// Run the test
testSupabaseStorage();
