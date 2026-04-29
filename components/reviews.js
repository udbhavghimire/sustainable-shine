"use client";

import { useRef, useState } from "react";

const REVIEWS = [
  {
    author_name: "Chevonne Fabre",
    meta: "Local Guide · 16 reviews",
    time: "2 weeks ago",
    rating: 5,
    text: "Honestly couldn't be happier. He was so lovely, used all natural products (which I really value), and did an incredibly thorough clean. I'm very particular with my standards and he genuinely exceeded them — everything was spotless. Such a great experience overall and I'll definitely be booking again.",
  },
  {
    author_name: "Piyush Rauniyar",
    meta: "2 reviews · 1 photo",
    time: "a week ago",
    rating: 5,
    text: "Had a deep cleaning done by Rupak and his team, and I'm really impressed. They handled everything thoroughly, stayed professional, and were super friendly. They even included oven cleaning for free as a first-time gesture. Definitely recommend them.",
  },
  {
    author_name: "Lucy Hallows",
    meta: "15 reviews",
    time: "2 weeks ago",
    rating: 5,
    text: "The attention to detail and friendly service was amazing by the team — would highly recommend. They did really well on all different surfaces and finishes. The house felt brand new when they were done.",
  },
  {
    author_name: "Marcus Webb",
    meta: "8 reviews",
    time: "3 weeks ago",
    rating: 5,
    text: "Booked a bond clean before moving out and my landlord was genuinely impressed. Got my full deposit back without any issues. The team was punctual, efficient, and left zero corners untouched. Will be using them at my new place too.",
  },
  {
    author_name: "Priya Sharma",
    meta: "Local Guide · 22 reviews",
    time: "1 month ago",
    rating: 5,
    text: "I've tried many cleaning services in Sydney and this one stands out. The eco-friendly products were a huge plus for our family with young kids. Bathrooms and kitchen were gleaming. Booking was easy and the team arrived right on time.",
  },
  {
    author_name: "Tom Nguyen",
    meta: "5 reviews",
    time: "3 weeks ago",
    rating: 5,
    text: "Absolutely brilliant service. Did a move-in clean for us and the entire apartment sparkled. They cleaned inside the cupboards, the oven, the windows — everything. Super professional team and great value for money. Highly recommended.",
  },
  {
    author_name: "Sarah Mitchell",
    meta: "11 reviews · 4 photos",
    time: "1 month ago",
    rating: 5,
    text: "Used Sustainable Shine for a spring deep clean and I'm so glad I did. They were thorough, respectful of our home, and the natural cleaning products left no harsh chemical smell. My place has never looked this good. Already booked them again!",
  },
  {
    author_name: "Daniel Okonkwo",
    meta: "3 reviews",
    time: "2 months ago",
    rating: 5,
    text: "Rupak and the team did an outstanding job on our end-of-lease clean. Real estate agent inspected and approved on the first try — no callbacks needed. Professional, thorough, and great communication throughout. Can't recommend them enough.",
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function InitialAvatar({ name }) {
  const initial = name?.charAt(0).toUpperCase() || "?";
  const colors = [
    "bg-emerald-100 text-emerald-700",
    "bg-sky-100 text-sky-700",
    "bg-violet-100 text-violet-700",
    "bg-amber-100 text-amber-700",
    "bg-rose-100 text-rose-700",
    "bg-teal-100 text-teal-700",
    "bg-indigo-100 text-indigo-700",
    "bg-orange-100 text-orange-700",
  ];
  const colorClass = colors[name?.charCodeAt(0) % colors.length] || colors[0];
  return (
    <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ${colorClass}`}>
      {initial}
    </div>
  );
}

function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  const MAX_CHARS = 160;
  const isLong = review.text?.length > MAX_CHARS;
  const displayText =
    !isLong || expanded ? review.text : review.text.slice(0, MAX_CHARS) + "…";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 h-full hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <InitialAvatar name={review.author_name} />
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 text-sm truncate leading-tight">
              {review.author_name}
            </p>
            <p className="text-xs text-gray-400 truncate">{review.meta}</p>
          </div>
        </div>
        <GoogleLogo />
      </div>

      <div className="flex items-center gap-2">
        <StarRating rating={review.rating} />
        <span className="text-xs text-gray-400">{review.time}</span>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed flex-1">
        {displayText}
        {isLong && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="ml-1 text-emerald-600 font-medium hover:underline focus:outline-none"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </p>
    </div>
  );
}

export default function Reviews({ city }) {
  const cityName = city?.name || "Sydney";
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);
  const startX = useRef(null);

  const total = REVIEWS.length;

  const goTo = (idx) => {
    const clamped = Math.max(0, Math.min(idx, total - 1));
    setCurrent(clamped);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: trackRef.current.offsetWidth * clamped, behavior: "smooth" });
    }
  };

  const onTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(current + (diff > 0 ? 1 : -1));
    startX.current = null;
  };

  const onScroll = () => {
    if (!trackRef.current) return;
    const idx = Math.round(trackRef.current.scrollLeft / trackRef.current.offsetWidth);
    setCurrent(idx);
  };

  return (
    <section id="reviews" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wide">
            Customer Reviews
          </span>
          <h2 className="heading-2 text-gray-900 mt-3 mb-3">
            Trusted by {cityName}&apos;s Homeowners
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl  mx-3 md:mx-auto">
            Real experiences from homes we&apos;ve transformed with care and precision
          </p>

         
        </div>

        {/* Desktop grid — hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>

        {/* Mobile slider — visible only on mobile */}
        <div className="md:hidden">
          <div
            ref={trackRef}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onScroll={onScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {REVIEWS.map((review, i) => (
              <div
                key={i}
                className="snap-center flex-shrink-0 w-[85vw]"
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-5">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 h-2 bg-emerald-500"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Prev / Next arrows */}
          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={() => goTo(current - 1)}
              disabled={current === 0}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-emerald-400 hover:text-emerald-600 disabled:opacity-30 transition-colors"
              aria-label="Previous review"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => goTo(current + 1)}
              disabled={current === total - 1}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:border-emerald-400 hover:text-emerald-600 disabled:opacity-30 transition-colors"
              aria-label="Next review"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Footer link */}
        <div className="text-center mt-10">
          <a
            href="https://www.google.com/maps/place/?q=place_id:ChIJJXgTuwCeGkwR96GzLWdsuGw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-sm hover:underline"
          >
            <GoogleLogo />
            See all reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
}
