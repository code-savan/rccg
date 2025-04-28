"use client";

import React, { useState } from "react";

export default function NextGenMinistryEdit() {
  const [sectionContent, setSectionContent] = useState({
    title: "THE NEXT GEN MINISTRY",
    description:
      "At RCCG Rod of God Parish, our Youth Church is a vibrant community where young people grow in faith, purpose, and fellowship. Join us and be part of a movement for God!",
    image: "img_bddd6da0_297a.png",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved NextGen Ministry content:", sectionContent);
  };

  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">NextGen Ministry Section</h3>
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
            <div className="flex flex-col items-center gap-6 mb-8">
              <h2 className="text-3xl font-semibold text-center">
                {sectionContent.title}
              </h2>
              <p className="text-gray-600 text-center max-w-2xl">
                {sectionContent.description}
              </p>
            </div>

            {sectionContent.image && (
              <div className="rounded-lg overflow-visible bg-gray-100 h-fit border w-full">
                <img
                  src={`/images/${sectionContent.image}`}
                  alt={sectionContent.title}
                  className="w-full h-[500px] object-cover object-top"
                />
              </div>
            )}
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
                Description
              </label>
              <textarea
                name="description"
                value={sectionContent.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Description of the NextGen Ministry"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Filename
              </label>
              <input
                type="text"
                name="image"
                value={sectionContent.image}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. nextgen-image.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the filename only. Images should be in the public/images
                directory.
              </p>
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
