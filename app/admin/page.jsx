"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const liveLinks = {
  home: "https://www.rccgrogparish.com/",
  about: "https://www.rccgrogparish.com/about-us",
  services: "https://www.rccgrogparish.com/services-events",
  involved: "https://www.rccgrogparish.com/get-involved",
};

export default function AdminDashboard() {
  // Pages data
  const pages = [
    {
      id: 1,
      title: "Home Page",
      description: "Manage content on the main landing page",
      type: "PAGE",
      thumbnail: "/admin-images/home.png",
      link: "/admin/home",
      pagePath: "/",
      live: liveLinks.home,
    },
    {
      id: 2,
      title: "About Us",
      description:
        "Manage church history, ministers, and department information",
      type: "PAGE",
      thumbnail: "/admin-images/about.png",
      link: "/admin/about-us",
      pagePath: "/about-us",
      live: liveLinks.about,
    },
    {
      id: 3,
      title: "Services & Events",
      description: "Manage service times, events, and schedules",
      type: "PAGE",
      thumbnail: "/admin-images/services.png",
      link: "/admin/services-events",
      pagePath: "/services-events",
      live: liveLinks.services,
    },
    {
      id: 4,
      title: "Get Involved",
      description: "Manage giving information and volunteer opportunities",
      type: "PAGE",
      thumbnail: "/admin-images/involved.png",
      link: "/admin/get-involved",
      pagePath: "/get-involved",
      live: liveLinks.involved,
    },
  ];

  return (
    <div className=" mx-auto ">
      {/* Dashboard Header */}
      <div className="mb-12">
        <h1 className="text-2xl font-medium text-gray-900">My Dashboard</h1>
      </div>

      {/* Dashboard Search and View Controls */}
      <div className="flex justify-between mb-8">
        <div className="flex gap-2">
          <button className="w-10 h-10 border border-gray-200 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
          <button className="w-10 h-10 border bg-gray-100 border-gray-200 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div className="relative w-64 flex items-center">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            className="pl-10 pr-3 py-2 w-full bg-gray-100 text-sm text-gray-600 placeholder:text-gray-600 placeholder:font-medium placeholder:text-[13px]"
            placeholder="Search"
          />
        </div>
      </div>

      {/* Pages List */}
      <div className="space-y-8">
        {pages.map((page) => (
          <Link href={page.link} key={page.id}>
            <div className="border border-gray-200 overflow-hidden cursor-pointer group">
              <div className="flex">
                {/* Thumbnail */}
                <div
                  className="w-2/6 relative bg-black"
                  //   style={{ height: "220px" }}
                >
                  {page.thumbnail && (
                    <div className="relative h-full">
                      <Image
                        src={page.thumbnail}
                        alt={page.title}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="w-4/6 p-8  flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-medium text-gray-900">
                        {page.title}
                      </h2>
                      <p className="text-gray-600 mt-2 text-base">
                        {page.description}
                      </p>
                      <div className="mt-2 text-xs text-blue-700 font-semibold">
                        Admin Route:{" "}
                        <span className="font-mono">{page.link}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Website Page:{" "}
                        <span className="font-mono">{page.pagePath}</span>
                      </div>

                      <div className="mt-auto pt-4 flex flex-col gap-2">
                        {/* <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium">
                      {page.type}
                    </div> */}
                        <a
                          href={page.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block px-4 py-4 bg-white border border-slate-300 text-slate-700 text-xs font-medium transition-colors w-fit"
                        >
                          Visit Website Page
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center">
                      {/* Arrow top right icon */}
                      <a
                        href={page.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-700 p-1"
                        title="Go to live page"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 17L17 7M7 7h10v10"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
