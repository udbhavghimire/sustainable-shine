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

export default function EndOfLeaseCleaningPage() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "Bond Back Guarantee",
      description: "100% bond return guarantee or we'll re-clean for free",
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
      title: "Fast Turnaround",
      description: "Same-day service available for urgent move-outs",
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Real Estate Approved",
      description: "Meets all property manager requirements",
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
            d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
          />
        </svg>
      ),
      title: "Eco-Friendly",
      description: "Safe, non-toxic cleaning products",
    },
  ];

  const checklistAreas = [
    {
      title: "Kitchen Deep Clean",
      items: [
        "Oven interior deep clean (including trays and racks)",
        "Rangehood degreasing and filter cleaning",
        "Stovetop and oven exterior cleaning",
        "All appliance exteriors wiped down",
        "Cabinet, shelf and drawer interiors cleaned",
        "Cabinet exteriors and handles wiped",
        "Microwave interior and exterior cleaning",
        "Splashback and benchtop sanitization",
        "Sink and taps polished and descaled",
        "Floor swept and mopped",
      ],
    },
    {
      title: "Bathroom & Laundry",
      items: [
        "Toilet deep cleaning and sanitization",
        "Bathtub and shower thoroughly scrubbed",
        "Shower screen and glass polishing",
        "Tile and grout scrubbing",
        "Mineral deposits and mould removal",
        "Cabinet, shelf and drawer interiors cleaned",
        "Cabinet exteriors and benchtops wiped",
        "Sink and taps polished",
        "Extractor fan vents dusted",
        "Floor swept and mopped",
      ],
    },
    {
      title: "Living Areas & General",
      items: [
        "All surfaces dusted and wiped",
        "Carpets vacuumed thoroughly",
        "Hard floors swept and mopped",
        "Mirrors and glass cleaned",
        "Cobwebs removed from all corners",
        "Skirting boards wiped down",
        "Cornices dusted",
        "Doors, frames and handles wiped",
        "Window interiors cleaned",
        "Glass door interiors and exteriors",
        "Light switches and power points wiped",
        "Accessible light fittings cleaned",
      ],
    },
    {
      title: "Bedrooms & Storage",
      items: [
        "Wardrobe exteriors wiped down",
        "Wardrobe and cupboard interiors cleaned",
        "All surfaces dusted",
        "Carpets vacuumed",
        "Hard floors swept and mopped",
        "Mirrors cleaned",
        "Skirting boards wiped",
        "Doors and handles wiped",
        "Window interiors cleaned",
        "Light fittings cleaned",
      ],
    },
  ];

  const faqs = [
    {
      question: "What does end of lease cleaning include?",
      answer:
        "Our end of lease cleaning covers everything required by property managers: full kitchen deep clean (including oven and rangehood), complete bathroom sanitization, carpet steam cleaning, wall washing, window cleaning inside and out, cupboard cleaning, and all other areas to ensure your bond is returned.",
    },
    {
      question: "Do you guarantee bond back?",
      answer:
        "Yes! We offer a 100% bond back guarantee. If your property manager identifies any cleaning issues, we'll return and re-clean those areas for free. We've helped thousands of tenants get their full bond back.",
    },
    {
      question: "How long does end of lease cleaning take?",
      answer:
        "Typically 4-8 hours depending on property size and condition. A 2-bedroom apartment usually takes 4-5 hours, while a 4-bedroom house may take 6-8 hours. We also offer same-day service for urgent bookings.",
    },
    {
      question: "Should I be present during the cleaning?",
      answer:
        "No, you don't need to be present. Many clients provide access and collect keys afterward. We're fully insured and our team is professionally trained and police-checked.",
    },
    {
      question: "What areas do you service?",
      answer:
        "We provide end of lease cleaning across Sydney, including all suburbs. Check our suburb pages for specific local information.",
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
                  ✨ 100% Bond Back Guarantee
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
                End of Lease Cleaning Sydney - 100% Bond Back Guarantee
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                We help Sydney tenants get their full bond back. Our team
                follows the REIQ cleaning checklist and knows exactly what local
                property managers look for — so your final inspection passes
                first time. Trusted by 5000+ Sydney tenants.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking" className="btn-primary text-center">
                  Get Free Quote
                </Link>
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
                    100%
                  </div>
                  <div className="text-gray-600 text-sm">Bond Back</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-500">
                    24/7
                  </div>
                  <div className="text-gray-600 text-sm">Available</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/end-of-lease.jpg"
                  alt="End of Lease Cleaning"
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
              Why Choose Our End of Lease Cleaning Sydney Service?
            </h2>
            <p className="text-xl text-gray-600">
              We know what Sydney property managers expect and deliver results
              that hold up to the strictest final inspections — backed by our
              100% bond back guarantee.
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

      {/* Checklist Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wide">
                What's Included
              </span>
              <h2 className="heading-2 text-gray-900 mt-4 mb-6">
                Complete End of Lease Cleaning Checklist Sydney
              </h2>
              <p className="text-xl text-gray-600">
                We work through every room on the full REIQ checklist — kitchen
                oven and rangehood, bathrooms, walls, windows, carpets, and
                cupboards — to meet the standard property managers actually
                check.
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
              {checklistAreas.map((area, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    {area.title}
                  </h3>
                  <ul className="space-y-3">
                    {area.items.map((item, itemIndex) => (
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
        </div>
      </section>

      {/* Testimonials Section */}
      <Reviews />

      {/* Our Work Section */}
      <OurWork />

      {/* Areas We Serve Section */}
      <AreasWeServe />

      {/* How It Works Section */}
      <HowItWorks />

      {/* FAQ Section */}
      <FAQSection
        faqs={faqs}
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about end of lease cleaning"
      />

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-2 text-white mb-6">
              Book Professional End of Lease Cleaning Sydney Today
            </h2>
            <p className="text-xl mb-8 text-emerald-50">
              Our Sydney team is available for same-day and weekend bookings. We
              follow the full REIQ checklist and back every clean with our bond
              back guarantee. Call now for a free quote.
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
              serviceType: "End of Lease Cleaning",
              serviceName: "End of Lease Cleaning Services Sydney",
              description:
                "Professional end of lease cleaning services Sydney with 100% bond back guarantee. REIQ-approved checklist, fully insured, same-day availability.",
              pageUrl: "https://sustainableshine.com.au/end-of-lease-cleaning",
              priceFrom: "299",
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
                  name: "End of Lease Cleaning",
                  url: "https://sustainableshine.com.au/end-of-lease-cleaning",
                },
              ],
            }),
          ),
        }}
      />
    </main>
  );
}
