"use client";

import React, { useState } from "react";

export default function DonationSectionEdit() {
  const [sectionContent, setSectionContent] = useState({
    heading: "Help the\nchurch grow",
    description:
      "Giving is an act of worship and a way to make a\ndifference in our community.",
    bibleVerseText:
      '"Each of you should give what you\nhave decided in your heart to give,\nnot reluctantly or under compulsion,\nfor God loves a cheerful giver."',
    bibleVerseReference: "— 2 Corinthians 9:7 (NIV)",
    bibleVerseBackgroundImage: "/images/img_verse_630x738.png",
    buttonText: "Give today",
    donationLink:
      "https://www.givelify.com/donate/redeemed-christian-church-of-god-rccg-rod-of-god-parish-indianapolis-in-2j7wy5NTU0/donation/amount",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved donation section content:", sectionContent);
    // API call would go here
  };

  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Donation Section</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm border border-gray-200 bg-white rounded-md hover:bg-gray-50"
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Bible verse section */}
            <div
              className="flex-1 h-[400px] rounded-lg flex items-center justify-center bg-cover bg-center p-8"
              style={{
                backgroundImage: `url(${sectionContent.bibleVerseBackgroundImage})`,
              }}
            >
              <div className="bg-gray-100 border border-gray-400 p-8 rounded-lg max-w-md">
                <p className="text-gray-600 whitespace-pre-line mb-4">
                  {sectionContent.bibleVerseText}
                </p>
                <p className="font-medium">
                  {sectionContent.bibleVerseReference}
                </p>
              </div>
            </div>

            {/* Call to action section */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
              <h2 className="text-3xl text-center font-medium whitespace-pre-line">
                {sectionContent.heading}
              </h2>
              <p className="text-center text-gray-600 whitespace-pre-line">
                {sectionContent.description}
              </p>
              <a
                href={sectionContent.donationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-gray-400 rounded-xl hover:bg-[#4D88FF] hover:text-white hover:border-[#4D88FF] transition-colors"
              >
                {sectionContent.buttonText}
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                placeholder="Section heading"
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
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Section description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bible Verse Text (use \n for line breaks)
              </label>
              <textarea
                name="bibleVerseText"
                value={sectionContent.bibleVerseText}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Bible verse text"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bible Verse Reference
              </label>
              <input
                type="text"
                name="bibleVerseReference"
                value={sectionContent.bibleVerseReference}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. — 2 Corinthians 9:7 (NIV)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bible Verse Background Image Path
              </label>
              <input
                type="text"
                name="bibleVerseBackgroundImage"
                value={sectionContent.bibleVerseBackgroundImage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="/images/background.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Text
              </label>
              <input
                type="text"
                name="buttonText"
                value={sectionContent.buttonText}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. Give today"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Donation Link
              </label>
              <input
                type="text"
                name="donationLink"
                value={sectionContent.donationLink}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
