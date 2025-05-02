"use client";

import React, { useState, useEffect } from "react";
import ImageUpload from "../../../../components/@admin/ImageUpload";

export default function HeroSectionEdit() {
  const [sectionContent, setSectionContent] = useState({
    heading: "Get involved\nwith the church",
    subheading: "At RCCG Rod of God Parish, we accept everyone.",
    backgroundImage: "/images/img_group_227.png",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/get-involved/hero");

        if (!response.ok) {
          throw new Error("Failed to fetch hero section data");
        }

        const data = await response.json();
        setSectionContent(data);
      } catch (err) {
        console.error("Error fetching hero section data:", err);
        setError("Failed to load content. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);

      const response = await fetch("/api/get-involved/hero", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sectionContent),
      });

      if (!response.ok) {
        throw new Error("Failed to save hero section data");
      }

      const updatedData = await response.json();
      setSectionContent(updatedData);
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving hero section data:", err);
      setError("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-medium text-gray-800">Hero Section</h3>
        </div>
        <div className="p-8 bg-white flex justify-center items-center">
          <div className="animate-pulse text-center">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-40 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Hero Section</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm border border-gray-200 bg-white rounded-md hover:bg-gray-50"
          disabled={isSaving}
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border-b border-red-100 text-red-600 text-sm">
          {error}
        </div>
      )}

      {!isEditing ? (
        <div className="p-8 bg-white">
          <div
            className="h-[400px] rounded-lg flex items-center justify-start px-8 py-8 bg-cover bg-center"
            style={{
              backgroundImage: `url(${sectionContent.backgroundImage})`,
            }}
          >
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl font-semibold mb-4 whitespace-pre-line">
                {sectionContent.heading}
              </h1>
              <p className="text-xl">{sectionContent.subheading}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 bg-white">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heading (use \n for line breaks)
              </label>
              <textarea
                name="heading"
                value={sectionContent.heading}
                onChange={handleChange}
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
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Section subheading"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Image
              </label>

              {/* Use the updated ImageUpload component which handles both upload and preview */}
                  <ImageUpload
                    section="hero"
                    onImageUploaded={handleImageUploaded}
                    existingImageUrl={sectionContent.backgroundImage}
                  />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
