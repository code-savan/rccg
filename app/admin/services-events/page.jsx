"use client";

import React, { useState } from "react";
import Link from "next/link";
import WelcomeSectionEdit from "./components/WelcomeSectionEdit";
import ChurchInfoEdit from "./components/ChurchInfoEdit";
import WeeklyProgramsEdit from "./components/WeeklyProgramsEdit";
import MonthlyProgramsEdit from "./components/MonthlyProgramsEdit";
import UpcomingEventsEdit from "./components/UpcomingEventsEdit";
import Image from "next/image";

export default function AdminServicesEventsPage() {
  const [activeSection, setActiveSection] = useState("welcome");

  const renderSection = () => {
    switch (activeSection) {
      case "welcome":
        return <WelcomeSectionEdit />;
      case "churchInfo":
        return <ChurchInfoEdit />;
      case "weeklyPrograms":
        return <WeeklyProgramsEdit />;
      case "monthlyPrograms":
        return <MonthlyProgramsEdit />;
      case "upcomingEvents":
        return <UpcomingEventsEdit />;
      default:
        return (
          <div className="p-8 flex flex-col items-center justify-center text-center">
            <div className="mb-6 w-24 h-24">
              <Image
                src="/images/img_construction_crane.svg"
                alt="Construction"
                width={96}
                height={96}
              />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              Section Under Construction
            </h3>
            <p className="text-gray-600 max-w-md">
              This section is currently being developed. Please check back later
              or choose another section to edit.
            </p>
          </div>
        );
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-[18px] font-semibold text-gray-900">
            Services & Events Page
          </h1>
          <p className="text-gray-600 mt-1 text-[14px]">
            Manage service times, events, and schedules
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50"
          >
            Back to Dashboard
          </Link>
          <a
            href="/services-events"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-medium inline-flex items-center border border-gray-200 text-gray-700 rounded-md hover:bg-gray-50"
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

      {/* Section Navigation */}
      <div className="mb-8 border-b border-gray-200">
        <nav className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveSection("welcome")}
            className={`py-3 px-4 border-b-2 text-xs font-medium ${
              activeSection === "welcome"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Welcome Section
          </button>
          <button
            onClick={() => setActiveSection("churchInfo")}
            className={`py-3 px-4 border-b-2 text-xs font-medium ${
              activeSection === "churchInfo"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Church Information
          </button>
          <button
            onClick={() => setActiveSection("weeklyPrograms")}
            className={`py-3 px-4 border-b-2 text-xs font-medium ${
              activeSection === "weeklyPrograms"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Weekly Programs
          </button>
          <button
            onClick={() => setActiveSection("monthlyPrograms")}
            className={`py-3 px-4 border-b-2 text-xs font-medium ${
              activeSection === "monthlyPrograms"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Monthly Programs
          </button>
          <button
            onClick={() => setActiveSection("upcomingEvents")}
            className={`py-3 px-4 border-b-2 text-xs font-medium ${
              activeSection === "upcomingEvents"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Upcoming Events
          </button>
        </nav>
      </div>

      {/* Section Content */}
      <div className="bg-white border border-gray-200 rounded-lg">
        {renderSection()}
      </div>
    </div>
  );
}
