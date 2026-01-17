"use client";

// Individual Before/After Comparison Component
function BeforeAfterComparison({ before, after, title, location, index }) {
  return (
    <div className="relative group">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
        {/* Images Container */}
        <div className="grid grid-cols-2 gap-2 bg-gray-100 p-6">
          {/* Before Image */}
          <div className="relative overflow-hidden rounded-xl bg-gray-200">
            <div className="relative w-full h-[350px]">
              <img
                src={before}
                alt={`${title} - Before cleaning`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
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
            </div>
          </div>

          {/* After Image */}
          <div className="relative overflow-hidden rounded-xl bg-gray-200">
            <div className="relative w-full h-[350px]">
              <img
                src={after}
                alt={`${title} - After cleaning`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
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

export default function OurWork({ city }) {
  const cityName = city?.name || "Sydney";
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
    <section className="bg-gradient-to-br from-gray-50 to-white">
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

        {/* Before/After Comparison Grid */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <BeforeAfterComparison
                key={index}
                before={project.before}
                after={project.after}
                title={project.title}
                location={project.location}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
