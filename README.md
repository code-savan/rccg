# RCCG Rod of God Parish Website

## Overview

This is the official website for the Redeemed Christian Church of God (RCCG) Rod of God Parish, Indianapolis, Indiana. The website is built using Next.js and Tailwind CSS, with Supabase as the backend for database and storage.

## Features

- Responsive design for all devices
- Admin dashboard for content management
- Dynamic content loading from Supabase
- Image upload and management
- Interactive components for user engagement

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Supabase (PostgreSQL database and storage)
- **Deployment**: Vercel (recommended)

## Prerequisites

- [Node.js](https://nodejs.org/en/) - v16 or greater
- [npm](https://www.npmjs.com/) - v6 or greater
- [Supabase](https://supabase.com) account for database and storage

## Getting Started

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/rccg-rod-of-god.git
   cd rccg-rod-of-god
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with your Supabase credentials
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Supabase Setup

### Database Setup

1. Create a new project in Supabase
2. Navigate to the SQL Editor in the Supabase dashboard
3. Execute the SQL scripts in the following order:
   - `sql/create-home-page-table.sql` - Creates the home page table
   - `sql/create-get-involved-table.sql` - Creates the get involved table
   - `sql/create-about-us-table.sql` - Creates the about us table

### Storage Setup

1. Create the following storage buckets in your Supabase project:
   - `get-involved-files`: For files related to the Get Involved page
   - `services-events-files`: For files related to the Services & Events page
   - `about-us-files`: For files related to the About Us page
   - `home-files`: For files related to the Home page

2. Set the following permissions for each bucket:
   - Select "Public" bucket type
   - Enable "Insert" and "Select" for "anon" and "authenticated" roles
   - Disable "Update" and "Delete" for "anon" role
   - Enable "Update" and "Delete" for "authenticated" role

3. Run the `sql/create-storage-buckets.sql` script to set up the necessary RLS (Row Level Security) policies

## API Structure

The application uses RESTful API endpoints organized by section:

### Home Page Endpoints
- `GET/PUT /api/home` - Get/update all home page data
- `GET/PUT /api/home/welcome-hero` - Welcome hero section
- `GET/PUT /api/home/about` - About section
- `GET/PUT /api/home/events` - Events section
- `GET/PUT /api/home/highlights` - Highlights section
- `GET/PUT /api/home/ministers` - Ministers section
- `GET/PUT /api/home/service-times` - Service times section
- `GET/PUT /api/home/location` - Location section
- `GET/PUT /api/home/worship` - Worship with us section

### Get Involved Endpoints
- `GET/PUT /api/get-involved` - Get/update all get-involved data
- `GET/PUT /api/get-involved/hero` - Hero section
- `GET/PUT /api/get-involved/donation` - Donation section
- `GET/PUT /api/get-involved/qa` - Q&A section
- `GET/PUT /api/get-involved/contact` - Contact section

### About Us Endpoints
- `GET/PUT /api/about-us` - Get/update all about-us data
- `GET/PUT /api/about-us/hero` - Hero section
- `GET/PUT /api/about-us/welcome` - Welcome section
- `GET/PUT /api/about-us/history` - History section
- `GET/PUT /api/about-us/ministers` - Ministers section
- `GET/PUT /api/about-us/department-heads` - Department heads section
- `GET/PUT /api/about-us/departments` - Departments section
- `GET/PUT /api/about-us/next-gen-ministers` - Next gen ministers section
- `GET/PUT /api/about-us/worship-with-us` - Worship with us section

## Component Structure

### Admin Components

The admin interface is organized by page and section:

- `app/admin/home/components/` - Home page section editors
- `app/admin/get-involved/components/` - Get Involved page section editors
- `app/admin/about-us/components/` - About Us page section editors

### Shared Admin Components

Reusable components for the admin interface:

- `components/@admin/ImageUpload.jsx` - Handles image uploads to Supabase storage
- `components/@admin/AdminLayout.jsx` - Common layout for admin pages
- `components/@admin/SectionEditor.jsx` - Base component for section editors

## Using the ImageUpload Component

The ImageUpload component is used throughout the admin interface to handle image uploads:

```jsx
<ImageUpload
  section="section-name"            // Used for file path organization within the bucket
  bucketName="bucket-name-files"    // Explicit bucket name (recommended)
  onImageUploaded={handleImageUrl}  // Function to receive the public URL
  existingImageUrl={currentImage}   // Current image URL for preview
  buttonText="Custom Button Text"   // Custom text for the upload button
  className="additional-classes"    // Additional CSS classes
  disabled={isLoading}              // Disable during loading states
/>
```

### Standard Image Update Flow
For components that update a single image:
1. Pass the appropriate section and bucketName to ImageUpload
2. Implement a handleImageUploaded function to update your component state with the new URL
3. The ImageUpload component will handle the upload and call your function with the public URL

### Array Image Addition Flow
For components that add to an array of images (like HighlightsSectionEdit):
1. Pass the appropriate section and bucketName to ImageUpload
2. Implement a handler function that adds the new URL to your array of images
3. The ImageUpload component will handle the upload and call your function with the public URL

## Deployment

### Vercel Deployment

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Add the environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy the application

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/)
- [React](https://reactjs.org/)
- [Heroicons](https://heroicons.com/)
