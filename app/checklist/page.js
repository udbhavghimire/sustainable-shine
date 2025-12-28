import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";

export const metadata = {
  title: "Cleaning Services Checklist - What's Included | Sustainable Shine",
  description:
    "Detailed checklist of what's included in our general cleaning, deep cleaning, and end of lease cleaning services in Sydney. Compare service inclusions.",
  keywords:
    "cleaning checklist, service inclusions, general cleaning tasks, deep cleaning checklist, end of lease cleaning list, Sydney cleaning services",
  openGraph: {
    title: "Cleaning Services Checklist - What's Included | Sustainable Shine",
    description:
      "Compare our cleaning packages with detailed task breakdowns for all areas of your home.",
    type: "website",
  },
};

export default function ChecklistPage() {
  const checkIcon = (included) =>
    included ? (
      <svg
        className="w-6 h-6 text-emerald-500 mx-auto"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <span className="text-gray-300 mx-auto block text-center">-</span>
    );

  const sections = [
    {
      title: "All Areas",
      icon: "🏠",
      description:
        "Foundational cleaning tasks performed throughout your entire property, covering every room from entrance to exit.",
      tasks: [
        { task: "Dusting", general: true, deep: true, lease: true },
        { task: "Vacuum carpets", general: true, deep: true, lease: true },
        { task: "Sweep & mop floors", general: true, deep: true, lease: true },
        { task: "Clean mirrors", general: true, deep: true, lease: true },
        { task: "Empty rubbish bins", general: true, deep: true, lease: false },
        { task: "Remove cobwebs", general: false, deep: true, lease: true },
        {
          task: "Wipe down skirting boards",
          general: false,
          deep: true,
          lease: true,
        },
        { task: "Dust cornices", general: false, deep: true, lease: true },
        {
          task: "Wipe down doors, frames & handles",
          general: false,
          deep: false,
          lease: true,
        },
        {
          task: "Clean window interiors",
          general: false,
          deep: false,
          lease: true,
        },
        {
          task: "Clean interiors/exteriors of glass doors (1 set)",
          general: false,
          deep: false,
          lease: true,
        },
        {
          task: "Wipe switches & power points",
          general: false,
          deep: false,
          lease: true,
        },
        {
          task: "Clean accessible light fittings",
          general: false,
          deep: false,
          lease: true,
        },
      ],
    },
    {
      title: "Kitchen",
      icon: "🍳",
      description:
        "Comprehensive cleaning of your kitchen from benchtops to appliances, ensuring a hygienic food preparation area.",
      tasks: [
        {
          task: "Stack & run dishwasher",
          general: true,
          deep: true,
          lease: false,
        },
        {
          task: "Wipe down exteriors of appliances",
          general: true,
          deep: true,
          lease: true,
        },
        {
          task: "Clean stovetop & oven exterior",
          general: true,
          deep: true,
          lease: true,
        },
        {
          task: "Wipe cabinet exteriors",
          general: true,
          deep: true,
          lease: true,
        },
        { task: "Clean microwave", general: true, deep: true, lease: true },
        {
          task: "Sanitise splashback & benchtop",
          general: true,
          deep: true,
          lease: true,
        },
        {
          task: "Polish sink and taps",
          general: true,
          deep: true,
          lease: true,
        },
        {
          task: "Oven interior (incl. trays)",
          general: false,
          deep: false,
          lease: true,
        },
        { task: "Clean rangehood", general: false, deep: false, lease: true },
        {
          task: "Wipe cabinet, shelf & drawer interiors",
          general: false,
          deep: false,
          lease: true,
        },
      ],
    },
    {
      title: "Bathroom & Laundry",
      icon: "🚿",
      description:
        "Thorough sanitization of bathrooms and laundry areas, targeting moisture-prone zones and ensuring complete hygiene.",
      tasks: [
        {
          task: "Scrub & sanitise toilet",
          general: true,
          deep: true,
          lease: true,
        },
        {
          task: "Clean & sanitise bathtub & shower",
          general: true,
          deep: true,
          lease: true,
        },
        {
          task: "Wipe down cabinet exteriors",
          general: true,
          deep: true,
          lease: true,
        },
        { task: "Wipe down benchtops", general: true, deep: true, lease: true },
        { task: "Polish sink & taps", general: true, deep: true, lease: true },
        {
          task: "Scrub mineral deposits & mould",
          general: false,
          deep: true,
          lease: true,
        },
        {
          task: "Clean cabinet, shelf & drawer interiors",
          general: false,
          deep: false,
          lease: true,
        },
        {
          task: "Dust accessible extractor fan vents",
          general: false,
          deep: false,
          lease: true,
        },
      ],
    },
    {
      title: "Bedrooms & Living Areas",
      icon: "🛋️",
      description:
        "Detailed cleaning of living spaces and private areas to create a comfortable, dust-free environment.",
      tasks: [
        { task: "Tidy beds", general: true, deep: true, lease: false },
        {
          task: "Dust & wipe down furniture",
          general: true,
          deep: true,
          lease: false,
        },
        {
          task: "Dust & wipe down electronics",
          general: true,
          deep: true,
          lease: false,
        },
        {
          task: "Tidy up shoes, clothes & toys",
          general: true,
          deep: true,
          lease: false,
        },
        {
          task: "Wipe down exteriors of wardrobe & cupboards",
          general: false,
          deep: false,
          lease: true,
        },
        {
          task: "Clean interior of wardrobe & cupboards",
          general: false,
          deep: false,
          lease: true,
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGg1MnYyMEgzNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors group"
            >
              <svg
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="font-medium">Back to Home</span>
            </Link>

            <div className="text-center">
              <div className="inline-block bg-white/20 backdrop-blur-sm text-white font-semibold text-sm uppercase tracking-wide px-4 py-2 rounded-full mb-6">
                Complete Task Breakdown
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Cleaning Services Checklist
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                A comprehensive comparison of tasks included in our General
                Clean, Deep Clean, and End of Lease cleaning services
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-6 mt-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                  <div className="text-3xl font-bold mb-1">50+</div>
                  <div className="text-sm text-white/80">Tasks Covered</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                  <div className="text-3xl font-bold mb-1">4</div>
                  <div className="text-sm text-white/80">Area Categories</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                  <div className="text-3xl font-bold mb-1">3</div>
                  <div className="text-sm text-white/80">Service Levels</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist Content */}
      <section className="section-padding">
        <div className="container-custom max-w-6xl">
          {sections.map((section, sectionIdx) => (
            <div
              key={sectionIdx}
              className="mb-12 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
            >
              {/* Section Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{section.icon}</div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2">{section.title}</h2>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b-2 border-gray-200">
                      <th className="px-6 py-4 text-left font-semibold text-gray-900">
                        Task
                      </th>
                      <th className="px-6 py-4 text-center font-semibold text-gray-900 w-32">
                        <div className="flex flex-col items-center">
                          <span className="text-2xl mb-1">🏠</span>
                          <span>General Clean</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-center font-semibold text-gray-900 w-32">
                        <div className="flex flex-col items-center">
                          <span className="text-2xl mb-1">✨</span>
                          <span>Deep Clean</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-center font-semibold text-gray-900 w-32">
                        <div className="flex flex-col items-center">
                          <span className="text-2xl mb-1">🔑</span>
                          <span>End of Lease</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.tasks.map((item, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                        }`}
                      >
                        <td className="px-6 py-4 text-gray-900 font-medium">
                          {item.task}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {checkIcon(item.general)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {checkIcon(item.deep)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {checkIcon(item.lease)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
          {/* CTA Section */}
          <div className="mt-16 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left side - CTA */}
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-10">
                <h3 className="text-3xl font-bold mb-4">
                  Ready to Book Your Cleaning Service?
                </h3>
                <p className="text-white/90 mb-8 text-lg leading-relaxed">
                  Get an instant quote with our smart calculator. Customize your
                  service with add-ons and schedule your preferred time slot.
                </p>
                <div className="flex flex-col gap-4">
                  <Link
                    href="/booking"
                    className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Get Instant Quote</span>
                  </Link>
                  <Link
                    href="/#services"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
                  >
                    <span>View All Services</span>
                  </Link>
                </div>
              </div>

              {/* Right side - Info */}
              <div className="bg-gray-50 p-10">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">
                  What Makes Us Different?
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-emerald-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">
                        100% Satisfaction Guarantee
                      </h5>
                      <p className="text-gray-600 text-sm">
                        Not happy? We'll re-clean at no extra charge
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">
                        Trained Professionals
                      </h5>
                      <p className="text-gray-600 text-sm">
                        Experienced cleaners with police checks
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">
                        Eco-Friendly Products
                      </h5>
                      <p className="text-gray-600 text-sm">
                        Safe for family, pets, and environment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-purple-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900 mb-1">
                        Flexible Scheduling
                      </h5>
                      <p className="text-gray-600 text-sm">
                        Same-day and weekend appointments
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
