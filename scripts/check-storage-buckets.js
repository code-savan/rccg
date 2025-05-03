// Script to check and create required Supabase storage buckets
import { createClient } from '../lib/supabase.js';

async function checkAndCreateBuckets() {
  try {
    console.log('Checking Supabase storage buckets...');
    const supabase = createClient();
    
    // List of required buckets
    const requiredBuckets = [
      'get-involved-files',
      'services-events-files',
      'about-us-files',
      'home-files'
    ];
    
    // Get existing buckets
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('Error listing buckets:', error);
      return;
    }
    
    const existingBuckets = buckets.map(bucket => bucket.name);
    console.log('Existing buckets:', existingBuckets);
    
    // Create missing buckets
    for (const bucketName of requiredBuckets) {
      if (!existingBuckets.includes(bucketName)) {
        console.log(`Creating bucket: ${bucketName}`);
        const { error: createError } = await supabase.storage.createBucket(bucketName, {
          public: true,
          fileSizeLimit: 5242880 // 5MB
        });
        
        if (createError) {
          console.error(`Error creating bucket ${bucketName}:`, createError);
        } else {
          console.log(`Successfully created bucket: ${bucketName}`);
        }
      } else {
        console.log(`Bucket already exists: ${bucketName}`);
      }
    }
    
    console.log('Storage bucket check complete');
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Run the function
checkAndCreateBuckets();
