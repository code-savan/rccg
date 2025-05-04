"use client";

import { Text, Img } from ".";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header({ ...props }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/services-events", label: "Services & Events" },
    { href: "/get-involved", label: "Get Involved" },
  ];

  return (
    <header
      {...props}
      className={`${props.className} flex justify-center items-center py-[22px] sm:py-5 relative`}
    >
      <div className=" w-full flex items-center justify-between gap-5 lg:px-24 md:px-24 sm:px-5">
        <div className="flex items-center justify-start space-x-2">
          <Img
            src="/images/logo.svg"
            width={48}
            height={48}
            alt="Headerlogo"
            className="h-[48px] sm:h-[32px] object-contain"
          />
          <Img
            src={
              pathname === "/"
                ? "/images/img_header_logo.png"
                : "/images/img_header_logo_dark.svg"
            }
            width={220}
            height={48}
            alt="Headerlogo"
            className="object-contain h-[48px] sm:h-[32px] sm:w-[100px]"
          />
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="hidden md:flex flex-col gap-1.5 z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span
            className={`w-7 h-0.5 bg-black transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-7 h-0.5 bg-black transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-7 h-0.5 bg-black transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {/* Desktop Navigation */}
        <ul className="flex gap-12 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <span
                  className={`text-[20px] font-normal ${
                    pathname === link.href
                      ? "text-blue-900"
                      : pathname === "/"
                      ? "text-white"
                      : "text-black"
                  } hover:text-blue-900`}
                >
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        <div
          className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:block hidden`}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <ul className="flex flex-col items-center gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={() => setIsMenuOpen(false)}>
                    <p
                      className={`text-[24px] font-normal ${
                        pathname === link.href ? "text-blue-900" : "text-black"
                      } hover:text-blue-900`}
                    >
                      {link.label}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
