"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import ImageUpload from "@/components/@admin/ImageUpload";
import {
  fetchNextGenMinistrySection,
  updateNextGenMinistrySection,
} from "@/lib/services/aboutUsService";

export default function NextGenMinistryEdit() {
  const [sectionContent, setSectionContent] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    async function fetchSectionData() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchNextGenMinistrySection();
        setSectionContent(data);
      } catch (error) {
        console.error("Error fetching NextGen Ministry section data:", error);
        setError("Failed to load section data. Please try again later.");
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

  const handleImageChange = (imageUrl) => {
    setSectionContent((prev) => ({ ...prev, image: imageUrl }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateNextGenMinistrySection(sectionContent);
      setIsEditing(false);
      toast.success("NextGen Ministry section updated successfully");
    } catch (error) {
      console.error("Error saving NextGen Ministry section:", error);
      setError("Failed to update section. Please try again later.");
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

  if (error) {
    return (
      <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden p-6">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">NextGen Ministry Section</h3>
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
                  src={sectionContent.image}
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
                Section Image
              </label>
              <ImageUpload
                onImageUploaded={handleImageChange}
                section="about-us-nextgen"
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
