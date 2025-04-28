"use client";

import React, { useState } from "react";

export default function ServiceTimesEdit() {
  // Initial state based on current content
  const [servicesContent, setServicesContent] = useState({
    heading: "Our Service times",
    description:
      "Join us at RCCG Rod of God Parish for uplifting worship and powerful teachings. Our services are a time of fellowship, prayer, and spiritual growth.",
    services: [
      {
        id: 1,
        name: "Sunday Service",
        description:
          "Come worship with us every Sunday.\nWe promise you'll be filled with the holy spirit.",
        location: "Parish House Indianapolis.",
        schedule: "Every Sunday",
        time: "10:00 AM - 12:00 PM",
      },
      {
        id: 2,
        name: "Weekly Service",
        description:
          "Come worship with us every Sunday.\nWe promise you'll be filled with the holy spirit.",
        location: "Parish House Indianapolis.",
        schedule: "Every Tuesday",
        time: "7:00 PM - 8:30 PM",
      },
      {
        id: 3,
        name: "Prayer Service",
        description:
          "Come worship with us every Sunday.\nWe promise you'll be filled with the holy spirit.",
        location: "Parish House Indianapolis.",
        schedule: "Fridays & Saturdays",
        time: "7:00 PM - 8:30 PM",
      },
    ],
    seeMoreText: "See more",
    seeMoreLink: "/services-events",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServicesContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (e, id) => {
    const { name, value } = e.target;
    setServicesContent((prev) => ({
      ...prev,
      services: prev.services.map((service) =>
        service.id === id ? { ...service, [name]: value } : service
      ),
    }));
  };

  const handleAddService = () => {
    const newService = {
      id: Math.max(0, ...servicesContent.services.map((s) => s.id)) + 1,
      name: "",
      description: "",
      location: "Parish House Indianapolis.",
      schedule: "",
      time: "",
    };

    setServicesContent((prev) => ({
      ...prev,
      services: [...prev.services, newService],
    }));

    setEditingService(newService.id);
  };

  const handleDeleteService = (id) => {
    setServicesContent((prev) => ({
      ...prev,
      services: prev.services.filter((service) => service.id !== id),
    }));
    setEditingService(null);
  };

  const handleSave = () => {
    setIsEditing(false);
    setEditingService(null);
    console.log("Saved services content:", servicesContent);
  };

  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Service Times Section</h3>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setEditingService(null);
          }}
          className="px-4 py-2 text-sm border border-gray-200 bg-white rounded-md hover:bg-gray-50"
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {/* Preview */}
      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-medium text-center mb-4">
              {servicesContent.heading}
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
              {servicesContent.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {servicesContent.services.map((service) => (
                <div
                  key={service.id}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-blue-200 transition-colors"
                >
                  <h3 className="text-xl font-medium mb-3 text-gray-900">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 whitespace-pre-line mb-4 text-sm">
                    {service.description}
                  </p>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <span className="text-gray-900 font-medium w-20">
                        Location:
                      </span>
                      <span className="text-gray-600">{service.location}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-gray-900 font-medium w-20">
                        Schedule:
                      </span>
                      <span className="text-gray-600">{service.schedule}</span>
                    </div>
                    {service.time && (
                      <div className="flex items-start">
                        <span className="text-gray-900 font-medium w-20">
                          Time:
                        </span>
                        <span className="text-gray-600">{service.time}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                {servicesContent.seeMoreText}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 bg-white">
          {editingService === null ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    name="heading"
                    value={servicesContent.heading}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Section heading"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    See More Button Text
                  </label>
                  <input
                    type="text"
                    name="seeMoreText"
                    value={servicesContent.seeMoreText}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Button text"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={servicesContent.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Section description"
                />
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-900">Services</h4>
                  <button
                    onClick={handleAddService}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Service
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {servicesContent.services.map((service) => (
                    <div
                      key={service.id}
                      className="flex flex-col justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-200 transition-colors bg-gray-50"
                    >
                      <div>
                        <h5 className="font-medium text-gray-900 mb-1">
                          {service.name}
                        </h5>
                        <p className="text-sm text-gray-600 mb-2">
                          {service.schedule} {service.time}
                        </p>
                        <p className="text-sm text-gray-500">
                          {service.location}
                        </p>
                      </div>
                      <div className="flex justify-end space-x-2 mt-4">
                        <button
                          onClick={() => setEditingService(service.id)}
                          className="px-3 py-1.5 text-sm border border-gray-200 rounded-md hover:bg-gray-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteService(service.id)}
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
                  {servicesContent.services.find((s) => s.id === editingService)
                    ?.name
                    ? `Edit Service: ${
                        servicesContent.services.find(
                          (s) => s.id === editingService
                        ).name
                      }`
                    : "Add New Service"}
                </h4>
                <button
                  onClick={() => setEditingService(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={
                      servicesContent.services.find(
                        (s) => s.id === editingService
                      )?.name || ""
                    }
                    onChange={(e) => handleServiceChange(e, editingService)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. Sunday Service"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={
                      servicesContent.services.find(
                        (s) => s.id === editingService
                      )?.description || ""
                    }
                    onChange={(e) => handleServiceChange(e, editingService)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Service description (use line breaks for formatting)"
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
                      servicesContent.services.find(
                        (s) => s.id === editingService
                      )?.location || ""
                    }
                    onChange={(e) => handleServiceChange(e, editingService)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. Parish House Indianapolis."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Schedule
                    </label>
                    <input
                      type="text"
                      name="schedule"
                      value={
                        servicesContent.services.find(
                          (s) => s.id === editingService
                        )?.schedule || ""
                      }
                      onChange={(e) => handleServiceChange(e, editingService)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="e.g. Every Sunday"
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
                        servicesContent.services.find(
                          (s) => s.id === editingService
                        )?.time || ""
                      }
                      onChange={(e) => handleServiceChange(e, editingService)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="e.g. 10:00 AM - 12:00 PM"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save Service
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
