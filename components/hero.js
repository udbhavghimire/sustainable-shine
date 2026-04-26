"use client";

import Image from "next/image";
import posthog from "posthog-js";

export default function Hero({ city }) {
  // Default to Sydney if no city provided
  const cityName = city?.name || "Sydney";
  const cityFullName = city?.fullName || "Sydney";
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 bg-gradient-to-br from-emerald-50 via-white to-blue-50"
    >
      <div className="container-custom section-padding">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full md:text-sm text-[10px] font-semibold">
                ✨ {cityName}'s #1 Eco-Friendly Cleaning Service
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Professional Cleaning Services in {cityName}
            </h1>

            <p className="md:text-xl text-base text-gray-600 leading-relaxed">
              Professional cleaning services in {cityFullName} that care for
              your home and the environment. From general and deep cleaning to
              end-of-lease, we've got you covered.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-6 h-6 text-emerald-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700 font-medium">
                  Eco-Friendly Products
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-6 h-6 text-emerald-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700 font-medium">
                  Licensed & Insured
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-6 h-6 text-emerald-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700 font-medium">
                  Same Day Service
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  className="w-6 h-6 text-emerald-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700 font-medium">
                  100% Satisfaction
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex  sm:flex-row gap-4 relative z-10">
              <a
                href="/booking"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold md:px-8 px-4 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-center"
                onClick={() => posthog.capture("hero_cta_clicked", { cta_type: "get_free_quote", city: cityName })}
              >
                Get a Free Quote
              </a>
              <a
                href="tel:+61 452 422 059"
                className="btn-secondary text-center"
                onClick={() => posthog.capture("hero_cta_clicked", { cta_type: "call", city: cityName })}
              >
                Call +61 452 422 059
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-gray-200">
              <div>
                <div className="text-3xl font-bold text-emerald-500">500+</div>
                <div className="text-gray-600 text-sm">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-500">3+</div>
                <div className="text-gray-600 text-sm">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-500">10+</div>
                <div className="text-gray-600 text-sm">Expert Cleaners</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/hero2.jpeg"
                alt={`Professional cleaning service in ${cityName}`}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="bg-emerald-100 p-3 rounded-full">
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
                <div>
                  <div className="text-2xl font-bold text-gray-800">24/7</div>
                  <div className="text-gray-600 text-sm">Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob pointer-events-none"></div>
      <div className="absolute bottom-40 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>
    </section>
  );
}
