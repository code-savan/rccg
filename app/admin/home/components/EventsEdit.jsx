"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  PlusCircleIcon,
  XCircleIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

export default function EventsEdit() {
  const [sectionTitle, setSectionTitle] = useState("Upcoming Events");
  const [sectionDescription, setSectionDescription] = useState(
    "Join us for these special events and be blessed."
  );
  const [isEditing, setIsEditing] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Sunday Service",
      date: "2023-10-15T10:00",
      description: "Join us for worship and the Word every Sunday morning.",
      location: "Main Sanctuary",
      image: "/images/event-1.jpg",
    },
    {
      id: 2,
      title: "Prayer Conference",
      date: "2023-10-21T18:00",
      description:
        "A special night of prayer and intercession for our community and nation.",
      location: "Fellowship Hall",
      image: "/images/event-2.jpg",
    },
    {
      id: 3,
      title: "Youth Summit",
      date: "2023-10-28T14:00",
      description:
        "A gathering for young people to connect and grow in their faith journey.",
      location: "Youth Center",
      image: "/images/event-3.jpg",
    },
  ]);

  const [currentEvent, setCurrentEvent] = useState(null);

  // Format date for display
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  // Format date for input field
  const formatDateForInput = (dateString) => {
    return dateString ? dateString.slice(0, 16) : "";
  };

  // Handle adding a new event
  const handleAddEvent = () => {
    const newId =
      events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1;
    const newEvent = {
      id: newId,
      title: "",
      date: new Date().toISOString().slice(0, 16),
      description: "",
      location: "",
      image: "",
    };
    setCurrentEvent(newEvent);
  };

  // Handle editing an existing event
  const handleEditEvent = (event) => {
    setCurrentEvent({ ...event });
  };

  // Handle deleting an event
  const handleDeleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
    if (currentEvent && currentEvent.id === id) {
      setCurrentEvent(null);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save event (new or edited)
  const handleSaveEvent = () => {
    if (!currentEvent) return;

    if (events.some((e) => e.id === currentEvent.id)) {
      // Update existing event
      setEvents(
        events.map((e) => (e.id === currentEvent.id ? currentEvent : e))
      );
    } else {
      // Add new event
      setEvents([...events, currentEvent]);
    }

    setCurrentEvent(null);
  };

  // Save all changes
  const handleSaveAll = () => {
    // Here we would typically save to database (e.g. Supabase)
    setIsEditing(false);
    console.log("Saved events section:", {
      title: sectionTitle,
      description: sectionDescription,
      events,
    });
    // API call would go here
  };

  return (
    <div className="mb-12 border border-gray-200">
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">Events Section</h3>
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
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">{sectionTitle}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {sectionDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                >
                  <div className="h-48 relative">
                    <Image
                      src={event.image || "/images/event-placeholder.jpg"}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <span className="text-sm">{formatDate(event.date)}</span>
                    </div>
                    <p className="text-gray-600 mb-2 text-sm">
                      {event.location}
                    </p>
                    <p className="text-gray-700">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-white">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Title
              </label>
              <input
                type="text"
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300"
                placeholder="Section title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Description
              </label>
              <textarea
                value={sectionDescription}
                onChange={(e) => setSectionDescription(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300"
                placeholder="A short description for the events section"
              />
            </div>
          </div>

          {/* Events List */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Events</h4>
              <button
                onClick={handleAddEvent}
                className="flex items-center text-blue-600 text-sm"
                disabled={currentEvent !== null}
              >
                <PlusCircleIcon className="h-5 w-5 mr-1" />
                Add Event
              </button>
            </div>

            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex justify-between items-center p-3 border border-gray-200 rounded hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 relative rounded overflow-hidden mr-3">
                      <Image
                        src={event.image || "/images/event-placeholder.jpg"}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(event.date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditEvent(event)}
                      className="px-3 py-1 text-xs border border-gray-200 rounded"
                      disabled={currentEvent !== null}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="px-3 py-1 text-xs border border-gray-200 rounded text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Edit Event Form */}
          {currentEvent && (
            <div className="border border-gray-200 p-4 rounded mb-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">
                  {events.some((e) => e.id === currentEvent.id)
                    ? `Edit Event: ${currentEvent.title}`
                    : "Add New Event"}
                </h4>
                <button
                  onClick={() => setCurrentEvent(null)}
                  className="text-gray-500"
                >
                  <XCircleIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={currentEvent.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300"
                    placeholder="Event title"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      name="date"
                      value={formatDateForInput(currentEvent.date)}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={currentEvent.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300"
                      placeholder="Event location"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={currentEvent.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300"
                    placeholder="Event description..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={currentEvent.image}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300"
                    placeholder="/images/event.jpg"
                  />
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                  <div className="h-32 w-48 relative bg-gray-100 border border-gray-200 rounded overflow-hidden">
                    {currentEvent.image ? (
                      <Image
                        src={currentEvent.image}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-gray-400 text-xs">No image</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSaveEvent}
                    className="px-4 py-2 bg-blue-600 text-white"
                  >
                    Save Event
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-6">
            <button
              onClick={handleSaveAll}
              className="px-4 py-2 bg-blue-600 text-white"
            >
              Save All Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
