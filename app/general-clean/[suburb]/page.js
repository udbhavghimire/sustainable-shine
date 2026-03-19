"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getSuburbData } from "@/data/suburbs";
import HowItWorks from "@/components/how-it-works";
import Reviews from "@/components/reviews";
import OurWork from "@/components/our-work";

export default function GeneralCleanSuburbPage() {
  const params = useParams();
  const [suburbData, setSuburbData] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    if (params.suburb) {
      const data = getSuburbData(params.suburb);
      setSuburbData(data);
    }
  }, [params.suburb]);

  if (!suburbData) {
    return <div>Loading...</div>;
  }

  const localFeatures = [
    {
      icon: "🏠",
      title: "Regular Maintenance",
      description: `Keep your ${suburbData.name} home consistently clean`,
    },
    {
      icon: "📅",
      title: "Flexible Scheduling",
      description: "Weekly, fortnightly, or monthly service",
    },
    {
      icon: "💰",
      title: "Affordable Rates",
      description: `Great value for ${suburbData.name} residents`,
    },
    {
      icon: "👥",
      title: "Trusted Team",
      description: "Same cleaners, consistent quality",
    },
  ];

  const services = [
    {
      title: "Kitchen",
      items: [
        "Wipe down all surfaces and countertops",
        "Clean stovetop and exterior of appliances",
        "Clean sink and taps",
        "Sweep and mop floors",
        "Empty bins and replace liners",
        "Wipe cabinet doors and handles",
      ],
    },
    {
      title: "Bathrooms",
      items: [
        "Clean and sanitize toilet",
        "Wipe down shower and bath",
        "Clean vanity and mirrors",
        "Wipe down tiles",
        "Sweep and mop floors",
        "Empty bins and replace liners",
      ],
    },
    {
      title: "Living Areas & Bedrooms",
      items: [
        "Dust all surfaces and furniture",
        "Vacuum carpets and rugs",
        "Mop hard floors",
        "Make beds (if requested)",
        "Wipe light switches and door handles",
        "Empty bins",
      ],
    },
    {
      title: "General",
      items: [
        "Dust skirting boards",
        "Wipe window sills",
        "Vacuum all floors",
        "Spot clean walls and doors",
        "Tidy and organize (basic)",
        "Take out rubbish",
      ],
    },
  ];

  const faqs = [
    {
      question: `What's included in general cleaning for ${suburbData.name} properties?`,
      answer: `Our ${suburbData.name} general cleaning includes: kitchen cleaning and mopping, bathroom sanitization, vacuuming and mopping all floors, dusting surfaces, bed making (if requested), bin emptying, and general tidying. We customize the service to your home's needs.`,
    },
    {
      question: `Can I get the same cleaner for my ${suburbData.name} property?`,
      answer: `Yes! We aim to assign the same cleaner or team to your ${suburbData.name} property for consistency. This helps them learn your home's layout and your preferences.`,
    },
    {
      question: `How long does general cleaning take in ${suburbData.name}?`,
      answer: `For a typical ${suburbData.name} 2-bedroom apartment, general cleaning takes 2-3 hours. Larger houses may take 3-4 hours. We're efficient and thorough.`,
    },
    {
      question: "What's the difference between general and deep clean?",
      answer:
        "General cleaning maintains day-to-day cleanliness. Deep cleaning is more intensive with oven cleaning, cupboard interiors, wall washing, and detailed scrubbing. We recommend deep cleans 2-4 times per year with general cleans in between.",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-white to-green-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumbs */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-6">
              <Link
                href="/"
                className="hover:text-emerald-600 transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href="/general-clean"
                className="hover:text-emerald-600 transition-colors"
              >
                General Clean
              </Link>
              <span>/</span>
              <span className="text-emerald-600 font-semibold">
                {suburbData.name}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
              General Cleaning {suburbData.name} - Regular House Cleaning
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Reliable <strong>general cleaning {suburbData.name}</strong> for homes and apartments. Professional <strong>house cleaning</strong> available weekly, fortnightly, or monthly. Trusted <strong>regular cleaning services</strong> for busy {suburbData.name} families and professionals. Local cleaners you can count on.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/booking"
                className="bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Free Quote for {suburbData.name}
              </Link>
              <a
                href="tel:0470573081"
                className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg border-2 border-emerald-500 hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Call +61 452 422 059
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📍</span>
                <span className="font-semibold">
                  Servicing {suburbData.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📅</span>
                <span className="font-semibold">Flexible Scheduling</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌿</span>
                <span className="font-semibold">Eco-Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our General Cleaning Services {suburbData.name}?
            </h2>
            <p className="text-xl text-gray-600">
              Consistent quality <strong>house cleaning {suburbData.name}</strong> service. Professional <strong>regular cleaning</strong> for maintaining a spotless home.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {localFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-emerald-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-100"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
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
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              General Cleaning Checklist {suburbData.name}
            </h2>
            <p className="text-xl text-gray-600">
              Complete <strong>house cleaning</strong> covering all living spaces in your {suburbData.name} property. Regular maintenance for a consistently clean home.
            </p>
            <Link href="/checklist" className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors mt-4">
              View Complete Cleaning Checklist
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
                      <div className="flex-shrink-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mt-0.5">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
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

      {/* How It Works Section */}
      <HowItWorks />

      {/* Frequency Options Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your {suburbData.name} Cleaning Schedule
            </h2>
            <p className="text-xl text-gray-600">
              Flexible options to suit your lifestyle
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-emerald-50 p-8 rounded-2xl shadow-lg border border-emerald-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Weekly</h3>
              <p className="text-gray-600 mb-4">
                Perfect for busy {suburbData.name} families
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  Always spotless
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  Best value
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  Priority booking
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-white to-emerald-50 p-8 rounded-2xl shadow-lg border-2 border-emerald-500 transform scale-105">
              <div className="inline-block bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Fortnightly
              </h3>
              <p className="text-gray-600 mb-4">
                Great balance for {suburbData.name} homes
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  Regular maintenance
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  Great value
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  Consistent cleaners
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-white to-emerald-50 p-8 rounded-2xl shadow-lg border border-emerald-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Monthly</h3>
              <p className="text-gray-600 mb-4">
                Ideal for {suburbData.name} apartments
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  Budget-friendly
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  Deep refresh
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  Flexible scheduling
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Local Info Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
                  Trusted House Cleaners {suburbData.name}
                </h2>
                <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                  <p>
                    Our <strong>general cleaning {suburbData.name}</strong> team provides reliable, professional <strong>house cleaning services</strong>. We offer flexible weekly, fortnightly, or monthly cleaning schedules to maintain your {suburbData.name} home consistently clean.
                  </p>
                  <p>
                    Whether you're a young professional, a family, or anyone in
                    between, our regular cleaning service keeps your{" "}
                    {suburbData.name} home fresh, tidy, and welcoming.
                  </p>
                  <p>
                    Our {suburbData.name} team is familiar with local property
                    types and the cleaning needs of the community. We're here to
                    make your life easier.
                  </p>
                </div>

                <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border-l-4 border-emerald-500">
                  <h3 className="font-bold text-gray-900 text-xl mb-3">
                    Perfect for {suburbData.name} Residents:
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      Busy professionals
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      Families with children
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      Apartment dwellers
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      Anyone wanting consistency
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-emerald-500 text-white p-8 rounded-2xl shadow-xl">
                  <h3 className="text-2xl font-bold mb-4">
                    {suburbData.name} Pricing
                  </h3>
                  <p className="mb-4 text-emerald-50">Regular cleaning rates</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-emerald-400 pb-2">
                      <span>2BR apartment:</span>
                      <span className="font-bold">From $149/visit</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-emerald-400 pb-2">
                      <span>3BR house:</span>
                      <span className="font-bold">From $199/visit</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>4BR house:</span>
                      <span className="font-bold">From $249/visit</span>
                    </div>
                  </div>
                  <p className="text-sm text-emerald-100 mt-4">
                    *Discounts available for weekly and fortnightly bookings
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-xl border border-emerald-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Location
                  </h3>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-center gap-2">
                      <span className="text-emerald-500">📍</span>
                      <span className="font-semibold">
                        {suburbData.fullName}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-emerald-500">📮</span>
                      <span>Postcode: {suburbData.postcode}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <Reviews />

      {/* Our Work Section */}
      <OurWork />

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                {suburbData.name} General Cleaning FAQs
              </h2>
              <p className="text-xl text-gray-600">
                Common questions from {suburbData.name} residents
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-lg overflow-hidden border border-emerald-100"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-emerald-50 transition-colors"
                  >
                    <span className="text-lg font-bold text-gray-900">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-6 h-6 text-emerald-500 transition-transform ${
                        openFaq === index ? "rotate-180" : ""
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
                  {openFaq === index && (
                    <div className="px-8 pb-6">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Internal Links Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Explore Our Other Services in {suburbData.name}
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  href="/general-clean"
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all text-center border border-emerald-100 hover:border-emerald-300"
                >
                  <span className="text-2xl mb-2 block">✨</span>
                  <span className="text-gray-900 font-semibold">
                    General Clean Sydney
                  </span>
                </Link>
                <Link
                  href={`/end-of-lease-cleaning/${params.suburb}`}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all text-center border border-emerald-100 hover:border-emerald-300"
                >
                  <span className="text-2xl mb-2 block">🏠</span>
                  <span className="text-gray-900 font-semibold">
                    End of Lease {suburbData.name}
                  </span>
                </Link>
                <Link
                  href={`/deep-clean/${params.suburb}`}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all text-center border border-emerald-100 hover:border-emerald-300"
                >
                  <span className="text-2xl mb-2 block">🧼</span>
                  <span className="text-gray-900 font-semibold">
                    Deep Clean {suburbData.name}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              Book House Cleaning {suburbData.name} Today
            </h2>
            <p className="text-xl mb-8 text-emerald-50">
              Enjoy a consistently clean home with professional <strong>general cleaning services {suburbData.name}</strong>. Flexible <strong>house cleaning</strong> schedules available weekly, fortnightly, or monthly. Call now for a free quote!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Book {suburbData.name} Cleaning
              </Link>
              <a
                href="tel:0470573081"
                className="bg-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Call +61 452 422 059
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
