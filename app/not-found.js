"use client";

import Link from "next/link";
import { useState } from "react";
import { getAllSuburbs } from "@/data/suburbs";

export default function NotFound() {
  const [searchTerm, setSearchTerm] = useState("");
  const allSuburbs = getAllSuburbs();

  // Popular cities to display prominently
  const popularCities = [
    "sydney-cbd",
    "bondi",
    "chatswood",
    "parramatta",
    "manly",
    "newtown",
    "north-sydney",
    "cronulla",
  ];

  // Filter suburbs based on search
  const filteredSuburbs = allSuburbs
    .filter((suburb) =>
      suburb.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 12); // Show max 12 results

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-4xl w-full">
        {/* 404 Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-100 rounded-full mb-6">
            <svg
              className="w-12 h-12 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The page you're looking for doesn't exist. But don't worry, we have
            professional cleaning services available across Sydney!
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Find Your Suburb
          </h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for your suburb..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 pl-12 text-lg border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Search Results */}
          {searchTerm && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredSuburbs.length > 0 ? (
                filteredSuburbs.map((suburb) => (
                  <Link
                    key={suburb.slug}
                    href={`/${suburb.slug}`}
                    className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-emerald-50 rounded-lg transition-all group border border-gray-200 hover:border-emerald-300"
                  >
                    <div className="flex items-center space-x-3">
                      <svg
                        className="w-5 h-5 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-900 group-hover:text-emerald-600">
                          {suburb.name}
                        </p>
                        <p className="text-xs text-gray-500">{suburb.postcode}</p>
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-8 text-gray-500">
                  <p>No suburbs found matching "{searchTerm}"</p>
                  <p className="text-sm mt-2">Try searching for a different area</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Popular Cities */}
        {!searchTerm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              🌟 Popular Areas We Serve
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {popularCities.map((citySlug) => {
                const suburb = allSuburbs.find((s) => s.slug === citySlug);
                return suburb ? (
                  <Link
                    key={citySlug}
                    href={`/${citySlug}`}
                    className="flex flex-col items-center p-4 bg-gradient-to-br from-emerald-50 to-blue-50 hover:from-emerald-100 hover:to-blue-100 rounded-xl transition-all group border-2 border-transparent hover:border-emerald-300 shadow-sm hover:shadow-md"
                  >
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                      <svg
                        className="w-6 h-6 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <p className="font-semibold text-gray-900 text-center group-hover:text-emerald-600 transition-colors">
                      {suburb.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{suburb.postcode}</p>
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* All Suburbs (Collapsed by default) */}
        {!searchTerm && (
          <details className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <summary className="text-xl font-semibold text-gray-900 cursor-pointer hover:text-emerald-600 transition-colors flex items-center justify-between">
              <span>📍 View All Sydney Suburbs</span>
              <svg
                className="w-6 h-6 text-gray-400"
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
            </summary>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
              {allSuburbs.map((suburb) => (
                <Link
                  key={suburb.slug}
                  href={`/${suburb.slug}`}
                  className="px-4 py-2 bg-gray-50 hover:bg-emerald-50 rounded-lg transition-all text-sm group border border-gray-200 hover:border-emerald-300"
                >
                  <p className="font-medium text-gray-900 group-hover:text-emerald-600">
                    {suburb.name}
                  </p>
                  <p className="text-xs text-gray-500">{suburb.postcode}</p>
                </Link>
              ))}
            </div>
          </details>
        )}

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 border-2 border-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Read Our Blog
          </Link>
        </div>

        {/* Info Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            We provide professional cleaning services across Sydney, including:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 shadow-sm border border-gray-200">
              ✨ House Cleaning
            </span>
            <span className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 shadow-sm border border-gray-200">
              🧹 Deep Cleaning
            </span>
            <span className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 shadow-sm border border-gray-200">
              🏠 End of Lease
            </span>
            <span className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 shadow-sm border border-gray-200">
              🌿 Eco-Friendly
            </span>
            <span className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 shadow-sm border border-gray-200">
              💼 Office Cleaning
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
