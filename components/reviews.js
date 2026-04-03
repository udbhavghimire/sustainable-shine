"use client";

import { useEffect, useRef } from "react";

export default function Reviews({ city }) {
  const cityName = city?.name || "Sydney";
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!widgetRef.current) return;
    if (document.querySelector('script[src*="trustindex.io"]')) return;
    const script = document.createElement("script");
    script.src =
      "https://cdn.trustindex.io/loader.js?f9e0e5c68068773bca662914243";
    script.async = true;
    widgetRef.current.appendChild(script);
  }, []);

  return (
    <section id="reviews" className="section-padding bg-gray-50">
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
        </div>

        <div ref={widgetRef} />
      </div>
    </section>
  );
}
