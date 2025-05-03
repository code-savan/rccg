"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { fetchHighlightsSection, updateHighlightsSection } from "@/lib/services/homeService";
import { formatDisplayText } from "@/lib/homeFormData";
import ImageUpload from "@/components/@admin/ImageUpload";

export default function HighlightsSectionEdit() {
  // Initial state
  const [highlightsContent, setHighlightsContent] = useState({
    heading: "",
    description: "",
    highlights: [], // Array of image URLs
  });

  const [activeImage, setActiveImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch data from API
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchHighlightsSection();
        setHighlightsContent(data);
        
        // Set the first image as active if there are any
        if (data.highlights && data.highlights.length > 0) {
          setActiveImage(data.highlights[0]);
        }
      } catch (error) {
        console.error("Error fetching highlights section data:", error);
        setError("Failed to load highlights section data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHighlightsContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding a new image
  const handleAddImage = (imageUrl) => {
    console.log("HighlightsSectionEdit received new image URL:", imageUrl);
    
    if (!imageUrl) {
      console.error("Received empty image URL");
      toast.error("Failed to add image: URL is empty");
      return;
    }
    
    try {
      // Create a new array with the added image to ensure state update
      const updatedHighlights = [...highlightsContent.highlights, imageUrl];
      console.log("Updated highlights array:", updatedHighlights);
      
      // Force re-render by creating a new object
      const newState = {
        ...highlightsContent,
        highlights: updatedHighlights,
      };
      
      // Update state directly
      setHighlightsContent(newState);
      console.log("New highlights state set:", newState);
      
      // If this is the first image, set it as active
      if (highlightsContent.highlights.length === 0) {
        console.log("Setting as active image (first image):", imageUrl);
        setActiveImage(imageUrl);
      }
      
      // Show success message
      toast.success("Image added successfully");
    } catch (error) {
      console.error("Error adding image to highlights:", error);
      toast.error("Failed to add image: " + error.message);
    }
  };

  // Handle removing an image
  const handleRemoveImage = (imageToRemove) => {
    setHighlightsContent((prev) => ({
      ...prev,
      highlights: prev.highlights.filter(img => img !== imageToRemove),
    }));
    
    // If the removed image was active, set the first remaining image as active
    if (activeImage === imageToRemove) {
      const remainingImages = highlightsContent.highlights.filter(img => img !== imageToRemove);
      setActiveImage(remainingImages.length > 0 ? remainingImages[0] : null);
    }
  };

  // Handle saving data
  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateHighlightsSection(highlightsContent);
      setIsEditing(false);
      toast.success("Highlights section updated successfully");
    } catch (error) {
      console.error("Error saving highlights section:", error);
      toast.error("Failed to update highlights section");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle retry after error
  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    fetchHighlightsSection()
      .then((data) => {
        setHighlightsContent(data);
        if (data.highlights && data.highlights.length > 0) {
          setActiveImage(data.highlights[0]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching highlights section data:", error);
        setError("Failed to load highlights section data. Please try again.");
        setIsLoading(false);
      });
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

  // If error, show error state
  if (error) {
    return (
      <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-medium text-gray-800">Highlights Section</h3>
        </div>
        <div className="p-8 bg-white text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Retrying..." : "Retry"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Highlights Section</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm border border-gray-200 bg-white rounded-md hover:bg-gray-50"
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
              <p className="text-center text-[40px] font-medium leading-[100%] md:text-[38px] sm:text-[36px] mb-4">
                <span dangerouslySetInnerHTML={{ __html: formatDisplayText(highlightsContent.heading) }}></span>
              </p>
              <p className="text-center text-[16px] font-normal leading-[130%] text-gray-600 mb-8">
                <span dangerouslySetInnerHTML={{ __html: formatDisplayText(highlightsContent.description) }}></span>
              </p>
            </div>
            
            <div className="flex flex-col gap-[50px] self-stretch max-w-5xl mx-auto w-full">
              {/* Active image display */}
              {activeImage && (
                <div className="relative h-[752px] w-full">
                  <Image
                    src={activeImage}
                    alt="Active highlight"
                    fill
                    style={{ objectFit: "cover", objectPosition: "top" }}
                    className="rounded-[20px]"
                  />
                </div>
              )}
              
              {/* Thumbnail grid */}
              <div className="mx-12 sm:mx-2 flex gap-3 md:mx-0 overflow-x-auto">
                {highlightsContent.highlights.map((image, index) => (
                  <div 
                    key={index} 
                    className={`md:h-[182px] sm:h-[50px] w-1/6 sm:w-1/3 relative cursor-pointer ${
                      activeImage === image ? "" : "opacity-50"
                    }`}
                    onClick={() => setActiveImage(image)}
                  >
                    <Image
                      src={image}
                      alt={`Highlight ${index + 1}`}
                      width={186}
                      height={154}
                      style={{ objectFit: "cover" }}
                      className="rounded-[12px] sm:rounded-sm h-full w-full"
                    />
                  </div>
                ))}
              </div>
              
              {highlightsContent.highlights.length === 0 && (
                <p className="text-gray-500 italic text-center">No highlight images have been added yet.</p>
              )}
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
              value={highlightsContent.heading}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <p className="mt-1 text-sm text-gray-500">
              Use \n for line breaks.
            </p>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Description
            </label>
            <textarea
              name="description"
              value={highlightsContent.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            ></textarea>
            <p className="mt-1 text-sm text-gray-500">
              Use \n for line breaks.
            </p>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Highlight Images
            </label>
            
            {/* Display existing images */}
            <div className="grid grid-cols-4 gap-4 mb-4 sm:grid-cols-2">
              {highlightsContent.highlights.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="relative h-[150px] w-full">
                    <Image
                      src={image}
                      alt={`Highlight ${index + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-md"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveImage(image)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            
            {/* Upload new image */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add New Image
              </label>
              <ImageUpload
                onImageUploaded={handleAddImage}
                section="home-highlights"
                bucketName="home-files"
                buttonText="Upload Highlight Image"
                className="mb-4"
                disabled={isSaving}
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
