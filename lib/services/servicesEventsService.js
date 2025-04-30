/**
 * Service functions for interacting with the services-events API endpoints
 */

// Fetch all services-events data
export async function fetchServicesEventsData() {
  const response = await fetch("/api/services-events");

  if (!response.ok) {
    throw new Error("Failed to fetch services-events data");
  }

  return response.json();
}

// Update all services-events data
export async function updateServicesEventsData(data) {
  const response = await fetch("/api/services-events", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update services-events data");
  }

  return response.json();
}

// Welcome Section
export async function fetchWelcomeSection() {
  const response = await fetch("/api/services-events/welcome");

  if (!response.ok) {
    throw new Error("Failed to fetch welcome section data");
  }

  return response.json();
}

export async function updateWelcomeSection(data) {
  const response = await fetch("/api/services-events/welcome", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update welcome section data");
  }

  return response.json();
}

// Church Info Section
export async function fetchChurchInfoSection() {
  const response = await fetch("/api/services-events/church-info");

  if (!response.ok) {
    throw new Error("Failed to fetch church info section data");
  }

  return response.json();
}

export async function updateChurchInfoSection(data) {
  const response = await fetch("/api/services-events/church-info", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update church info section data");
  }

  return response.json();
}

// Weekly Programs Section
export async function fetchWeeklyProgramsSection() {
  const response = await fetch("/api/services-events/weekly-programs");

  if (!response.ok) {
    throw new Error("Failed to fetch weekly programs section data");
  }

  return response.json();
}

export async function updateWeeklyProgramsSection(data) {
  const response = await fetch("/api/services-events/weekly-programs", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update weekly programs section data");
  }

  return response.json();
}

// Monthly Programs Section
export async function fetchMonthlyProgramsSection() {
  const response = await fetch("/api/services-events/monthly-programs");

  if (!response.ok) {
    throw new Error("Failed to fetch monthly programs section data");
  }

  return response.json();
}

export async function updateMonthlyProgramsSection(data) {
  const response = await fetch("/api/services-events/monthly-programs", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update monthly programs section data");
  }

  return response.json();
}

// Upcoming Events Section
export async function fetchUpcomingEventsSection() {
  const response = await fetch("/api/services-events/upcoming-events");

  if (!response.ok) {
    throw new Error("Failed to fetch upcoming events section data");
  }

  return response.json();
}

export async function updateUpcomingEventsSection(data) {
  const response = await fetch("/api/services-events/upcoming-events", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update upcoming events section data");
  }

  return response.json();
}
