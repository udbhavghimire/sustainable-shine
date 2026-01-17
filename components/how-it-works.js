"use client";

import {
  Calendar,
  UserCheck,
  Coffee,
  Sparkles,
  Home,
  Bed,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      icon: Calendar,
      title: "Schedule Your Service",
      subtitle: "via our website or phone line",
      description:
        "Pick your preferred cleaning solution and share your property details. Options include Regular Maintenance, Intensive Deep Clean, Move Out Cleaning, or Flexible Hourly Service.",
      details: [
        "Choose service package",
        "Provide property information",
        "Select preferred date",
      ],
    },
    {
      icon: UserCheck,
      title: "We Connect You",
      subtitle: "with verified cleaning experts",
      description:
        "Our team pairs you with thoroughly vetted, professional cleaners who specialize in your requirements and exceed industry standards.",
      details: [
        "Verified backgrounds",
        "Comprehensive insurance",
        "Top ratings",
      ],
    },
    {
      icon: Coffee,
      title: "Relax & Enjoy",
      subtitle: "your pristine space with full control",
      description:
        "Experience complete peace of mind as our experts transform your space. Manage your bookings easily through your personal dashboard and enjoy quality guaranteed service.",
      details: [
        "Easy appointment management",
        "Green cleaning solutions",
        "100% satisfaction guarantee",
      ],
    },
  ];

  return (
    <section className="py-8 bg-gradient-to-b from-green-50 via-emerald-50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute top-2/3 left-10 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-lime-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4 px-5 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full shadow-md">
            <Sparkles className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-bold text-sm">
              Effortless Booking Process
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold  from-green-600 via-emerald-600 to-teal-600 mb-3 leading-tight">
            Reserve Your Professional Cleaning
          </h2>
          <p className="text-xl font-semibold text-gray-700 max-w-3xl mx-auto mb-3">
            Follow Our Streamlined 3-Step Journey
          </p>
          <div className="flex items-center justify-center gap-3 text-gray-600">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent rounded"></div>
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded"></div>
          </div>
        </div>

        {/* Vertical Timeline with Flowing Lines */}
        <div className="relative max-w-6xl mx-auto mb-8">
          {/* Vertical Flowing Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2 hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-b from-green-400 via-emerald-500 to-teal-500 rounded-full"></div>
          </div>

          {/* Steps - Alternating Left and Right */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Timeline Dot */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                      <span className="text-white font-black text-2xl">
                        {index + 1}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-green-400 rounded-full blur-lg opacity-60"></div>
                  </div>
                </div>

                {/* Content Card - Alternating Sides */}
                <div
                  className={`flex ${
                    index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  <div className="w-full md:w-2/5 group">
                    <div className="relative bg-gradient-to-br from-white via-green-50 to-emerald-50 rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 border-2 border-green-100 hover:border-green-300 overflow-hidden">
                      {/* Step Number Badge - Mobile Only */}
                      <div className="md:hidden absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 text-white rounded-full flex items-center justify-center font-black text-lg shadow-xl border-2 border-white">
                        {index + 1}
                      </div>

                      {/* Curved Connector Arrow */}
                      <div
                        className={`hidden md:block absolute top-1/2 ${
                          index % 2 === 0 ? "-right-10" : "-left-10"
                        } transform -translate-y-1/2`}
                      >
                        <svg width="40" height="40" viewBox="0 0 50 50">
                          <defs>
                            <linearGradient
                              id={`arrow-gradient-${index}`}
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop
                                offset="0%"
                                style={{
                                  stopColor: "#10b981",
                                  stopOpacity: 0.8,
                                }}
                              />
                              <stop
                                offset="100%"
                                style={{ stopColor: "#14b8a6", stopOpacity: 1 }}
                              />
                            </linearGradient>
                          </defs>
                          <path
                            d={
                              index % 2 === 0
                                ? "M5 25 L40 25 M40 25 L35 20 M40 25 L35 30"
                                : "M45 25 L10 25 M10 25 L15 20 M10 25 L15 30"
                            }
                            stroke={`url(#arrow-gradient-${index})`}
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray="6 3"
                          />
                        </svg>
                      </div>

                      {/* Icon Container */}
                      <div className="mb-5 relative">
                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-xl relative z-10">
                          <step.icon
                            className="w-10 h-10 text-white"
                            strokeWidth={2.5}
                          />
                        </div>
                        <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 rounded-full blur-2xl opacity-60"></div>
                      </div>

                      {/* Content */}
                      <div className="text-center relative z-10">
                        <h3 className="text-2xl font-black text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-base font-bold text-emerald-600 mb-3">
                          {step.subtitle}
                        </p>
                        <p className="text-gray-700 mb-4 text-base leading-relaxed">
                          {step.description}
                        </p>

                        {/* Details with Icons */}
                        <div className="space-y-2.5">
                          {step.details.map((detail, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2.5 text-base text-gray-700 bg-white bg-opacity-70 rounded-lg p-2.5 shadow-sm"
                            >
                              <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                                <ArrowRight className="w-3.5 h-3.5 text-white" />
                              </div>
                              <span className="font-semibold text-left">
                                {detail}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Details Preview - Enhanced */}
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-white via-green-50 to-emerald-50 rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-green-200 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)",
                backgroundSize: "40px 40px",
              }}
            ></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
            {/* Left Side - Info */}
            <div>
              <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full shadow-lg">
                <Sparkles className="w-4 h-4 text-green-600" />
                <span className="text-green-700 font-bold text-sm">
                  Fast & Intuitive
                </span>
              </div>
              <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 mb-3 leading-tight">
                Pick Your Cleaning Package & Share Your Property Info
              </h3>
              <p className="text-gray-700 mb-4 text-base leading-relaxed">
                Describe your property to receive an instant, accurate price
                estimate. Our intelligent system customizes the perfect cleaning
                plan for your unique space.
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3 bg-white bg-opacity-80 rounded-lg p-3 shadow-md">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 text-sm mb-0.5">
                      Pick Your Cleaning Type
                    </h4>
                    <p className="text-xs text-gray-600">
                      Standard, Intensive, Move-Out, or By-the-Hour
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white bg-opacity-80 rounded-lg p-3 shadow-md">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Bed className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 text-sm mb-0.5">
                      Share Property Specifications
                    </h4>
                    <p className="text-xs text-gray-600">
                      Rooms, baths, laundry, and building levels
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white bg-opacity-80 rounded-lg p-3 shadow-md">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 text-sm mb-0.5">
                      Select Your Preferred Time
                    </h4>
                    <p className="text-xs text-gray-600">
                      Adaptable scheduling that works around you
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Service Types */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    name: "Standard Clean",
                    icon: "🧹",
                    color: "from-green-500 to-emerald-600",
                  },
                  {
                    name: "Intensive Clean",
                    icon: "✨",
                    color: "from-emerald-500 to-teal-600",
                  },
                  {
                    name: "Move-Out Service",
                    icon: "🏠",
                    color: "from-teal-500 to-green-600",
                  },
                  {
                    name: "By-the-Hour",
                    icon: "⏰",
                    color: "from-lime-500 to-green-600",
                  },
                ].map((service, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-white to-green-50 border-2 border-green-200 rounded-xl p-3 text-center cursor-pointer"
                  >
                    <div className="text-3xl mb-2">{service.icon}</div>
                    <p className="font-black text-gray-900 text-xs">
                      {service.name}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-gray-50 via-white to-green-50 border-2 border-green-200 rounded-xl p-4 space-y-3 shadow-lg">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-green-600" />
                    <p className="text-sm font-black text-gray-800">
                      Property Details At-a-Glance
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white rounded-lg p-2 border-2 border-green-100 shadow">
                      <p className="text-gray-600 mb-1 font-semibold">
                        Bedrooms
                      </p>
                      <p className="font-black text-gray-900 text-base">
                        1 - 6+
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-2 border-2 border-emerald-100 shadow">
                      <p className="text-gray-600 mb-1 font-semibold">
                        Bathrooms
                      </p>
                      <p className="font-black text-gray-900 text-base">
                        1 - 6+
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-2 border-2 border-teal-100 shadow">
                      <p className="text-gray-600 mb-1 font-semibold">
                        Laundries
                      </p>
                      <p className="font-black text-gray-900 text-base">
                        0 - 1
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-2 border-2 border-lime-100 shadow">
                      <p className="text-gray-600 mb-1 font-semibold">
                        Storeys
                      </p>
                      <p className="font-black text-gray-900 text-base">
                        1 - 3
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
