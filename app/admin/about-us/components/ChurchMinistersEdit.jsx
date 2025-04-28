"use client";

import React, { useState } from "react";

export default function ChurchMinistersEdit() {
  const [sectionContent, setSectionContent] = useState({
    ministers: [
      {
        id: 1,
        name: "Pastor Bolanle Sowole",
        role: "Minister",
        image: "img_dsc_9310.png",
      },
      {
        id: 2,
        name: "Sister Omolade Babalola",
        role: "Minister",
        image: "img_dsc_9297.png",
      },
      {
        id: 3,
        name: "Bro Jide Akinsole",
        role: "Minister",
        image: "img_dsc_9242.png",
      },
      {
        id: 4,
        name: "Dcn. Emmanuel Onakoya",
        role: "Minister",
        image: "img_dsc_9206.png",
      },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingMinisterId, setEditingMinisterId] = useState(null);

  const handleMinisterChange = (e, id) => {
    const { name, value } = e.target;
    setSectionContent((prev) => ({
      ...prev,
      ministers: prev.ministers.map((minister) =>
        minister.id === id ? { ...minister, [name]: value } : minister
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

  const handleSave = () => {
    setIsEditing(false);
    setEditingMinisterId(null);
    console.log("Saved section content:", sectionContent);
  };

  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Church Ministers</h3>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setEditingMinisterId(null);
          }}
          className="px-4 py-2 text-sm border border-gray-200 bg-white rounded-md hover:bg-gray-50"
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {sectionContent.ministers.map((minister) => (
                <div
                  key={minister.id}
                  className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200"
                >
                  <div className="aspect-square bg-gray-200 relative">
                    {minister.image && (
                      <img
                        src={`/images/${minister.image}`}
                        alt={minister.name}
                        className="w-full h-full object-cover"
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
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-900">
                    Church Ministers
                  </h4>
                  <button
                    onClick={handleAddMinister}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
                            <img
                              src={`/images/${minister.image}`}
                              alt={minister.name}
                              className="w-full h-full object-cover"
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
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteMinister(minister.id)}
                          className="px-3 py-1.5 text-sm border border-red-200 text-red-600 rounded-md hover:bg-red-50"
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
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
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
                    placeholder="e.g. Minister, Pastor, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Filename
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={
                      sectionContent.ministers.find(
                        (m) => m.id === editingMinisterId
                      )?.image || ""
                    }
                    onChange={(e) => handleMinisterChange(e, editingMinisterId)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. minister-image.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the filename only. Images should be in the
                    public/images directory.
                  </p>
                </div>

                <div className="flex justify-end pt-6">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save Minister
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
