import Link from "next/link";
import Image from "next/image";
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
  FAQPageSchema,
} from "@/components/schema-markup";

export async function generateStaticParams() {
  const slugs = getAllSuburbSlugs();
  return slugs.map((suburb) => ({
    suburb,
  }));
}

export default async function EndOfLeaseCleaningSuburbPage({ params }) {
  const resolvedParams = await params;
  const suburbData = getSuburbData(resolvedParams.suburb.toLowerCase());

  if (!suburbData) {
    notFound();
  }

  const pageUrl = `https://sustainableshine.com.au/end-of-lease-cleaning/${resolvedParams.suburb}`;

  const serviceDetails = {
    type: "End of Lease Cleaning",
    name: `End of Lease Cleaning ${suburbData.name}`,
    description: `Professional end of lease cleaning service in ${suburbData.name} with 100% bond back guarantee. Expert bond cleaners for apartments, houses, and units.`,
    priceRange: [
      {
        "@type": "PriceSpecification",
        price: "388",
        priceCurrency: "AUD",
        name: "Studio/1BR apartment",
      },
      {
        "@type": "PriceSpecification",
        price: "428",
        priceCurrency: "AUD",
        name: "2BR apartment",
      },
      {
        "@type": "PriceSpecification",
        price: "523",
        priceCurrency: "AUD",
        name: "3BR house",
      },
      {
        "@type": "PriceSpecification",
        price: "643",
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
      name: "End of Lease Cleaning",
      url: "https://sustainableshine.com.au/end-of-lease-cleaning",
    },
    {
      name: suburbData.name,
      url: pageUrl,
    },
  ];

  const localFeatures = [
    {
      icon: "✓",
      title: "100% Bond Back Guarantee",
      description: `Full bond return guarantee for ${suburbData.name} properties`,
    },
    {
      icon: "⏰",
      title: "Same-Day Service",
      description: `Fast turnaround available in ${suburbData.name}`,
    },
    {
      icon: "📋",
      title: "Real Estate Approved",
      description: `Trusted by ${suburbData.name} property managers`,
    },
    {
      icon: "🌿",
      title: "Eco-Friendly Products",
      description: "Safe, non-toxic cleaning solutions",
    },
  ];

  const checklist = [
    "Complete kitchen cleaning including oven, stovetop, and rangehood",
    "Bathroom sanitization and mold removal",
    "Window and window track cleaning",
    "Wall washing and mark removal",
    "Carpet steam cleaning and stain removal",
    "Cupboard interior and exterior cleaning",
    "Light fittings and ceiling fan cleaning",
    "Skirting board and door frame wiping",
    "Balcony and outdoor area cleaning",
    "Garage and storage area sweep",
  ];

  const faqs = [
    {
      question: `Do you service all areas of ${suburbData.name}?`,
      answer: `Yes! We provide end of lease cleaning throughout ${suburbData.name} and surrounding areas. Our team is familiar with ${suburbData.name} properties and can reach you quickly.`,
    },
    {
      question: `How quickly can you clean my ${suburbData.name} property?`,
      answer: `We offer same-day service for urgent bookings in ${suburbData.name}. Typically, a 2-bedroom apartment takes 4-5 hours. We're familiar with ${suburbData.name}'s property types and can work efficiently.`,
    },
    {
      question: `Do you know what ${suburbData.name} property managers require?`,
      answer: `Absolutely! We've worked with numerous ${suburbData.name} real estate agencies. We know their standards and ensure every aspect meets bond return requirements.`,
    },
    {
      question: "What does end of lease cleaning include?",
      answer:
        "Our service covers everything: full kitchen deep clean (including oven and rangehood), complete bathroom sanitization, carpet steam cleaning, wall washing, window cleaning, cupboard cleaning, and all other areas to ensure bond return.",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section — split layout */}
      <section className="relative bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 min-h-[600px] items-center gap-0">

            {/* Left — text */}
            <div className="py-24 lg:py-30 lg:pr-12">
              {/* Breadcrumbs */}
              <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                <Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <Link href="/end-of-lease-cleaning" className="hover:text-emerald-600 transition-colors">End of Lease Cleaning</Link>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-emerald-600 font-medium">{suburbData.name}</span>
              </nav>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                End of Lease Cleaning<br />
                <span className="text-emerald-600">{suburbData.name}</span>
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                We help {suburbData.name} tenants get their full bond back. Our team follows the REIQ cleaning checklist and knows exactly what local property managers look for — so your final inspection passes first time.
              </p>

              {/* Mini trust stats */}
              <div className="flex flex-wrap gap-6 mb-10">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium">Bond back guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium">Same-day available</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium">Insured &amp; vetted team</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-7 py-4 rounded-xl font-semibold text-base hover:bg-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Get Free Quote
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <a
                  href="tel:+61452422059"
                  className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 px-7 py-4 rounded-xl font-semibold text-base border border-gray-200 hover:border-emerald-400 hover:text-emerald-700 transition-all duration-200 shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  0452 422 059
                </a>
              </div>
            </div>

            {/* Right — image */}
            <div className="relative hidden lg:block h-full min-h-[600px]">
              <div className="absolute inset-0 rounded-bl-[80px]">
                <Image
                  src="/end-of-lease.jpg"
                  alt={`End of lease cleaning service in ${suburbData.name}`}
                  fill
                  className="object-cover rounded-bl-[80px]"
                  priority
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute bottom-10 left-[-28px] bg-white rounded-2xl shadow-xl p-5 w-52">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Starting from</p>
                <p className="text-3xl font-bold text-emerald-600">$388</p>
                <p className="text-sm text-gray-500">per visit · Studio/1BR</p>
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
              Why Choose Our End of Lease Cleaning {suburbData.name}?
            </h2>
            <p className="text-xl text-gray-600">
              We know what {suburbData.name} property managers expect and
              deliver results that hold up to the strictest final inspections
              — backed by our bond-back guarantee.
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

      {/* Checklist Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                End of Lease Cleaning Checklist {suburbData.name}
              </h2>
              <p className="text-xl text-gray-600">
                We work through every room on the full REIQ checklist. Here's
                what's included in every {suburbData.name} end of lease clean.
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

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-4">
                {checklist.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg hover:bg-emerald-50 transition-colors"
                  >
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
                  </div>
                ))}
              </div>
            </div>
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
                  Professional End of Lease Cleaners {suburbData.name}
                </h2>
                <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                  <p>
                    Our {suburbData.name} team prepares rental properties for
                    final inspection. We understand local real estate standards
                    and make sure every detail — from oven racks to fly
                    screens — meets property manager requirements.
                  </p>
                  <p>
                    Whether you're vacating an apartment, house, or unit, we
                    provide a thorough, documented clean that gives you
                    confidence going into the inspection. We're familiar with
                    the property management companies common in{" "}
                    {suburbData.name} and their specific expectations.
                  </p>
                  <p>
                    From kitchen deep cleans to bathroom sanitisation and
                    carpet cleaning, everything is covered. Move out with
                    confidence knowing your bond is protected.
                  </p>
                </div>

                <div className="mt-8 bg-gradient-to-br from-emerald-50 to-white p-6 rounded-xl shadow-lg border-l-4 border-emerald-500">
                  <h3 className="font-bold text-gray-900 text-xl mb-3">
                    {suburbData.name} Service Details:
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      Full service coverage in {suburbData.name}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      Same-day service available
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      Bond back guarantee
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-500">✓</span>
                      All property types
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-emerald-500 text-white p-8 rounded-2xl shadow-xl">
                  <h3 className="text-2xl font-bold mb-4">Quick Quote</h3>
                  <p className="mb-4 text-emerald-50">
                    Pricing for {suburbData.name} properties
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-emerald-400 pb-2">
                      <span>Studio/1BR apartment:</span>
                      <span className="font-bold">From $388</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-emerald-400 pb-2">
                      <span>2BR apartment:</span>
                      <span className="font-bold">From $428</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-emerald-400 pb-2">
                      <span>3BR house:</span>
                      <span className="font-bold">From $523</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>4BR house:</span>
                      <span className="font-bold">From $643</span>
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
        title={`${suburbData.name} End of Lease FAQs`}
        subtitle={`Common questions from ${suburbData.name} tenants`}
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
                  href="/end-of-lease-cleaning"
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all text-center border border-emerald-100 hover:border-emerald-300"
                >
                  <span className="text-2xl mb-2 block">🏠</span>
                  <span className="text-gray-900 font-semibold">
                    End of Lease Sydney
                  </span>
                </Link>
                <Link
                  href={`/deep-clean/${resolvedParams.suburb}`}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all text-center border border-emerald-100 hover:border-emerald-300"
                >
                  <span className="text-2xl mb-2 block">🧼</span>
                  <span className="text-gray-900 font-semibold">
                    Deep Clean {suburbData.name}
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
              Book End of Lease Cleaning {suburbData.name} Today
            </h2>
            <p className="text-xl mb-8 text-emerald-50">
              Our {suburbData.name} team is available for same-day and weekend
              bookings. We follow the full REIQ checklist and back every clean
              with our bond-back guarantee. Call now for a free quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Book {suburbData.name} Cleaning
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
              serviceType: "End of Lease Cleaning",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(FAQPageSchema({ faqs })),
        }}
      />
    </main>
  );
}
