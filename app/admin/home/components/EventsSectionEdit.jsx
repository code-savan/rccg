"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { fetchEventsSection, updateEventsSection } from "@/lib/services/homeService";
import { formatDisplayText } from "@/lib/homeFormData";
import ImageUpload from "@/components/@admin/ImageUpload";

export default function EventsSectionEdit() {
  // Initial state
  const [eventsContent, setEventsContent] = useState({
    heading: "",
    events: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchEventsSection();
        setEventsContent(data);
      } catch (error) {
        console.error("Error fetching events section data:", error);
        setError("Failed to load events section. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
    const newId = eventsContent.events.length > 0
      ? Math.max(...eventsContent.events.map(e => e.id)) + 1
      : 1;

    const newEvent = {
      id: newId,
      title: "",
      description: "",
      location: "",
      date: "",
      image: "",
    };

    setEventsContent((prev) => ({
      ...prev,
      events: [...prev.events, newEvent],
    }));

    setEditingEvent(newEvent.id);
  };

  const handleRemoveEvent = (id) => {
    setEventsContent((prev) => ({
      ...prev,
      events: prev.events.filter((event) => event.id !== id),
    }));

    if (editingEvent === id) {
      setEditingEvent(null);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateEventsSection(eventsContent);
      setIsEditing(false);
      setEditingEvent(null);
      toast.success("Events section updated successfully!");
    } catch (error) {
      console.error("Error saving events section data:", error);
      toast.error("Failed to update events section. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (url, id) => {
    setEventsContent((prev) => ({
      ...prev,
      events: prev.events.map((event) =>
        event.id === id ? { ...event, image: url } : event
      ),
    }));
  };

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
          <h3 className="font-medium text-gray-800">Events Section</h3>
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
        <h3 className="font-medium text-gray-800">Events Section</h3>
        <button
          onClick={() => {
            setIsEditing(!isEditing);
            if (!isEditing) {
              setEditingEvent(null);
            }
          }}
          className="px-4 py-2 text-sm border border-gray-200 bg-white"
          disabled={isSaving}
        >
          {isEditing ? "Cancel" : "Edit Content"}
        </button>
      </div>

      {/* Preview */}
      {!isEditing ? (
        <div className="p-8 bg-white">
          <div className="mb-8 text-center">
            <h2 className="text-[40px] font-semibold mb-4 lg:text-[36px] md:text-[32px] sm:text-[28px]">{eventsContent.heading}</h2>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {eventsContent.events.map((event) => (
                <div key={event.id} className="flex flex-col gap-[30px]">
                  <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
                    <Image
                      src={event.image || "/images/placeholder.png"}
                      alt={event.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-start gap-[30px]">
                    <h3 className="text-[24px] font-semibold text-charcoal">{event.title}</h3>
                    <p className="text-[16px] font-normal leading-[130%] text-gray-600">
                      <span dangerouslySetInnerHTML={{ __html: formatDisplayText(event.description) }}></span>
                    </p>
                    <div className="flex flex-col gap-[10px]">
                      <div className="flex items-center gap-[10px]">
                        <span className="text-[16px] font-medium text-charcoal">Location:</span>
                        <span className="text-[16px] font-normal text-gray-600">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-[10px]">
                        <span className="text-[16px] font-medium text-charcoal">Date:</span>
                        <span className="text-[16px] font-normal text-gray-600">{event.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {eventsContent.events.length === 0 && (
              <p className="text-gray-500 italic">No events have been added yet.</p>
            )}
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
              value={eventsContent.heading}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300"
            />
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Events</h3>
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={isSaving}
              >
                Add Event
              </button>
            </div>

            {eventsContent.events.map((event) => (
              <div
                key={event.id}
                className="mb-8 border border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-md font-medium">
                    {event.title || "New Event"}
                  </h4>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingEvent(editingEvent === event.id ? null : event.id)}
                      className="px-3 py-1 text-xs border border-gray-200 bg-white"
                    >
                      {editingEvent === event.id ? "Collapse" : "Expand"}
                    </button>
                    <button
                      onClick={() => handleRemoveEvent(event.id)}
                      className="px-3 py-1 text-xs border border-red-200 text-red-600 bg-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {editingEvent === event.id && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Event Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={event.title}
                        onChange={(e) => handleEventChange(e, event.id)}
                        className="w-full px-3 py-2 border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={event.description}
                        onChange={(e) => handleEventChange(e, event.id)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300"
                      ></textarea>
                      <p className="mt-1 text-sm text-gray-500">
                        Use \n for line breaks.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={event.location}
                        onChange={(e) => handleEventChange(e, event.id)}
                        className="w-full px-3 py-2 border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="text"
                        name="date"
                        value={event.date}
                        onChange={(e) => handleEventChange(e, event.id)}
                        className="w-full px-3 py-2 border border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image
                      </label>
                      <ImageUpload
                        onImageUploaded={(url) => handleImageUpload(url, event.id)}
                        section="home-events"
                        bucketName="home-files"
                        existingImageUrl={event.image}
                        buttonText="Upload Event Image"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
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
