"use client";

export default function About({ city }) {
  const cityName = city?.name || "Sydney";
  const values = [
    {
      icon: (
        <svg
          className="w-8 h-8"
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
      ),
      title: "Eco-Friendly",
      description:
        "We use only sustainable, non-toxic cleaning products that are safe for your family and the planet.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Trusted Professionals",
      description:
        "All our cleaners are thoroughly vetted, trained, and insured for your peace of mind.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Satisfaction Guaranteed",
      description:
        "Not happy with our service? We'll come back and clean it again for free, no questions asked.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
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
      ),
      title: "Flexible Scheduling",
      description:
        "Book at your convenience with same-day service available. We work around your schedule.",
    },
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wide">
              About Us
            </span>
            <h2 className="heading-2 text-gray-900 mt-4 mb-6">
              {cityName}'s Most Trusted Cleaning Company
            </h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                For over a decade, Sustainable Shine has been providing
                exceptional cleaning services to homes and businesses across{" "}
                {cityName}. We believe that a clean space shouldn't come at the
                cost of our environment.
              </p>
              <p>
                Our team of dedicated professionals uses eco-friendly products
                and proven techniques to deliver sparkling results every time.
                We're not just cleaners – we're partners in creating healthier,
                happier spaces for you to live and work.
              </p>
              <p>
                Whether you need a one-time deep clean or regular maintenance,
                we bring the same level of care and attention to every job. Your
                satisfaction is our priority.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="border-l-4 border-emerald-500 pl-4">
                <div className="text-4xl font-bold text-gray-900">10+</div>
                <div className="text-gray-600 mt-1">Years in Business</div>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <div className="text-4xl font-bold text-gray-900">5000+</div>
                <div className="text-gray-600 mt-1">Happy Customers</div>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <div className="text-4xl font-bold text-gray-900">50+</div>
                <div className="text-gray-600 mt-1">Expert Cleaners</div>
              </div>
              <div className="border-l-4 border-emerald-500 pl-4">
                <div className="text-4xl font-bold text-gray-900">100%</div>
                <div className="text-gray-600 mt-1">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Values */}
          <div className="space-y-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-emerald-100 text-emerald-600 p-3 rounded-lg">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-20 text-center">
          <p className="text-gray-600 mb-8">Certified & Trusted By</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="text-2xl font-bold text-gray-400">
              Licensed & Insured
            </div>
            <div className="text-2xl font-bold text-gray-400">
              AICPA Certified
            </div>
            <div className="text-2xl font-bold text-gray-400">
              Eco-Friendly Approved
            </div>
            <div className="text-2xl font-bold text-gray-400">ISO 9001</div>
          </div>
        </div>
      </div>
    </section>
  );
}
