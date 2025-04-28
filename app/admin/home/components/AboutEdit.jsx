"use client";

import React, { useState } from "react";
import {
  PencilIcon,
  CheckIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export default function AboutEdit({ sectionView = "full" }) {
  const [aboutContent, setAboutContent] = useState({
    heading: "About RCCG Rod of God Parish",
    description:
      "Welcome to the Redeemed Christian Church of God (RCCG) Rod of God Parish. We are a vibrant, Spirit-filled community dedicated to spreading the gospel of Jesus Christ and making a positive impact in Indianapolis.",
    mission: {
      title: "Our Mission",
      text: "To make heaven, to take as many people as possible with us, to have a member of RCCG in every family of all nations, and to accomplish this by planting churches within five minutes walking distance in every city and town of developing countries and within ten minutes driving distance in every city and town of developed countries.",
    },
    vision: {
      title: "Our Vision",
      text: "To spread the Word of God to all nations, nurture believers to become disciples of Christ, and create a spiritual environment where God's presence dwells.",
    },
    beliefs: [
      {
        id: 1,
        title: "The Bible",
        description:
          "We believe the Bible is the inspired and only infallible Word of God.",
      },
      {
        id: 2,
        title: "One God",
        description:
          "We believe in one God, eternally existing in three persons: God the Father, God the Son, and God the Holy Spirit.",
      },
      {
        id: 3,
        title: "Salvation",
        description:
          "We believe in salvation by grace through faith in Jesus Christ, resulting in the new birth.",
      },
    ],
    history: {
      title: "Our History",
      text: "RCCG Rod of God Parish was established with a divine mandate to bring the message of salvation to Indianapolis. Since our inception, we have grown into a thriving community of believers committed to God's work.",
    },
    contact: {
      address: "123 Church Street, Indianapolis, IN 46201",
      email: "info@rccgrodofgod.org",
      phone: "(317) 555-0123",
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingBeliefId, setEditingBeliefId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAboutContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (category, field, value) => {
    setAboutContent((prev) => ({
      ...prev,
      [category]: { ...prev[category], [field]: value },
    }));
  };

  const handleBeliefChange = (e, id) => {
    const { name, value } = e.target;
    setAboutContent((prev) => ({
      ...prev,
      beliefs: prev.beliefs.map((belief) =>
        belief.id === id ? { ...belief, [name]: value } : belief
      ),
    }));
  };

  const handleAddBelief = () => {
    const newBelief = {
      id: Math.max(0, ...aboutContent.beliefs.map((b) => b.id)) + 1,
      title: "",
      description: "",
    };
    setAboutContent((prev) => ({
      ...prev,
      beliefs: [...prev.beliefs, newBelief],
    }));
    setEditingBeliefId(newBelief.id);
  };

  const handleDeleteBelief = (id) => {
    setAboutContent((prev) => ({
      ...prev,
      beliefs: prev.beliefs.filter((belief) => belief.id !== id),
    }));
    setEditingBeliefId(null);
  };

  const handleSave = () => {
    setIsEditing(false);
    setEditingBeliefId(null);
    console.log("Saved about content:", aboutContent);
  };

  const renderMainSection = () => (
    <>
      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-medium text-center mb-6">
              {aboutContent.heading}
            </h2>
            <p className="text-gray-600 text-center mb-6">
              {aboutContent.description}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 bg-white">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Heading
              </label>
              <input
                type="text"
                name="heading"
                value={aboutContent.heading}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Main heading"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={aboutContent.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Main description"
              />
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );

  const renderMissionVision = () => (
    <>
      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-medium mb-3 text-gray-900">
                  {aboutContent.mission.title}
                </h3>
                <p className="text-gray-600">{aboutContent.mission.text}</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-medium mb-3 text-gray-900">
                  {aboutContent.vision.title}
                </h3>
                <p className="text-gray-600">{aboutContent.vision.text}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 bg-white">
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-medium text-gray-900 mb-4">Mission & Vision</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mission Title
                </label>
                <input
                  type="text"
                  value={aboutContent.mission.title}
                  onChange={(e) =>
                    handleNestedChange("mission", "title", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Mission title"
                />
                <textarea
                  value={aboutContent.mission.text}
                  onChange={(e) =>
                    handleNestedChange("mission", "text", e.target.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md"
                  placeholder="Mission statement"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vision Title
                </label>
                <input
                  type="text"
                  value={aboutContent.vision.title}
                  onChange={(e) =>
                    handleNestedChange("vision", "title", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Vision title"
                />
                <textarea
                  value={aboutContent.vision.text}
                  onChange={(e) =>
                    handleNestedChange("vision", "text", e.target.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md"
                  placeholder="Vision statement"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );

  const renderBeliefs = () => (
    <>
      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h3 className="text-2xl font-medium text-center mb-6">
                Our Core Beliefs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {aboutContent.beliefs.map((belief) => (
                  <div
                    key={belief.id}
                    className="bg-gray-50 p-6 rounded-lg border border-gray-200"
                  >
                    <h4 className="text-lg font-medium mb-2 text-gray-900">
                      {belief.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {belief.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 bg-white">
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-gray-900">Core Beliefs</h4>
              <button
                onClick={handleAddBelief}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Belief
              </button>
            </div>
            <div className="space-y-4">
              {aboutContent.beliefs.map((belief) => (
                <div
                  key={belief.id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Belief Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={belief.title}
                        onChange={(e) => handleBeliefChange(e, belief.id)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Belief title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={belief.description}
                        onChange={(e) => handleBeliefChange(e, belief.id)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Belief description"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => handleDeleteBelief(belief.id)}
                      className="px-3 py-1.5 text-sm border border-red-200 text-red-600 rounded-md hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );

  const renderHistory = () => (
    <>
      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h3 className="text-2xl font-medium mb-4">
                {aboutContent.history.title}
              </h3>
              <p className="text-gray-600">{aboutContent.history.text}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 bg-white">
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-medium text-gray-900 mb-4">History</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  History Title
                </label>
                <input
                  type="text"
                  value={aboutContent.history.title}
                  onChange={(e) =>
                    handleNestedChange("history", "title", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="History title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  History Text
                </label>
                <textarea
                  value={aboutContent.history.text}
                  onChange={(e) =>
                    handleNestedChange("history", "text", e.target.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Church history"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );

  const renderContact = () => (
    <>
      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-medium mb-4 text-gray-900">
                Contact Information
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>{aboutContent.contact.address}</p>
                <p>Email: {aboutContent.contact.email}</p>
                <p>Phone: {aboutContent.contact.phone}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 bg-white">
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-medium text-gray-900 mb-4">
              Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={aboutContent.contact.address}
                  onChange={(e) =>
                    handleNestedChange("contact", "address", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Church address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={aboutContent.contact.email}
                  onChange={(e) =>
                    handleNestedChange("contact", "email", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Contact email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  value={aboutContent.contact.phone}
                  onChange={(e) =>
                    handleNestedChange("contact", "phone", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Contact phone"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );

  const renderContent = () => {
    switch (sectionView) {
      case "mission-vision":
        return renderMissionVision();
      case "beliefs":
        return renderBeliefs();
      case "history":
        return renderHistory();
      case "contact":
        return renderContact();
      default:
        return renderMainSection();
    }
  };

  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">
          {sectionView === "mission-vision"
            ? "Mission & Vision"
            : sectionView === "beliefs"
            ? "Core Beliefs"
            : sectionView === "history"
            ? "Church History"
            : sectionView === "contact"
            ? "Contact Information"
            : "About Us Section"}
        </h3>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setEditingBeliefId(null);
          }}
          className="px-4 py-2 text-sm border border-gray-200 bg-white rounded-md hover:bg-gray-50"
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {renderContent()}
    </div>
  );
}
