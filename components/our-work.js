"use client";

import { useState, useEffect, useRef } from "react";

// Individual Before/After Slider Component
function BeforeAfterSlider({
  before,
  after,
  title,
  location,
  index,
  isVisible,
  cityName,
}) {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Start animation when component becomes visible
  useEffect(() => {
    if (isVisible && !animationComplete && !isDragging) {
      setIsAutoPlaying(true);
    }
  }, [isVisible, animationComplete, isDragging]);

  // Continuous auto-slide effect - loops forever
  useEffect(() => {
    if (!isAutoPlaying || isDragging) return;

    let position = 0;
    let direction = 1; // 1 for forward, -1 for backward

    const interval = setInterval(() => {
      position += direction * 1.2;

      // Reverse direction at boundaries
      if (position >= 100) {
        position = 100;
        direction = -1;
      } else if (position <= 0) {
        position = 0;
        direction = 1;
      }

      setSliderPosition(position);
    }, 30);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isDragging, index]);

  const handleMove = (e) => {
    if (!isDragging && e.type !== "click") return;

    setIsAutoPlaying(false);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setIsAutoPlaying(false);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative group">
      <div
        className="relative h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-2xl cursor-ew-resize select-none"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
        onClick={handleMove}
      >
        {/* Before Image (Background) */}
        <div className="absolute inset-0">
          <img
            src={before}
            alt={`${title} - Before cleaning`}
            className="w-full h-full object-cover"
            draggable="false"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute top-4 left-4 z-10 transition-opacity duration-300">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg text-sm">
              ❌ BEFORE
            </span>
          </div>
        </div>

        {/* After Image (Overlay with clip) */}
        <div
          className="absolute inset-0 transition-all duration-100"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          <img
            src={after}
            alt={`${title} - After cleaning`}
            className="w-full h-full object-cover"
            draggable="false"
          />
          <div className="absolute top-4 right-4">
            <span className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg text-sm">
              ✨ AFTER
            </span>
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Center Circle Handle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-emerald-500 transition-opacity duration-300">
            <div className="flex space-x-1">
              <svg
                className="w-4 h-4 text-emerald-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="w-4 h-4 text-emerald-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Project Info Overlay */}
        <div className="absolute bottom-6 left-6 right-6 z-10">
          <h3 className="text-white font-bold text-2xl mb-2 drop-shadow-lg">
            {title}
          </h3>
          <p className="text-white/90 text-base flex items-center drop-shadow-lg">
            <svg
              className="w-4 h-4 mr-2"
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
      </div>
    </div>
  );
}

export default function OurWork({ city }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const cityName = city?.name || "Sydney";

  // Intersection Observer to detect when section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  const projects = [
    {
      title: "Window Cleaning",
      location: "Sydney CBD",
      before: "/before.png",
      after: "/after.png",
    },
    {
      title: "Bathroom Cleaning",
      location: "North Shore",
      before: "/before-1.png",
      after: "/after-1.png",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wide">
            Our Work
          </span>
          <h2 className="heading-2 text-gray-900 mt-4 mb-6">
            See The Transformation
          </h2>
          <p className="text-xl text-gray-600">
            Real results from real clients. Witness how we transform dirty,
            neglected spaces into spotless, sanitized environments.
          </p>
        </div>

        {/* All Images with Interactive Sliders - Centered and Large */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <BeforeAfterSlider
                key={index}
                before={project.before}
                after={project.after}
                title={project.title}
                location={project.location}
                index={index}
                isVisible={isVisible}
                cityName={cityName}
              />
            ))}
          </div>

          {/* Instructions */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
              <span className="font-medium">
                Hover and drag any slider to control the view
              </span>
            </p>
          </div>
        </div>

        {/* Why Choose Us Features */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Our Clients Love Us
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="font-bold text-xl text-gray-900 mb-2">
                Thorough & Detailed
              </h4>
              <p className="text-gray-600">
                We don't cut corners. Every surface is cleaned, sanitized, and
                inspected.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="font-bold text-xl text-gray-900 mb-2">
                Eco-Friendly Products
              </h4>
              <p className="text-gray-600">
                Safe for your family, pets, and the environment. No harsh
                chemicals.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-emerald-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="font-bold text-xl text-gray-900 mb-2">
                Reliable & Punctual
              </h4>
              <p className="text-gray-600">
                We respect your time. Our team arrives on schedule, every time.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-xl text-gray-600 mb-6">
            Ready to transform your space?
          </p>
          <a
            href="#booking"
            className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Book Your Cleaning Today
          </a>
        </div>
      </div>
    </section>
  );
}
