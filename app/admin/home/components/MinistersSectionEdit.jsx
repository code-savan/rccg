"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function MinistersSectionEdit() {
  // Initial state based on current content
  const [ministersContent, setMinistersContent] = useState({
    heading: "Our Ministers",
    description: "At RCCG Rod of God Parish, our ministers are dedicated servants of God, committed to teaching His Word, nurturing spiritual growth, and supporting our community with love and prayer. They lead with wisdom, humility, and a passion for sharing the Gospel, guiding us in faith and unity.",
    ministers: [
      {
        id: 1,
        name: "Pastor J.K Balogun",
        title: "Head Pastor",
        image: "/images/img_dsc_5797.png"
      },
      {
        id: 2,
        name: "Pastor(Mrs) F.O Balogun",
        title: "Head Pastor",
        image: "/images/img_dsc_9587.png"
      }
    ],
    buttonText: "See more info",
    buttonLink: "/about-us"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingMinister, setEditingMinister] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMinistersContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleMinisterChange = (e, id) => {
    const { name, value } = e.target;
    setMinistersContent((prev) => ({
      ...prev,
      ministers: prev.ministers.map(minister =>
        minister.id === id ? { ...minister, [name]: value } : minister
      )
    }));
  };

  const handleSave = () => {
    // Here we would typically save to database (e.g. Supabase)
    setIsEditing(false);
    setEditingMinister(null);
    console.log("Saved ministers content:", ministersContent);
    // API call would go here
  };

  return (
    <div className="mb-12 border border-gray-200">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Ministers Section</h3>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setEditingMinister(null);
          }}
          className="px-4 py-2 text-sm border border-gray-200 bg-white"
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {/* Preview */}
      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-medium text-center mb-4">{ministersContent.heading}</h2>
            <p className="text-gray-700 text-center mb-8">{ministersContent.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ministersContent.ministers.map((minister) => (
                <div key={minister.id} className="relative rounded-lg overflow-hidden">
                  <div className="h-80 relative">
                    <Image
                      src={minister.image}
                      alt={minister.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 p-4 text-white">
                    <h3 className="text-xl font-medium">{minister.name}</h3>
                    <p>{minister.title}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <button className="px-6 py-2 border border-gray-300 rounded">
                {ministersContent.buttonText}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-4 bg-white">
          {editingMinister === null ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    name="heading"
                    value={ministersContent.heading}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300"
                    placeholder="Section heading"
                  />
                </div>
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
                    placeholder="Button text"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={ministersContent.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300"
                  placeholder="Section description"
                />
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-700">Ministers</h4>
                  <button
                    onClick={() => setEditingMinister(0)}
                    className="px-3 py-1 text-xs border border-gray-200 bg-white"
                  >
                    Add Minister
                  </button>
                </div>

                <div className="space-y-4">
                  {ministersContent.ministers.map((minister) => (
                    <div
                      key={minister.id}
                      className="flex items-center justify-between p-3 border border-gray-200"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 relative rounded-full overflow-hidden mr-3">
                          <Image
                            src={minister.image}
                            alt={minister.name}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{minister.name}</p>
                          <p className="text-sm text-gray-600">{minister.title}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setEditingMinister(minister.id)}
                        className="px-3 py-1 text-xs border border-gray-200 bg-white"
                      >
                        Edit
                      </button>
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
                  {editingMinister === 0 ? "Add New Minister" : "Edit Minister"}
                </h4>
                <button
                  onClick={() => setEditingMinister(null)}
                  className="px-3 py-1 text-xs border border-gray-200 bg-white"
                >
                  Back
                </button>
              </div>

              {editingMinister !== 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={ministersContent.ministers.find(m => m.id === editingMinister)?.name || ""}
                        onChange={(e) => handleMinisterChange(e, editingMinister)}
                        className="w-full px-3 py-2 border border-gray-300"
                        placeholder="Minister name"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={ministersContent.ministers.find(m => m.id === editingMinister)?.title || ""}
                        onChange={(e) => handleMinisterChange(e, editingMinister)}
                        className="w-full px-3 py-2 border border-gray-300"
                        placeholder="Minister title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        name="image"
                        value={ministersContent.ministers.find(m => m.id === editingMinister)?.image || ""}
                        onChange={(e) => handleMinisterChange(e, editingMinister)}
                        className="w-full px-3 py-2 border border-gray-300"
                        placeholder="/images/your-image.jpg"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="w-48 h-48 relative rounded-lg overflow-hidden">
                      <Image
                        src={ministersContent.ministers.find(m => m.id === editingMinister)?.image || "/placeholder.jpg"}
                        alt="Minister preview"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="w-full px-3 py-2 border border-gray-300"
                        placeholder="Minister name"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="w-full px-3 py-2 border border-gray-300"
                        placeholder="Minister title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        name="image"
                        className="w-full px-3 py-2 border border-gray-300"
                        placeholder="/images/your-image.jpg"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="w-48 h-48 relative rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">Image Preview</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-4 mt-6">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white"
                >
                  {editingMinister === 0 ? "Add Minister" : "Update Minister"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
