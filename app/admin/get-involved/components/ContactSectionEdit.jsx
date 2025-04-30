"use client";

import React, { useState } from "react";
import ImageUpload from "../../../../components/@admin/ImageUpload";

export default function ContactSectionEdit() {
  const [sectionContent, setSectionContent] = useState({
    heading: "The Church Address",
    address: "5350 Allied Blvd, Indianapolis, IN",
    subtext: "Visit and Worship with us.",
    backgroundImage: "/images/img_group_138.png",
    contactFormEnabled: true,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionContent((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for image upload completion
  const handleImageUploaded = (imageUrl) => {
    setSectionContent((prev) => ({
      ...prev,
      backgroundImage: imageUrl,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSectionContent((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved contact section content:", sectionContent);
    // API call would go here
  };

  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Contact Section</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm border border-gray-200 bg-white rounded-md hover:bg-gray-50"
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {!isEditing ? (
        <div className="p-8 bg-white">
          <div
            className="h-[500px] rounded-lg p-8 bg-cover bg-center relative"
            style={{
              backgroundImage: `url(${sectionContent.backgroundImage})`,
            }}
          >
            <div className="flex flex-col md:flex-row justify-between h-full">
              {/* Left side - sample contact form */}
              {sectionContent.contactFormEnabled && (
                <div className="flex-1 flex flex-col gap-4 max-w-xl">
                  <div className="mb-6">
                    <h4 className="text-lg text-white font-medium">
                      Sample Contact Form
                    </h4>
                    <p className="text-white text-opacity-70">
                      The actual form appears on the public site
                    </p>
                  </div>

                  <div className="rounded-lg bg-white bg-opacity-10 text-white p-3 border border-white border-opacity-20">
                    Name Field
                  </div>

                  <div className="flex gap-4">
                    <div className="rounded-lg bg-white bg-opacity-10 text-white p-3 border border-white border-opacity-20 flex-1">
                      Country Dropdown
                    </div>
                    <div className="rounded-lg bg-white bg-opacity-10 text-white p-3 border border-white border-opacity-20 flex-1">
                      Phone Field
                    </div>
                  </div>

                  <div className="rounded-lg bg-white bg-opacity-10 text-white p-3 border border-white border-opacity-20">
                    Email Field
                  </div>

                  <div className="rounded-lg bg-white bg-opacity-10 text-white p-3 border border-white border-opacity-20 h-32">
                    Message Field
                  </div>

                  <button className="mt-2 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors">
                    Contact us
                  </button>
                </div>
              )}

              {/* Right side - address */}
              <div className="flex flex-col justify-end items-start md:items-end mt-auto md:mt-0">
                <h2 className="text-3xl font-semibold text-white mb-4">
                  {sectionContent.heading}
                </h2>
                <p className="text-xl text-white mb-2">
                  {sectionContent.address}
                </p>
                <p className="text-xl text-white">{sectionContent.subtext}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heading
              </label>
              <input
                type="text"
                name="heading"
                value={sectionContent.heading}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. The Church Address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={sectionContent.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. 5350 Allied Blvd, Indianapolis, IN"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtext
              </label>
              <input
                type="text"
                name="subtext"
                value={sectionContent.subtext}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. Visit and Worship with us."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Image
              </label>

              {/* Use the updated ImageUpload component which handles both upload and preview */}
              <ImageUpload
                section="contact"
                onImageUploaded={handleImageUploaded}
                existingImageUrl={sectionContent.backgroundImage}
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="contactFormEnabled"
                name="contactFormEnabled"
                checked={sectionContent.contactFormEnabled}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="contactFormEnabled"
                className="ml-2 block text-sm text-gray-700"
              >
                Display contact form (Note: Form functionality is managed
                automatically)
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
