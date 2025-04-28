"use client";

import React, { useState } from "react";

export default function HistoryEdit() {
  const [sectionContent, setSectionContent] = useState({
    title: "Church history",
    text: "RCCG Rod of God Parish was established in [2009] as part of the Redeemed Christian Church of God (RCCG) network, a global church with millions of members worldwide. From humble beginnings, God has blessed our church to grow into a thriving community of worshippers, committed to the Great Commission.\n\nThrough prayer, faith, and dedication, we have expanded our ministries, outreach programs, and impact in Indianapolis and beyond. Today, we continue to build on the vision of holiness, evangelism, and community transformation.",
    backgroundImage: "/images/img_verse.png",
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
        <h3 className="font-medium text-gray-800">Church History Section</h3>
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
            <div className="relative rounded-lg overflow-hidden">
              <div
                className="h-[300px] bg-cover bg-center"
                style={{
                  backgroundImage: `url(${sectionContent.backgroundImage})`,
                }}
              >
                <div className="absolute inset-0 p-8 flex items-center">
                  <div className="bg-gray-100 p-6 rounded-lg max-w-md">
                    <h3 className="text-xl font-medium mb-4">
                      {sectionContent.title}
                    </h3>
                    <p className="text-gray-600 whitespace-pre-line">
                      {sectionContent.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 bg-white">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <input
                type="text"
                name="title"
                value={sectionContent.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Section title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                History Text
              </label>
              <textarea
                name="text"
                value={sectionContent.text}
                onChange={handleChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Church history text (use line breaks for paragraphs)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Image URL
              </label>
              <input
                type="text"
                name="backgroundImage"
                value={sectionContent.backgroundImage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="/images/your-image.jpg"
              />
            </div>
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
