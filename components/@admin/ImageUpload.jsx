"use client";

import React, { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "react-hot-toast";

export default function ImageUpload({
  onImageUploaded,
  section = "general",
  existingImageUrl = "",
  className = "",
  disabled = false,
}) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(existingImageUrl);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Check file type
    if (!selectedFile.type.includes("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Check file size (limit to 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit");
      return;
    }

    setFile(selectedFile);

    // Create preview URL
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    // Clean up the preview URL when component unmounts
    return () => URL.revokeObjectURL(objectUrl);
  };

  const uploadImage = async () => {
    if (!file) return;

    try {
      setUploading(true);

      // Create a unique filename based on timestamp and original name

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 15)}.${fileExt}`;
      const filePath = `${section}/${fileName}`;

      // Determine which storage bucket to use based on section prefix
      let bucketName = "get-involved-files";

      if (section.startsWith("services-events")) {
        bucketName = "services-events-files";
      } else if (section.startsWith("about-us")) {
        bucketName = "about-us-files";
      }

      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw error;
      }

      // Get public URL for the uploaded file
      const { data: urlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      // Call the callback with the new image URL
      onImageUploaded(urlData.publicUrl);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Handle manual URL input change
  const handleUrlChange = (e) => {
    const value = e.target.value;
    setPreviewUrl(value);
    if (value) {
      onImageUploaded(value);
    }
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      {/* Left column: Upload controls */}
      <div className="space-y-4">
        <div
          className={`border-2 border-dashed border-gray-300 rounded-lg p-4 text-center ${
            disabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:bg-gray-50"
          } transition-colors`}
          onClick={disabled ? undefined : triggerFileInput}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
            disabled={disabled}
          />
          <div className="flex flex-col items-center justify-center py-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-gray-400 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-sm font-medium text-gray-600">
              Click to upload an image or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>
        </div>

        <div>
          <button
            onClick={uploadImage}
            disabled={!file || uploading || disabled}
            className="px-4 py-2 bg-blue-600 text-white rounded w-full disabled:bg-gray-400"
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Or enter image URL manually
          </label>
          <input
            type="text"
            value={previewUrl}
            onChange={handleUrlChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="https://example.com/image.jpg"
            disabled={disabled}
          />
        </div>
      </div>

      {/* Right column: Preview */}
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-contain max-h-48"
          />
        ) : (
          <div className="text-center p-4">
            <p className="text-gray-400">No image preview available</p>
          </div>
        )}
      </div>
    </div>
  );
}
