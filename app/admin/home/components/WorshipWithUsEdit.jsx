"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function WorshipWithUsEdit() {
  // Initial state based on current content
  const [worshipContent, setWorshipContent] = useState({
    heading: "Come worship\nwith us",
    description: "Join us as we celebrate the beginning of forever. With love in their hearts and joy to share, Nina and Chris invite you to witness their journey as they say \"I do.\"",
    buttons: [
      {
        id: 1,
        text: "RCCG Live",
        link: "https://www.youtube.com/@RCCGRodofGodParish"
      },
      {
        id: 2,
        text: "Next Gen Live",
        link: "https://www.youtube.com/@RCCGRodofGodParish"
      }
    ],
    bibleVerse: "For where two or three gather in my name, there am I with them.",
    bibleReference: "Matthew 18:20 (NIV)",
    backgroundImage: "/images/img_verse.png",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingButtonId, setEditingButtonId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorshipContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleButtonChange = (e, id) => {
    const { name, value } = e.target;
    setWorshipContent((prev) => ({
      ...prev,
      buttons: prev.buttons.map((button) =>
        button.id === id ? { ...button, [name]: value } : button
      ),
    }));
  };

  const handleAddButton = () => {
    const newButton = {
      id: Math.max(0, ...worshipContent.buttons.map((b) => b.id)) + 1,
      text: "",
      link: "",
    };
    setWorshipContent((prev) => ({
      ...prev,
      buttons: [...prev.buttons, newButton],
    }));
    setEditingButtonId(newButton.id);
  };

  const handleDeleteButton = (id) => {
    setWorshipContent((prev) => ({
      ...prev,
      buttons: prev.buttons.filter((button) => button.id !== id),
    }));
    setEditingButtonId(null);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved worship content:", worshipContent);
  };

  return (
    <div className="mb-12 border border-gray-200">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">
          Come Worship With Us Section
        </h3>
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
          <div className="container-xs flex items-center justify-center md:flex-col md:gap-10">
            <div className="flex w-[42%] flex-col items-center gap-[30px] md:w-full">
              <p className="mx-auto text-center text-[40px] w-full font-normal leading-[110%] text-charcoal md:ml-0 lg:text-[36px] md:text-[32px] sm:text-[28px] whitespace-pre-line">
                {worshipContent.heading}
              </p>
              <p className="text-center text-[16px] sm:text-[14px] font-normal leading-[130%] text-gray-600">
                {worshipContent.description}
              </p>
              <div className="flex flex-col gap-4">
                {worshipContent.buttons.map((button) => (
                  <button
                    key={button.id}
                    className="min-w-[196px] rounded-[12px] border border-solid border-gray-400 px-[33px] py-2 sm:px-5 hover:bg-[#4D88FF] hover:text-white hover:border-[#4D88FF] transition-colors"
                  >
                    {button.text}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex h-[630px] flex-1 items-start justify-center rounded-[20px] bg-cover bg-no-repeat px-14 py-[194px] md:h-auto md:w-full md:py-16 sm:py-12 sm:px-5" style={{ backgroundImage: `url(${worshipContent.backgroundImage})` }}>
              <div className="mb-3 flex w-[66%] justify-center rounded-[20px] border border-solid border-gray-400 bg-gray-100 px-[38px] py-[66px] md:w-full md:px-6 md:py-10 sm:py-8 sm:px-5">
                <p className="text-[20px] font-normal leading-[130%] text-charcoal lg:text-[18px] md:text-[16px] sm:text-[15px]">
                  <span className="text-gray-600">
                    {worshipContent.bibleVerse}
                  </span>
                  <br />
                  <br />
                  <span className="font-medium">
                    {worshipContent.bibleReference}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-4 bg-white">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Heading
            </label>
            <textarea
              name="heading"
              value={worshipContent.heading}
              onChange={handleChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300"
              placeholder="Section heading (use line breaks for formatting)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={worshipContent.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300"
              placeholder="Section description"
            />
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-gray-700">Buttons</h4>
              <button
                onClick={handleAddButton}
                className="px-3 py-1 text-xs border border-gray-200 bg-white"
              >
                Add Button
              </button>
            </div>

            <div className="space-y-4">
              {worshipContent.buttons.map((button) => (
                <div
                  key={button.id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Button Text
                      </label>
                      <input
                        type="text"
                        name="text"
                        value={button.text}
                        onChange={(e) => handleButtonChange(e, button.id)}
                        className="w-full px-3 py-2 border border-gray-300"
                        placeholder="Button text"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Button Link
                      </label>
                      <input
                        type="text"
                        name="link"
                        value={button.link}
                        onChange={(e) => handleButtonChange(e, button.id)}
                        className="w-full px-3 py-2 border border-gray-300"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => handleDeleteButton(button.id)}
                      className="px-3 py-1 text-xs border border-red-200 text-red-600 bg-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium text-gray-700 mb-3">Bible Quote</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Verse Text
                </label>
                <textarea
                  name="bibleVerse"
                  value={worshipContent.bibleVerse}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300"
                  placeholder="Bible verse text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reference
                </label>
                <input
                  type="text"
                  name="bibleReference"
                  value={worshipContent.bibleReference}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300"
                  placeholder="e.g. John 3:16 (NIV)"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background Image URL
            </label>
            <input
              type="text"
              name="backgroundImage"
              value={worshipContent.backgroundImage}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300"
              placeholder="/images/your-image.jpg"
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
