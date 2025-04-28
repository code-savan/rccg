"use client";

import React, { useState } from "react";
import Link from "next/link";
import HeroSectionEdit from "./components/HeroSectionEdit";
import AboutTextEdit from "./components/AboutTextEdit";
import HistoryEdit from "./components/HistoryEdit";
import MinistersEdit from "./components/MinistersEdit";
import ChurchMinistersEdit from "./components/ChurchMinistersEdit";
import DepartmentHeadsEdit from "./components/DepartmentHeadsEdit";
import DepartmentsEdit from "./components/DepartmentsEdit";
import NextGenMinistryEdit from "./components/NextGenMinistryEdit";
import NextGenMinistersEdit from "./components/NextGenMinistersEdit";
import WorshipWithUsEdit from "./components/WorshipWithUsEdit";

export default function AdminAboutUsPage() {
  const [activeSection, setActiveSection] = useState("hero-section");

  return (
    <div>
<div>
<div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-[18px] font-semibold text-gray-900">
              About Us Page
            </h1>
            <p className="text-gray-600 mt-2 text-[14px]">
              Manage church information, ministers, and department details
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
              href="/about-us"
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
        <nav className="flex space-x-4 overflow-x-auto py-2">
          <button
            onClick={() => setActiveSection("hero-section")}
            className={`py-3 px-2 border-b-2 whitespace-nowrap text-xs sm:text-sm ${
              activeSection === "hero-section"
                ? "border-blue-500 text-blue-500 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Hero Section
          </button>
          <button
            onClick={() => setActiveSection("about-text")}
            className={`py-3 px-2 border-b-2 whitespace-nowrap text-xs sm:text-sm ${
              activeSection === "about-text"
                ? "border-blue-500 text-blue-500 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            About Text
          </button>
          <button
            onClick={() => setActiveSection("history")}
            className={`py-3 px-2 border-b-2 whitespace-nowrap text-xs sm:text-sm ${
              activeSection === "history"
                ? "border-blue-500 text-blue-500 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            History
          </button>
          <button
            onClick={() => setActiveSection("ministers")}
            className={`py-3 px-2 border-b-2 whitespace-nowrap text-xs sm:text-sm ${
              activeSection === "ministers"
                ? "border-blue-500 text-blue-500 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Ministers
          </button>
          <button
            onClick={() => setActiveSection("church-ministers")}
            className={`py-3 px-2 border-b-2 whitespace-nowrap text-xs sm:text-sm ${
              activeSection === "church-ministers"
                ? "border-blue-500 text-blue-500 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Church Ministers
          </button>
          <button
            onClick={() => setActiveSection("department-heads")}
            className={`py-3 px-2 border-b-2 whitespace-nowrap text-xs sm:text-sm ${
              activeSection === "department-heads"
                ? "border-blue-500 text-blue-500 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Department Heads
          </button>
          <button
            onClick={() => setActiveSection("departments")}
            className={`py-3 px-2 border-b-2 whitespace-nowrap text-xs sm:text-sm ${
              activeSection === "departments"
                ? "border-blue-500 text-blue-500 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Departments
          </button>
          <button
            onClick={() => setActiveSection("nextgen-ministry")}
            className={`py-3 px-2 border-b-2 whitespace-nowrap text-xs sm:text-sm ${
              activeSection === "nextgen-ministry"
                ? "border-blue-500 text-blue-500 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            NextGen Ministry
          </button>
          <button
            onClick={() => setActiveSection("nextgen-ministers")}
            className={`py-3 px-2 border-b-2 whitespace-nowrap text-xs sm:text-sm ${
              activeSection === "nextgen-ministers"
                ? "border-blue-500 text-blue-500 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            NextGen Ministers
          </button>
          <button
            onClick={() => setActiveSection("worship-with-us")}
            className={`py-3 px-2 border-b-2 whitespace-nowrap text-xs sm:text-sm ${
              activeSection === "worship-with-us"
                ? "border-blue-500 text-blue-500 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Worship With Us
          </button>
        </nav>
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">


        {/* Section Content */}
        <div className="space-y-8">
          {activeSection === "hero-section" && <HeroSectionEdit />}
          {activeSection === "about-text" && <AboutTextEdit />}
          {activeSection === "history" && <HistoryEdit />}
          {activeSection === "ministers" && <MinistersEdit />}
          {activeSection === "church-ministers" && <ChurchMinistersEdit />}
          {activeSection === "department-heads" && <DepartmentHeadsEdit />}
          {activeSection === "departments" && <DepartmentsEdit />}
          {activeSection === "nextgen-ministry" && <NextGenMinistryEdit />}
          {activeSection === "nextgen-ministers" && <NextGenMinistersEdit />}
          {activeSection === "worship-with-us" && <WorshipWithUsEdit />}
        </div>
      </div>
    </div>
  );
}
