"use client";

import { useState } from "react";
import Link from "next/link";
import { sydneySuburbs } from "@/data/suburbs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [suburbsOpen, setSuburbsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "About", href: "/#about" },
    { name: "Reviews", href: "/#reviews" },
    { name: "Contact", href: "/#booking" },
  ];

  // Get all suburbs for dropdown
  const suburbs = Object.entries(sydneySuburbs).map(([slug, data]) => ({
    slug,
    name: data.name,
  }));

  return (
    <nav className="fixed w-full bg-white/95 backdrop-blur-sm shadow-md z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/sustainable logo.png"
              alt="Sustainable Shine Logo"
              width={200}
            />
          </Link>

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
