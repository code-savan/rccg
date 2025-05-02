/**
 * Service functions for interacting with the about-us API endpoints
 */

// Fetch all about-us data
export async function fetchAboutUsData() {
  const response = await fetch("/api/about-us");

  if (!response.ok) {
    throw new Error("Failed to fetch about-us data");
  }

  return response.json();
}

// Update all about-us data
export async function updateAboutUsData(data) {
  const response = await fetch("/api/about-us", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update about-us data");
  }

  return response.json();
}

// Hero Section
export async function fetchHeroSection() {
  const response = await fetch("/api/about-us/hero");

  if (!response.ok) {
    throw new Error("Failed to fetch hero section data");
  }

  return response.json();
}

export async function updateHeroSection(data) {
  const response = await fetch("/api/about-us/hero", {
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

// About Text Section
export async function fetchAboutTextSection() {
  const response = await fetch("/api/about-us/about-text");

  if (!response.ok) {
    throw new Error("Failed to fetch about text section data");
  }

  return response.json();
}

export async function updateAboutTextSection(data) {
  const response = await fetch("/api/about-us/about-text", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update about text section data");
  }

  return response.json();
}

// History Section
export async function fetchHistorySection() {
  const response = await fetch("/api/about-us/history");

  if (!response.ok) {
    throw new Error("Failed to fetch history section data");
  }

  return response.json();
}

export async function updateHistorySection(data) {
  const response = await fetch("/api/about-us/history", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update history section data");
  }

  return response.json();
}

// Ministers Section
export async function fetchMinistersSection() {
  const response = await fetch("/api/about-us/ministers");

  if (!response.ok) {
    throw new Error("Failed to fetch ministers section data");
  }

  return response.json();
}

export async function updateMinistersSection(data) {
  const response = await fetch("/api/about-us/ministers", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update ministers section data");
  }

  return response.json();
}

// Church Ministers Section
export async function fetchChurchMinistersSection() {
  const response = await fetch("/api/about-us/church-ministers");

  if (!response.ok) {
    throw new Error("Failed to fetch church ministers section data");
  }

  return response.json();
}

export async function updateChurchMinistersSection(data) {
  const response = await fetch("/api/about-us/church-ministers", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update church ministers section data");
  }

  return response.json();
}

// Department Heads Section
export async function fetchDepartmentHeadsSection() {
  const response = await fetch("/api/about-us/department-heads");

  if (!response.ok) {
    throw new Error("Failed to fetch department heads section data");
  }

  return response.json();
}

export async function updateDepartmentHeadsSection(data) {
  const response = await fetch("/api/about-us/department-heads", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update department heads section data");
  }

  return response.json();
}

// Departments Section
export async function fetchDepartmentsSection() {
  const response = await fetch("/api/about-us/departments");

  if (!response.ok) {
    throw new Error("Failed to fetch departments section data");
  }

  return response.json();
}

export async function updateDepartmentsSection(data) {
  const response = await fetch("/api/about-us/departments", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update departments section data");
  }

  return response.json();
}

// NextGen Ministry Section
export async function fetchNextGenMinistrySection() {
  const response = await fetch("/api/about-us/nextgen-ministry");

  if (!response.ok) {
    throw new Error("Failed to fetch nextgen ministry section data");
  }

  return response.json();
}

export async function updateNextGenMinistrySection(data) {
  const response = await fetch("/api/about-us/nextgen-ministry", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update nextgen ministry section data");
  }

  return response.json();
}

// NextGen Ministers Section
export async function fetchNextGenMinistersSection() {
  const response = await fetch("/api/about-us/nextgen-ministers");

  if (!response.ok) {
    throw new Error("Failed to fetch nextgen ministers section data");
  }

  return response.json();
}

export async function updateNextGenMinistersSection(data) {
  const response = await fetch("/api/about-us/nextgen-ministers", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update nextgen ministers section data");
  }

  return response.json();
}

// Worship With Us Section
export async function fetchWorshipWithUsSection() {
  const response = await fetch("/api/about-us/worship-with-us");

  if (!response.ok) {
    throw new Error("Failed to fetch worship with us section data");
  }

  return response.json();
}

export async function updateWorshipWithUsSection(data) {
  const response = await fetch("/api/about-us/worship-with-us", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update worship with us section data");
  }

  return response.json();
}
