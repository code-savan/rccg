"use client";

import React, { useState, useEffect } from "react";
import {
  fetchChurchInfoSection,
  updateChurchInfoSection,
} from "@/lib/services/servicesEventsService";
import { formatDisplayText } from "@/lib/servicesEventsFormData";
import ImageUpload from "@/components/@admin/ImageUpload";

export default function ChurchInfoEdit() {
  const [sectionContent, setSectionContent] = useState({
    heading: "THE YEAR OF MY GREATNESS",
    date: "Sunday Service January 19th, 2025.",
    bibleVerse: `And there shall come forth a rod of out of the stem of Jesse and a branch shall grow out of his roots: And the Spirit of the Lord shall rest upon him, the spirit of wisdom and understanding in the fear of the LORD: and he shall not judge after the sight of his eyes, neither reprove after the hearing of his ears.`,
    bibleReference: "Isaiah 11:1-3",
    contacts: [
      { id: 1, label: "Pastor's Phone:", value: "317-418-7388" },
      { id: 2, label: "Pastor (Mrs) Phone:", value: "317-833-2186" },
      { id: 3, label: "General Overseer:", value: "Pastor E.A Adeboye" },
      { id: 4, label: "Chairman RCCGNA:", value: "Pastor J. Fadel" },
      {
        id: 5,
        label: "Host Ministers:",
        values: ["Pastor J.K. Balogun", "Pastor F.O. Balogun"],
      },
    ],
    backgroundImage: "/images/img_group_250.png",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingContactId, setEditingContactId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchChurchInfoSection();
        if (data) {
          setSectionContent(data);
        }
      } catch (err) {
        console.error("Error fetching church info section data:", err);
        setError("Failed to load content. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSectionContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (e, id) => {
    const { name, value } = e.target;
    setSectionContent((prev) => ({
      ...prev,
      contacts: prev.contacts.map((contact) =>
        contact.id === id ? { ...contact, [name]: value } : contact
      ),
    }));
  };

  const handleContactValueChange = (e, contactId, index) => {
    const { value } = e.target;
    setSectionContent((prev) => ({
      ...prev,
      contacts: prev.contacts.map((contact) => {
        if (contact.id === contactId && contact.values) {
          const newValues = [...contact.values];
          newValues[index] = value;
          return { ...contact, values: newValues };
        }
        return contact;
      }),
    }));
  };

  const handleAddValueToContact = (contactId) => {
    setSectionContent((prev) => ({
      ...prev,
      contacts: prev.contacts.map((contact) => {
        if (contact.id === contactId) {
          return {
            ...contact,
            values: [...(contact.values || []), ""],
          };
        }
        return contact;
      }),
    }));
  };

  const handleRemoveValueFromContact = (contactId, index) => {
    setSectionContent((prev) => ({
      ...prev,
      contacts: prev.contacts.map((contact) => {
        if (
          contact.id === contactId &&
          contact.values &&
          contact.values.length > 1
        ) {
          const newValues = [...contact.values];
          newValues.splice(index, 1);
          return { ...contact, values: newValues };
        }
        return contact;
      }),
    }));
  };

  const handleAddContact = () => {
    // Ensure contacts is always an array
    const currentContacts = Array.isArray(sectionContent.contacts)
      ? sectionContent.contacts
      : [];

    const newContact = {
      id:
        currentContacts.length > 0
          ? Math.max(0, ...currentContacts.map((c) => c.id || 0)) + 1
          : 1,
      label: "",
      value: "",
    };

    setSectionContent((prev) => ({
      ...prev,
      contacts: [...currentContacts, newContact],
    }));
    setEditingContactId(newContact.id);
  };

  const handleDeleteContact = (id) => {
    setSectionContent((prev) => ({
      ...prev,
      contacts: prev.contacts.filter((contact) => contact.id !== id),
    }));
    setEditingContactId(null);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);

      const updatedData = await updateChurchInfoSection(sectionContent);
      if (updatedData) {
        setSectionContent(updatedData);
      }
      setIsEditing(false);
      setEditingContactId(null);
    } catch (err) {
      console.error("Error saving church info section data:", err);
      setError("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const renderContactValue = (contact) => {
    if (!contact) {
      return <span className="text-gray-900">No data</span>;
    }

    // Choose text color based on isEditing
    const textColorClass = !isEditing ? "text-white" : "text-gray-900";

    if (contact.values && Array.isArray(contact.values)) {
      return (
        <div className="flex flex-col gap-2">
          {contact.values.map((value, index) => (
            <span key={index} className={textColorClass}>
              {!isEditing ? formatDisplayText(value || "") : value}
            </span>
          ))}
        </div>
      );
    } else {
      return (
        <span className={textColorClass}>
          {!isEditing
            ? formatDisplayText(contact.value || "")
            : contact.value || ""}
        </span>
      );
    }
  };

  // Add loading state
  if (isLoading) {
    return (
      <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-medium text-gray-800">
            Church Information Section
          </h3>
        </div>
        <div className="p-8 bg-white flex justify-center items-center">
          <div className="animate-pulse text-center">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-40 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">
          Church Information Section
        </h3>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setEditingContactId(null);
          }}
          className="px-4 py-2 text-sm border border-gray-200 bg-white rounded-md hover:bg-gray-50"
          disabled={isSaving}
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border-b border-red-100 text-red-600 text-sm">
          {error}
        </div>
      )}

      {!isEditing ? (
        <div className="p-4 bg-white">
          <div className="mx-auto w-full">
            <div className="relative rounded-xl overflow-hidden">
              {sectionContent.backgroundImage && (
                <img
                  src={sectionContent.backgroundImage}
                  alt="Church Info Background"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center p-4 md:p-8">
                <div className="max-w-5xl mx-auto text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {formatDisplayText(sectionContent.heading)}
                  </h2>
                  <p className="text-md mb-4">
                    {formatDisplayText(sectionContent.date)}
                  </p>

                  <div className="border-l-4 border-white pl-3 mb-6">
                    <blockquote className="text-sm md:text-base italic whitespace-pre-line">
                      {formatDisplayText(sectionContent.bibleVerse)}
                      <footer className="mt-1 font-semibold">
                        — {formatDisplayText(sectionContent.bibleReference)}
                      </footer>
                    </blockquote>
                  </div>

                  <div className="space-y-1 text-sm md:text-base">
                    {Array.isArray(sectionContent.contacts) ? (
                      sectionContent.contacts.map((contact) => (
                        <div key={contact.id} className="flex justify-between">
                          <span className="text-white font-medium">
                            {contact.label}
                          </span>
                          {renderContactValue(contact)}
                        </div>
                      ))
                    ) : (
                      <div className="text-white">
                        No contact information available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 text-xs text-gray-500">
              <p>* Background image preview shown above</p>
              <p>Current image: {sectionContent.backgroundImage}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 bg-white">
          {editingContactId === null ? (
            <>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Heading
                  </label>
                  <input
                    type="text"
                    name="heading"
                    value={sectionContent.heading}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Section heading"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="text"
                    name="date"
                    value={sectionContent.date}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. Sunday Service January 19th, 2025."
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
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Bible verse text"
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
                    placeholder="e.g. Isaiah 11:1-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Image
                  </label>
                  <ImageUpload
                    onImageUploaded={(url) => {
                      setSectionContent((prev) => ({
                        ...prev,
                        backgroundImage: url,
                      }));
                    }}
                    section="church-info"
                    existingImageUrl={sectionContent.backgroundImage}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-900">
                    Contact Information
                  </h4>
                  <button
                    onClick={handleAddContact}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Contact
                  </button>
                </div>

                <div className="space-y-4">
                  {Array.isArray(sectionContent.contacts) ? (
                    sectionContent.contacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between mb-3">
                          <h5 className="font-medium">
                            {contact.label || "New Contact"}
                          </h5>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingContactId(contact.id)}
                              className="px-3 py-1.5 text-sm border border-gray-200 rounded-md hover:bg-gray-100"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteContact(contact.id)}
                              className="px-3 py-1.5 text-sm border border-red-200 text-red-600 rounded-md hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-700 mr-2">
                            {contact.label}:
                          </span>
                          {renderContactValue(contact)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">
                      No contacts available. Add one below.
                    </div>
                  )}
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
                  {sectionContent.contacts.find(
                    (c) => c.id === editingContactId
                  )?.label
                    ? `Edit Contact: ${
                        sectionContent.contacts.find(
                          (c) => c.id === editingContactId
                        ).label
                      }`
                    : "Add New Contact"}
                </h4>
                <button
                  onClick={() => setEditingContactId(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Label
                  </label>
                  <input
                    type="text"
                    name="label"
                    value={
                      sectionContent.contacts.find(
                        (c) => c.id === editingContactId
                      )?.label || ""
                    }
                    onChange={(e) => handleContactChange(e, editingContactId)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g. Pastor's Phone:"
                  />
                </div>

                {sectionContent.contacts.find((c) => c.id === editingContactId)
                  ?.values ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Values
                    </label>
                    {sectionContent.contacts
                      .find((c) => c.id === editingContactId)
                      ?.values.map((value, index) => (
                        <div key={index} className="flex mb-2">
                          <input
                            type="text"
                            value={value}
                            onChange={(e) =>
                              handleContactValueChange(
                                e,
                                editingContactId,
                                index
                              )
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="e.g. Pastor J.K. Balogun"
                          />
                          <button
                            onClick={() =>
                              handleRemoveValueFromContact(
                                editingContactId,
                                index
                              )
                            }
                            className="ml-2 px-3 py-2 text-red-600 hover:text-red-800"
                            disabled={
                              sectionContent.contacts.find(
                                (c) => c.id === editingContactId
                              )?.values.length <= 1
                            }
                          >
                            &times;
                          </button>
                        </div>
                      ))}

                    <button
                      onClick={() => handleAddValueToContact(editingContactId)}
                      className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                    >
                      + Add another value
                    </button>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Value
                    </label>
                    <input
                      type="text"
                      name="value"
                      value={
                        sectionContent.contacts.find(
                          (c) => c.id === editingContactId
                        )?.value || ""
                      }
                      onChange={(e) => handleContactChange(e, editingContactId)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="e.g. 317-418-7388"
                    />
                  </div>
                )}

                <div className="flex justify-end pt-6">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save Contact"}
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
