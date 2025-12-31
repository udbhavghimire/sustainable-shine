"use client";

import { useState, useEffect } from "react";

export default function Reviews({ city }) {
  const cityName = city?.name || "Sydney";
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      name: "Sarah Johnson",
      location: "Bondi, Sydney",
      rating: 5,
      text: "Absolutely fantastic service! The team arrived on time, were incredibly professional, and left my apartment spotless. I've used them for both regular cleaning and a deep clean before moving - couldn't be happier!",
      image: "👩",
      service: "Deep Cleaning",
    },
    {
      name: "Michael Chen",
      location: "Parramatta, Sydney",
      rating: 5,
      text: "Best cleaning service in Sydney hands down. They did an end of lease clean for me and I got my full bond back! The attention to detail was impressive. Highly recommend!",
      image: "👨",
      service: "End of Lease Cleaning",
    },
    {
      name: "Emma Thompson",
      location: "Manly, Sydney",
      rating: 5,
      text: "I love that they use eco-friendly products - important to me as I have young children. The cleaners are always friendly and do an amazing job. Have been using them monthly for over a year now.",
      image: "👩‍🦰",
      service: "General Cleaning",
    },
    {
      name: "David Patel",
      location: "Surry Hills, Sydney",
      rating: 5,
      text: "Excellent office cleaning service! They work after hours so they don't disrupt our business. Always thorough and reliable. Great value for money.",
      image: "👨‍💼",
      service: "Office Cleaning",
    },
    {
      name: "Lisa Martinez",
      location: "Chatswood, Sydney",
      rating: 5,
      text: "The carpet cleaning service was outstanding! My carpets look brand new. They removed stains I thought were permanent. Very professional team and great customer service.",
      image: "👩‍💻",
      service: "Carpet Cleaning",
    },
    {
      name: "James Wilson",
      location: "Newtown, Sydney",
      rating: 5,
      text: "Quick response, reasonable pricing, and exceptional results. They did a spring clean of my house and every room was immaculate. Will definitely be booking again!",
      image: "🧑",
      service: "Deep Cleaning",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, i) => (
      <svg
        key={i}
        className="w-5 h-5 text-yellow-400 fill-current"
        viewBox="0 0 20 20"
      >
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
      </svg>
    ));
  };

  return (
    <section
      id="reviews"
      className="section-padding bg-gradient-to-br from-emerald-50 to-white"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wide">
            Testimonials
          </span>
          <h2 className="heading-2 text-gray-900 mt-4 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600">
            Don't just take our word for it - hear from our satisfied customers
            across {cityName}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {reviews.slice(0, 3).map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Stars */}
              <div className="flex mb-4">{renderStars(review.rating)}</div>

              {/* Review Text */}
              <p className="text-gray-700 mb-6 italic leading-relaxed">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4 border-t border-gray-100 pt-6">
                <div className="text-4xl">{review.image}</div>
                <div>
                  <div className="font-bold text-gray-900">{review.name}</div>
                  <div className="text-sm text-gray-500">{review.location}</div>
                  <div className="text-xs text-emerald-600 mt-1">
                    {review.service}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Review Carousel */}
        <div className="relative bg-white rounded-3xl shadow-2xl p-12 max-w-4xl mx-auto overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full -mr-32 -mt-32 opacity-50"></div>

          {reviews.map((review, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                index === activeIndex
                  ? "opacity-100"
                  : "opacity-0 absolute inset-0 p-12"
              }`}
            >
              {/* Quote Icon */}
              <svg
                className="w-12 h-12 text-emerald-500 mb-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              {/* Review Content */}
              <p className="text-2xl text-gray-700 mb-8 leading-relaxed">
                {review.text}
              </p>

              {/* Stars */}
              <div className="flex mb-6">{renderStars(review.rating)}</div>

              {/* Author Info */}
              <div className="flex items-center space-x-4">
                <div className="text-5xl">{review.image}</div>
                <div>
                  <div className="font-bold text-xl text-gray-900">
                    {review.name}
                  </div>
                  <div className="text-gray-500">{review.location}</div>
                  <div className="text-sm text-emerald-600 mt-1">
                    {review.service}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Carousel Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-emerald-500 w-8" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-500">4.9/5</div>
              <div className="text-gray-600 mt-2">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-500">5000+</div>
              <div className="text-gray-600 mt-2">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-500">98%</div>
              <div className="text-gray-600 mt-2">Return Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-500">100%</div>
              <div className="text-gray-600 mt-2">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
