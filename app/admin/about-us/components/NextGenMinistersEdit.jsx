"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import {
  fetchNextGenMinistersSection,
  updateNextGenMinistersSection,
} from "@/lib/services/aboutUsService";
import ImageUpload from "@/components/@admin/ImageUpload";

export default function NextGenMinistersEdit() {
  const [sectionContent, setSectionContent] = useState({
    heading: "NEXTGEN MINISTERS",
    description:
      "Our youth leaders guide and mentor the next generation of believers.",
    ministers: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingMinisterId, setEditingMinisterId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch data from API
  useEffect(() => {
    async function fetchSectionData() {
      try {
        setIsLoading(true);
        const data = await fetchNextGenMinistersSection();
        setSectionContent(data);
      } catch (error) {
        console.error("Error fetching NextGen Ministers section data:", error);
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

  const handleMinisterChange = (e, id) => {
    const { name, value } = e.target;
    setSectionContent((prev) => ({
      ...prev,
      ministers: prev.ministers.map((minister) =>
        minister.id === id ? { ...minister, [name]: value } : minister
      ),
    }));
  };

  const handleImageChange = (id, imageUrl) => {
    setSectionContent((prev) => ({
      ...prev,
      ministers: prev.ministers.map((minister) =>
        minister.id === id ? { ...minister, image: imageUrl } : minister
      ),
    }));
  };

  const handleAddMinister = () => {
    const newMinister = {
      id: Math.max(0, ...sectionContent.ministers.map((m) => m.id)) + 1,
      name: "",
      role: "",
      image: "",
    };
    setSectionContent((prev) => ({
      ...prev,
      ministers: [...prev.ministers, newMinister],
    }));
    setEditingMinisterId(newMinister.id);
  };

  const handleDeleteMinister = (id) => {
    setSectionContent((prev) => ({
      ...prev,
      ministers: prev.ministers.filter((minister) => minister.id !== id),
    }));
    setEditingMinisterId(null);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateNextGenMinistersSection(sectionContent);
      setIsEditing(false);
      setEditingMinisterId(null);
      toast.success("NextGen Ministers section updated successfully");
    } catch (error) {
      console.error("Error saving NextGen Ministers section:", error);
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
        <h3 className="font-medium text-gray-800">NextGen Ministers</h3>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setEditingMinisterId(null);
          }}
          className="px-4 py-2 text-sm border border-gray-200 bg-white rounded-md hover:bg-gray-50"
          disabled={isSaving}
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-4">
              {sectionContent.heading}
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              {sectionContent.description}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {sectionContent.ministers.map((minister) => (
                <div
                  key={minister.id}
                  className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200"
                >
                  <div className="aspect-square bg-gray-200 relative">
                    {minister.image && (
                      <Image
                        src={minister.image}
                        alt={minister.name}
                        className="w-full h-full object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    )}
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-medium text-sm">{minister.name}</h3>
                    <p className="text-gray-600 text-xs">{minister.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 bg-white">
          {editingMinisterId === null ? (
            <>
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
                    disabled={isSaving}
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
                    placeholder="Section description"
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-900">
                    NextGen Ministers
                  </h4>
                  <button
                    onClick={handleAddMinister}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    disabled={isSaving}
                  >
                    Add Minister
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sectionContent.ministers.map((minister) => (
                    <div
                      key={minister.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center mb-2">
                        <div className="h-12 w-12 bg-gray-200 rounded-full overflow-hidden mr-3">
                          {minister.image && (
                            <Image
                              src={minister.image}
                              alt={minister.name}
                              className="w-full h-full object-cover"
                              width={48}
                              height={48}
                            />
                          )}
                        </div>
                        <div>
                          <h5 className="font-medium">{minister.name}</h5>
                          <p className="text-sm text-gray-600">
                            {minister.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setEditingMinisterId(minister.id)}
                          className="px-3 py-1.5 text-sm border border-gray-200 rounded-md hover:bg-gray-100"
                          disabled={isSaving}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteMinister(minister.id)}
                          className="px-3 py-1.5 text-sm border border-red-200 text-red-600 rounded-md hover:bg-red-50"
                          disabled={isSaving}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
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
            </>
          ) : (
            <div className="max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-medium text-gray-900">
                  {sectionContent.ministers.find(
                    (m) => m.id === editingMinisterId
                  )?.name
                    ? `Edit Minister: ${
                        sectionContent.ministers.find(
                          (m) => m.id === editingMinisterId
                        ).name
                      }`
                    : "Add New Minister"}
                </h4>
                <button
                  onClick={() => setEditingMinisterId(null)}
                  className="text-gray-500 hover:text-gray-700"
                  disabled={isSaving}
                >
                  &times;
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minister Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={
                      sectionContent.ministers.find(
                        (m) => m.id === editingMinisterId
                      )?.name || ""
                    }
                    onChange={(e) => handleMinisterChange(e, editingMinisterId)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Full name"
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role/Title
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={
                      sectionContent.ministers.find(
                        (m) => m.id === editingMinisterId
                      )?.role || ""
                    }
                    onChange={(e) => handleMinisterChange(e, editingMinisterId)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. Next Gen Minister, Youth Pastor, etc."
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minister Image
                  </label>
                  <ImageUpload
                    existingImageUrl={
                      sectionContent.ministers.find(
                        (m) => m.id === editingMinisterId
                      )?.image || ""
                    }
                    onImageUploaded={(imageUrl) =>
                      handleImageChange(editingMinisterId, imageUrl)
                    }
                    section="about-us/nextgen-ministers"
                    disabled={isSaving}
                  />
                </div>

                <div className="flex justify-end pt-6">
                  <button
                    onClick={() => setEditingMinisterId(null)}
                    className="px-6 py-2 mr-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    disabled={isSaving}
                  >
                    Back to List
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save All Changes"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
