"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import ImageUpload from "@/components/@admin/ImageUpload";
import {
  fetchHistorySection,
  updateHistorySection,
} from "@/lib/services/aboutUsService";

export default function HistoryEdit() {
  const [sectionContent, setSectionContent] = useState({
    heading: "Church history",
    content:
      "RCCG Rod of God Parish began as a small prayer group in Indianapolis in 2018. Through God's grace and the dedication of our founding members, we've grown into a thriving spiritual family serving our community.\n\nOver the years, we've remained committed to our founding vision of being a church where God's Word is taught with clarity and where all people can find belonging, purpose, and spiritual transformation.",
    image: "/images/img_verse.png",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch section data
  useEffect(() => {
    async function fetchSectionData() {
      try {
        setIsLoading(true);
        const data = await fetchHistorySection();
        setSectionContent(data);
      } catch (error) {
        console.error("Error fetching History section data:", error);
        toast.error("Failed to load section data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSectionData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUploaded = (imageUrl) => {
    setSectionContent((prev) => ({ ...prev, image: imageUrl }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateHistorySection(sectionContent);
      setIsEditing(false);
      toast.success("History section updated successfully");
    } catch (error) {
      console.error("Error updating History section:", error);
      toast.error("Failed to update section");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-40 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Church History Section</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm border border-gray-200 bg-white rounded-md hover:bg-gray-50"
          disabled={isSaving}
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">
              {sectionContent.heading}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 whitespace-pre-line">
                  {sectionContent.content}
                </p>
              </div>

              {sectionContent.image && (
                <div className="rounded-lg overflow-hidden bg-gray-100 border">
                  <img
                    src="/images/img_verse.png"
                    alt="Church History"
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 bg-white">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Heading
              </label>
              <input
                type="text"
                name="heading"
                value={sectionContent.heading}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Section heading"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                History Content
              </label>
              <textarea
                name="content"
                value={sectionContent.content}
                onChange={handleChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Church history content (use line breaks for paragraphs)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                History Image
              </label>
              <ImageUpload
                onImageUploaded={handleImageUploaded}
                section="about-us-history"
                existingImageUrl={sectionContent.image}
              />
            </div>
          </div>

          <div className="flex justify-end pt-6">
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
