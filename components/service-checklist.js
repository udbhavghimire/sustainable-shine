"use client";

import Link from "next/link";

export default function ServiceChecklist() {
  const services = [
    {
      title: "General Clean",
      icon: "🏠",
      price: "From $120",
      ideal: "Weekly/Fortnightly",
      color: "emerald",
      gradient: "from-emerald-50 to-emerald-100",
      description:
        "Perfect for maintaining a clean and healthy home environment on a regular basis. Ideal for busy families and professionals.",
      features: [
        {
          category: "Coverage",
          items: [
            "All living areas",
            "Kitchen surfaces",
            "Bathroom sanitization",
            "Floor cleaning",
          ],
        },
        {
          category: "Best For",
          items: [
            "Regular maintenance",
            "Busy schedules",
            "Family homes",
            "Rental properties",
          ],
        },
      ],
      stats: { tasks: "20+", areas: "All Rooms", focus: "Surface Level" },
    },
    {
      title: "Deep Clean",
      icon: "✨",
      price: "From $150",
      ideal: "Quarterly",
      color: "blue",
      gradient: "from-blue-50 to-blue-100",
      description:
        "An intensive cleaning service that tackles hard-to-reach areas and stubborn grime. Perfect for seasonal refreshes or special occasions.",
      features: [
        {
          category: "Coverage",
          items: [
            "Everything in General",
            "Behind furniture",
            "Skirting boards",
            "Mould treatment",
          ],
        },
        {
          category: "Best For",
          items: [
            "Spring cleaning",
            "After renovations",
            "Special events",
            "Deep sanitization",
          ],
        },
      ],
      stats: { tasks: "35+", areas: "All Rooms", focus: "Detailed Clean" },
    },
    {
      title: "End of Lease",
      icon: "🔑",
      price: "From $320",
      ideal: "Moving Out",
      color: "purple",
      gradient: "from-purple-50 to-purple-100",
      description:
        "Comprehensive cleaning that meets strict real estate standards. Designed to help you secure your full bond refund with our guarantee.",
      features: [
        {
          category: "Coverage",
          items: [
            "Everything in Deep",
            "Oven interior",
            "Window interiors",
            "Light fixtures",
          ],
        },
        {
          category: "Best For",
          items: [
            "Lease termination",
            "Bond return",
            "Property handover",
            "Real estate compliance",
          ],
        },
      ],
      stats: { tasks: "50+", areas: "Full Property", focus: "Bond Standard" },
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="inline-block bg-emerald-100 text-emerald-700 font-semibold text-sm uppercase tracking-wide px-4 py-2 rounded-full mb-4">
            Service Inclusions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
            What's Included in Each Service?
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Every cleaning service is different. Compare our packages to find
            the perfect match for your needs, budget, and schedule.
          </p>
        </div>

        {/* Service Comparison Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group border-2 border-gray-100 hover:border-emerald-200"
            >
              {/* Gradient Header */}
              <div
                className={`bg-gradient-to-br ${service.gradient} px-6 py-8 relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full -ml-12 -mb-12"></div>

                <div className="relative z-10">
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm font-semibold text-gray-700">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {service.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-emerald-600">
                      {service.stats.tasks}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Tasks</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-sm font-bold text-emerald-600">
                      {service.stats.areas}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Coverage</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xs font-bold text-emerald-600">
                      {service.stats.focus}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Level</div>
                  </div>
                </div>

                {/* Features */}
                {service.features.map((feature, idx) => (
                  <div key={idx} className="mb-5">
                    <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                      {feature.category}
                    </h4>
                    <ul className="space-y-2">
                      {feature.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start text-sm">
                          <svg
                            className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Ideal For Badge */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      Recommended
                    </span>
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {service.ideal}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Info Box */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-8 md:p-12 text-white mb-12 shadow-xl">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  Need a Detailed Task Breakdown?
                </h3>
                <p className="text-white/90 text-lg leading-relaxed">
                  View our comprehensive checklist comparing every single task
                  across all three services. See exactly what's cleaned in each
                  room, from kitchens to bathrooms, and everything in between.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link
                  href="/checklist"
                  className="inline-flex items-center gap-2 bg-white text-emerald-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <span>View Full Checklist</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
