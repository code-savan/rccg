/**
 * Home Page API Service Functions
 * This file contains functions for fetching and updating data for the home page sections.
 */

// Welcome Hero Section
export async function fetchWelcomeHeroSection() {
  const response = await fetch("/api/home/welcome-hero");
  if (!response.ok) {
    throw new Error("Failed to fetch welcome hero section");
  }
  return response.json();
}

export async function updateWelcomeHeroSection(data) {
  const response = await fetch("/api/home/welcome-hero", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update welcome hero section");
  }
  return response.json();
}

// About Section
export async function fetchAboutSection() {
  const response = await fetch("/api/home/about");
  if (!response.ok) {
    throw new Error("Failed to fetch about section");
  }
  return response.json();
}

export async function updateAboutSection(data) {
  const response = await fetch("/api/home/about", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update about section");
  }
  return response.json();
}

// Events Section
export async function fetchEventsSection() {
  const response = await fetch("/api/home/events");
  if (!response.ok) {
    throw new Error("Failed to fetch events section");
  }
  return response.json();
}

export async function updateEventsSection(data) {
  const response = await fetch("/api/home/events", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update events section");
  }
  return response.json();
}

// Highlights Section
export async function fetchHighlightsSection() {
  const response = await fetch("/api/home/highlights");
  if (!response.ok) {
    throw new Error("Failed to fetch highlights section");
  }
  return response.json();
}

export async function updateHighlightsSection(data) {
  const response = await fetch("/api/home/highlights", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update highlights section");
  }
  return response.json();
}

// Ministers Section
export async function fetchMinistersSection() {
  const response = await fetch("/api/home/ministers");
  if (!response.ok) {
    throw new Error("Failed to fetch ministers section");
  }
  return response.json();
}

export async function updateMinistersSection(data) {
  const response = await fetch("/api/home/ministers", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update ministers section");
  }
  return response.json();
}

// Service Times Section
export async function fetchServiceTimesSection() {
  const response = await fetch("/api/home/service-times");
  if (!response.ok) {
    throw new Error("Failed to fetch service times section");
  }
  return response.json();
}

export async function updateServiceTimesSection(data) {
  const response = await fetch("/api/home/service-times", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update service times section");
  }
  return response.json();
}

// Location Section
export async function fetchLocationSection() {
  const response = await fetch("/api/home/location");
  if (!response.ok) {
    throw new Error("Failed to fetch location section");
  }
  return response.json();
}

export async function updateLocationSection(data) {
  const response = await fetch("/api/home/location", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update location section");
  }
  return response.json();
}

// Worship With Us Section
export async function fetchWorshipWithUsSection() {
  const response = await fetch("/api/home/worship-with-us");
  if (!response.ok) {
    throw new Error("Failed to fetch worship with us section");
  }
  return response.json();
}

export async function updateWorshipWithUsSection(data) {
  const response = await fetch("/api/home/worship-with-us", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update worship with us section");
  }
  return response.json();
}
