"use client";

import { useState } from "react";
import Link from "next/link";
import { sydneySuburbs } from "@/data/suburbs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [suburbsOpen, setSuburbsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Reviews", href: "/#reviews" },
    { name: "Blog", href: "/blog" },
    { name: "Our Work", href: "/our-work" },
  ];

  const serviceLinks = [
    { name: "General Clean", href: "/general-clean" },
    { name: "Deep Clean", href: "/deep-clean" },
    { name: "End of Lease Cleaning", href: "/end-of-lease-cleaning" },
  ];

  // Get all suburbs for dropdown
  const suburbs = Object.entries(sydneySuburbs)
    .map(([slug, data]) => ({
      slug,
      name: data.name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-md z-50 px-5">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Mobile Actions */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center">
              <img
                src="/sustainable-shine-logo.png"
                alt="Sustainable Shine Logo"
                className="w-32 md:w-[200px]"
              />
            </Link>

            {/* Phone Icon and Book Now - Mobile Only */}
            <div className="flex items-center space-x-2 md:hidden ms-5">
              <a
                href="tel:+61 452 422 059"
                className="hover:opacity-80 transition-opacity"
                aria-label="Call us"
              >
                <svg
                  className="w-7 h-7 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </a>
              <a
                href="/booking"
                className="px-3 mx-2 py-2 bg-emerald-500 text-white text-sm font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Book Now
              </a>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-emerald-500 font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                className="text-gray-700 hover:text-emerald-500 font-medium transition-colors duration-200 flex items-center space-x-1"
                onMouseEnter={() => setServicesOpen(true)}
              >
                <span>Services</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Services Dropdown Menu */}
              {servicesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      className="block px-4 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors duration-200"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Sydney Suburbs Dropdown */}
            <div className="relative group">
              <button
                className="text-gray-700 hover:text-emerald-500 font-medium transition-colors duration-200 flex items-center space-x-1"
                onMouseEnter={() => setSuburbsOpen(true)}
              >
                <span>Sydney Suburbs</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    suburbsOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {suburbsOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 max-h-96 overflow-y-auto z-50"
                  onMouseEnter={() => setSuburbsOpen(true)}
                  onMouseLeave={() => setSuburbsOpen(false)}
                >
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                    Service Areas
                  </div>
                  {suburbs.map((suburb) => (
                    <Link
                      key={suburb.slug}
                      href={`/${suburb.slug}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors duration-200"
                    >
                      {suburb.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a href="/booking" className="btn-primary">
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-3 text-gray-700 hover:text-emerald-500 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}

            {/* Services - Mobile */}
            <div className="py-3">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center justify-between w-full text-gray-700 hover:text-emerald-500 font-medium transition-colors"
              >
                <span>Services</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Mobile Services List */}
              {servicesOpen && (
                <div className="mt-2 pl-4 space-y-2 bg-gray-50 rounded-lg py-2">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      className="block py-2 text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                      onClick={() => {
                        setIsOpen(false);
                        setServicesOpen(false);
                      }}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Sydney Suburbs - Mobile */}
            <div className="py-3">
              <button
                onClick={() => setSuburbsOpen(!suburbsOpen)}
                className="flex items-center justify-between w-full text-gray-700 hover:text-emerald-500 font-medium transition-colors"
              >
                <span>Sydney Suburbs</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    suburbsOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Mobile Suburbs List */}
              {suburbsOpen && (
                <div className="mt-2 pl-4 space-y-2 max-h-64 overflow-y-auto bg-gray-50 rounded-lg py-2">
                  {suburbs.map((suburb) => (
                    <Link
                      key={suburb.slug}
                      href={`/${suburb.slug}`}
                      className="block py-2 text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                      onClick={() => {
                        setIsOpen(false);
                        setSuburbsOpen(false);
                      }}
                    >
                      {suburb.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a
              href="/booking"
              className="block mt-4 text-center btn-primary"
              onClick={() => setIsOpen(false)}
            >
              Book Now
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
