"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function HighlightsSectionEdit() {
  // Initial state based on current content
  const [highlightsContent, setHighlightsContent] = useState({
    heading: "Highlights from Our Community",
    images: [
      { id: 1, src: "/images/highlight1.jpg", alt: "Church community event" },
      { id: 2, src: "/images/highlight2.jpg", alt: "Church service" },
      { id: 3, src: "/images/highlight3.jpg", alt: "Prayer meeting" },
      { id: 4, src: "/images/highlight4.jpg", alt: "Youth gathering" },
      { id: 5, src: "/images/highlight5.jpg", alt: "Community outreach" },
      { id: 6, src: "/images/highlight6.jpg", alt: "Worship team" },
      { id: 7, src: "/images/highlight7.jpg", alt: "Children's ministry" },
      { id: 8, src: "/images/highlight8.jpg", alt: "Special event" },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingImage, setEditingImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHighlightsContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, id) => {
    const { name, value } = e.target;
    setHighlightsContent((prev) => ({
      ...prev,
      images: prev.images.map((img) =>
        img.id === id ? { ...img, [name]: value } : img
      ),
    }));
  };

  const handleAddImage = () => {
    const newImage = {
      id: Math.max(0, ...highlightsContent.images.map((img) => img.id)) + 1,
      src: "",
      alt: "Church highlight",
    };

    setHighlightsContent((prev) => ({
      ...prev,
      images: [...prev.images, newImage],
    }));

    setEditingImage(newImage.id);
  };

  const handleDeleteImage = (id) => {
    setHighlightsContent((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== id),
    }));
    setEditingImage(null);
  };

  const handleSave = () => {
    // Here we would typically save to database (e.g. Supabase)
    setIsEditing(false);
    setEditingImage(null);
    console.log("Saved highlights content:", highlightsContent);
    // API call would go here
  };

  return (
    <div className="mb-12 border border-gray-200">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Highlights Section</h3>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setEditingImage(null);
          }}
          className="px-4 py-2 text-sm border border-gray-200 bg-white"
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {/* Preview */}
      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-medium text-center mb-8">
              {highlightsContent.heading}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
              {highlightsContent.images.map((image) => (
                <div key={image.id} className="aspect-square relative">
                  <Image
                    src={image.src || "/placeholder-image.jpg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-4 bg-white">
          {editingImage === null ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Heading
                </label>
                <input
                  type="text"
                  name="heading"
                  value={highlightsContent.heading}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300"
                  placeholder="Section heading"
                />
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-700">Gallery Images</h4>
                  <button
                    onClick={handleAddImage}
                    className="px-3 py-1 text-xs border border-gray-200 bg-white"
                  >
                    Add Image
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {highlightsContent.images.map((image) => (
                    <div key={image.id} className="border border-gray-200 p-3">
                      <div className="h-40 relative mb-2">
                        <Image
                          src={image.src || "/placeholder-image.jpg"}
                          alt={image.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm truncate mr-2">{image.alt}</p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingImage(image.id)}
                            className="px-3 py-1 text-xs border border-gray-200 bg-white"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteImage(image.id)}
                            className="px-3 py-1 text-xs border border-red-200 text-red-600 bg-white"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white"
                >
                  Save Changes
                </button>
              </div>
            </>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-700">
                  {editingImage === 0 ? "Add New Image" : "Edit Image"}
                </h4>
                <button
                  onClick={() => setEditingImage(null)}
                  className="px-3 py-1 text-xs border border-gray-200 bg-white"
                >
                  Back
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="src"
                      value={
                        highlightsContent.images.find(
                          (img) => img.id === editingImage
                        )?.src || ""
                      }
                      onChange={(e) => handleImageChange(e, editingImage)}
                      className="w-full px-3 py-2 border border-gray-300"
                      placeholder="/images/your-image.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alt Text (Description)
                    </label>
                    <input
                      type="text"
                      name="alt"
                      value={
                        highlightsContent.images.find(
                          (img) => img.id === editingImage
                        )?.alt || ""
                      }
                      onChange={(e) => handleImageChange(e, editingImage)}
                      className="w-full px-3 py-2 border border-gray-300"
                      placeholder="Brief description of the image"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                  <div className="h-60 relative bg-gray-100 border border-gray-200">
                    {highlightsContent.images.find(
                      (img) => img.id === editingImage
                    )?.src ? (
                      <Image
                        src={
                          highlightsContent.images.find(
                            (img) => img.id === editingImage
                          )?.src
                        }
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-gray-400">No image selected</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white"
                >
                  Save Image
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
