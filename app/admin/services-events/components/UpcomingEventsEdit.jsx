"use client";

import React, { useState, useEffect } from "react";
import ImageUpload from "../../../../components/@admin/ImageUpload";
import {
  fetchUpcomingEventsSection,
  updateUpcomingEventsSection,
} from "@/lib/services/servicesEventsService";
import { formatDisplayText } from "@/lib/servicesEventsFormData";

export default function UpcomingEventsEdit() {
  const [sectionContent, setSectionContent] = useState({
    heading: "Upcoming events",
    events: [
      {
        id: 1,
        title: "Coming Soon",
        description:
          "Join us at RCCG Rod of God Parish for any of our events, a powerful gathering of worship, prayer, and spiritual renewal. Our events are designed to uplift, inspire, and bring us closer to God as a community. Expect heartfelt worship, impactful teachings, and a time of fellowship with believers.",
        location: "Parish House Indianapolis.",
        date: "To Be Dated(TBD)",
        image: "/images/img_edwin_andrade_4.png",
      },
      {
        id: 2,
        title: "Coming Soon",
        description:
          "Join us at RCCG Rod of God Parish for any of our events, a powerful gathering of worship, prayer, and spiritual renewal. Our events are designed to uplift, inspire, and bring us closer to God as a community. Expect heartfelt worship, impactful teachings, and a time of fellowship with believers.",
        location: "Parish House Indianapolis.",
        date: "To Be Dated(TBD)",
        image: "/images/img_worshae_bcy9e8uyuhu_unsplash.png",
      },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchUpcomingEventsSection();
        setSectionContent(data);
      } catch (err) {
        console.error("Error fetching upcoming events section data:", err);
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

  const handleEventChange = (e, id) => {
    const { name, value } = e.target;
    setSectionContent((prev) => ({
      ...prev,
      events: prev.events.map((event) =>
        event.id === id ? { ...event, [name]: value } : event
      ),
    }));
  };

  // Handler for image upload completion
  const handleImageUploaded = (imageUrl, id) => {
    setSectionContent((prev) => ({
      ...prev,
      events: prev.events.map((event) =>
        event.id === id ? { ...event, image: imageUrl } : event
      ),
    }));
  };

  const handleAddEvent = () => {
    const newEvent = {
      id: Math.max(0, ...sectionContent.events.map((e) => e.id)) + 1,
      title: "",
      description: "",
      location: "Parish House Indianapolis.",
      date: "",
      image: "",
    };
    setSectionContent((prev) => ({
      ...prev,
      events: [...prev.events, newEvent],
    }));
    setEditingEventId(newEvent.id);
  };

  const handleDeleteEvent = (id) => {
    setSectionContent((prev) => ({
      ...prev,
      events: prev.events.filter((event) => event.id !== id),
    }));
    setEditingEventId(null);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);

      const updatedData = await updateUpcomingEventsSection(sectionContent);
      setSectionContent(updatedData);
    setIsEditing(false);
    setEditingEventId(null);
    } catch (err) {
      console.error("Error saving upcoming events section data:", err);
      setError("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-medium text-gray-800">Upcoming Events Section</h3>
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
    <div className="mb-12 border border-gray-200 rounded-lg">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Upcoming Events Section</h3>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setEditingEventId(null);
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
        <div className="p-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6">
              {sectionContent.heading}
            </h3>

            <div className="space-y-8 h-fit pr-2">
              {sectionContent.events.map((event) => (
                <div
                  key={event.id}
                  className="border border-gray-200 rounded-lg overflow-hidden h-fit"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-2/5 relative bg-gray-100 ">
                      {event.image && (
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-[300px] md:h-[400px] object-cover"
                        />
                      )}
                    </div>
                    <div className="w-full md:w-3/5 p-6">
                      <h3 className="text-xl font-medium mb-3">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {formatDisplayText(event.description)}
                      </p>

                      <div className="space-y-1 text-sm">
                        <div className="flex items-start">
                          <svg
                            className="w-5 h-5 text-gray-600 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-medium mr-2">Location:</span>
                          <span className="text-gray-600">
                            {event.location}
                          </span>
                        </div>
                        <div className="flex items-start">
                          <svg
                            className="w-5 h-5 text-gray-600 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-medium mr-2">Date:</span>
                          <span className="text-gray-600">{event.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 bg-white">
          {editingEventId === null ? (
            <>
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

              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-900">Events</h4>
                  <button
                    onClick={handleAddEvent}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Event
                  </button>
                </div>

                <div className="space-y-4">
                  {sectionContent.events.map((event) => (
                    <div
                      key={event.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between mb-3">
                        <div className="flex items-center">
                          {event.image && (
                            <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden mr-3">
                              <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <h5 className="font-medium">
                            {event.title || "New Event"}
                          </h5>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingEventId(event.id)}
                            className="px-3 py-1.5 text-sm border border-gray-200 rounded-md hover:bg-gray-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="px-3 py-1.5 text-sm border border-red-200 text-red-600 rounded-md hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">
                            Location:
                          </span>{" "}
                          {event.location}
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            Date:
                          </span>{" "}
                          {event.date}
                        </div>
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="font-medium text-gray-700">
                          Description:
                        </span>{" "}
                        <span className="text-gray-600 line-clamp-1">
                          {event.description}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>

                <div className="flex justify-end pt-4 mt-6">
                <button
                  onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                    disabled={isSaving}
                >
                    {isSaving ? "Saving..." : "Save Changes"}
                </button>
                </div>
              </div>
            </>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-medium text-gray-900">Edit Event</h4>
                <button
                  onClick={() => setEditingEventId(null)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
                >
                  Back to List
                </button>
              </div>

              {sectionContent.events
                .filter((event) => event.id === editingEventId)
                .map((event) => (
                  <div key={event.id} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                  </label>
                  <input
                    type="text"
                    name="title"
                        value={event.title}
                        onChange={(e) => handleEventChange(e, event.id)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Event title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                        value={event.description}
                        onChange={(e) => handleEventChange(e, event.id)}
                        rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Event description"
                  />
                </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                          value={event.location}
                          onChange={(e) => handleEventChange(e, event.id)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="Event location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="text"
                    name="date"
                          value={event.date}
                          onChange={(e) => handleEventChange(e, event.id)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="e.g. May 15, 2024"
                  />
                      </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event Image
                  </label>
                      <ImageUpload
                        section={`services-events-event-${event.id}`}
                        onImageUploaded={(imageUrl) =>
                          handleImageUploaded(imageUrl, event.id)
                        }
                        existingImageUrl={event.image}
                      />
                </div>

                    <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSave}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                        disabled={isSaving}
                  >
                        {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
