"use client";

import React, { useState } from "react";
import ImageUpload from "../../../../components/@admin/ImageUpload";

// This is an example of how to use the ImageUpload component
// You can integrate this into existing edit components

export default function ExampleImageUploadIntegration() {
  // Example state
  const [sectionContent, setSectionContent] = useState({
    heading: "Get involved\nwith the church",
    subheading: "At RCCG Rod of God Parish, we accept everyone.",
    backgroundImage: "/images/img_group_227.png",
  });

  // Handler for image upload completion
  const handleImageUploaded = (imageUrl) => {
    setSectionContent((prev) => ({
      ...prev,
      backgroundImage: imageUrl,
    }));

    // After getting the URL, you could save the entire form
    // or just update this specific field via an API call
    console.log("New image URL:", imageUrl);
  };

  return (
    <div className="p-6 space-y-6 bg-white">
      <div className="grid grid-cols-1 gap-6">
        {/* Regular form fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Heading (use \n for line breaks)
          </label>
          <textarea
            name="heading"
            value={sectionContent.heading}
            onChange={(e) => {
              setSectionContent((prev) => ({
                ...prev,
                heading: e.target.value,
              }));
            }}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Section heading"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subheading
          </label>
          <input
            type="text"
            name="subheading"
            value={sectionContent.subheading}
            onChange={(e) => {
              setSectionContent((prev) => ({
                ...prev,
                subheading: e.target.value,
              }));
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Section subheading"
          />
        </div>

        {/* Background Image Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Image
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {/* Our custom ImageUpload component */}
              <ImageUpload
                section="hero" // This determines the folder in Supabase storage
                onImageUploaded={handleImageUploaded}
                existingImageUrl={sectionContent.backgroundImage}
              />
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Current Image:</p>
              <div className="relative h-48 w-full">
                {sectionContent.backgroundImage ? (
                  <div
                    className="h-full w-full bg-cover bg-center rounded-md border border-gray-200"
                    style={{
                      backgroundImage: `url(${sectionContent.backgroundImage})`,
                    }}
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-md border border-gray-200">
                    <span className="text-gray-400">No image selected</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Optional: Show the current image URL */}
          {sectionContent.backgroundImage && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 break-all">
                {sectionContent.backgroundImage}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={() => console.log("Save changes", sectionContent)}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
