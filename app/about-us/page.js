import Link from "next/link";

const team = [
  {
    name: "Udbhav Ghimire",
    role: "Technical Lead",
    image: "/udbhav.png",
    initials: "U",
    bio: "Udbhav drives the technology behind Sustainable Shine — from our seamless online booking platform to digital operations. His passion for tech helps the team stay efficient, organized, and always one step ahead in delivering a smooth customer experience.",
    linkedin: "#",
  },
  {
    name: "Rupak Ghimire",
    role: "Founder & Operational Manager",
    image: "/Rupak.png",
    initials: "R",
    bio: "Rupak founded Sustainable Shine with a vision to bring eco-friendly, professional cleaning to Sydney homes and businesses. With years of hands-on experience in the cleaning industry, he oversees all day-to-day operations, ensuring every job meets the highest standards.",
    linkedin: "#",
  },

  {
    name: "Nishan Shahi",
    role: "Cleaning & Quality Supervisor",
    image: "/Nishan.png",
    initials: "N",
    bio: "Nishan ensures every clean lives up to the Sustainable Shine promise. As our Quality Supervisor, he trains our cleaning crew, conducts quality checks, and makes sure every home and office we service is left spotless — every single time.",
    linkedin: "#",
  },
];

const values = [
  {
    icon: (
      <svg
        className="w-7 h-7"
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
    title: "Eco-Friendly Products",
    description:
      "We use only sustainable, non-toxic products that are safe for your family, pets, and the planet.",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
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
    title: "Vetted Professionals",
    description:
      "Every team member is background-checked, fully trained, and insured so you can clean with confidence.",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
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
    title: "100% Satisfaction",
    description:
      "Not happy? We'll come back and re-clean at no extra cost. Your satisfaction is our guarantee.",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
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
      "Book online in minutes with same-day availability. We work around your schedule, not ours.",
  },
];

const stats = [
  { value: "3+", label: "Years in Business" },
  { value: "500+", label: "Happy Customers" },
  { value: "10+", label: "Expert Cleaners" },
  { value: "100%", label: "Satisfaction Rate" },
];

export default function AboutUsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-400 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full animate-blob" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full animate-blob animation-delay-2000" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wide uppercase">
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            About Sustainable Shine
          </h1>
          <p className="text-lg md:text-xl text-emerald-50 max-w-2xl mx-auto leading-relaxed">
            Sydney's most trusted eco-friendly cleaning service — built by
            people who genuinely care about cleaner homes and a cleaner planet.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/booking"
              className="px-8 py-3 bg-white text-emerald-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              Book a Clean
            </Link>
            <a
              href="#meet-team"
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-200"
            >
              Meet the Team
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="container-custom py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-extrabold text-emerald-500">
                  {stat.value}
                </div>
                <div className="text-gray-500 mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wide">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3 mb-6 leading-tight">
                Born in Sydney, Built on Trust
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Sustainable Shine started with a simple idea: every home
                  deserves a professional clean that doesn't harm the
                  environment. What began as a small local operation has grown
                  into one of Sydney's most reliable and eco-conscious cleaning
                  companies.
                </p>
                <p>
                  We believe a spotless home shouldn't come at the cost of your
                  family's health or the planet. That's why every product we
                  use, every process we follow, and every team member we hire
                  reflects our commitment to doing things the right way.
                </p>
                <p>
                  From end-of-lease deep cleans to regular home maintenance, we
                  bring the same level of care and precision to every single
                  job. Our customers aren't just clients — they're partners in
                  building cleaner, healthier spaces.
                </p>
              </div>
              <Link
                href="/booking"
                className="inline-block mt-8 px-8 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Get a Free Quote
              </Link>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {values.map((value, i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section id="meet-team" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-14">
            <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wide">
              The People Behind the Clean
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              We're a small but passionate crew dedicated to making your space
              shine — every time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Photo */}
                <div className="relative h-84 overflow-hidden bg-emerald-50">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-400 to-teal-500">
                      <span className="text-7xl font-extrabold text-white/80 select-none">
                        {member.initials}
                      </span>
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>

                {/* Info */}
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-xl font-extrabold text-gray-900">
                      {member.name}
                    </h3>
                    <span className="inline-block mt-1 text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-0.5 rounded-full">
                      {member.role}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Divider */}
                  <div className="mt-5 pt-5 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-500">
                      <svg
                        className="w-5 h-5"
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
                      <span className="text-sm font-medium text-gray-600">
                        Sustainable Shine Team
                      </span>
                    </div>
                    <a
                      href={member.linkedin}
                      className="w-8 h-8 bg-gray-100 hover:bg-emerald-500 text-gray-500 hover:text-white rounded-lg flex items-center justify-center transition-colors duration-200"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl p-10 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Ready for a Cleaner Home?
            </h2>
            <p className="text-emerald-50 text-lg max-w-xl mx-auto mb-8">
              Join hundreds of happy Sydney households who trust Sustainable
              Shine for a sparkling clean, every time.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/booking"
                className="px-8 py-3.5 bg-white text-emerald-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                Book a Clean Today
              </Link>
              <a
                href="tel:+61452422059"
                className="px-8 py-3.5 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +61 452 422 059
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
