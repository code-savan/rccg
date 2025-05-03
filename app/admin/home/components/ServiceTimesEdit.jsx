"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { fetchServiceTimesSection, updateServiceTimesSection } from "@/lib/services/homeService";
import { formatDisplayText } from "@/lib/homeFormData";

export default function ServiceTimesEdit() {
  // Initial state
  const [servicesContent, setServicesContent] = useState({
    heading: "",
    description: "",
    services: [],
    seeMoreText: "",
    seeMoreLink: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchServiceTimesSection();
        setServicesContent(data);
      } catch (error) {
        console.error("Error fetching service times section data:", error);
        setError("Failed to load service times section. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
    const newId = servicesContent.services.length > 0
      ? Math.max(...servicesContent.services.map(s => s.id)) + 1
      : 1;

    const newService = {
      id: newId,
      name: "",
      description: "",
      location: "",
      schedule: "",
      time: "",
    };

    setServicesContent((prev) => ({
      ...prev,
      services: [...prev.services, newService],
    }));

    setEditingService(newService.id);
  };

  const handleRemoveService = (id) => {
    setServicesContent((prev) => ({
      ...prev,
      services: prev.services.filter((service) => service.id !== id),
    }));

    if (editingService === id) {
      setEditingService(null);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateServiceTimesSection(servicesContent);
      setIsEditing(false);
      setEditingService(null);
      toast.success("Service times section updated successfully!");
    } catch (error) {
      console.error("Error saving service times section data:", error);
      toast.error("Failed to update service times section. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // If loading, show loading state
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

  // If error, show error state with retry button
  if (error) {
    return (
      <div className="mb-12 border border-gray-200">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-medium text-gray-800">Service Times Section</h3>
        </div>
        <div className="p-8 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Service Times Section</h3>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            if (!isEditing) {
              setEditingService(null);
            }
          }}
          className="px-4 py-2 text-sm border border-gray-200 bg-white"
          disabled={isSaving}
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {/* Preview */}
      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="flex flex-col items-center">
            <div className="mb-8 text-center max-w-3xl mx-auto">
              <h2 className="text-[40px] font-semibold mb-4 lg:text-[36px] md:text-[32px] sm:text-[28px]">
                {servicesContent.heading}
              </h2>
              <p className="text-[16px] font-normal leading-[130%] text-gray-600 mb-8">
                <span dangerouslySetInnerHTML={{ __html: formatDisplayText(servicesContent.description) }}></span>
              </p>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-8 max-w-5xl mx-auto">
              {servicesContent.services.map((service) => (
                <div key={service.id} className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-[24px] font-semibold text-charcoal mb-3">{service.name}</h3>
                  <p className="text-[16px] font-normal leading-[130%] text-gray-600 mb-4">
                    <span dangerouslySetInnerHTML={{ __html: formatDisplayText(service.description) }}></span>
                  </p>
                  <div className="text-[14px] text-gray-600">
                    <p className="mb-2 flex items-start">
                      <span className="font-medium mr-2 min-w-[80px]">Location:</span>
                      <span>{service.location}</span>
                    </p>
                    <p className="mb-2 flex items-start">
                      <span className="font-medium mr-2 min-w-[80px]">Schedule:</span>
                      <span>{service.schedule}</span>
                    </p>
                    <p className="flex items-start">
                      <span className="font-medium mr-2 min-w-[80px]">Time:</span>
                      <span>{service.time}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {servicesContent.services.length === 0 && (
              <p className="text-gray-500 italic mb-8">No services have been added yet.</p>
            )}

            <div className="text-center">
              <a
                href={servicesContent.seeMoreLink}
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
              >
                {servicesContent.seeMoreText}
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-8 bg-white">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Heading
            </label>
            <input
              type="text"
              name="heading"
              value={servicesContent.heading}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Description
            </label>
            <textarea
              name="description"
              value={servicesContent.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300"
            ></textarea>
            <p className="mt-1 text-sm text-gray-500">
              Use \n for line breaks.
            </p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Services</h3>
              <button
                onClick={handleAddService}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={isSaving}
              >
                Add Service
              </button>
            </div>

            {servicesContent.services.map((service) => (
              <div
                key={service.id}
                className="mb-8 border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-md font-medium">
                    {service.name || "New Service"}
                  </h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingService(editingService === service.id ? null : service.id)}
                      className="px-3 py-1 text-xs border border-gray-200 bg-white"
                    >
                      {editingService === service.id ? "Collapse" : "Expand"}
                    </button>
                    <button
                      onClick={() => handleRemoveService(service.id)}
                      className="px-3 py-1 text-xs border border-red-200 text-red-600 bg-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {editingService === service.id && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={service.name}
                        onChange={(e) => handleServiceChange(e, service.id)}
                        className="w-full px-3 py-2 border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={service.description}
                        onChange={(e) => handleServiceChange(e, service.id)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300"
                      ></textarea>
                      <p className="mt-1 text-sm text-gray-500">
                        Use \n for line breaks.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={service.location}
                        onChange={(e) => handleServiceChange(e, service.id)}
                        className="w-full px-3 py-2 border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Schedule
                      </label>
                      <input
                        type="text"
                        name="schedule"
                        value={service.schedule}
                        onChange={(e) => handleServiceChange(e, service.id)}
                        className="w-full px-3 py-2 border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <input
                        type="text"
                        name="time"
                        value={service.time}
                        onChange={(e) => handleServiceChange(e, service.id)}
                        className="w-full px-3 py-2 border border-gray-300"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Button Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  name="seeMoreText"
                  value={servicesContent.seeMoreText}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Link
                </label>
                <input
                  type="text"
                  name="seeMoreLink"
                  value={servicesContent.seeMoreLink}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
