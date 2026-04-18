"use client";

import { useEffect } from "react";

export default function Reviews({ city }) {
  const cityName = city?.name || "Sydney";

  useEffect(() => {
    if (document.querySelector('script[src*="elfsightcdn.com"]')) return;
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);
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

        {/* Elfsight Google Reviews | Untitled Google Reviews */}
        <div
          className="elfsight-app-900ce444-fed5-47aa-beec-98e5591c100c"
          data-elfsight-app-lazy="true"
        />
      </div>
    </section>
  );
}
