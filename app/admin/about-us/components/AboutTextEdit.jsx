"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  fetchAboutTextSection,
  updateAboutTextSection,
} from "@/lib/services/aboutUsService";

export default function AboutTextEdit() {
  const [sectionContent, setSectionContent] = useState({
    heading: "ABOUT OUR CHURCH",
    content:
      "RCCG Rod of God Parish is a vibrant, Spirit-filled church committed to building a community of believers passionate about God and dedicated to making a positive impact in Indianapolis and beyond. Our church is part of the Redeemed Christian Church of God global network and upholds its values and mission.\n\nOur services combine powerful worship, prayer, and Biblical teaching in a welcoming environment where everyone belongs. We believe in nurturing spiritual growth at every age and life stage.",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch section data
  useEffect(() => {
    async function fetchSectionData() {
      try {
        setIsLoading(true);
        const data = await fetchAboutTextSection();
        setSectionContent(data);
      } catch (error) {
        console.error("Error fetching About Text section data:", error);
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

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateAboutTextSection(sectionContent);
      setIsEditing(false);
      toast.success("About text updated successfully");
    } catch (error) {
      console.error("Error updating About Text section:", error);
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
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">About Text Section</h3>
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
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <p className="whitespace-pre-line text-lg leading-relaxed text-gray-700">
                {sectionContent.content}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 bg-white">
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
              About Content
            </label>
            <textarea
              name="content"
              value={sectionContent.content}
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
