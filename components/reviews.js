"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

const PLACE_ID = "ChIJJXgTuwCeGkwR96GzLWdsuGw";
const API_KEY = "AIzaSyD7GcQSZTXlv7we_-dOZofKl0gK0yR5W7I";

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

function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  const MAX_CHARS = 180;
  const isLong = review.text?.length > MAX_CHARS;
  const displayText =
    !isLong || expanded ? review.text : review.text.slice(0, MAX_CHARS) + "…";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-3">
        {review.profile_photo_url ? (
          <Image
            src={review.profile_photo_url}
            alt={review.author_name}
            width={44}
            height={44}
            className="rounded-full object-cover"
            unoptimized
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-lg flex-shrink-0">
            {review.author_name?.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-gray-900 text-sm truncate">
            {review.author_name}
          </p>
          <p className="text-xs text-gray-400">{review.relative_time_description}</p>
        </div>
        <GoogleLogo />
      </div>

      <StarRating rating={review.rating} />

      <p className="text-gray-600 text-sm leading-relaxed">
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

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-gray-200 rounded w-28" />
          <div className="h-2 bg-gray-100 rounded w-16" />
        </div>
      </div>
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-200 rounded" />
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
        <div className="h-3 bg-gray-100 rounded w-4/6" />
      </div>
    </div>
  );
}

function loadGoogleMapsScript() {
  return new Promise((resolve, reject) => {
    if (window.google?.maps?.places) {
      resolve();
      return;
    }
    const existing = document.querySelector('script[data-gmaps-reviews]');
    if (existing) {
      existing.addEventListener("load", resolve);
      existing.addEventListener("error", reject);
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.dataset.gmapsReviews = "true";
    script.addEventListener("load", resolve);
    script.addEventListener("error", () => reject(new Error("Failed to load Google Maps")));
    document.head.appendChild(script);
  });
}

export default function Reviews({ city }) {
  const cityName = city?.name || "Sydney";
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(null);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapDivRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchReviews() {
      try {
        await loadGoogleMapsScript();
        if (cancelled) return;

        const map = new window.google.maps.Map(mapDivRef.current, {
          center: { lat: -33.85, lng: 151.01 },
          zoom: 15,
        });

        const service = new window.google.maps.places.PlacesService(map);

        service.getDetails(
          {
            placeId: PLACE_ID,
            fields: ["reviews", "rating", "user_ratings_total"],
          },
          (place, status) => {
            if (cancelled) return;
            if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
              setError("Could not load reviews at this time.");
              setLoading(false);
              return;
            }
            const sorted = (place.reviews || [])
              .filter((r) => r.rating >= 4)
              .sort((a, b) => b.rating - a.rating || b.time - a.time);
            setReviews(sorted);
            setRating(place.rating);
            setTotal(place.user_ratings_total);
            setLoading(false);
          }
        );
      } catch (err) {
        if (!cancelled) {
          console.error("Google Places error:", err);
          setError("Could not load reviews at this time.");
          setLoading(false);
        }
      }
    }

    fetchReviews();
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="reviews" className="section-padding bg-gray-50">
      {/* Hidden map div required by PlacesService */}
      <div ref={mapDivRef} style={{ display: "none" }} aria-hidden="true" />

      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wide">
            Customer Reviews
          </span>
          <h2 className="heading-2 text-gray-900 mt-4 mb-4">
            Trusted by {cityName}&apos;s Homeowners
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Real experiences from homes we&apos;ve transformed with care and
            precision
          </p>

          {rating && total && (
            <div className="inline-flex items-center gap-2 mt-6 bg-white border border-gray-100 shadow-sm rounded-full px-5 py-2.5">
              <StarRating rating={Math.round(rating)} />
              <span className="font-bold text-gray-900">{rating.toFixed(1)}</span>
              <span className="text-gray-400 text-sm">·</span>
              <span className="text-gray-500 text-sm">{total} Google reviews</span>
            </div>
          )}
        </div>

        {error && (
          <p className="text-center text-gray-400 text-sm">{error}</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            : reviews.map((review, i) => <ReviewCard key={i} review={review} />)}
        </div>

        {!loading && reviews.length === 0 && !error && (
          <p className="text-center text-gray-400 text-sm mt-4">No reviews found.</p>
        )}

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
