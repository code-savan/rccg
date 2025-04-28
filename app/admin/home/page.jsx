"use client";

import React, { useState } from "react";
import Link from "next/link";
import WelcomeHeroEdit from "./components/WelcomeHeroEdit";
import AboutSectionEdit from "./components/AboutSectionEdit";
import MinistersSectionEdit from "./components/MinistersSectionEdit";
import EventsSectionEdit from "./components/EventsSectionEdit";
import ServiceTimesEdit from "./components/ServiceTimesEdit";
import HighlightsSectionEdit from "./components/HighlightsSectionEdit";
import WorshipWithUsEdit from "./components/WorshipWithUsEdit";
import AboutEdit from "./components/AboutEdit";

export default function AdminHomePage() {
  const [activeSection, setActiveSection] = useState("welcome-section");

  return (
    <div>
<div>
<div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-[18px] font-semibold text-gray-900">
              Home Page
            </h1>
            <p className="text-gray-600 mt-2 text-[14px]">
              Manage home page content
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-50"
            >
              Back to Dashboard
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium inline-flex items-center border border-gray-200 text-gray-700 rounded hover:bg-gray-50"
            >
              <span>View Live Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-4 w-4 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
</div>

      {/* Page Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <nav className="flex space-x-4 overflow-x-auto px-4 py-2">
          <button
            onClick={() => setActiveSection("welcome-section")}
            className={`py-3 px-2 border-b-2 whitespace-nowrap text-xs sm:text-sm ${
              activeSection === "welcome-section"
                ? "border-blue-500 text-blue-500 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Welcome
          </button>
          <button
            onClick={() => setActiveSection("about-section")}
            className={`py-3 px-2 border-b-2 whitespace-nowrap text-xs sm:text-sm ${
              activeSection === "about-section"
                ? "border-blue-500 text-blue-500 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            About
          </button>
          <button
            onClick={() => setActiveSection("ministers-section")}
            className={`py-3 px-2 border-b-2 whitespace-nowrap text-xs sm:text-sm ${
              activeSection === "ministers-section"
                ? "border-blue-500 text-blue-500 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Ministers
          </button>
          <button
            onClick={() => setActiveSection("events-section")}
            className={`py-3 px-2 border-b-2 whitespace-nowrap text-xs sm:text-sm ${
              activeSection === "events-section"
                ? "border-blue-500 text-blue-500 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveSection("services-section")}
            className={`py-3 px-2 border-b-2 whitespace-nowrap text-xs sm:text-sm ${
              activeSection === "services-section"
                ? "border-blue-500 text-blue-500 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Services
          </button>
          <button
            onClick={() => setActiveSection("highlights-section")}
            className={`py-3 px-2 border-b-2 whitespace-nowrap text-xs sm:text-sm ${
              activeSection === "highlights-section"
                ? "border-blue-500 text-blue-500 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Highlights
          </button>
          <button
            onClick={() => setActiveSection("worship-section")}
            className={`py-3 px-2 border-b-2 whitespace-nowrap text-xs sm:text-sm ${
              activeSection === "worship-section"
                ? "border-blue-500 text-blue-500 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Worship
          </button>
        </nav>
      </div>

      {/* Content Sections */}
      <div>
        {activeSection === "welcome-section" && <WelcomeHeroEdit />}
        {activeSection === "about-section" && <AboutSectionEdit />}
        {activeSection === "ministers-section" && <MinistersSectionEdit />}
        {activeSection === "events-section" && <EventsSectionEdit />}
        {activeSection === "services-section" && <ServiceTimesEdit />}
        {activeSection === "highlights-section" && <HighlightsSectionEdit />}
        {activeSection === "worship-section" && <WorshipWithUsEdit />}
      </div>
    </div>
  );
}
