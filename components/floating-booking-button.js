'use client';

import Link from 'next/link';
import { Calendar } from 'lucide-react';
import posthog from 'posthog-js';

export default function FloatingBookingButton() {
  return (
    <Link
      href="/booking"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-5 py-4 active:scale-95"
      aria-label="Book Now - Get a Free Quote"
      onClick={() => posthog.capture("floating_book_button_clicked")}
    >
      <Calendar className="w-6 h-6 flex-shrink-0" />
      <div className="ml-2 flex flex-col items-start">
        <span className="font-bold text-md leading-tight">Book Now</span>
        <span className="text-xs leading-tight">Get a free quote</span>
      </div>
    </Link>
  );
}
