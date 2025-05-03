"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import {
  PlusCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import {
  fetchDepartmentsSection,
  updateDepartmentsSection,
} from "@/lib/services/aboutUsService";
import ImageUpload from "@/components/@admin/ImageUpload";

export default function DepartmentsEdit() {
  const [sectionContent, setSectionContent] = useState({
    heading: "",
    description: "",
    departments: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState({
    id: null,
    name: "",
    description: "",
    image: "",
    head: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    async function fetchSectionData() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchDepartmentsSection();
        setSectionContent(data);
      } catch (error) {
        console.error("Error fetching Departments section data:", error);
        setError("Failed to load section data. Please try again later.");
        toast.error("Failed to load section data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSectionData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDepartment({
      ...currentDepartment,
      [name]: value,
    });
  };

  const handleImageChange = (imageUrl) => {
    setCurrentDepartment({
      ...currentDepartment,
      image: imageUrl,
    });
  };

  const handleHeadingChange = (e) => {
    const { name, value } = e.target;
    setSectionContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddDepartment = () => {
    setCurrentDepartment({
      id: null,
      name: "",
      description: "",
      image: "",
      head: "",
    });
    setIsEditing(true);
  };

  const handleEditDepartment = (department) => {
    setCurrentDepartment({ ...department });
    setIsEditing(true);
  };

  const handleDeleteDepartment = (id) => {
    setSectionContent((prev) => ({
      ...prev,
      departments: prev.departments.filter(
        (department) => department.id !== id
      ),
    }));
  };

  const handleSaveDepartment = () => {
    if (currentDepartment.name.trim() === "") {
      alert("Department name cannot be empty");
      return;
    }

    if (currentDepartment.id) {
      // Update existing department
      setSectionContent((prev) => ({
        ...prev,
        departments: prev.departments.map((department) =>
          department.id === currentDepartment.id
            ? currentDepartment
            : department
        ),
      }));
    } else {
      // Add new department
      const newDepartment = {
        ...currentDepartment,
        id: Date.now(),
      };
      setSectionContent((prev) => ({
        ...prev,
        departments: [...prev.departments, newDepartment],
      }));
    }

    setCurrentDepartment({
      id: null,
      name: "",
      description: "",
      image: "",
      head: "",
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setCurrentDepartment({
      id: null,
      name: "",
      description: "",
      image: "",
      head: "",
    });
    setIsEditing(false);
  };

  const handleSaveAll = async () => {
    try {
      setIsSaving(true);
      await updateDepartmentsSection(sectionContent);
      toast.success("Departments section updated successfully");
    } catch (error) {
      console.error("Error saving Departments section:", error);
      setError("Failed to update Departments section. Please try again later.");
      toast.error("Failed to update Departments section");
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

  if (error) {
    return (
      <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden p-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Departments Section</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm border border-gray-200 bg-white rounded-md hover:bg-gray-50"
          disabled={isSaving}
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-4">
              {sectionContent.heading}
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              {sectionContent.description}
            </p>

            <div className="grid sm:grid-cols-1 grid-cols-2 gap-6">
              {sectionContent.departments.map((department) => (
                <div
                  key={department.id}
                  className="border border-gray-200 rounded-[22px] overflow-hidden"
                >
                  <div className="aspect-video bg-gray-200 relative">
                    {department.image && (
                      <Image
                        src={department.image}
                        alt={department.name}
                        className="w-full h-full object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      {department.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {department.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 bg-white">
          {currentDepartment.id === null && !currentDepartment.name ? (
            <>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    name="heading"
                    value={sectionContent.heading}
                    onChange={handleHeadingChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Section title"
                    disabled={isSaving}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Description
                  </label>
                  <textarea
                    name="description"
                    value={sectionContent.description}
                    onChange={handleHeadingChange}
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
                    Departments List
                  </h4>
                  <button
                    onClick={handleAddDepartment}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                    disabled={isSaving}
                  >
                    <PlusCircleIcon className="h-5 w-5 mr-1" />
                    Add Department
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sectionContent.departments.map((department) => (
                    <div
                      key={department.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center mb-3">
                        <div className="h-12 w-12 bg-gray-200 rounded-md overflow-hidden mr-3">
                          {department.image && (
                            <Image
                              src={department.image}
                              alt={department.name}
                              className="w-full h-full object-cover"
                              width={48}
                              height={48}
                            />
                          )}
                        </div>
                        <div>
                          <h5 className="font-medium">{department.name}</h5>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {department.description}
                      </p>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEditDepartment(department)}
                          className="flex items-center text-blue-600 hover:text-blue-800"
                          disabled={isSaving}
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteDepartment(department.id)}
                          className="flex items-center text-red-600 hover:text-red-800"
                          disabled={isSaving}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  onClick={handleSaveAll}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {currentDepartment.id
                  ? "Edit Department"
                  : "Add New Department"}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={currentDepartment.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter department name"
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={currentDepartment.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="3"
                    placeholder="Enter department description"
                    disabled={isSaving}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department Image
                  </label>
                  <ImageUpload
                    onImageUploaded={handleImageChange}
                    section="about-us-departments"
                    bucketName="about-us-files"
                    existingImageUrl={currentDepartment.image}
                    buttonText="Upload Department Image"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Head
                  </label>
                  <input
                    type="text"
                    name="head"
                    value={currentDepartment.head}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter department head"
                    disabled={isSaving}
                  />
                </div>

                <div className="flex space-x-3 pt-3">
                  <button
                    onClick={handleSaveDepartment}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-400"
                    disabled={isSaving}
                  >
                    <CheckCircleIcon className="h-5 w-5 mr-1" />
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-400"
                    disabled={isSaving}
                  >
                    <XCircleIcon className="h-5 w-5 mr-1" />
                    Cancel
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
