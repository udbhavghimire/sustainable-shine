import Link from "next/link";
import { notFound } from "next/navigation";
import { getSuburbData, getAllSuburbSlugs } from "@/data/suburbs";
import HowItWorks from "@/components/how-it-works";
import Reviews from "@/components/reviews";
import OurWork from "@/components/our-work";
import FAQSection from "@/components/faq-section";
import {
  LocalBusinessSchema,
  ServiceSchema,
  BreadcrumbSchema,
} from "@/components/schema-markup";

export async function generateStaticParams() {
  const slugs = getAllSuburbSlugs();
  return slugs.map((suburb) => ({
    suburb,
  }));
}

export default async function DeepCleanSuburbPage({ params }) {
  const resolvedParams = await params;
  const suburbData = getSuburbData(resolvedParams.suburb.toLowerCase());

  if (!suburbData) {
    notFound();
  }

  const pageUrl = `https://sustainableshine.com.au/deep-clean/${resolvedParams.suburb}`;

  const serviceDetails = {
    type: "Deep Cleaning",
    name: `Deep Cleaning ${suburbData.name}`,
    description: `Professional deep cleaning service in ${suburbData.name}. Intensive house cleaning including oven cleaning, grout scrubbing, and complete sanitization for homes and apartments.`,
    priceRange: [
      {
        "@type": "PriceSpecification",
        price: "349",
        priceCurrency: "AUD",
        name: "2BR apartment",
      },
      {
        "@type": "PriceSpecification",
        price: "499",
        priceCurrency: "AUD",
        name: "3BR house",
      },
      {
        "@type": "PriceSpecification",
        price: "649",
        priceCurrency: "AUD",
        name: "4BR house",
      },
    ],
  };

  const breadcrumbItems = [
    {
      name: "Home",
      url: "https://sustainableshine.com.au",
    },
    {
      name: "Deep Clean",
      url: "https://sustainableshine.com.au/deep-clean",
    },
    {
      name: suburbData.name,
      url: pageUrl,
    },
  ];

  const localFeatures = [
    {
      icon: "🧼",
      title: "Intensive Cleaning",
      description: `Deep clean every corner of your ${suburbData.name} property`,
    },
    {
      icon: "🦠",
      title: "Sanitization",
      description: "Kill 99.9% of germs and bacteria",
    },
    {
      icon: "✨",
      title: "Detailed Work",
      description: `We clean areas others miss in ${suburbData.name}`,
    },
    {
      icon: "🌿",
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
      answer: `Deep cleaning is more intensive than regular cleaning. It includes scrubbing grout, cleaning inside ovens and cupboards, washing walls, removing mold, and cleaning areas often missed. Perfect for ${suburbData.name} properties needing thorough attention.`,
    },
    {
      question: `How long does a deep clean take in ${suburbData.name}?`,
      answer: `A deep clean typically takes 5-10 hours depending on property size and condition. A 2-bedroom ${suburbData.name} apartment usually takes 5-6 hours, while a 4-bedroom house may take 8-10 hours.`,
    },
    {
      question: "Do I need to be home during the deep clean?",
      answer: `No, you don't need to be present at your ${suburbData.name} property. Many clients provide access and go about their day. Our team is fully insured and police-checked.`,
    },
    {
      question: `How often should I get a deep clean in ${suburbData.name}?`,
      answer:
        "We recommend a deep clean 2-4 times per year. High-traffic homes may benefit from quarterly deep cleans, while others might need it twice a year.",
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
                href="/deep-clean"
                className="hover:text-emerald-600 transition-colors"
              >
                Deep Clean
              </Link>
              <span>/</span>
              <span className="text-emerald-600 font-semibold">
                {suburbData.name}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
              Deep Cleaning {suburbData.name} - Professional House Deep Clean
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Our {suburbData.name} team tackles the jobs regular cleaning
              leaves behind — inside ovens, grout lines, rangehoods, light
              fittings, and every corner others miss. Hospital-grade products,
              fully insured, and done right the first time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/booking"
                className="bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Free Quote for {suburbData.name}
              </Link>
              <a
                href="tel:+61 452 422 059"
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
                <span className="text-2xl">🧼</span>
                <span className="font-semibold">Hospital-Grade Clean</span>
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
              Why Choose Our Deep Cleaning Services {suburbData.name}?
            </h2>
            <p className="text-xl text-gray-600">
              Our {suburbData.name} cleaners use hospital-grade products and a
              systematic room-by-room method that leaves every surface spotless
              — including the spots you never usually see.
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
              Deep Cleaning Checklist {suburbData.name}
            </h2>
            <p className="text-xl text-gray-600">
              Every room, top to bottom. Here's exactly what our{" "}
              {suburbData.name} team works through on every visit.
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

      {/* Local Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
                  Professional Deep Cleaners {suburbData.name}
                </h2>
                <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                  <p>
                    Our {suburbData.name} team uses hospital-grade products to
                    work through every room methodically — behind appliances,
                    inside cabinetry, grout lines, and ceiling fixtures that
                    get skipped in regular cleans.
                  </p>
                  <p>
                    Whether you're preparing for a rental inspection, settling
                    into a new home, or just want a genuinely thorough clean,
                    we deliver consistent results with no shortcuts.
                  </p>
                  <p>
                    We're familiar with the property types common in{" "}
                    {suburbData.name} — from apartments to family homes — and
                    tailor the clean to suit the space.
                  </p>
                </div>

                <div className="mt-8 bg-gradient-to-br from-emerald-50 to-white p-6 rounded-xl shadow-lg border-l-4 border-emerald-500">
                  <h3 className="font-bold text-gray-900 text-xl mb-3">
                    Perfect for {suburbData.name} Properties:
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      Apartments and units
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      Townhouses and duplexes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      Family homes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      Pre-sale preparation
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-emerald-500 text-white p-8 rounded-2xl shadow-xl">
                  <h3 className="text-2xl font-bold mb-4">
                    {suburbData.name} Pricing
                  </h3>
                  <p className="mb-4 text-emerald-50">
                    Deep cleaning rates for {suburbData.name}
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-emerald-400 pb-2">
                      <span>2BR apartment:</span>
                      <span className="font-bold">From $349</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-emerald-400 pb-2">
                      <span>3BR house:</span>
                      <span className="font-bold">From $499</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>4BR house:</span>
                      <span className="font-bold">From $649</span>
                    </div>
                  </div>
                  <p className="text-sm text-emerald-100 mt-4">
                    *Pricing varies based on property condition
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
      <FAQSection
        faqs={faqs}
        title={`${suburbData.name} Deep Cleaning FAQs`}
        subtitle={`Common questions from ${suburbData.name} residents`}
      />

      {/* Internal Links Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Explore Our Other Services in {suburbData.name}
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link
                  href="/deep-clean"
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all text-center border border-emerald-100 hover:border-emerald-300"
                >
                  <span className="text-2xl mb-2 block">🧼</span>
                  <span className="text-gray-900 font-semibold">
                    Deep Clean Sydney
                  </span>
                </Link>
                <Link
                  href={`/end-of-lease-cleaning/${resolvedParams.suburb}`}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all text-center border border-emerald-100 hover:border-emerald-300"
                >
                  <span className="text-2xl mb-2 block">🏠</span>
                  <span className="text-gray-900 font-semibold">
                    End of Lease {suburbData.name}
                  </span>
                </Link>
                <Link
                  href={`/general-clean/${resolvedParams.suburb}`}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all text-center border border-emerald-100 hover:border-emerald-300"
                >
                  <span className="text-2xl mb-2 block">✨</span>
                  <span className="text-gray-900 font-semibold">
                    General Clean {suburbData.name}
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
              Book Deep Cleaning {suburbData.name} Today
            </h2>
            <p className="text-xl mb-8 text-emerald-50">
              Our {suburbData.name} team scrubs, sanitises, and refreshes
              every room from ceiling to floor — ovens, grout, mould, and
              everything in between. Call now for a free, no-obligation quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Book {suburbData.name} Deep Clean
              </Link>
              <a
                href="tel:+61 452 422 059"
                className="bg-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Call +61 452 422 059
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            LocalBusinessSchema({
              suburbData,
              serviceType: "Deep Cleaning",
              pageUrl,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            ServiceSchema({
              suburbData,
              serviceDetails,
              pageUrl,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            BreadcrumbSchema({
              items: breadcrumbItems,
            }),
          ),
        }}
      />
    </main>
  );
}
