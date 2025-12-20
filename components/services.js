"use client";

export default function Services() {
  const services = [
    {
      icon: "🏠",
      title: "General Cleaning",
      description:
        "Regular house cleaning services to keep your home spotless. Perfect for weekly or fortnightly maintenance.",
      features: [
        "Dusting & Vacuuming",
        "Kitchen & Bathroom",
        "Floor Mopping",
        "Surface Sanitizing",
      ],
      price: "From $120",
      popular: false,
      image: "/general clean.png",
    },
    {
      icon: "✨",
      title: "Deep Cleaning",
      description:
        "Thorough and intensive cleaning that reaches every corner. Ideal for spring cleaning or special occasions.",
      features: [
        "Complete Home Sanitization",
        "Behind Furniture",
        "Inside Appliances",
        "Grout & Tile Cleaning",
      ],
      price: "From $150",
      popular: true,
      image: "/deep cleaning.jpg",
    },
    {
      icon: "🔑",
      title: "End of Lease Cleaning",
      description:
        "Get your bond back guaranteed! Comprehensive cleaning that meets real estate standards.",
      features: [
        "Bond Back Guarantee",
        "Full Property Clean",
        "Carpet Steam Cleaning",
        "Window Cleaning",
      ],
      price: "From $320",
      popular: false,
      image: "/end of lease.jpg",
    },
    {
      icon: "🏢",
      title: "Office Cleaning",
      description:
        "Professional commercial cleaning services for offices, retail spaces, and business premises.",
      features: [
        "After Hours Available",
        "Desk & Surface Cleaning",
        "Restroom Sanitization",
        "Trash Removal",
      ],
      price: "Custom Quote",
      popular: false,
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    },
    {
      icon: "🪟",
      title: "Window Cleaning",
      description:
        "Crystal clear windows inside and out. Professional window cleaning for homes and businesses.",
      features: [
        "Streak-Free Finish",
        "High-Rise Capable",
        "Frame & Sill Cleaning",
        "Screen Cleaning",
      ],
      price: "From $79",
      popular: false,
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
    },
    {
      icon: "🛋️",
      title: "Carpet & Upholstery",
      description:
        "Professional steam cleaning to remove stains, odors, and allergens from carpets and furniture.",
      features: [
        "Steam Cleaning",
        "Stain Removal",
        "Odor Elimination",
        "Fast Drying",
      ],
      price: "From $119",
      popular: false,
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    },
  ];

  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wide">
            Our Services
          </span>
          <h2 className="heading-2 text-gray-900 mt-4 mb-6">
            Professional Cleaning Solutions for Every Need
          </h2>
          <p className="text-xl text-gray-600">
            From regular maintenance to specialized deep cleans, we offer
            comprehensive cleaning services tailored to your requirements in
            Sydney.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                service.popular ? "ring-2 ring-emerald-500" : ""
              }`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 mb-6 -mx-8 -mt-8 rounded-t-2xl overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-5xl bg-white/90 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                  {service.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mb-6">{service.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Price & CTA */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {service.price}
                  </span>
                </div>
                <a
                  href="#booking"
                  className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    service.popular
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                      : "bg-emerald-50 hover:bg-emerald-100 text-emerald-600"
                  }`}
                >
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Need a custom cleaning solution?{" "}
            <a
              href="#booking"
              className="text-emerald-500 font-semibold hover:underline"
            >
              Contact us
            </a>{" "}
            for a personalized quote.
          </p>
        </div>
      </div>
    </section>
  );
}
