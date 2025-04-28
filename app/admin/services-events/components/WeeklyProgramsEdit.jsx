"use client";

import React, { useState } from "react";

export default function WeeklyProgramsEdit() {
  const [sectionContent, setSectionContent] = useState({
    heading: "Weekly and Monthly\nChurch Programs",
    description:
      "This team maintains the cleanliness and beauty of God's house, creating a welcoming and reverent environment for worship.",
    weeklyPrograms: [
      {
        id: 1,
        title: "Sunday Prayer Meeting",
        description:
          "Come worship with us every Sunday.\nWe promise you'll be filled with the holy spirit.",
        location: "Parish House Indianapolis.",
        day: "Sundays",
        time: "9am – 9:30am",
      },
      {
        id: 2,
        title: "Sunday School",
        description:
          "Come worship with us every Sunday.\nWe promise you'll be filled with the holy spirit.",
        location: "Parish House Indianapolis.",
        day: "Sundays",
        time: "9:30am – 10:30am",
      },
      {
        id: 3,
        title: "Sunday Service",
        description:
          "Come worship with us every Sunday.\nWe promise you'll be filled with the holy spirit.",
        location: "Parish House Indianapolis.",
        day: "Sundays",
        time: "10:30am – 1:00pm",
      },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingProgramId, setEditingProgramId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleProgramChange = (e, id) => {
    const { name, value } = e.target;
    setSectionContent((prev) => ({
      ...prev,
      weeklyPrograms: prev.weeklyPrograms.map((program) =>
        program.id === id ? { ...program, [name]: value } : program
      ),
    }));
  };

  const handleAddProgram = () => {
    const newProgram = {
      id: Math.max(0, ...sectionContent.weeklyPrograms.map((p) => p.id)) + 1,
      title: "",
      description: "",
      location: "Parish House Indianapolis.",
      day: "",
      time: "",
    };
    setSectionContent((prev) => ({
      ...prev,
      weeklyPrograms: [...prev.weeklyPrograms, newProgram],
    }));
    setEditingProgramId(newProgram.id);
  };

  const handleDeleteProgram = (id) => {
    setSectionContent((prev) => ({
      ...prev,
      weeklyPrograms: prev.weeklyPrograms.filter(
        (program) => program.id !== id
      ),
    }));
    setEditingProgramId(null);
  };

  const handleSave = () => {
    setIsEditing(false);
    setEditingProgramId(null);
    console.log("Saved weekly programs content:", sectionContent);
    // API call would go here
  };

  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Weekly Programs Section</h3>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setEditingProgramId(null);
          }}
          className="px-4 py-2 text-sm border border-gray-200 bg-white rounded-md hover:bg-gray-50"
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold whitespace-pre-line">
                {sectionContent.heading}
              </h2>
              <p className="mt-4 text-gray-600">{sectionContent.description}</p>
            </div>

            <h3 className="text-2xl font-semibold mb-6">Weekly</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sectionContent.weeklyPrograms.map((program) => (
                <div
                  key={program.id}
                  className="border border-gray-300 rounded-lg p-5 flex flex-col justify-between h-full"
                >
                  <div>
                    <h4 className="text-xl font-medium mb-2">
                      {program.title}
                    </h4>
                    <p className="text-gray-600 whitespace-pre-line mb-6">
                      {program.description}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-gray-600 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{program.location}</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-gray-600 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{program.day}</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-gray-600 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{program.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 bg-white">
          {editingProgramId === null ? (
            <>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Heading (use \n for line breaks)
                  </label>
                  <textarea
                    name="heading"
                    value={sectionContent.heading}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Section heading"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Description
                  </label>
                  <textarea
                    name="description"
                    value={sectionContent.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Section description"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-900">Weekly Programs</h4>
                  <button
                    onClick={handleAddProgram}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Program
                  </button>
                </div>

                <div className="space-y-4">
                  {sectionContent.weeklyPrograms.map((program) => (
                    <div
                      key={program.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between mb-3">
                        <h5 className="font-medium">
                          {program.title || "New Program"}
                        </h5>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingProgramId(program.id)}
                            className="px-3 py-1.5 text-sm border border-gray-200 rounded-md hover:bg-gray-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProgram(program.id)}
                            className="px-3 py-1.5 text-sm border border-red-200 text-red-600 rounded-md hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">
                            Title:
                          </span>{" "}
                          {program.title}
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            Location:
                          </span>{" "}
                          {program.location}
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            Day:
                          </span>{" "}
                          {program.day}
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            Time:
                          </span>{" "}
                          {program.time}
                        </div>
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
                  {sectionContent.weeklyPrograms.find(
                    (p) => p.id === editingProgramId
                  )?.title
                    ? `Edit Program: ${
                        sectionContent.weeklyPrograms.find(
                          (p) => p.id === editingProgramId
                        ).title
                      }`
                    : "Add New Program"}
                </h4>
                <button
                  onClick={() => setEditingProgramId(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Program Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={
                      sectionContent.weeklyPrograms.find(
                        (p) => p.id === editingProgramId
                      )?.title || ""
                    }
                    onChange={(e) => handleProgramChange(e, editingProgramId)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. Sunday Prayer Meeting"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (use \n for line breaks)
                  </label>
                  <textarea
                    name="description"
                    value={
                      sectionContent.weeklyPrograms.find(
                        (p) => p.id === editingProgramId
                      )?.description || ""
                    }
                    onChange={(e) => handleProgramChange(e, editingProgramId)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Program description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={
                      sectionContent.weeklyPrograms.find(
                        (p) => p.id === editingProgramId
                      )?.location || ""
                    }
                    onChange={(e) => handleProgramChange(e, editingProgramId)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. Parish House Indianapolis."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Day
                  </label>
                  <input
                    type="text"
                    name="day"
                    value={
                      sectionContent.weeklyPrograms.find(
                        (p) => p.id === editingProgramId
                      )?.day || ""
                    }
                    onChange={(e) => handleProgramChange(e, editingProgramId)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. Sundays"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="text"
                    name="time"
                    value={
                      sectionContent.weeklyPrograms.find(
                        (p) => p.id === editingProgramId
                      )?.time || ""
                    }
                    onChange={(e) => handleProgramChange(e, editingProgramId)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. 9am – 9:30am"
                  />
                </div>

                <div className="flex justify-end pt-6">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save Program
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
