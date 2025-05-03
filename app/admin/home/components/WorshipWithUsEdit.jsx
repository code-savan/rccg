"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { fetchWorshipWithUsSection, updateWorshipWithUsSection } from "@/lib/services/homeService";
import { formatDisplayText } from "@/lib/homeFormData";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function WorshipWithUsEdit() {
  // Initial state
  const [worshipContent, setWorshipContent] = useState({
    heading: "",
    description: "",
    buttons: []
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
        const data = await fetchWorshipWithUsSection();
        
        // Ensure buttons is always an array
        if (!data.buttons || !Array.isArray(data.buttons)) {
          data.buttons = [];
        }
        
        setWorshipContent(data);
      } catch (error) {
        console.error("Error fetching worship with us section data:", error);
        setError("Failed to load worship with us section. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorshipContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleButtonChange = (index, field, value) => {
    setWorshipContent((prev) => {
      const updatedButtons = [...prev.buttons];
      updatedButtons[index] = {
        ...updatedButtons[index],
        [field]: value
      };
      return { ...prev, buttons: updatedButtons };
    });
  };

  const handleAddButton = () => {
    setWorshipContent((prev) => ({
      ...prev,
      buttons: [
        ...prev.buttons,
        { text: "New Button", url: "#", variant: "primary" }
      ]
    }));
  };

  const handleRemoveButton = (index) => {
    setWorshipContent((prev) => {
      const updatedButtons = prev.buttons.filter((_, i) => i !== index);
      return { ...prev, buttons: updatedButtons };
    });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateWorshipWithUsSection(worshipContent);
      setIsEditing(false);
      toast.success("Worship with us section updated successfully!");
    } catch (error) {
      console.error("Error saving worship with us section data:", error);
      toast.error("Failed to update worship with us section. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Ensure buttons is always an array throughout the component
  const buttons = Array.isArray(worshipContent.buttons) ? worshipContent.buttons : [];

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
          <h3 className="font-medium text-gray-800">Worship With Us Section</h3>
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
        <h3 className="font-medium text-gray-800">Worship With Us Section</h3>
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
          <div className="container-xs flex items-center justify-center md:flex-col md:gap-10">
            <div className="flex w-[42%] flex-col items-center gap-[30px] md:w-full">
              <p className="mx-auto text-center text-[40px] w-full font-normal leading-[110%] text-charcoal md:ml-0 lg:text-[36px] md:text-[32px] sm:text-[28px]">
                <span dangerouslySetInnerHTML={{ __html: formatDisplayText(worshipContent.heading) }}></span>
              </p>
              <p className="text-center text-[16px] sm:text-[14px] font-normal leading-[130%] text-gray-600">
                <span dangerouslySetInnerHTML={{ __html: formatDisplayText(worshipContent.description) }}></span>
              </p>
              <div className="flex flex-col gap-4">
                {buttons.map((button, index) => (
                  <a
                    key={index}
                    href={button.url}
                    className="min-w-[196px] rounded-[12px] border border-solid border-gray-400 px-[33px] py-2 sm:px-5 hover:bg-[#4D88FF] hover:text-white hover:border-[#4D88FF] transition-colors text-center"
                  >
                    {button.text}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex h-[630px] flex-1 items-start justify-center rounded-[20px] bg-[url(/images/img_verse.png)] bg-cover bg-no-repeat px-14 py-[194px] md:h-auto md:w-full md:py-16 sm:py-12 sm:px-5">
              <div className="mb-3 flex w-[66%] justify-center rounded-[20px] border border-solid border-gray-400 bg-gray-100 px-[38px] py-[66px] md:w-full md:px-6 md:py-10 sm:py-8 sm:px-5">
                <p className="text-[20px] font-normal leading-[130%] text-charcoal lg:text-[18px] md:text-[16px] sm:text-[15px]">
                  <span className="text-gray-600">
                    For where two or three gather in my name, there am I with them.
                  </span>
                  <br />
                  <br />
                  <span className="font-medium">
                    Matthew 18:20 (NIV)
                  </span>
                </p>
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
              value={worshipContent.heading}
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
              value={worshipContent.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300"
            ></textarea>
            <p className="mt-1 text-sm text-gray-500">
              Use \n for line breaks.
            </p>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Buttons
              </label>
              <button
                type="button"
                onClick={handleAddButton}
                className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add Button
              </button>
            </div>
            
            {buttons.length === 0 ? (
              <p className="text-gray-500 text-sm italic">No buttons added yet.</p>
            ) : (
              <div className="space-y-4">
                {buttons.map((button, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 rounded-md"
                  >
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Button Text
                      </label>
                      <input
                        type="text"
                        value={button.text}
                        onChange={(e) => handleButtonChange(index, "text", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Button URL
                      </label>
                      <input
                        type="text"
                        value={button.url}
                        onChange={(e) => handleButtonChange(index, "url", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div className="flex items-end justify-between">
                      <div className="w-2/3">
                        <label className="block text-xs font-medium text-gray-500 mb-1">
                          Button Style
                        </label>
                        <select
                          value={button.variant}
                          onChange={(e) => handleButtonChange(index, "variant", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="primary">Primary (Blue)</option>
                          <option value="secondary">Secondary (Outline)</option>
                        </select>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => handleRemoveButton(index)}
                        className="mb-1 p-2 text-red-500 hover:text-red-700"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
