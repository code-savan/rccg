"use client";

import React, { useState } from "react";

export default function AboutSectionEdit() {
  // Initial state based on current content
  const [aboutContent, setAboutContent] = useState({
    heading: "About Us",
    content:
      "RCCG ROG is a Bible-based, evangelistic, Spirit-empowered church.\nAt RCCG ROG, we're all about people, because God is all about people.\n\nOne of the ways we express our love for Him is through our love for people,\nand we do this by helping people who come to RCCG ROG to grow in their\nrelationship with the Lord.\n\nWant to get started? We'd love for you to join us for a service, and we're\nhere to help you get connected.",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAboutContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Here we would typically save to database (e.g. Supabase)
    setIsEditing(false);
    console.log("Saved about content:", aboutContent);
    // API call would go here
  };

  return (
    <div className="mb-12 border border-gray-200">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">About Us Section</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm border border-gray-200 bg-white"
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {/* Preview */}
      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-medium text-center mb-8">
              {aboutContent.heading}
            </h2>
            <p className="text-gray-700 whitespace-pre-line text-center">
              {aboutContent.content}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-4 bg-white">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heading
            </label>
            <input
              type="text"
              name="heading"
              value={aboutContent.heading}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300"
              placeholder="Section heading"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              name="content"
              value={aboutContent.content}
              onChange={handleChange}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300"
              placeholder="About us content (use line breaks for formatting)"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
