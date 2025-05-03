"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { fetchWelcomeHeroSection, updateWelcomeHeroSection } from "@/lib/services/homeService";
import { formatDisplayText } from "@/lib/homeFormData";
import ImageUpload from "@/components/@admin/ImageUpload";

export default function WelcomeHeroEdit() {
  // Initial state
  const [heroContent, setHeroContent] = useState({
    welcomeTitle: "",
    subtitle: "",
    buttonText: "",
    bibleVerses: [],
    backgroundImage: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [editingVerseId, setEditingVerseId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchWelcomeHeroSection();
        setHeroContent(data);
      } catch (error) {
        console.error("Error fetching welcome hero data:", error);
        setError("Failed to load welcome hero section. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHeroContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerseChange = (e, id) => {
    const { name, value } = e.target;
    setHeroContent((prev) => ({
      ...prev,
      bibleVerses: prev.bibleVerses.map((verse) =>
        verse.id === id ? { ...verse, [name]: value } : verse
      ),
    }));
  };

  const handleAddVerse = () => {
    const newId = heroContent.bibleVerses.length > 0 
      ? Math.max(...heroContent.bibleVerses.map(v => v.id)) + 1 
      : 1;
      
    setHeroContent((prev) => ({
      ...prev,
      bibleVerses: [
        ...prev.bibleVerses,
        {
          id: newId,
          verse: "",
          reference: "",
        },
      ],
    }));
  };

  const handleRemoveVerse = (id) => {
    setHeroContent((prev) => ({
      ...prev,
      bibleVerses: prev.bibleVerses.filter((verse) => verse.id !== id),
    }));
    
    // Reset current verse index if needed
    if (currentVerseIndex >= heroContent.bibleVerses.length - 1) {
      setCurrentVerseIndex(Math.max(0, heroContent.bibleVerses.length - 2));
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateWelcomeHeroSection(heroContent);
      setIsEditing(false);
      toast.success("Welcome hero section updated successfully!");
    } catch (error) {
      console.error("Error saving welcome hero data:", error);
      toast.error("Failed to update welcome hero section. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (url) => {
    setHeroContent((prev) => ({
      ...prev,
      backgroundImage: url,
    }));
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
          <h3 className="font-medium text-gray-800">Welcome Hero Section</h3>
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

  // Render component
  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Welcome Hero Section</h3>
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
        <div className="relative">
          <div className="h-[500px] w-full relative">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            {heroContent.backgroundImage ? (
              <Image
                src={heroContent.backgroundImage}
                alt="Hero background"
                fill
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div className="absolute inset-0 bg-[url(/images/img_group_5.png)] bg-cover bg-no-repeat"></div>
            )}
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-12 md:px-24 lg:px-32">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-4">
                <span dangerouslySetInnerHTML={{ __html: formatDisplayText(heroContent.welcomeTitle) }}></span>
              </h1>
              <p className="text-white mb-8">{heroContent.subtitle}</p>
              <div>
                <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
                  {heroContent.buttonText}
                </button>
              </div>
              {heroContent.bibleVerses && heroContent.bibleVerses.length > 0 && (
                <div className="mt-8 max-w-md p-6 bg-white rounded-lg shadow">
                  <p className="text-gray-600 italic mb-4">
                    {heroContent.bibleVerses[currentVerseIndex]?.verse || ""}
                  </p>
                  <p className="text-gray-800 font-medium">
                    {heroContent.bibleVerses[currentVerseIndex]?.reference || ""}
                  </p>
                  <div className="flex mt-4 space-x-2">
                    {heroContent.bibleVerses.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                          currentVerseIndex === index ? "bg-blue-600" : "bg-gray-300"
                        }`}
                        onClick={() => setCurrentVerseIndex(index)}
                      ></button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-4 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Welcome Title
              </label>
              <textarea
                name="welcomeTitle"
                value={heroContent.welcomeTitle}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300"
                placeholder="Welcome title (use line breaks for formatting)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtitle
              </label>
              <input
                type="text"
                name="subtitle"
                value={heroContent.subtitle}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300"
                placeholder="Subtitle"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button Text
              </label>
              <input
                type="text"
                name="buttonText"
                value={heroContent.buttonText}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300"
                placeholder="Button text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Background Image URL
              </label>
              <ImageUpload
                onImageUploaded={handleImageUpload}
                section="home-welcome-hero"
                bucketName="home-files"
                existingImageUrl={heroContent.backgroundImage}
                buttonText="Upload Background Image"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-gray-700">Bible Verses</h4>
              <button
                onClick={handleAddVerse}
                className="px-3 py-1 text-xs border border-gray-200 bg-white"
              >
                Add Verse
              </button>
            </div>

            <div className="space-y-4">
              {heroContent.bibleVerses.map((verse) => (
                <div
                  key={verse.id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Verse Text
                    </label>
                    <textarea
                      name="verse"
                      value={verse.verse}
                      onChange={(e) => handleVerseChange(e, verse.id)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300"
                      placeholder="Bible verse text"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reference
                    </label>
                    <input
                      type="text"
                      name="reference"
                      value={verse.reference}
                      onChange={(e) => handleVerseChange(e, verse.id)}
                      className="w-full px-3 py-2 border border-gray-300"
                      placeholder="e.g. John 3:16 (NIV)"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleRemoveVerse(verse.id)}
                      className="px-3 py-1 text-xs border border-red-200 text-red-600 bg-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white"
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
