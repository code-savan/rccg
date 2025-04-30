"use client";

import React, { useState, useEffect } from "react";
import {
  fetchQASection,
  updateQASection,
} from "@/lib/services/getInvolvedService";
import ImageUpload from "../../../../components/@admin/ImageUpload";

export default function QASectionEdit() {
  const [sectionContent, setSectionContent] = useState({
    heading: "Q&A and Polls",
    description:
      "We take questions from our members anonymously and\nanswer them as a community to help them grow.",
    buttonText: "Go to the Q&A",
    buttonLink:
      "https://app.sli.do/event/qiPxPF7zvmaw6UxmMY9kMC/live/questions",
    bibleVerseText:
      '"Carry each other\'s burdens, and in\nthis way you will fulfill the law of\nChrist."',
    bibleVerseReference: "— Galatians 6:2 (NIV)",
    bibleVerseBackgroundImage: "/images/img_verse_1.png",
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
        const data = await fetchQASection();
        setSectionContent(data);
      } catch (err) {
        console.error("Error fetching Q&A section data:", err);
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
      bibleVerseBackgroundImage: imageUrl,
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);

      const updatedData = await updateQASection(sectionContent);
      setSectionContent(updatedData);
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving Q&A section data:", err);
      setError("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-medium text-gray-800">Q&A Section</h3>
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
        <h3 className="font-medium text-gray-800">Q&A Section</h3>
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
          <div className="flex flex-col md:flex-row gap-8">
            {/* Call to action section */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
              <h2 className="text-3xl text-center font-medium">
                {sectionContent.heading}
              </h2>
              <p className="text-center text-gray-600 whitespace-pre-line">
                {sectionContent.description}
              </p>
              <a
                href={sectionContent.buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-gray-400 rounded-xl hover:bg-[#4D88FF] hover:text-white hover:border-[#4D88FF] transition-colors"
              >
                {sectionContent.buttonText}
              </a>
            </div>

            {/* Bible verse section */}
            <div
              className="flex-1 h-[400px] rounded-lg flex items-center justify-center bg-cover bg-center p-8"
              style={{
                backgroundImage: `url(${sectionContent.bibleVerseBackgroundImage})`,
              }}
            >
              <div className="bg-gray-100 border border-gray-400 p-8 rounded-lg max-w-md">
                <p className="text-gray-600 whitespace-pre-line mb-4">
                  {sectionContent.bibleVerseText}
                </p>
                <p className="font-medium">
                  {sectionContent.bibleVerseReference}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heading
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
                Description (use \n for line breaks)
              </label>
              <textarea
                name="description"
                value={sectionContent.description}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Section description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Text
              </label>
              <input
                type="text"
                name="buttonText"
                value={sectionContent.buttonText}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. Go to the Q&A"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Link
              </label>
              <input
                type="text"
                name="buttonLink"
                value={sectionContent.buttonLink}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bible Verse Text (use \n for line breaks)
              </label>
              <textarea
                name="bibleVerseText"
                value={sectionContent.bibleVerseText}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Bible verse text"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bible Verse Reference
              </label>
              <input
                type="text"
                name="bibleVerseReference"
                value={sectionContent.bibleVerseReference}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. — Galatians 6:2 (NIV)"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bible Verse Background Image
              </label>

              {/* Use the updated ImageUpload component which handles both upload and preview */}
              <ImageUpload
                section="qa"
                onImageUploaded={handleImageUploaded}
                existingImageUrl={sectionContent.bibleVerseBackgroundImage}
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
