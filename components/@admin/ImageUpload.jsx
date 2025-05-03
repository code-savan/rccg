"use client";

import React, { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { toast } from "react-hot-toast";

// Create a direct Supabase client for the component
const createDirectSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase environment variables");
    return null;
  }
  
  return createClient(supabaseUrl, supabaseKey);
};

export default function ImageUpload({
  onImageUploaded,
  section = "general",
  bucketName = "",  // New parameter for explicit bucket name
  existingImageUrl = "",
  buttonText = "Upload Image", // Still used for status messages
  className = "",
  disabled = false,
}) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(existingImageUrl);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const supabase = createDirectSupabaseClient();

  // Determine which storage bucket to use based on section prefix or explicit bucket name
  const determineBucket = () => {
    // If explicit bucket name is provided, use it
    if (bucketName) return bucketName;
    
    // Otherwise determine based on section prefix
    if (section.startsWith("services-events")) {
      return "services-events-files";
    } else if (section.startsWith("about-us")) {
      return "about-us-files";
    } else if (section.startsWith("home-")) {
      return "home-files";
    } else if (section.startsWith("get-involved")) {
      return "get-involved-files";
    }
    
    // Default bucket
    return "get-involved-files";
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Process the selected file
  const handleFile = (selectedFile) => {
    if (!selectedFile) {
      console.log("No file selected");
      return;
    }

    console.log("File selected:", selectedFile.name);

    // Check file type
    if (!selectedFile.type.includes("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Check file size (limit to 15MB)
    if (selectedFile.size > 15 * 1024 * 1024) {
      toast.error("File size exceeds 15MB limit");
      return;
    }

    setFile(selectedFile);
    console.log("File set in state:", selectedFile.name);

    // Create preview URL
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    console.log("Preview URL created");

    // Auto-upload when file is selected
    setTimeout(() => {
      uploadImage(selectedFile);
    }, 100);
  };

  // Modified to accept a file parameter for direct upload
  const uploadImage = async (selectedFile) => {
    const fileToUpload = selectedFile || file;
    
    if (!fileToUpload) {
      console.log("No file selected for upload");
      return;
    }

    if (!supabase) {
      console.error("Supabase client not initialized");
      toast.error("Upload failed: Supabase client not initialized");
      return;
    }

    try {
      setUploading(true);
      console.log("Starting image upload process...");

      // Create a unique filename based on timestamp and original name
      const fileExt = fileToUpload.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 15)}.${fileExt}`;
      const filePath = `${section}/${fileName}`;
      console.log("File path for upload:", filePath);

      // Get the bucket name
      const targetBucket = determineBucket();
      console.log("Selected bucket for upload:", targetBucket);
      
      // Try a simpler approach - direct upload without checking buckets
      console.log("Uploading to Supabase storage...");
      console.log("File size:", fileToUpload.size, "bytes");
      console.log("File type:", fileToUpload.type);
      
      const { data, error } = await supabase.storage
        .from(targetBucket)
        .upload(filePath, fileToUpload, {
          cacheControl: "3600",
          upsert: true,
          contentType: fileToUpload.type
        });

      if (error) {
        console.error("Supabase upload error:", error);
        throw new Error(`Upload failed: ${error.message || JSON.stringify(error) || "Unknown error"}`);
      }

      console.log("Upload successful, getting public URL...");
      // Get public URL for the uploaded file
      const { data: urlData } = supabase.storage
        .from(targetBucket)
        .getPublicUrl(filePath);

      if (!urlData || !urlData.publicUrl) {
        throw new Error("Failed to get public URL for uploaded file");
      }

      console.log("Public URL obtained:", urlData.publicUrl);
      // Call the callback with the new image URL
      onImageUploaded(urlData.publicUrl);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(`Failed to upload image: ${error.message || JSON.stringify(error) || "Unknown error"}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Preview area - show if there's an existing image */}
      {previewUrl && (
        <div className="relative border rounded-lg overflow-hidden">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <button
            type="button"
            onClick={() => {
              setPreviewUrl("");
              setFile(null);
            }}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
            title="Remove image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Dropzone area */}
      <div 
        className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive 
            ? "border-blue-500 bg-blue-50" 
            : "border-gray-300 hover:border-gray-400"
        } ${disabled || uploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={disabled ? null : handleDrop}
        onClick={disabled ? null : () => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
          disabled={uploading || disabled}
        />
        
        <div className="flex flex-col items-center justify-center text-center">
          {uploading ? (
            <>
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-sm font-medium text-gray-700">Uploading image...</p>
            </>
          ) : (
            <>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-10 w-10 text-gray-400 mb-3" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              <p className="text-sm font-medium text-gray-700 mb-1">
                {previewUrl ? "Replace image" : "Drop image here or click to browse"}
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 15MB
              </p>
            </>
          )}
        </div>
      </div>

      {/* Display the current image URL for debugging */}
      {process.env.NODE_ENV === 'development' && existingImageUrl && (
        <div className="text-xs text-gray-500 truncate">
          Current: {existingImageUrl}
        </div>
      )}
    </div>
  );
}
