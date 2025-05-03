"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  fetchHeroSection,
  updateHeroSection,
} from "@/lib/services/aboutUsService";
import ImageUpload from "@/components/@admin/ImageUpload";
import { formatDisplayText } from "@/lib/aboutUsFormData";

export default function HeroSectionEdit() {
  const [heroData, setHeroData] = useState({
    heading: "",
    subheading: "",
    backgroundImage: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch data from API
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await fetchHeroSection();
        setHeroData(data);
      } catch (error) {
        console.error("Error fetching hero section data:", error);
        toast.error("Failed to load hero section data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHeroData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (imageUrl) => {
    setHeroData((prev) => ({ ...prev, backgroundImage: imageUrl }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateHeroSection(heroData);
      setIsEditing(false);
      toast.success("Hero section updated successfully");
    } catch (error) {
      console.error("Error saving hero section:", error);
      toast.error("Failed to update hero section");
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
        <h3 className="font-medium text-gray-800">Hero Section</h3>
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
            <div
              className="rounded-lg h-[300px] bg-cover bg-center mb-6 flex items-center p-8"
              style={{
                backgroundImage: `url(${heroData.backgroundImage})`,
              }}
            >
              <div className="text-white">
                <h2 className="text-3xl font-medium mb-4 whitespace-pre-line">
                  {formatDisplayText(heroData.heading)}
                </h2>
                <p className="text-xl whitespace-pre-line">
                  {formatDisplayText(heroData.subheading)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 bg-white">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heading
              </label>
              <textarea
                name="heading"
                value={heroData.heading}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Main heading (use line breaks if needed)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subheading
              </label>
              <textarea
                name="subheading"
                value={heroData.subheading}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Subheading"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Image
              </label>
              <ImageUpload
                section="about-us-hero"
                onImageUploaded={handleImageChange}
                existingImageUrl={heroData.backgroundImage}
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
