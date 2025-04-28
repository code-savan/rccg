"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function LocationEdit() {
  const [sectionTitle, setSectionTitle] = useState("Visit Us");
  const [sectionDescription, setSectionDescription] = useState(
    "Join us for worship and fellowship at our location"
  );
  const [isEditing, setIsEditing] = useState(false);
  const [locationInfo, setLocationInfo] = useState({
    address: "123 Main Street, City Name, State 12345",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.7309537665097!2d-122.41941548468168!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjkiVw!5e0!3m2!1sen!2sus!4v1635283953076!5m2!1sen!2sus",
    phone: "+1 (234) 567-8901",
    email: "info@rccgchurch.org",
    services: [
      {
        id: 1,
        day: "Sunday",
        time: "9:00 AM - 11:00 AM",
        name: "Sunday Service",
      },
      {
        id: 2,
        day: "Wednesday",
        time: "6:30 PM - 8:00 PM",
        name: "Bible Study",
      },
      {
        id: 3,
        day: "Friday",
        time: "7:00 PM - 9:00 PM",
        name: "Prayer Meeting",
      },
    ],
  });

  const [currentService, setCurrentService] = useState(null);

  // Handle input changes for location information
  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocationInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding a new service
  const handleAddService = () => {
    const newId =
      locationInfo.services.length > 0
        ? Math.max(...locationInfo.services.map((s) => s.id)) + 1
        : 1;
    setCurrentService({
      id: newId,
      day: "",
      time: "",
      name: "",
    });
  };

  // Handle editing an existing service
  const handleEditService = (service) => {
    setCurrentService({ ...service });
  };

  // Handle deleting a service
  const handleDeleteService = (id) => {
    setLocationInfo((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
    if (currentService && currentService.id === id) {
      setCurrentService(null);
    }
  };

  // Handle form input changes for service
  const handleServiceInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save service (new or edited)
  const handleSaveService = () => {
    if (!currentService) return;

    if (locationInfo.services.some((s) => s.id === currentService.id)) {
      // Update existing service
      setLocationInfo((prev) => ({
        ...prev,
        services: prev.services.map((s) =>
          s.id === currentService.id ? currentService : s
        ),
      }));
    } else {
      // Add new service
      setLocationInfo((prev) => ({
        ...prev,
        services: [...prev.services, currentService],
      }));
    }

    setCurrentService(null);
  };

  // Save all changes
  const handleSaveAll = () => {
    // Here we would typically save to database (e.g. Supabase)
    setIsEditing(false);
    console.log("Saved location section:", {
      title: sectionTitle,
      description: sectionDescription,
      locationInfo,
    });
    // API call would go here
  };

  return (
    <div className="mb-12 border border-gray-200">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Location Section</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm border border-gray-200 bg-white"
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {/* Preview */}
      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">{sectionTitle}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {sectionDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Map */}
              <div className="h-80 relative rounded-lg overflow-hidden shadow-md">
                <iframe
                  src={locationInfo.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPinIcon className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p className="text-gray-600">{locationInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <PhoneIcon className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-gray-600">{locationInfo.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <EnvelopeIcon className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-gray-600">{locationInfo.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <ClockIcon className="h-6 w-6 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Service Times</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        {locationInfo.services.map((service) => (
                          <div
                            key={service.id}
                            className="bg-gray-50 p-2 rounded-md"
                          >
                            <p className="font-medium">{service.name}</p>
                            <p className="text-gray-600 text-sm">
                              {service.day}: {service.time}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-white">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Title
              </label>
              <input
                type="text"
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300"
                placeholder="Section title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Description
              </label>
              <textarea
                value={sectionDescription}
                onChange={(e) => setSectionDescription(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300"
                placeholder="A short description for the location section"
              />
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-6 mb-6 border border-gray-200 rounded-md p-4">
            <h4 className="font-medium border-b border-gray-200 pb-2">
              Contact Information
            </h4>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                name="address"
                value={locationInfo.address}
                onChange={handleLocationChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300"
                placeholder="Full address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Google Maps Embed URL
              </label>
              <input
                type="text"
                name="mapUrl"
                value={locationInfo.mapUrl}
                onChange={handleLocationChange}
                className="w-full px-3 py-2 border border-gray-300"
                placeholder="https://www.google.com/maps/embed?..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Get this from Google Maps by finding your location, clicking
                Share, and selecting Embed a map
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={locationInfo.phone}
                onChange={handleLocationChange}
                className="w-full px-3 py-2 border border-gray-300"
                placeholder="+1 (234) 567-8901"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={locationInfo.email}
                onChange={handleLocationChange}
                className="w-full px-3 py-2 border border-gray-300"
                placeholder="info@example.com"
              />
            </div>
          </div>

          {/* Service Times */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Service Times</h4>
              <button
                onClick={handleAddService}
                className="px-3 py-1 text-sm border border-gray-200 rounded text-blue-600"
                disabled={currentService !== null}
              >
                Add Service
              </button>
            </div>

            <div className="space-y-3">
              {locationInfo.services.map((service) => (
                <div
                  key={service.id}
                  className="flex justify-between items-center p-3 border border-gray-200 rounded hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-gray-500">
                      {service.day}, {service.time}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditService(service)}
                      className="px-3 py-1 text-xs border border-gray-200 rounded"
                      disabled={currentService !== null}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="px-3 py-1 text-xs border border-gray-200 rounded text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Edit Service Form */}
          {currentService && (
            <div className="border border-gray-200 p-4 rounded mb-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">
                  {locationInfo.services.some((s) => s.id === currentService.id)
                    ? `Edit Service: ${currentService.name}`
                    : "Add New Service"}
                </h4>
                <button
                  onClick={() => setCurrentService(null)}
                  className="text-gray-500"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={currentService.name}
                    onChange={handleServiceInputChange}
                    className="w-full px-3 py-2 border border-gray-300"
                    placeholder="Sunday Service"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Day
                    </label>
                    <select
                      name="day"
                      value={currentService.day}
                      onChange={handleServiceInputChange}
                      className="w-full px-3 py-2 border border-gray-300"
                    >
                      <option value="">Select Day</option>
                      <option value="Sunday">Sunday</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <input
                      type="text"
                      name="time"
                      value={currentService.time}
                      onChange={handleServiceInputChange}
                      className="w-full px-3 py-2 border border-gray-300"
                      placeholder="9:00 AM - 11:00 AM"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSaveService}
                    className="px-4 py-2 bg-blue-600 text-white"
                  >
                    Save Service
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-6">
            <button
              onClick={handleSaveAll}
              className="px-4 py-2 bg-blue-600 text-white"
            >
              Save All Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
