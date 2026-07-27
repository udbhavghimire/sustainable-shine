import Link from "next/link";
import HowItWorks from "@/components/how-it-works";
import Reviews from "@/components/reviews";
import OurWork from "@/components/our-work";
import AreasWeServe from "@/components/areas-we-serve";
import FAQSection from "@/components/faq-section";
import {
  HomePageLocalBusinessSchema,
  ServicePageSchema,
  BreadcrumbSchema,
} from "@/components/schema-markup";

export default function GeneralCleanPage() {
  const features = [
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
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      title: "Regular Maintenance",
      description: "Keep your home consistently clean and tidy",
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Flexible Scheduling",
      description: "Weekly, fortnightly, or monthly service",
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
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Affordable Rates",
      description: "Great value for ongoing cleaning",
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Trusted Team",
      description: "Same cleaners, consistent quality",
    },
  ];

  const services = [
    {
      title: "Bedrooms & Living Areas",
      items: [
        "Tidy beds",
        "Dust & wipe down furniture",
        "Dust & wipe down electronics",
        "Tidy up shoes, clothes & toys",
      ],
    },
    {
      title: "Bathroom & Laundry",
      items: [
        "Scrub & sanitise toilet",
        "Clean & sanitise bathtub & shower",
        "Wipe down cabinet exteriors",
        "Wipe down benchtops",
        "Polish sink & taps",
      ],
    },
    {
      title: "Kitchen",
      items: [
        "Stack & run dishwasher",
        "Wipe down exteriors of appliances",
        "Clean stovetop & oven exterior",
        "Wipe cabinet exteriors",
        "Clean microwave",
        "Sanitise splashback & benchtop",
        "Polish sink and taps",
      ],
    },
    {
      title: "All Areas",
      items: [
        "Dusting",
        "Vacuum carpets",
        "Sweep & mop floors",
        "Clean mirrors",
        "Empty rubbish bins",
        "Remove cobwebs",
      ],
    },
  ];

  const faqs = [
    {
      question: "What's included in a general clean?",
      answer:
        "Our general clean covers all main living areas: kitchen surfaces and floors, bathroom cleaning and sanitization, dusting, vacuuming, mopping, and bin emptying. It's designed to maintain a clean home between deep cleans.",
    },
    {
      question: "How long does a general clean take?",
      answer:
        "A general clean typically takes 2-4 hours depending on property size and condition. A 2-bedroom apartment usually takes 2-3 hours, while a 4-bedroom house may take 3-4 hours.",
    },
    {
      question: "Can I get the same cleaner each time?",
      answer:
        "Yes! We try to assign the same cleaner or team to your property for consistency. This helps them learn your preferences and maintain consistent quality.",
    },
    {
      question: "What's the difference between general and deep clean?",
      answer:
        "General cleaning maintains day-to-day cleanliness (wiping surfaces, vacuuming, mopping). Deep cleaning is more intensive and includes oven cleaning, cupboard interiors, wall washing, and detailed scrubbing. We recommend deep cleans 2-4 times per year with general cleans in between.",
    },
    {
      question: "Do you bring your own cleaning supplies?",
      answer:
        "Yes, we bring all necessary cleaning equipment and eco-friendly products. You don't need to provide anything. If you have specific preferences or allergies, you can provide your own products and we'll use them.",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="container-custom section-padding">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <Link
                href="/"
                className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Home
              </Link>

              <div className="">
                <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                  ✨ Regular & Reliable Cleaning
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
                General Cleaning Services Sydney - Regular House Cleaning
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                We keep Sydney homes consistently clean on a schedule that works
                for you — weekly, fortnightly, or monthly visits with the same
                trusted cleaner every time. No lock-in contracts.
              </p>

              {/* CTA Buttons */}
              <div className="flex  sm:flex-row gap-4 relative z-10">
                <a
                  href="/booking"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold md:px-8 px-4 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-center"
                >
                  Get a Free Quote
                </a>
                <a
                  href="tel:+61 452 422 059"
                  className="btn-secondary text-center"
                >
                  Call +61 452 422 059
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-emerald-500">
                    5000+
                  </div>
                  <div className="text-gray-600 text-sm">Happy Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-500">
                    4.9★
                  </div>
                  <div className="text-gray-600 text-sm">Average Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-500">
                    100%
                  </div>
                  <div className="text-gray-600 text-sm">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/general-clean.webp"
                  alt="General Cleaning Services"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-40 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wide">
              Why Choose Us
            </span>
            <h2 className="heading-2 text-gray-900 mt-4 mb-6">
              Why Choose Our General Cleaning Service Sydney?
            </h2>
            <p className="text-xl text-gray-600">
              Consistent quality every visit — the same cleaner who knows your
              home, your preferences, and how to keep it in great shape without
              you having to think about it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wide">
              What's Included
            </span>
            <h2 className="heading-2 text-gray-900 mt-4 mb-6">
              What's Included in General Cleaning Sydney
            </h2>
            <p className="text-xl text-gray-600">
              Every visit covers the same thorough checklist — kitchens,
              bathrooms, bedrooms, and living areas — so nothing gets skipped
              and your home is always in great shape.
            </p>
            <Link
              href="/checklist"
              className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors mt-4"
            >
              View Complete Cleaning Checklist
              <svg
                className="w-5 h-5 ml-2"
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
          </div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {service.title}
                </h3>
                <ul className="space-y-3">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <svg
                        className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequency Options Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wide">
              Flexible Options
            </span>
            <h2 className="heading-2 text-gray-900 mt-4 mb-6">
              Choose Your Cleaning Schedule
            </h2>
            <p className="text-xl text-gray-600">
              Flexible options to suit your lifestyle
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Weekly</h3>
              <p className="text-gray-600 mb-4">
                Perfect for busy families and high-traffic homes
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-emerald-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Always spotless
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-emerald-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Best value
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-emerald-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Priority booking
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl p-8 shadow-lg transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-white text-emerald-600 px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Fortnightly</h3>
              <p className="text-emerald-50 mb-4">
                Great balance of cleanliness and affordability
              </p>
              <ul className="space-y-2 text-sm text-emerald-50">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Regular maintenance
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Great value
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Consistent cleaners
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Monthly</h3>
              <p className="text-gray-600 mb-4">
                Ideal for low-traffic homes and apartments
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-emerald-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Budget-friendly
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-emerald-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Deep refresh
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-emerald-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Flexible scheduling
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Reviews />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Areas We Serve Section */}
      <AreasWeServe />

      {/* Our Work Section */}
      <OurWork />

      {/* FAQ Section */}
      <FAQSection
        faqs={faqs}
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about general cleaning"
      />

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-2 text-white mb-6">
              Book Regular House Cleaning Sydney Today
            </h2>
            <p className="text-xl mb-8 text-emerald-50">
              Our Sydney team keeps your home fresh and tidy on your schedule —
              weekly, fortnightly, or monthly. Same cleaner every visit, no
              lock-in contracts. Call now for a free quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
              >
                Book Now
              </Link>
              <a
                href="tel:+61 452 422 059"
                className="bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg text-center border-2 border-white"
              >
                Call +61 452 422 059
              </a>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(HomePageLocalBusinessSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            ServicePageSchema({
              serviceType: "General Cleaning",
              serviceName: "General House Cleaning Services Sydney",
              description:
                "Professional general house cleaning services in Sydney. Regular weekly, fortnightly, and monthly cleaning for homes and apartments. Eco-friendly products and trusted cleaners.",
              pageUrl: "https://sustainableshine.com.au/general-clean",
              priceFrom: "149",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            BreadcrumbSchema({
              items: [
                { name: "Home", url: "https://sustainableshine.com.au" },
                {
                  name: "General Clean",
                  url: "https://sustainableshine.com.au/general-clean",
                },
              ],
            }),
          ),
        }}
      />
    </main>
  );
}
