/**
 * Service functions for interacting with the get-involved API endpoints
 */

// Fetch all get-involved data
export async function fetchGetInvolvedData() {
  const response = await fetch("/api/get-involved");

  if (!response.ok) {
    throw new Error("Failed to fetch get-involved data");
  }

  return response.json();
}

// Update all get-involved data
export async function updateGetInvolvedData(data) {
  const response = await fetch("/api/get-involved", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update get-involved data");
  }

  return response.json();
}

// Hero Section
export async function fetchHeroSection() {
  const response = await fetch("/api/get-involved/hero");

  if (!response.ok) {
    throw new Error("Failed to fetch hero section data");
  }

  return response.json();
}

export async function updateHeroSection(data) {
  const response = await fetch("/api/get-involved/hero", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update hero section data");
  }

  return response.json();
}

// Donation Section
export async function fetchDonationSection() {
  const response = await fetch("/api/get-involved/donation");

  if (!response.ok) {
    throw new Error("Failed to fetch donation section data");
  }

  return response.json();
}

export async function updateDonationSection(data) {
  const response = await fetch("/api/get-involved/donation", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update donation section data");
  }

  return response.json();
}

// QA Section
export async function fetchQASection() {
  const response = await fetch("/api/get-involved/qa");

  if (!response.ok) {
    throw new Error("Failed to fetch QA section data");
  }

  return response.json();
}

export async function updateQASection(data) {
  const response = await fetch("/api/get-involved/qa", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update QA section data");
  }

  return response.json();
}

// Contact Section
export async function fetchContactSection() {
  const response = await fetch("/api/get-involved/contact");

  if (!response.ok) {
    throw new Error("Failed to fetch contact section data");
  }

  return response.json();
}

export async function updateContactSection(data) {
  const response = await fetch("/api/get-involved/contact", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update contact section data");
  }

  return response.json();
}
