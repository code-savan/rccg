"use client";

import React, { useState } from "react";

export default function DepartmentHeadsEdit() {
  const [sectionContent, setSectionContent] = useState({
    departmentHeads: [
      {
        id: 1,
        name: "Oladipupo Baruwa",
        role: "HOD Protocol",
        image: "img_dsc_9396.png",
      },
      {
        id: 2,
        name: "Yetunde Ajanaku",
        role: "HOD Choir",
        image: "img_dsc_9388.png",
      },
      {
        id: 3,
        name: "Oloyede Amure",
        role: "HOD Soccer Team",
        image: "img_dsc_9374.png",
      },
      {
        id: 4,
        name: "Segun Oladeji",
        role: "HOD Publication",
        image: "img_dsc_9404.png",
      },
      {
        id: 5,
        name: "David Ayodele",
        role: "HOD Drama",
        image: "img_dsc_9420.png",
      },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingHeadId, setEditingHeadId] = useState(null);

  const handleHeadChange = (e, id) => {
    const { name, value } = e.target;
    setSectionContent((prev) => ({
      ...prev,
      departmentHeads: prev.departmentHeads.map((head) =>
        head.id === id ? { ...head, [name]: value } : head
      ),
    }));
  };

  const handleAddHead = () => {
    const newHead = {
      id: Math.max(0, ...sectionContent.departmentHeads.map((m) => m.id)) + 1,
      name: "",
      role: "",
      image: "",
    };
    setSectionContent((prev) => ({
      ...prev,
      departmentHeads: [...prev.departmentHeads, newHead],
    }));
    setEditingHeadId(newHead.id);
  };

  const handleDeleteHead = (id) => {
    setSectionContent((prev) => ({
      ...prev,
      departmentHeads: prev.departmentHeads.filter((head) => head.id !== id),
    }));
    setEditingHeadId(null);
  };

  const handleSave = () => {
    setIsEditing(false);
    setEditingHeadId(null);
    console.log("Saved section content:", sectionContent);
  };

  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Department Heads</h3>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setEditingHeadId(null);
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
              {sectionContent.departmentHeads.map((head) => (
                <div
                  key={head.id}
                  className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200"
                >
                  <div className="aspect-square bg-gray-200 relative">
                    {head.image && (
                      <img
                        src={`/images/${head.image}`}
                        alt={head.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-medium text-sm">{head.name}</h3>
                    <p className="text-gray-600 text-xs">{head.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 bg-white">
          {editingHeadId === null ? (
            <>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-900">
                    Department Heads
                  </h4>
                  <button
                    onClick={handleAddHead}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Department Head
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sectionContent.departmentHeads.map((head) => (
                    <div
                      key={head.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center mb-2">
                        <div className="h-12 w-12 bg-gray-200 rounded-full overflow-hidden mr-3">
                          {head.image && (
                            <img
                              src={`/images/${head.image}`}
                              alt={head.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <h5 className="font-medium">{head.name}</h5>
                          <p className="text-sm text-gray-600">{head.role}</p>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setEditingHeadId(head.id)}
                          className="px-3 py-1.5 text-sm border border-gray-200 rounded-md hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteHead(head.id)}
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
                  {sectionContent.departmentHeads.find(
                    (m) => m.id === editingHeadId
                  )?.name
                    ? `Edit: ${
                        sectionContent.departmentHeads.find(
                          (m) => m.id === editingHeadId
                        ).name
                      }`
                    : "Add New Department Head"}
                </h4>
                <button
                  onClick={() => setEditingHeadId(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={
                      sectionContent.departmentHeads.find(
                        (m) => m.id === editingHeadId
                      )?.name || ""
                    }
                    onChange={(e) => handleHeadChange(e, editingHeadId)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={
                      sectionContent.departmentHeads.find(
                        (m) => m.id === editingHeadId
                      )?.role || ""
                    }
                    onChange={(e) => handleHeadChange(e, editingHeadId)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. HOD Protocol, HOD Choir, etc."
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
                      sectionContent.departmentHeads.find(
                        (m) => m.id === editingHeadId
                      )?.image || ""
                    }
                    onChange={(e) => handleHeadChange(e, editingHeadId)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. person-image.jpg"
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
                    Save
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
