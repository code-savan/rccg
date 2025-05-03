"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { fetchLocationSection, updateLocationSection } from "@/lib/services/homeService";
import { formatDisplayText } from "@/lib/homeFormData";
import ImageUpload from "@/components/@admin/ImageUpload";

export default function LocationEdit() {
  // Initial state
  const [locationContent, setLocationContent] = useState({
    heading: "",
    description: "",
    address: "",
    mapUrl: "",
    image: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchLocationSection();
        setLocationContent(data);
      } catch (error) {
        console.error("Error fetching location section data:", error);
        setError("Failed to load location section. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocationContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateLocationSection(locationContent);
      setIsEditing(false);
      toast.success("Location section updated successfully!");
    } catch (error) {
      console.error("Error saving location section data:", error);
      toast.error("Failed to update location section. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (url) => {
    setLocationContent((prev) => ({
      ...prev,
      image: url,
    }));
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
          <h3 className="font-medium text-gray-800">Location Section</h3>
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
        <h3 className="font-medium text-gray-800">Location Section</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
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
                {locationContent.heading}
              </h2>
              <p className="text-[16px] font-normal leading-[130%] text-gray-600 mb-8">
                <span dangerouslySetInnerHTML={{ __html: formatDisplayText(locationContent.description) }}></span>
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6 max-w-5xl mx-auto w-full">
              <div className="flex flex-col">
                <div className="mb-6">
                  <h3 className="text-[24px] font-semibold text-charcoal mb-3">Address</h3>
                  <p className="text-[16px] font-normal text-gray-600">{locationContent.address}</p>
                </div>
                
                <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-md">
                  <Image
                    src={locationContent.image || "/images/placeholder.png"}
                    alt="Church location"
                    fill
                    style={{ objectFit: "cover" }}
                    className="hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              
              <div className="h-96 w-full rounded-lg overflow-hidden shadow-md">
                {locationContent.mapUrl ? (
                  <iframe
                    src={locationContent.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <p className="text-gray-500">No map URL provided</p>
                  </div>
                )}
              </div>
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
              value={locationContent.heading}
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
              value={locationContent.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300"
            ></textarea>
            <p className="mt-1 text-sm text-gray-500">
              Use \n for line breaks.
            </p>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={locationContent.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google Maps Embed URL
            </label>
            <input
              type="text"
              name="mapUrl"
              value={locationContent.mapUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300"
            />
            <p className="mt-1 text-sm text-gray-500">
              Get this from Google Maps by clicking "Share" and then "Embed a map"
            </p>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location Image
            </label>
            <ImageUpload
              onImageUploaded={handleImageUpload}
              section="home-location"
              bucketName="home-files"
              existingImageUrl={locationContent.image}
              buttonText="Upload Location Image"
            />
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
