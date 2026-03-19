"use client";

import Link from "next/link";
import Image from "next/image";

export default function AreasWeServe() {
  const topSuburbs = [
    {
      name: "Bondi",
      slug: "bondi",
      image: "/suburbs/bondi.jpeg",
      description: "Iconic beach suburb with vibrant lifestyle",
    },
    {
      name: "Sydney CBD",
      slug: "sydney-cbd",
      image: "/suburbs/sydney-cbd.jpg",
      description: "Heart of Sydney's business district",
    },
    {
      name: "Parramatta",
      slug: "parramatta",
      image: "/suburbs/parramatta.webp",
      description: "Western Sydney's major hub",
    },
    {
      name: "Chatswood",
      slug: "chatswood",
      image: "/suburbs/chatswood.jpg",
      description: "North Shore shopping and residential area",
    },
    {
      name: "Surry Hills",
      slug: "surry-hills",
      image: "/suburbs/surry-hills.jpg",
      description: "Trendy inner-city neighborhood",
    },
    {
      name: "Manly",
      slug: "manly",
      image: "/suburbs/manly.jpg",
      description: "Beautiful beachside community",
    },
    {
      name: "Newtown",
      slug: "newtown",
      image: "/suburbs/newtown.webp",
      description: "Bohemian and artistic hub",
    },
    {
      name: "North Sydney",
      slug: "north-sydney",
      image: "/suburbs/north-sydney.webp",
      description: "Commercial and residential district",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wide">
            Service Areas
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Areas We Serve Across Sydney
          </h2>
          <p className="text-xl text-gray-600">
            Professional cleaning services available in all major Sydney
            suburbs. From Bondi to Parramatta, we're here to make your home
            sparkle.
          </p>
        </div>

        {/* Suburbs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {topSuburbs.map((suburb, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Suburb Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-emerald-100 to-emerald-200">
                <Image
                  src={suburb.image}
                  alt={`${suburb.name} - Cleaning Services`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* Suburb name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                    {suburb.name}
                  </h3>
                </div>
              </div>

              {/* Services Links */}
              <div className="p-2 space-y-2">
                <Link
                  href={`/general-clean/${suburb.slug}`}
                  className="block text-gray-700 hover:text-emerald-500 px-3 rounded-lg transition-colors"
                >
                  <span className="font-normal text-sm">
                    General Clean in {suburb.name}
                  </span>
                </Link>
                <Link
                  href={`/deep-clean/${suburb.slug}`}
                  className="block text-gray-700 hover:text-emerald-500 px-3 rounded-lg transition-colors"
                >
                  <span className="font-normal text-sm">
                    Deep Clean in {suburb.name}
                  </span>
                </Link>
                <Link
                  href={`/end-of-lease-cleaning/${suburb.slug}`}
                  className="block text-gray-700 hover:text-emerald-500 px-3 rounded-lg transition-colors"
                >
                  <span className="font-normal text-sm">
                    End of Lease Cleaning in {suburb.name}
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Don't see your suburb listed? We service all Sydney areas!
          </p>
          <Link
            href="/booking"
            className="inline-block bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Book Your Cleaning Now
          </Link>
        </div>
      </div>
    </section>
  );
}
