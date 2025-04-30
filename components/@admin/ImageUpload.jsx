import React, { useState, useRef } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import supabase from "../../lib/supabase";

export default function ImageUpload({
  onImageUploaded,
  section = "general",
  existingImageUrl = "",
  className = "",
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

      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from("get_involved_files")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw error;
      }

      // Get public URL for the uploaded file
      const { data: urlData } = supabase.storage
        .from("get_involved_files")
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

  // Placeholder image URL - use existing defaultNoData.png
  const placeholderImageUrl = "/images/defaultNoData.png";

  // The display URL is either the previewUrl, the existingImageUrl, or the placeholder
  const displayUrl = previewUrl || placeholderImageUrl;

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left side - Upload area */}
        <div className="space-y-4">
          <div
            className="flex flex-col items-center p-6 border-2 border-dashed border-gray-300 rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={triggerFileInput}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400"
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

            <p className="mt-3 text-sm font-medium text-gray-700">
              Click to select an image
            </p>
            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>

          <button
            onClick={uploadImage}
            disabled={uploading || !file}
            className={`w-full px-4 py-3 text-white bg-blue-600 rounded-md ${
              uploading || !file
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700"
            } transition-colors`}
          >
            {uploading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Uploading...</span>
              </div>
            ) : (
              "Upload Image"
            )}
          </button>
        </div>

        {/* Right side - Preview */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Image Preview:
          </p>
          <div className="relative h-48 w-full border border-gray-200 rounded-md bg-gray-50 overflow-hidden">
            <Image
              src={displayUrl}
              alt="Image preview"
              fill
              className="object-contain"
            />
          </div>

          {file && (
            <p className="mt-2 text-xs text-gray-500 truncate">
              Selected: {file.name}
            </p>
          )}

          {!file && previewUrl && (
            <p className="mt-2 text-xs text-gray-500 truncate">
              Current image: {previewUrl.split("/").pop()}
            </p>
          )}

          {!file && !previewUrl && (
            <p className="mt-2 text-xs text-gray-500">
              No image selected - default placeholder shown
            </p>
          )}

          {/* Allow manual URL entry/editing */}
          <div className="mt-3">
            <label
              htmlFor="image-url"
              className="text-xs font-medium text-gray-700"
            >
              Image URL (edit manually if needed):
            </label>
            <input
              id="image-url"
              type="text"
              value={previewUrl || ""}
              onChange={handleUrlChange}
              className="mt-1 w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
              placeholder="/images/your-image.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
