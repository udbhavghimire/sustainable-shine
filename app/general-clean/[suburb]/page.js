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

export default async function GeneralCleanSuburbPage({ params }) {
  const resolvedParams = await params;
  const suburbData = getSuburbData(resolvedParams.suburb.toLowerCase());

  if (!suburbData) {
    notFound();
  }

  const pageUrl = `https://sustainableshine.com.au/general-clean/${resolvedParams.suburb}`;

  const serviceDetails = {
    type: "General Cleaning",
    name: `General Cleaning ${suburbData.name}`,
    description: `Professional general cleaning service in ${suburbData.name}. Regular house cleaning available weekly, fortnightly, or monthly for homes and apartments.`,
    priceRange: [
      {
        "@type": "PriceSpecification",
        price: "168",
        priceCurrency: "AUD",
        name: "2BR apartment per visit",
      },
      {
        "@type": "PriceSpecification",
        price: "203",
        priceCurrency: "AUD",
        name: "3BR house per visit",
      },
      {
        "@type": "PriceSpecification",
        price: "249",
        priceCurrency: "AUD",
        name: "4BR house per visit",
      },
    ],
  };

  const breadcrumbItems = [
    {
      name: "Home",
      url: "https://sustainableshine.com.au",
    },
    {
      name: "General Clean",
      url: "https://sustainableshine.com.au/general-clean",
    },
    {
      name: suburbData.name,
      url: pageUrl,
    },
  ];

  const localFeatures = [
    {
      title: "Regular Maintenance",
      description: `Keep your ${suburbData.name} home consistently clean`,
      svg: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      title: "Flexible Scheduling",
      description: "Weekly, fortnightly, or monthly service",
      svg: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Transparent Pricing",
      description: `Upfront rates with no hidden fees`,
      svg: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Trusted Team",
      description: "Same cleaners, consistent quality",
      svg: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
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
    <main className="min-h-screen bg-white ">
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
                <Link href="/general-clean" className="hover:text-emerald-600 transition-colors">General Clean</Link>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-emerald-600 font-medium">{suburbData.name}</span>
              </nav>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                General Cleaning<br />
                <span className="text-emerald-600">{suburbData.name}</span>
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
              Professional general cleaning service in {suburbData.name}. Regular house cleaning available weekly, fortnightly, or monthly for homes and apartments.
              </p>

              {/* Mini trust stats */}
              <div className="flex flex-wrap gap-6 mb-10">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium">No lock-in contracts</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium">Eco-friendly products</span>
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
              <div className="absolute inset-0  rounded-bl-[80px]">
                <Image
                  src="/general-clean.png"
                  alt={`General cleaning service in ${suburbData.name}`}
                  fill
                  className="object-cover rounded-bl-[80px]"
                  priority
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute bottom-10 left-[-28px] bg-white rounded-2xl shadow-xl p-5 w-52">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Starting from</p>
                <p className="text-3xl font-bold text-emerald-600">$168</p>
                <p className="text-sm text-gray-500">per visit · 2BR apartment</p>
              </div>
              
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-widest">Why Us</span>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
              Why {suburbData.name} Homes Choose Us
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Consistent, reliable, and thorough — every single visit.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {localFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                  {feature.svg}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-widest">What&apos;s Included</span>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
              General Cleaning Checklist — {suburbData.name}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-5">
              Every visit covers the same thorough checklist so nothing gets
              skipped and your home is always in great shape.
            </p>
            <Link
              href="/checklist"
              className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-sm hover:text-emerald-700 transition-colors"
            >
              View complete checklist
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-emerald-200 transition-colors"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 bg-emerald-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600 text-sm leading-relaxed">{item}</span>
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-widest">Scheduling</span>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
              Choose Your Cleaning Schedule
            </h2>
            <p className="text-lg text-gray-500">Flexible options to suit every lifestyle</p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {/* Weekly */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Weekly</h3>
              <p className="text-gray-500 text-sm mb-6">Perfect for busy {suburbData.name} families</p>
              <ul className="space-y-3">
                {["Always spotless", "Best value per visit", "Priority booking"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/booking" className="mt-8 block text-center text-sm font-semibold text-emerald-600 border border-emerald-200 rounded-xl py-3 hover:bg-emerald-50 transition-colors">
                Book Weekly
              </Link>
            </div>

            {/* Fortnightly — highlighted */}
            <div className="bg-emerald-600 p-8 rounded-2xl shadow-lg relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-gray-900 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Fortnightly</h3>
              <p className="text-emerald-200 text-sm mb-6">Great balance for {suburbData.name} homes</p>
              <ul className="space-y-3">
                {["Regular maintenance", "Great value", "Same cleaner each visit"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-emerald-50">
                    <svg className="w-4 h-4 text-emerald-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/booking" className="mt-8 block text-center text-sm font-semibold text-emerald-700 bg-white rounded-xl py-3 hover:bg-emerald-50 transition-colors">
                Book Fortnightly
              </Link>
            </div>

            {/* Monthly */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Monthly</h3>
              <p className="text-gray-500 text-sm mb-6">Ideal for {suburbData.name} apartments</p>
              <ul className="space-y-3">
                {["Budget-friendly", "Deep refresh", "Flexible scheduling"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/booking" className="mt-8 block text-center text-sm font-semibold text-emerald-600 border border-emerald-200 rounded-xl py-3 hover:bg-emerald-50 transition-colors">
                Book Monthly
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Local Info Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start">

              {/* Left — text */}
              <div>
                <span className="text-emerald-600 font-semibold text-sm uppercase tracking-widest">Local Experts</span>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mt-3 mb-6">
                  Trusted House Cleaners in {suburbData.name}
                </h2>
                <div className="space-y-4 text-gray-500 leading-relaxed">
                  <p>
                    Our {suburbData.name} cleaners work on a schedule that suits you — weekly,
                    fortnightly, or monthly — with the same person every visit so they
                    learn your home and your preferences.
                  </p>
                  <p>
                    Whether you&apos;re a busy professional, a growing family, or simply
                    someone who&apos;d rather spend their weekend doing something else, we
                    keep your home fresh, tidy, and welcoming.
                  </p>
                  <p>
                    We&apos;re familiar with the apartments, townhouses, and family homes
                    common across {suburbData.name} and adjust our approach to each property.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {["Busy professionals", "Families with children", "Apartment dwellers", "Anyone wanting consistency"].map((item) => (
                    <div key={item} className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3">
                      <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — pricing + location */}
              <div className="space-y-5">
                {/* Pricing card */}
                <div className="border-3 border-green-700 text-white p-8 rounded-2xl">
                  <p className="text-black text-sm font-semibold uppercase tracking-widest mb-2">Pricing</p>
                  <h3 className="text-2xl font-bold mb-6">{suburbData.name} Rates</h3>
                  <div className="space-y-4 ">
                    {[
                      { label: "2-bedroom apartment", price: "$169" },
                      { label: "3-bedroom house", price: "$203" },
                      { label: "4-bedroom house", price: "$249" },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between border-b border-gray-700 pb-4 last:border-0 last:pb-0">
                        <span className="text-black text-sm">{row.label}</span>
                        <span className="font-bold text-lg">
                          From <span className="text-green-800">{row.price}</span>
                          <span className="text-black text-sm font-normal">/visit</span>
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-500 text-xs mt-5">
                    Discounts available for weekly &amp; fortnightly bookings
                  </p>
                </div>

                {/* Location card */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{suburbData.fullName}</p>
                    <p className="text-gray-500 text-sm">Postcode: {suburbData.postcode}</p>
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
        title={`${suburbData.name} General Cleaning FAQs`}
        subtitle={`Common questions from ${suburbData.name} residents`}
      />

      {/* Internal Links Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Other Services in {suburbData.name}
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { href: "/general-clean", label: "General Clean Sydney", icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                )},
                { href: `/end-of-lease-cleaning/${resolvedParams.suburb}`, label: `End of Lease — ${suburbData.name}`, icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                )},
                { href: `/deep-clean/${resolvedParams.suburb}`, label: `Deep Clean — ${suburbData.name}`, icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                )},
              ].map(({ href, label, icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="bg-white flex items-center gap-3 p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group"
                >
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    {icon}
                  </div>
                  <span className="text-gray-800 font-semibold text-sm">{label}</span>
                  <svg className="w-4 h-4 text-gray-300 ml-auto group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-emerald-400 font-semibold text-sm uppercase tracking-widest">Get Started</span>
            <h2 className="text-2xl md:text-4xl font-bold mt-3 mb-5">
              Book House Cleaning in {suburbData.name} Today
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Same cleaner every visit. No lock-in contracts. Weekly, fortnightly, or monthly — on your schedule.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-emerald-500 transition-all duration-200 shadow-lg"
              >
                Book {suburbData.name} Cleaning
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="tel:+61452422059"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-white/20 transition-all duration-200 border border-white/10"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                0452 422 059
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
              serviceType: "General Cleaning",
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
