"use client";

import React, { useState } from "react";

export default function AboutTextEdit() {
  const [sectionContent, setSectionContent] = useState({
    text: "RCCG ROG is a Bible-based, evangelistic, Spirit-empowered church.\nAt RCCG ROG, we're all about people, because God is all about people.\n\nOne of the ways we express our love for Him is through our love for people,\nand we do this by helping people who come to RCCG ROG to grow in their\nrelationship with the Lord.\n\nWant to get started? We'd love for you to join us for a service, and we're\nhere to help you get connected.",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved section content:", sectionContent);
  };

  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">About Text Section</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm border border-gray-200 bg-white rounded-md hover:bg-gray-50"
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 text-gray-400 p-8 rounded-lg">
              <p className="whitespace-pre-line text-lg leading-relaxed">
                {sectionContent.text}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 bg-white">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About Text
            </label>
            <textarea
              name="text"
              value={sectionContent.text}
              onChange={handleChange}
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="About text (use line breaks for formatting)"
            />
            <p className="text-sm text-gray-500 mt-2">
              Use line breaks to format paragraphs. The text will be displayed
              as written.
            </p>
          </div>

          <div className="flex justify-end pt-6">
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
