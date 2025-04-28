"use client";

import React, { useState } from "react";

export default function WelcomeSectionEdit() {
  const [sectionContent, setSectionContent] = useState({
    heading: "Welcome to the\nRod of God Parish\nService Itenarary.",
    subheading: "At RCCG Rod of God Parish, we accept everyone.",
    backgroundImage: "/images/img_pexels_jibarofoto_2014773.png",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved welcome section content:", sectionContent);
    // API call would go here
  };

  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Welcome Section</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm border border-gray-200 bg-white rounded-md hover:bg-gray-50"
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/2">
              <h1 className="text-4xl font-semibold text-gray-900 whitespace-pre-line mb-4">
                {sectionContent.heading}
              </h1>
              <p className="text-xl text-gray-600">
                {sectionContent.subheading}
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <div className="aspect-[628/516] rounded-xl bg-gray-100 overflow-hidden relative">
                {sectionContent.backgroundImage && (
                  <img
                    src={sectionContent.backgroundImage}
                    alt="Welcome section"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heading (use \n for line breaks)
              </label>
              <textarea
                name="heading"
                value={sectionContent.heading}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Welcome heading (use \n for line breaks)"
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
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Welcome subheading"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Image Path
              </label>
              <input
                type="text"
                name="backgroundImage"
                value={sectionContent.backgroundImage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="/images/your-image.jpg"
              />
              <p className="mt-1 text-sm text-gray-500">
                Enter the path to the image. Images should be in the public
                directory.
              </p>
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
