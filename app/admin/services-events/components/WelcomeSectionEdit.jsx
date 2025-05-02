"use client";

import React, { useState, useEffect } from "react";
import ImageUpload from "../../../../components/@admin/ImageUpload";
import {
  fetchWelcomeSection,
  updateWelcomeSection,
} from "@/lib/services/servicesEventsService";
import { formatDisplayText } from "@/lib/servicesEventsFormData";

export default function WelcomeSectionEdit() {
  const [sectionContent, setSectionContent] = useState({
    heading: "Welcome to the\nRod of God Parish\nService Itenarary.",
    subheading: "At RCCG Rod of God Parish, we accept everyone.",
    backgroundImage: "/images/img_pexels_jibarofoto_2014773.png",
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
        const data = await fetchWelcomeSection();
        setSectionContent(data);
      } catch (err) {
        console.error("Error fetching welcome section data:", err);
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

      const updatedData = await updateWelcomeSection(sectionContent);
      setSectionContent(updatedData);
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving welcome section data:", err);
      setError("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-medium text-gray-800">Welcome Section</h3>
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
        <h3 className="font-medium text-gray-800">Welcome Section</h3>
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
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-1/2">
                <h1 className="text-4xl font-semibold text-gray-900 whitespace-pre-line mb-4">
                  {formatDisplayText(sectionContent.heading)}
                </h1>
                <p className="text-xl text-gray-600">
                  {formatDisplayText(sectionContent.subheading)}
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
                Background Image
              </label>
              <ImageUpload
                section="services-events-welcome"
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
