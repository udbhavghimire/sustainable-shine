"use client";

import { useEffect } from "react";

export default function Reviews({ city }) {
  const cityName = city?.name || "Sydney";

  useEffect(() => {
    if (!document.querySelector('script[src*="elfsightcdn.com"]')) {
      const script = document.createElement("script");
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }

    const observer = new MutationObserver(() => {
      const badge = document.querySelector('a[href*="elfsight.com/google-reviews-widget"]');
      if (badge) {
        badge.remove();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
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
        <div style={{ position: "relative" }}>
          <div
            className="elfsight-app-900ce444-fed5-47aa-beec-98e5591c100c"
            data-elfsight-app-lazy="true"
          />
          {/* Overlay to hide Elfsight free-plan badge at bottom of widget */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40px",
              backgroundColor: "#f9fafb",
              zIndex: 10,
            }}
          />
        </div>
      </div>
    </section>
  );
}
