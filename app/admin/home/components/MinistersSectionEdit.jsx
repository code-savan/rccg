"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { fetchMinistersSection, updateMinistersSection } from "@/lib/services/homeService";
import { formatDisplayText } from "@/lib/homeFormData";
import ImageUpload from "@/components/@admin/ImageUpload";

export default function MinistersSectionEdit() {
  // Initial state
  const [ministersContent, setMinistersContent] = useState({
    heading: "",
    description: "",
    ministers: [],
    buttonText: "",
    buttonLink: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingMinister, setEditingMinister] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchMinistersSection();
        setMinistersContent(data);
      } catch (error) {
        console.error("Error fetching ministers section data:", error);
        setError("Failed to load ministers section. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMinistersContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleMinisterChange = (e, id) => {
    const { name, value } = e.target;
    setMinistersContent((prev) => ({
      ...prev,
      ministers: prev.ministers.map((minister) =>
        minister.id === id ? { ...minister, [name]: value } : minister
      ),
    }));
  };

  const handleAddMinister = () => {
    const newId = ministersContent.ministers.length > 0
      ? Math.max(...ministersContent.ministers.map(m => m.id)) + 1
      : 1;

    const newMinister = {
      id: newId,
      name: "",
      title: "",
      image: "",
      bio: "",
    };

    setMinistersContent((prev) => ({
      ...prev,
      ministers: [...prev.ministers, newMinister],
    }));

    setEditingMinister(newMinister.id);
  };

  const handleRemoveMinister = (id) => {
    setMinistersContent((prev) => ({
      ...prev,
      ministers: prev.ministers.filter((minister) => minister.id !== id),
    }));

    if (editingMinister === id) {
      setEditingMinister(null);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateMinistersSection(ministersContent);
      setIsEditing(false);
      setEditingMinister(null);
      toast.success("Ministers section updated successfully!");
    } catch (error) {
      console.error("Error saving ministers section data:", error);
      toast.error("Failed to update ministers section. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (url, id) => {
    setMinistersContent((prev) => ({
      ...prev,
      ministers: prev.ministers.map((minister) =>
        minister.id === id ? { ...minister, image: url } : minister
      ),
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
          <h3 className="font-medium text-gray-800">Ministers Section</h3>
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
        <h3 className="font-medium text-gray-800">Ministers Section</h3>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            if (!isEditing) {
              setEditingMinister(null);
            }
          }}
          className="px-4 py-2 text-sm border border-gray-200 bg-white"
          disabled={isSaving}
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {/* Preview */}
      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center max-w-3xl mx-auto">
              <h2 className="text-[40px] font-semibold mb-4 lg:text-[36px] md:text-[32px] sm:text-[28px] text-center">
                {ministersContent.heading}
              </h2>
              <p className="text-center mb-8">
                <span dangerouslySetInnerHTML={{ __html: formatDisplayText(ministersContent.description) }}></span>
              </p>
            </div>

            <div className="grid sm:grid-cols-1 grid-cols-2 gap-6 mb-8">
              {ministersContent.ministers.map((minister) => (
                <div key={minister.id} className="rounded-[22px] overflow-hidden border border-gray-200">
                  <div className="relative h-[500px]">
                    <Image
                      src={minister.image || "/images/placeholder.png"}
                      alt={minister.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div  className="p-4">
                    <h3 className="font-medium text-lg">{minister.name}</h3>
                    <p className="text-gray-600">{minister.title}</p>
                    <p className="text-gray-600 mt-2">
                      <span dangerouslySetInnerHTML={{ __html: formatDisplayText(minister.bio) }}></span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {ministersContent.ministers.length === 0 && (
              <p className="text-gray-500 italic mb-8">No ministers have been added yet.</p>
            )}

            <div className="text-center">
              <a
                href={ministersContent.buttonLink}
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
              >
                {ministersContent.buttonText}
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 bg-white">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Heading
            </label>
            <input
              type="text"
              name="heading"
              value={ministersContent.heading}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Description
            </label>
            <textarea
              name="description"
              value={ministersContent.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300"
            ></textarea>
            <p className="mt-1 text-sm text-gray-500">
              Use \n for line breaks.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Ministers</h3>
              <button
                onClick={handleAddMinister}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={isSaving}
              >
                Add Minister
              </button>
            </div>

            {ministersContent.ministers.map((minister) => (
              <div
                key={minister.id}
                className="mb-8 border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-md font-medium">
                    {minister.name || "New Minister"}
                  </h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingMinister(editingMinister === minister.id ? null : minister.id)}
                      className="px-3 py-1 text-xs border border-gray-200 bg-white"
                    >
                      {editingMinister === minister.id ? "Collapse" : "Expand"}
                    </button>
                    <button
                      onClick={() => handleRemoveMinister(minister.id)}
                      className="px-3 py-1 text-xs border border-red-200 text-red-600 bg-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {editingMinister === minister.id && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={minister.name}
                        onChange={(e) => handleMinisterChange(e, minister.id)}
                        className="w-full px-3 py-2 border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={minister.title}
                        onChange={(e) => handleMinisterChange(e, minister.id)}
                        className="w-full px-3 py-2 border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={minister.bio}
                        onChange={(e) => handleMinisterChange(e, minister.id)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300"
                      ></textarea>
                      <p className="mt-1 text-sm text-gray-500">
                        Use \n for line breaks.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image
                      </label>
                      <ImageUpload
                        onImageUploaded={(url) => handleImageUpload(url, minister.id)}
                        section="home-ministers"
                        bucketName="home-files"
                        existingImageUrl={minister.image}
                        buttonText="Upload Minister Image"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Button Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  name="buttonText"
                  value={ministersContent.buttonText}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Link
                </label>
                <input
                  type="text"
                  name="buttonLink"
                  value={ministersContent.buttonLink}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
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
