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

export default function DeepCleanPage() {
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Intensive Cleaning",
      description: "Deep clean every corner, crack, and crevice",
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
      title: "Sanitization",
      description: "Kill 99.9% of germs and bacteria",
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
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
      title: "Detailed Work",
      description: "We clean areas others miss",
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
      title: "Safe Products",
      description: "Non-toxic, eco-friendly solutions",
    },
  ];

  const areas = [
    {
      title: "Kitchen Deep Clean",
      items: [
        "Oven interior and exterior cleaning",
        "Rangehood degreasing and filter cleaning",
        "Behind and under appliances",
        "Cabinet interior and exterior wiping",
        "Grout and tile scrubbing",
        "Sink and tap descaling",
      ],
    },
    {
      title: "Bathroom Deep Clean",
      items: [
        "Toilet deep cleaning and sanitization",
        "Shower screen and glass polishing",
        "Tile and grout scrubbing",
        "Mold and mildew removal",
        "Cabinet and mirror cleaning",
        "Exhaust fan cleaning",
      ],
    },
    {
      title: "Living Areas Deep Clean",
      items: [
        "Skirting board and architrave wiping",
        "Window tracks and frames cleaning",
        "Light fitting and ceiling fan dusting",
        "Wall washing and mark removal",
        "Door and handle sanitization",
        "Air vent cleaning",
      ],
    },
    {
      title: "Bedroom Deep Clean",
      items: [
        "Wardrobe interior cleaning",
        "Under bed cleaning",
        "Mattress vacuuming",
        "Window and blinds dusting",
        "Skirting and door frames",
        "Light switches and handles",
      ],
    },
  ];

  const faqs = [
    {
      question: "What's the difference between deep clean and regular clean?",
      answer:
        "Deep cleaning is more intensive and thorough than regular cleaning. It includes scrubbing grout, cleaning inside ovens and cupboards, washing walls, removing mold, and cleaning areas that are often missed in regular cleaning. It's typically done 2-4 times per year.",
    },
    {
      question: "How long does a deep clean take?",
      answer:
        "A deep clean typically takes 5-10 hours depending on the size and condition of your property. A 2-bedroom apartment usually takes 5-6 hours, while a 4-bedroom house may take 8-10 hours. We can provide a more accurate estimate after assessing your needs.",
    },
    {
      question: "Do I need to be home during the deep clean?",
      answer:
        "No, you don't need to be present. Many clients provide access and go about their day. Our team is fully insured, professionally trained, and police-checked for your peace of mind.",
    },
    {
      question: "What should I do before the deep clean?",
      answer:
        "We recommend decluttering surfaces and putting away personal items. This allows our team to focus on deep cleaning rather than organizing. If you have specific areas of concern, please let us know in advance.",
    },
    {
      question: "How often should I get a deep clean?",
      answer:
        "We recommend a deep clean 2-4 times per year, depending on your household. High-traffic homes with kids or pets may benefit from quarterly deep cleans, while others might need it twice a year.",
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
                  ✨ Hospital-Grade Cleaning
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
                Deep Cleaning Services Sydney - Professional House Deep Clean
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                We tackle every corner your regular clean misses — inside ovens,
                grout lines, rangehoods, light fittings, and skirting boards.
                Hospital-grade products, fully insured, and done right every
                time.
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
                    99.9%
                  </div>
                  <div className="text-gray-600 text-sm">Germ Kill Rate</div>
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
                  src="/deep-cleaning.jpg"
                  alt="Deep Cleaning Services"
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
              Why Choose Our Professional Deep Cleaning Sydney?
            </h2>
            <p className="text-xl text-gray-600">
              More than surface cleaning — we work through every room
              systematically, using hospital-grade sanitization to reach the
              spots that regularly get overlooked.
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
              What's Included in Our Deep Cleaning Service Sydney
            </h2>
            <p className="text-xl text-gray-600">
              Every room, top to bottom. Kitchen oven and rangehood, bathroom
              tiles and grout, walls, skirting boards — everything covered so
              nothing gets missed.
            </p>
            <Link
              href="/checklist"
              className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors mt-4"
            >
              View Complete Deep Cleaning Checklist
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
            {areas.map((area, index) => (
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

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <Reviews />

      {/* Our Work Section */}
      <OurWork />

      {/* Areas We Serve Section */}
      <AreasWeServe />

      {/* FAQ Section */}
      <FAQSection
        faqs={faqs}
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about deep cleaning"
      />

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-2 text-white mb-6">
              Book Professional Deep Cleaning Sydney Today
            </h2>
            <p className="text-xl mb-8 text-emerald-50">
              Our Sydney team scrubs, sanitises, and refreshes every room from
              ceiling to floor — ovens, grout, mould, and everything in between.
              Call now for a free, no-obligation quote.
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
              serviceType: "Deep Cleaning",
              serviceName: "Deep Cleaning Services Sydney",
              description:
                "Intensive deep cleaning services for Sydney homes and apartments. Includes oven cleaning, grout scrubbing, sanitization and all areas others miss.",
              pageUrl: "https://sustainableshine.com.au/deep-clean",
              priceFrom: "349",
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
                  name: "Deep Clean",
                  url: "https://sustainableshine.com.au/deep-clean",
                },
              ],
            }),
          ),
        }}
      />
    </main>
  );
}
