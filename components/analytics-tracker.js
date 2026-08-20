"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView, trackClick } from "@/lib/analytics";

const CTA_TEXT_RE =
  /book\s*now|get\s*(a\s*)?(free\s*)?quote|free\s*quote|get\s*quote/i;

function isAdminPath(pathname) {
  return typeof pathname === "string" && pathname.startsWith("/admin");
}

function isBookingHref(href) {
  if (!href) return false;
  try {
    if (href.startsWith("/booking")) return true;
    const url = new URL(href, window.location.origin);
    return url.pathname === "/booking" || url.pathname.startsWith("/booking/");
  } catch {
    return href.includes("/booking");
  }
}

function AnalyticsTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Page views on every route change
  useEffect(() => {
    if (!pathname || isAdminPath(pathname)) return;
    trackPageView(pathname);
  }, [pathname, searchParams]);

  // Delegate CTA clicks (Book Now, Get Quote, booking links)
  useEffect(() => {
    const onClick = (event) => {
      try {
        if (isAdminPath(window.location.pathname)) return;

        const el = event.target?.closest?.("a, button");
        if (!el) return;

        const href = el.getAttribute?.("href") || "";
        const text = (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim();
        const elementId = el.id || el.getAttribute?.("data-analytics-id") || "";

        const looksLikeCta =
          isBookingHref(href) || (text && CTA_TEXT_RE.test(text));

        if (!looksLikeCta) return;

        trackClick({
          element_id: elementId || undefined,
          element_text: text || (isBookingHref(href) ? "Book Now" : undefined),
        });
      } catch {
        // ignore
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}

export default function AnalyticsTracker() {
  return (
    <Suspense fallback={null}>
      <AnalyticsTrackerInner />
    </Suspense>
  );
}
