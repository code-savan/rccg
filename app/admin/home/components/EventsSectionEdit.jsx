"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function EventsSectionEdit() {
  // Initial state based on current content
  const [eventsContent, setEventsContent] = useState({
    heading: "Upcoming events",
    events: [
      {
        id: 1,
        title: "Coming Soon",
        description:
          "Join us at RCCG Rod of God Parish for any of our events, a powerful gathering of worship, prayer, and spiritual renewal. Our events are designed to uplift, inspire, and bring us closer to God as a community. Expect heartfelt worship, impactful teachings, and a time of fellowship with believers.",
        location: "Parish House Indianapolis.",
        date: "To Be Dated(TBD)",
        image: "/images/event1.jpeg",
      },
      {
        id: 2,
        title: "Coming Soon",
        description:
          "Join us at RCCG Rod of God Parish for any of our events, a powerful gathering of worship, prayer, and spiritual renewal. Our events are designed to uplift, inspire, and bring us closer to God as a community. Expect heartfelt worship, impactful teachings, and a time of fellowship with believers.",
        location: "Parish House Indianapolis.",
        date: "To Be Dated(TBD)",
        image: "/images/event2.jpeg",
      },
    ],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventsContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleEventChange = (e, id) => {
    const { name, value } = e.target;
    setEventsContent((prev) => ({
      ...prev,
      events: prev.events.map((event) =>
        event.id === id ? { ...event, [name]: value } : event
      ),
    }));
  };

  const handleAddEvent = () => {
    const newEvent = {
      id: Math.max(0, ...eventsContent.events.map((e) => e.id)) + 1,
      title: "",
      description: "",
      location: "Parish House Indianapolis.",
      date: "",
      image: "",
    };

    setEventsContent((prev) => ({
      ...prev,
      events: [...prev.events, newEvent],
    }));

    setEditingEvent(newEvent.id);
  };

  const handleDeleteEvent = (id) => {
    setEventsContent((prev) => ({
      ...prev,
      events: prev.events.filter((event) => event.id !== id),
    }));
    setEditingEvent(null);
  };

  const handleSave = () => {
    // Here we would typically save to database (e.g. Supabase)
    setIsEditing(false);
    setEditingEvent(null);
    console.log("Saved events content:", eventsContent);
    // API call would go here
  };

  return (
    <div className="mb-12 border border-gray-200">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Upcoming Events Section</h3>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            setEditingEvent(null);
          }}
          className="px-4 py-2 text-sm border border-gray-200 bg-white"
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {/* Preview */}
      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-medium text-center mb-8">
              {eventsContent.heading}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {eventsContent.events.map((event) => (
                <div key={event.id} className="border border-gray-200 flex">
                  {event.image && (
                    <div className="w-1/3 relative">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}

                  <div className="w-2/3 p-6">
                    <h3 className="text-xl font-medium mb-3">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>

                    <div className="space-y-1 text-sm">
                      <div className="flex items-start">
                        <span className="font-medium mr-2">Location:</span>
                        <span className="text-gray-600">{event.location}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium mr-2">Date:</span>
                        <span className="text-gray-600">{event.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-4 bg-white">
          {editingEvent === null ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section Heading
                </label>
                <input
                  type="text"
                  name="heading"
                  value={eventsContent.heading}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300"
                  placeholder="Section heading"
                />
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-700">Events</h4>
                  <button
                    onClick={handleAddEvent}
                    className="px-3 py-1 text-xs border border-gray-200 bg-white"
                  >
                    Add Event
                  </button>
                </div>

                <div className="space-y-4">
                  {eventsContent.events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start justify-between p-3 border border-gray-200"
                    >
                      <div className="flex">
                        {event.image && (
                          <div className="w-16 h-16 relative mr-3">
                            <Image
                              src={event.image}
                              alt={event.title}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-gray-600">{event.date}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {event.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingEvent(event.id)}
                          className="px-3 py-1 text-xs border border-gray-200 bg-white"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="px-3 py-1 text-xs border border-red-200 text-red-600 bg-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white"
                >
                  Save Changes
                </button>
              </div>
            </>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-700">
                  {eventsContent.events.find((e) => e.id === editingEvent)
                    ?.title
                    ? `Edit Event: ${
                        eventsContent.events.find((e) => e.id === editingEvent)
                          .title
                      }`
                    : "Add New Event"}
                </h4>
                <button
                  onClick={() => setEditingEvent(null)}
                  className="px-3 py-1 text-xs border border-gray-200 bg-white"
                >
                  Back
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={
                        eventsContent.events.find((e) => e.id === editingEvent)
                          ?.title || ""
                      }
                      onChange={(e) => handleEventChange(e, editingEvent)}
                      className="w-full px-3 py-2 border border-gray-300"
                      placeholder="e.g. Christmas Service"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={
                        eventsContent.events.find((e) => e.id === editingEvent)
                          ?.description || ""
                      }
                      onChange={(e) => handleEventChange(e, editingEvent)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300"
                      placeholder="Event description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={
                        eventsContent.events.find((e) => e.id === editingEvent)
                          ?.location || ""
                      }
                      onChange={(e) => handleEventChange(e, editingEvent)}
                      className="w-full px-3 py-2 border border-gray-300"
                      placeholder="e.g. Parish House Indianapolis."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="text"
                      name="date"
                      value={
                        eventsContent.events.find((e) => e.id === editingEvent)
                          ?.date || ""
                      }
                      onChange={(e) => handleEventChange(e, editingEvent)}
                      className="w-full px-3 py-2 border border-gray-300"
                      placeholder="e.g. December 25, 2023 or TBD"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="image"
                      value={
                        eventsContent.events.find((e) => e.id === editingEvent)
                          ?.image || ""
                      }
                      onChange={(e) => handleEventChange(e, editingEvent)}
                      className="w-full px-3 py-2 border border-gray-300"
                      placeholder="/images/your-image.jpg"
                    />
                  </div>

                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                    <div className="h-48 relative bg-gray-100 border border-gray-200">
                      {eventsContent.events.find((e) => e.id === editingEvent)
                        ?.image ? (
                        <Image
                          src={
                            eventsContent.events.find(
                              (e) => e.id === editingEvent
                            )?.image
                          }
                          alt="Event preview"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="text-gray-400">
                            No image selected
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white"
                >
                  Save Event
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
