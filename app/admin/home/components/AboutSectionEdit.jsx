"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { fetchAboutSection, updateAboutSection } from "@/lib/services/homeService";
import { formatDisplayText } from "@/lib/homeFormData";
import Image from "next/image";

export default function AboutSectionEdit() {
  // Initial state
  const [aboutContent, setAboutContent] = useState({
    heading: "",
    content: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchAboutSection();
        setAboutContent(data);
      } catch (error) {
        console.error("Error fetching about section data:", error);
        setError("Failed to load about section. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAboutContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateAboutSection(aboutContent);
      setIsEditing(false);
      toast.success("About section updated successfully!");
    } catch (error) {
      console.error("Error saving about section data:", error);
      toast.error("Failed to update about section. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // If loading, show loading state
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

  // If error, show error state with retry button
  if (error) {
    return (
      <div className="mb-12 border border-gray-200">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-medium text-gray-800">About Us Section</h3>
        </div>
        <div className="p-8 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">About Us Section</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm border border-gray-200 bg-white"
          disabled={isSaving}
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {/* Preview */}
      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="flex flex-col">
            {/* Background image preview */}
            <div className="mb-6 relative h-[600px] w-full bg-[url(/images/img_group_6.png)] bg-cover bg-no-repeat rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[60%] flex flex-col items-center gap-2 rounded-[20px] bg-gray-900_02 px-[52px] py-[58px] md:w-full md:p-5">
                  <p className="text-[24px] font-medium text-white md:text-[22px]">
                    {aboutContent.heading}
                  </p>
                  <div className="mb-[18px] self-stretch text-center font-poppins text-[16px] sm:text-[13px] font-normal leading-[130%]">
                    <span className="text-gray-400" dangerouslySetInnerHTML={{ __html: formatDisplayText(aboutContent.content) }}></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 bg-white">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heading
            </label>
            <input
              type="text"
              name="heading"
              value={aboutContent.heading}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              name="content"
              value={aboutContent.content}
              onChange={handleChange}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter about us content here..."
            ></textarea>
            <p className="mt-1 text-sm text-gray-500">
              Use \n for line breaks. The first part of the content will be displayed in light gray, and the last part (after a double line break) will be displayed in white.
            </p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
