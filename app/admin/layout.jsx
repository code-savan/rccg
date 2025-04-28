"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [tipIndex, setTipIndex] = useState(0);
  const [fadeState, setFadeState] = useState("fade-in");

  const adminTips = [
    "Some components appear on multiple pages. Updates to one will reflect everywhere.",
    "Each page is organized into sections. Use the tabs to navigate between them.",
    "Changes are automatically saved when you submit an edit.",
    "Preview your changes anytime using the 'View Live Page' button.",
  ];

  // Cycle through tips with fade animation
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFadeState("fade-out");

      setTimeout(() => {
        setTipIndex((prevIndex) => (prevIndex + 1) % adminTips.length);
        setFadeState("fade-in");
      }, 500); // Wait for fade out before changing tip
    }, 5000); // Change tip every 5 seconds

    return () => clearInterval(intervalId);
  }, [adminTips.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Admin Tips Notice */}
      <div className="bg-black text-center py-2">
        <div className=" mx-auto px-4">
          <div
            className={`transition-opacity duration-500 ${
              fadeState === "fade-in" ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-white text-[12px]">{adminTips[tipIndex]}</p>
          </div>
        </div>
      </div>

      {/* Top Navigation Bar */}
      <header className="border-b border-gray-200">
        <div className=" mx-auto px-16 md:px-24 lg:px-32 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin">
              <div className="text-gray-700">
                <svg viewBox="0 0 28 28" className="w-8 h-8">
                  <path
                    fill="currentColor"
                    d="M10,10 C10,8.8954305 10.8954305,8 12,8 L16,8 C17.1045695,8 18,8.8954305 18,10 L18,18 C18,19.1045695 17.1045695,20 16,20 L12,20 C10.8954305,20 10,19.1045695 10,18 L10,10 Z M5,2 C3.8954305,2 3,2.8954305 3,4 L3,24 C3,25.1045695 3.8954305,26 5,26 L23,26 C24.1045695,26 25,25.1045695 25,24 L25,4 C25,2.8954305 24.1045695,2 23,2 L5,2 Z"
                  />
                </svg>
              </div>
            </Link>

            <Link href="/admin" className="font-semibold text-sm">
              RCCG ADMIN
            </Link>
          </div>

          <div>
            <button className="px-4 py-2 bg-black text-white hover:bg-black/80 hover:text-white/80 transition-colors flex items-center">
              <span className="mr-1">Logout</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline-block ml-1"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className=" mx-auto px-16 md:px-24 lg:px-32 py-8">{children}</main>
    </div>
  );
}
