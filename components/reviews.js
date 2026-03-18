"use client";

export default function Reviews({ city }) {
  const cityName = city?.name || "Sydney";

  // Google Maps Business URL - Reviews Page
  const googleReviewsUrl =
    "https://www.google.com/maps/place/Sustainable+Shine+Cleaning+Services/@-33.8483996,151.0309815,17z/data=!3m1!4b1!4m6!3m5!1s0x4c1a9e00bb137825:0x6cb86c672db3a1f7!8m2!3d-33.8484041!4d151.0335564!16s%2Fg%2F11xynjbz5t?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D";

  const reviews = [
    {
      name: "Sarah Johnson",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      text: "Absolutely fantastic service! The team arrived on time, were incredibly professional, and left my apartment spotless. I've used them for both regular cleaning and a deep clean before moving - couldn't be happier!",
      date: "2 weeks ago",
    },
    {
      name: "Michael Chen",
      avatar:
        "https://ui-avatars.com/api/?name=Michael+Chen&background=34A853&color=fff&size=80",
      rating: 5,
      text: "Best cleaning service in Sydney hands down. They did an end of lease clean for me and I got my full bond back!",
      date: "3 weeks ago",
    },
    {
      name: "Emma Thompson",
      avatar:
        "https://ui-avatars.com/api/?name=Emma+Thompson&background=5A65C6&color=fff&size=80",
      rating: 5,
      text: "I love that they use eco-friendly products - important to me as I have young children. The cleaners are always friendly and do an amazing job.",
      date: "1 month ago",
    },
    {
      name: "David Lee",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      text: "Excellent office cleaning service! They work after hours so they don't disrupt our business. Always thorough and reliable.",
      date: "1 month ago",
    },
    {
      name: "Lisa Martinez",
      avatar:
        "https://ui-avatars.com/api/?name=Lisa+Martinez&background=9C27B0&color=fff&size=80",
      rating: 5,
      text: "The carpet cleaning service was outstanding! My carpets look brand new. They removed stains I thought were permanent.",
      date: "2 months ago",
    },
    {
      name: "James Wilson",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg",
      rating: 5,
      text: "Quick response, reasonable pricing, and exceptional results. They did a spring clean of my house and every room was immaculate. Will definitely be booking again!",
      date: "2 months ago",
    },
    {
      name: "Amanda Foster",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 5,
      text: "Highly recommend! Professional team and efficient service.",
      date: "3 months ago",
    },
    {
      name: "Rohan Patel",
      avatar:
        "https://ui-avatars.com/api/?name=Robert+Lee&background=8BC34A&color=fff&size=80",
      rating: 5,
      text: "Great experience from start to finish. Easy booking process and the cleaning was top-notch.",
      date: "3 months ago",
    },
  ];

  const averageRating = 4.9;
  const totalReviews = 247;

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-[#FBBC04]" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section id="reviews" className="section-padding bg-gray-50">
      <div className="container-custom max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Trusted by Sydney's Homeowners
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Real experiences from homes we’ve transformed with care and
            precision
          </p>
        </div>

        {/* Reviews Grid - Masonry Style */}
        <div className="columns-2 lg:columns-3 xl:columns-4 gap-3 md:gap-4 mb-8">
          {reviews.map((review, index) => (
            <a
              key={index}
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg md:rounded-xl p-3 md:p-5 border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200 cursor-pointer group mb-3 md:mb-4 break-inside-avoid inline-block w-full"
            >
              {/* Header */}
              <div className="flex items-start gap-2 md:gap-3 mb-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs md:text-sm font-semibold text-gray-900 truncate leading-tight">
                    {review.name}
                  </h4>
                  <p className="text-[10px] md:text-xs text-gray-500 mt-0.5">
                    {review.date}
                  </p>
                </div>
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 text-[#4285F4] flex-shrink-0"
                  viewBox="0 0 48 48"
                  fill="currentColor"
                >
                  <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
                </svg>
              </div>

              {/* Stars */}
              <div className="mb-2 md:mb-3 flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-3 h-3 md:w-4 md:h-4 text-[#FBBC04]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[11px] md:text-sm text-gray-700 leading-relaxed">
                {review.text}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
