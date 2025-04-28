"use client";

import React, { useState } from "react";
import {
  PlusCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export default function DepartmentsEdit() {
  const [sectionTitle, setSectionTitle] = useState("OUR DEPARTMENTS");
  const [sectionDescription, setSectionDescription] = useState(
    "At RCCG Rod of God Parish, our various departments serve to strengthen the church and community. There's a place for everyone to serve, grow, and make an impact!"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: "Choir",
      description:
        "Our Choir leads the congregation in heartfelt worship, creating an atmosphere where God's presence is felt through spirit-filled songs and praise.",
      image: "img_pexels_cottonbro_7520369.png",
    },
    {
      id: 2,
      name: "Sunday School",
      description:
        "Sunday School is a time of deep biblical teaching, helping believers grow in faith, understanding, and practical Christian living.",
      image: "img_dsc_9200.png",
    },
    {
      id: 3,
      name: "Welfare",
      description:
        "The Welfare Department extends God's love through acts of kindness, providing support and care to those in need within the church and community.",
      image: "img_dsc_9539.png",
    },
    {
      id: 4,
      name: "Ushering",
      description:
        "Our Ushers ensure a warm and welcoming worship experience by assisting with seating, orderliness, and ensuring a smooth flow during services.",
      image: "img_pexels_kawerodr.png",
    },
    {
      id: 5,
      name: "Sound & Media",
      description:
        "The Sound & Media team enhances worship by managing audio, visuals, and live streaming, ensuring every message is delivered with clarity and excellence.",
      image: "img_dsc_9519.png",
    },
    {
      id: 6,
      name: "Special Duties",
      description:
        "The Special Duties team provides essential support for church programs, coordinating logistics and ensuring smooth event execution.",
      image: "img_dsc_9552.png",
    },
    {
      id: 7,
      name: "Children and Media",
      description:
        "Our Children's Ministry nurtures young hearts in the faith, while the Media team creatively shares God's message through digital platforms.",
      image: "img_dsc_9435.png",
    },
    {
      id: 8,
      name: "Accounting",
      description:
        "The Accounting team ensures transparency and stewardship in managing church finances, handling tithes, offerings, and budgets with integrity.",
      image: "img_dsc_9221.png",
    },
    {
      id: 9,
      name: "Transportation",
      description:
        "The Transportation team ensures that members and visitors can attend services and events with ease, providing reliable transport solutions.",
      image: "img_dsc_9484.png",
    },
    {
      id: 10,
      name: "Sanctuary Keeper & Beautifiers",
      description:
        "This team maintains the cleanliness and beauty of God's house, creating a welcoming and reverent environment for worship.",
      image: "img_kevin_wright_4s_482x630.png",
    },
  ]);

  const [currentDepartment, setCurrentDepartment] = useState({
    id: null,
    name: "",
    description: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDepartment({
      ...currentDepartment,
      [name]: value,
    });
  };

  const handleAddDepartment = () => {
    setCurrentDepartment({
      id: null,
      name: "",
      description: "",
      image: "",
    });
    setIsEditing(true);
  };

  const handleEditDepartment = (department) => {
    setCurrentDepartment({ ...department });
    setIsEditing(true);
  };

  const handleDeleteDepartment = (id) => {
    setDepartments(departments.filter((department) => department.id !== id));
  };

  const handleSaveDepartment = () => {
    if (currentDepartment.name.trim() === "") {
      alert("Department name cannot be empty");
      return;
    }

    if (currentDepartment.id) {
      // Update existing department
      setDepartments(
        departments.map((department) =>
          department.id === currentDepartment.id
            ? currentDepartment
            : department
        )
      );
    } else {
      // Add new department
      const newDepartment = {
        ...currentDepartment,
        id: Date.now(),
      };
      setDepartments([...departments, newDepartment]);
    }

    setCurrentDepartment({
      id: null,
      name: "",
      description: "",
      image: "",
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setCurrentDepartment({
      id: null,
      name: "",
      description: "",
      image: "",
    });
    setIsEditing(false);
  };

  const handleSaveAll = () => {
    const departmentsData = {
      title: sectionTitle,
      description: sectionDescription,
      departments: departments,
    };

    console.log("Saving departments data:", departmentsData);
  };

  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Departments Section</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm border border-gray-200 bg-white rounded-md hover:bg-gray-50"
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-4">
              {sectionTitle}
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              {sectionDescription}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departments.map((department) => (
                <div
                  key={department.id}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="h-[500px] bg-gray-200 relative">
                    {department.image && (
                      <img
                        src={`/images/${department.image}`}
                        alt={department.name}
                        className="w-full h-full object-cover"
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
                    value={sectionTitle}
                    onChange={(e) => setSectionTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Section title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Description
                  </label>
                  <textarea
                    value={sectionDescription}
                    onChange={(e) => setSectionDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Section description"
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
                  >
                    <PlusCircleIcon className="h-5 w-5 mr-1" />
                    Add Department
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {departments.map((department) => (
                    <div
                      key={department.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-center mb-3">
                        <div className="h-12 w-12 bg-gray-200 rounded-md overflow-hidden mr-3">
                          {department.image && (
                            <img
                              src={`/images/${department.image}`}
                              alt={department.name}
                              className="w-full h-full object-cover"
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
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteDepartment(department.id)}
                          className="flex items-center text-red-600 hover:text-red-800"
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
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
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
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image Filename
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={currentDepartment.image}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="e.g. department-image.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the image filename only. Images should be in the
                    public/images directory.
                  </p>
                </div>

                <div className="flex space-x-3 pt-3">
                  <button
                    onClick={handleSaveDepartment}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    <CheckCircleIcon className="h-5 w-5 mr-1" />
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
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
