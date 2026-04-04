"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Lightbox Modal Component
function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
        />
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white text-gray-900 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors font-bold text-lg"
          aria-label="Close"
        >
          ✕
        </button>
        <div className="absolute bottom-0 left-0 right-0 text-center pb-3">
          <span className="text-white/80 text-sm bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
            {alt}
          </span>
        </div>
      </div>
    </div>
  );
}

// Individual Before/After Comparison Component
function BeforeAfterComparison({ before, after, title, location, index, onImageClick }) {
  return (
    <div className="relative group">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
        {/* Images Container */}
        <div className="grid grid-cols-2 gap-2 bg-gray-100 p-3">
          {/* Before Image */}
          <div className="relative overflow-hidden rounded-xl bg-gray-200">
            <div className="relative w-full h-[300px]">
              <img
                src={before}
                alt={`${title} - Before cleaning`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 cursor-zoom-in"
                onClick={() => onImageClick(before, `${title} - Before cleaning`)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

              {/* Before Label */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wide shadow-lg inline-flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Before
                </span>
              </div>

              {/* Expand hint */}
              <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-black/50 text-white p-1.5 rounded-lg backdrop-blur-sm flex items-center gap-1 text-xs">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  Expand
                </span>
              </div>
            </div>
          </div>

          {/* After Image */}
          <div className="relative overflow-hidden rounded-xl bg-gray-200">
            <div className="relative w-full h-[300px]">
              <img
                src={after}
                alt={`${title} - After cleaning`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 cursor-zoom-in"
                onClick={() => onImageClick(after, `${title} - After cleaning`)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

              {/* After Label */}
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-emerald-500 text-white px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wide shadow-lg inline-flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  After
                </span>
              </div>

              {/* Expand hint */}
              <div className="absolute bottom-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-black/50 text-white p-1.5 rounded-lg backdrop-blur-sm flex items-center gap-1 text-xs">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  Expand
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="p-6 bg-gradient-to-r from-gray-50 to-white">
          <h3 className="font-bold text-xl text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 flex items-center text-base">
            <svg
              className="w-4 h-4 mr-1.5 text-emerald-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {location}
          </p>
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 ring-4 ring-emerald-500 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}

export default function OurWorkPage() {
  const [lightbox, setLightbox] = useState(null);
  const allProjects = [
    {
      title: "Bathroom Deep Clean",
      location: "Sydney CBD",
      before: "/before-5.jpg",
      after: "/after-5.jpg",
    },

    {
      title: "Oven Tray Transformation",
      location: "North Shore",
      before: "/before-6.jpg",
      after: "/after-6.jpg",
    },

    {
      title: "Rangehood Cleaning",
      location: "Inner West",
      before: "/before-7.jpg",
      after: "/after-7.jpg",
    },
    {
      title: "Bathroom Sink Transformation",
      location: "North Shore",
      before: "/before-1.png",
      after: "/after-1.png",
    },
    {
      title: "Kitchen Cupboard Cleaning",
      location: "Eastern Suburbs",
      before: "/before-8.jpg",
      after: "/after-8.jpg",
    },
    {
      title: "Window Cleaning",
      location: "Sydney CBD",
      before: "/before.png",
      after: "/after.png",
    },

    {
      title: "Balcony Cleaning",
      location: "Inner West",
      before: "/before-4.png",
      after: "/after-4.jpeg",
    },
    {
      title: "Bathroom Sink Cleaning",
      location: "Eastern Suburbs",
      before: "/before-2.png",
      after: "/after-2.png",
    },
  ];

  return (
    <main className="min-h-screen">
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Link
              href="/"
              className="inline-flex items-center text-emerald-500 font-semibold text-sm uppercase tracking-wide mb-4 hover:text-emerald-600 transition-colors"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-4 mb-6">
              Our Transformations
            </h1>
            <p className="text-xl text-gray-600">
              Discover the amazing results we've achieved for our clients. Every
              project showcases our commitment to excellence and attention to
              detail.
            </p>
          </div>

          {/* Before/After Comparison Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {allProjects.map((project, index) => (
                <BeforeAfterComparison
                  key={index}
                  before={project.before}
                  after={project.after}
                  title={project.title}
                  location={project.location}
                  index={index}
                  onImageClick={(src, alt) => setLightbox({ src, alt })}
                />
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready for Your Own Transformation?
              </h3>
              <p className="text-gray-600 mb-8">
                Let us bring the same level of excellence to your space.
              </p>
              <Link
                href="/booking"
                className="inline-block bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Your Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
