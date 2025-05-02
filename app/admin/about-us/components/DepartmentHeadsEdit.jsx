"use client";

import React, { useState } from "react";
import Image from "next/image";
// import { toast } from "react-hot-toast";
// import {
//   fetchDepartmentHeadsSection,
//   updateDepartmentHeadsSection,
// } from "@/lib/services/aboutUsService";
import ImageUpload from "@/components/@admin/ImageUpload";

export default function DepartmentHeadsEdit() {
  const [sectionContent, setSectionContent] = useState({
    heading: "DEPARTMENT HEADS",
    description:
      "Our department heads coordinate various functions to ensure the smooth operation of our church.",
    departmentHeads: [
      {
        id: 1,
        name: "Oladipupo Baruwa",
        role: "HOD Protocol",
        bio: "",
        image: "/images/img_dsc_9396.png",
      },
      {
        id: 2,
        name: "Yetunde Ajanaku",
        role: "HOD Choir",
        bio: "",
        image: "/images/img_dsc_9388.png",
      },
      {
        id: 3,
        name: "Oloyede Amure",
        role: "HOD Soccer Team",
        bio: "",
        image: "/images/img_dsc_9374.png",
      },
      {
        id: 4,
        name: "Segun Oladeji",
        role: "HOD Publication",
        bio: "",
        image: "/images/img_dsc_9404.png",
      },
      {
        id: 5,
        name: "David Ayodele",
        role: "HOD Drama",
        bio: "",
        image: "/images/img_dsc_9420.png",
      },
      {
        id: 6,
        name: "Pastor(Mrs) F.O Balogun",
        role: "HOD Sanctuary",
        bio: "",
        image: "/images/img_dsc_9495.png",
      },
      {
        id: 7,
        name: "Bro Ademola Karonwi",
        role: "HOD Children's Dept.",
        bio: "",
        image: "/images/img_dsc_9511.png",
      },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingHeadId, setEditingHeadId] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Comment out API fetch
  // useEffect(() => {
  //   async function fetchSectionData() {
  //     try {
  //       setIsLoading(true);
  //       const data = await fetchDepartmentHeadsSection();
  //       setSectionContent(data);
  //     } catch (error) {
  //       console.error("Error fetching Department Heads section data:", error);
  //       toast.error("Failed to load section data");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchSectionData();
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleHeadChange = (e, id) => {
    const { name, value } = e.target;
    setSectionContent((prev) => ({
      ...prev,
      departmentHeads: prev.departmentHeads.map((head) =>
        head.id === id ? { ...head, [name]: value } : head
      ),
    }));
  };

  const handleImageChange = (id, imageUrl) => {
    setSectionContent((prev) => ({
      ...prev,
      departmentHeads: prev.departmentHeads.map((head) =>
        head.id === id ? { ...head, image: imageUrl } : head
      ),
    }));
  };

  const handleAddHead = () => {
    const newId =
      Math.max(0, ...sectionContent.departmentHeads.map((m) => m.id)) + 1;

    const newHead = {
      id: newId,
      name: "",
      role: "",
      bio: "",
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
    // Comment out API save
    setIsSaving(true);
    // try to simulate saving
    setTimeout(() => {
      console.log("Saved section content:", sectionContent);
      setIsEditing(false);
      setEditingHeadId(null);
      setIsSaving(false);
      alert("Department Heads section saved successfully");
    }, 1000);

    // try {
    //   setIsSaving(true);
    //   await updateDepartmentHeadsSection(sectionContent);
    //   setIsEditing(false);
    //   setEditingHeadId(null);
    //   toast.success("Department Heads section updated successfully");
    // } catch (error) {
    //   console.error("Error saving Department Heads section:", error);
    //   toast.error("Failed to update section");
    // } finally {
    //   setIsSaving(false);
    // }
  };

  // if (isLoading) {
  //   return (
  //     <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden p-6">
  //       <div className="animate-pulse">
  //         <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
  //         <div className="h-40 bg-gray-200 rounded"></div>
  //       </div>
  //     </div>
  //   );
  // }

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
              {sectionContent.departmentHeads.map((head) => (
                <div
                  key={head.id}
                  className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200"
                >
                  <div className="aspect-square bg-gray-200 relative">
                    {head.image && (
                      <Image
                        src={head.image}
                        alt={head.name}
                        className="w-full h-full object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                    )}
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-medium text-sm">{head.name}</h3>
                    <p className="text-gray-600 text-xs">{head.role}</p>
                    {head.bio && (
                      <p className="text-gray-600 text-xs mt-1">{head.bio}</p>
                    )}
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
                    Department Heads
                  </h4>
                  <button
                    onClick={handleAddHead}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    disabled={isSaving}
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
                            <Image
                              src={head.image}
                              alt={head.name}
                              className="w-full h-full object-cover"
                              width={48}
                              height={48}
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
                          disabled={isSaving}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteHead(head.id)}
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
                  disabled={isSaving}
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
                    disabled={isSaving}
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
                    placeholder="e.g. HOD Children's Dept."
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio (Optional)
                  </label>
                  <textarea
                    name="bio"
                    value={
                      sectionContent.departmentHeads.find(
                        (m) => m.id === editingHeadId
                      )?.bio || ""
                    }
                    onChange={(e) => handleHeadChange(e, editingHeadId)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Brief biography"
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department Head Image
                  </label>
                  <ImageUpload
                    existingImageUrl={
                      sectionContent.departmentHeads.find(
                        (m) => m.id === editingHeadId
                      )?.image || ""
                    }
                    onImageUploaded={(imageUrl) =>
                      handleImageChange(editingHeadId, imageUrl)
                    }
                    section="about-us/department-heads"
                    disabled={isSaving}
                  />
                </div>

                <div className="flex justify-end pt-6">
                  <button
                    onClick={() => setEditingHeadId(null)}
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
