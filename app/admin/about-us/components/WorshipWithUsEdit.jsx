"use client";

import React, { useState } from "react";
import Image from "next/image";
// import { toast } from "react-hot-toast";
// import {
//   fetchWorshipWithUsSection,
//   updateWorshipWithUsSection,
// } from "@/lib/services/aboutUsService";
import ImageUpload from "@/components/@admin/ImageUpload";

export default function WorshipWithUsEdit() {
  const [sectionContent, setSectionContent] = useState({
    heading: "Come worship\nwith us",
    description:
      "Come worship with us every Sunday.\nWe promise you'll be filled with the holy spirit.",
    buttons: [
      {
        id: 1,
        text: "RCCG Live",
        link: "https://www.youtube.com/@RCCGRodofGodParish",
      },
      {
        id: 2,
        text: "Next Gen Live",
        link: "https://www.youtube.com/@RCCGRodofGodParish",
      },
    ],
    bibleVerse:
      "For where two or three gather in my name, there am I with them.",
    bibleReference: "Matthew 18:20",
    image: "/images/img_verse.png",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingButtonId, setEditingButtonId] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Comment out API fetch
  // useEffect(() => {
  //   async function fetchSectionData() {
  //     try {
  //       setIsLoading(true);
  //       const data = await fetchWorshipWithUsSection();
  //       setSectionContent(data);
  //     } catch (error) {
  //       console.error("Error fetching Worship With Us section data:", error);
  //       toast.error("Failed to load section data");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchSectionData();
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleButtonChange = (e, id) => {
    const { name, value } = e.target;
    setSectionContent((prev) => ({
      ...prev,
      buttons: prev.buttons.map((button) =>
        button.id === id ? { ...button, [name]: value } : button
      ),
    }));
  };

  const handleImageChange = (imageUrl) => {
    setSectionContent((prev) => ({ ...prev, image: imageUrl }));
  };

  const handleAddButton = () => {
    const newButton = {
      id: Math.max(0, ...sectionContent.buttons.map((b) => b.id)) + 1,
      text: "",
      link: "",
    };
    setSectionContent((prev) => ({
      ...prev,
      buttons: [...prev.buttons, newButton],
    }));
    setEditingButtonId(newButton.id);
  };

  const handleDeleteButton = (id) => {
    setSectionContent((prev) => ({
      ...prev,
      buttons: prev.buttons.filter((button) => button.id !== id),
    }));
    setEditingButtonId(null);
  };

  const handleSave = () => {
    // Comment out API save
    setIsSaving(true);
    // try to simulate saving
    setTimeout(() => {
      console.log("Saved section content:", sectionContent);
      setIsEditing(false);
      setEditingButtonId(null);
      setIsSaving(false);
      alert("Worship With Us section saved successfully");
    }, 1000);

    // try {
    //   setIsSaving(true);
    //   await updateWorshipWithUsSection(sectionContent);
    //   setIsEditing(false);
    //   setEditingButtonId(null);
    //   toast.success("Worship With Us section updated successfully");
    // } catch (error) {
    //   console.error("Error saving Worship With Us section:", error);
    //   toast.error("Failed to update section");
    // } finally {
    //   setIsSaving(false);
    // }
  };

  // if (isLoading) {
  //   return (
  //     <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden p-6">
  //       <div className="animate-pulse">
  //         <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
  //         <div className="h-40 bg-gray-200 rounded"></div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Worship With Us Section</h3>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setEditingButtonId(null);
          }}
          className="px-4 py-2 text-sm border border-gray-200 bg-white rounded-md hover:bg-gray-50"
          disabled={isSaving}
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="container-xs flex items-center justify-center md:flex-col md:gap-10">
              <div className="flex w-[42%] flex-col items-center gap-[30px] md:w-full">
                <p className="mx-auto text-center text-[40px] w-full font-normal leading-[110%] text-charcoal whitespace-pre-line">
                  {sectionContent.heading}
                </p>
                <p className="text-center text-[16px] font-normal leading-[130%] text-gray-600 whitespace-pre-line">
                  {sectionContent.description}
                </p>
                <div className="flex flex-col gap-4">
                  {sectionContent.buttons.map((button) => (
                    <a
                      key={button.id}
                      href={button.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-w-[196px] rounded-[12px] border border-solid border-gray-400 px-[33px] py-2 text-center hover:bg-[#4D88FF] hover:text-white hover:border-[#4D88FF] transition-colors"
                    >
                      {button.text}
                    </a>
                  ))}
                </div>
              </div>
              <div
                className="flex h-[630px] flex-1 items-start justify-center rounded-[20px] bg-cover bg-no-repeat px-14 py-[194px] md:h-auto md:w-full md:py-16"
                style={{
                  backgroundImage: `url(${sectionContent.image})`,
                }}
              >
                <div className="mb-3 flex  justify-center rounded-[20px] border border-solid border-gray-400 bg-gray-100 bg-opacity-10 backdrop-blur-sm px-[38px] py-[66px] md:w-full md:px-6 md:py-10">
                  <p className="text-[20px] font-normal leading-[130%] text-black">
                    <span className="italic">
                      "{sectionContent.bibleVerse}"
                    </span>
                    <br />
                    <br />
                    <span className="font-medium text-right block">
                      - {sectionContent.bibleReference}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 bg-white">
          {editingButtonId === null ? (
            <>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heading (use \n for line breaks)
                  </label>
                  <textarea
                    name="heading"
                    value={sectionContent.heading}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Section heading (use \n for line breaks)"
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (use \n for line breaks)
                  </label>
                  <textarea
                    name="description"
                    value={sectionContent.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Section description"
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bible Verse
                  </label>
                  <textarea
                    name="bibleVerse"
                    value={sectionContent.bibleVerse}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Bible verse text"
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bible Reference
                  </label>
                  <input
                    type="text"
                    name="bibleReference"
                    value={sectionContent.bibleReference}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. Matthew 18:20"
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Image
                  </label>
                  <ImageUpload
                    existingImageUrl={sectionContent.image}
                    onImageUploaded={handleImageChange}
                    section="about-us/worship-with-us"
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-900">Buttons</h4>
                  <button
                    onClick={handleAddButton}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    disabled={isSaving}
                  >
                    Add Button
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sectionContent.buttons.map((button) => (
                    <div
                      key={button.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="mb-2">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{button.text}</h5>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingButtonId(button.id)}
                              className="px-3 py-1.5 text-sm border border-gray-200 rounded-md hover:bg-gray-100"
                              disabled={isSaving}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteButton(button.id)}
                              className="px-3 py-1.5 text-sm border border-red-200 text-red-600 rounded-md hover:bg-red-50"
                              disabled={isSaving}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <a
                          href={button.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 text-sm break-all"
                        >
                          {button.link}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </>
          ) : (
            <div className="max-w-2xl">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-medium text-gray-900">
                  {sectionContent.buttons.find((b) => b.id === editingButtonId)
                    ?.text
                    ? `Edit Button: ${
                        sectionContent.buttons.find(
                          (b) => b.id === editingButtonId
                        ).text
                      }`
                    : "Add New Button"}
                </h4>
                <button
                  onClick={() => setEditingButtonId(null)}
                  className="text-gray-500 hover:text-gray-700"
                  disabled={isSaving}
                >
                  &times;
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    name="text"
                    value={
                      sectionContent.buttons.find(
                        (b) => b.id === editingButtonId
                      )?.text || ""
                    }
                    onChange={(e) => handleButtonChange(e, editingButtonId)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Button text"
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Link
                  </label>
                  <input
                    type="text"
                    name="link"
                    value={
                      sectionContent.buttons.find(
                        (b) => b.id === editingButtonId
                      )?.link || ""
                    }
                    onChange={(e) => handleButtonChange(e, editingButtonId)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. https://youtube.com/channel/..."
                    disabled={isSaving}
                  />
                </div>

                <div className="flex justify-end pt-6">
                  <button
                    onClick={() => setEditingButtonId(null)}
                    className="px-6 py-2 mr-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    disabled={isSaving}
                  >
                    Back to List
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save All Changes"}
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
