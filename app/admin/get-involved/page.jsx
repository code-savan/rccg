"use client";

import React, { useState } from "react";
import Link from "next/link";
import HeroSectionEdit from "./components/HeroSectionEdit";
import DonationSectionEdit from "./components/DonationSectionEdit";
import QASectionEdit from "./components/QASectionEdit";
import ContactSectionEdit from "./components/ContactSectionEdit";
import Image from "next/image";

export default function AdminGetInvolvedPage() {
  const [activeSection, setActiveSection] = useState("hero");

  const renderSection = () => {
    switch (activeSection) {
      case "hero":
        return <HeroSectionEdit />;
      case "giving":
        return <DonationSectionEdit />;
      case "qa":
        return <QASectionEdit />;
      case "contact":
        return <ContactSectionEdit />;
      default:
        return <HeroSectionEdit />;
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-[18px] font-semibold text-gray-900">
            Get Involved Page
          </h1>
          <p className="text-gray-600 mt-1 text-[14px]">
            Manage giving information and Q&A
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
            href="/get-involved"
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
            onClick={() => setActiveSection("hero")}
            className={`py-3 px-4 border-b-2 text-xs font-medium ${
              activeSection === "hero"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Hero Section
          </button>
          <button
            onClick={() => setActiveSection("giving")}
            className={`py-3 px-4 border-b-2 text-xs font-medium ${
              activeSection === "giving"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Giving & Donations
          </button>
          <button
            onClick={() => setActiveSection("qa")}
            className={`py-3 px-4 border-b-2 text-xs font-medium ${
              activeSection === "qa"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Q&A and Polls
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
