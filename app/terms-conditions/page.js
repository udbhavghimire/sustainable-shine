import Link from "next/link";

export const metadata = {
  title: "Terms and Conditions | Sustainable Shine Cleaning Services",
  description:
    "Terms and Conditions for Sustainable Shine Cleaning Services. Read our service terms, booking policies, payment terms, and service guarantees.",
  keywords:
    "terms and conditions, service terms, cleaning service policies, booking terms, payment terms, service agreement",
  openGraph: {
    title: "Terms and Conditions | Sustainable Shine Cleaning Services",
    description:
      "Terms and Conditions governing the use of Sustainable Shine Cleaning Services.",
    type: "website",
    url: "https://sustainableshine.com.au/terms-conditions",
  },
  alternates: {
    canonical: "https://sustainableshine.com.au/terms-conditions",
  },
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-xl text-gray-600">
            Sustainable Shine Cleaning Services
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Effective Date: 28 January 2026
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-8">
              These Terms and Conditions govern the use of our services provided
              by Sustainable Shine Cleaning Services ("we", "us", "our"). By
              booking or using our services, you agree to the terms outlined
              below.
            </p>

            {/* Section 1 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  1
                </span>
                Services
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We provide professional cleaning services including, but not
                limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Residential cleaning</li>
                <li>Commercial and office cleaning</li>
                <li>Deep cleaning</li>
                <li>End-of-lease cleaning</li>
                <li>Custom cleaning services</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                All services are delivered according to the agreed scope at the
                time of booking.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  2
                </span>
                Bookings
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  Bookings can be made via our website, phone, email, or
                  message.
                </li>
                <li>All bookings are subject to availability.</li>
                <li>We reserve the right to refuse service at our discretion.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  3
                </span>
                Pricing and Quotes
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>All prices are quoted in Australian Dollars (AUD).</li>
                <li>
                  Prices may be hourly, fixed, or based on square metres
                  depending on the service.
                </li>
                <li>Quotes are valid for 7 days unless stated otherwise.</li>
                <li>
                  Final pricing may change if the property condition differs
                  from what was described at booking.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  4
                </span>
                Payment Terms
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  Payment is required upon completion of service unless
                  otherwise agreed in writing.
                </li>
                <li>
                  For commercial or large jobs, a deposit may be required before
                  commencement.
                </li>
                <li>
                  Late payments may result in additional fees or suspension of
                  future services.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  5
                </span>
                Cancellations and Rescheduling
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  We require at least 24 hours' notice for cancellations or
                  rescheduling.
                </li>
                <li>
                  Cancellations made within 24 hours may incur a cancellation
                  fee.
                </li>
                <li>
                  No-shows may be charged up to 100% of the booking value.
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  6
                </span>
                Access to Property
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  Clients must provide safe and reasonable access to the
                  property at the scheduled time.
                </li>
                <li>
                  If access cannot be provided, the booking may be treated as a
                  late cancellation.
                </li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  7
                </span>
                Service Guarantee
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  If you are not satisfied with our service, please notify us
                  within 24 hours of completion.
                </li>
                <li>
                  We will arrange a re-clean of the affected areas where
                  appropriate.
                </li>
                <li>
                  Refunds are not guaranteed and are assessed case by case.
                </li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  8
                </span>
                Health and Safety
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  Clients must ensure the property is safe and free from
                  hazards.
                </li>
                <li>
                  We reserve the right to stop or refuse work if conditions are
                  unsafe.
                </li>
                <li>
                  We do not handle hazardous materials unless agreed in advance.
                </li>
              </ul>
            </section>

            {/* Section 9 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  9
                </span>
                Damage and Liability
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>While we take great care, accidental damage may occur.</li>
                <li>
                  Any damage must be reported within 24 hours of service
                  completion.
                </li>
                <li>
                  Our liability is limited to the cost of the affected service
                  only.
                </li>
                <li>
                  We are not responsible for pre-existing damage or wear and
                  tear.
                </li>
              </ul>
            </section>

            {/* Section 10 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  10
                </span>
                Supplies and Equipment
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  We provide our own standard cleaning equipment and products
                  unless otherwise agreed.
                </li>
                <li>
                  Clients must notify us in advance of any product restrictions
                  or allergies.
                </li>
              </ul>
            </section>

            {/* Section 11 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  11
                </span>
                End-of-Lease Cleaning
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                {/* <li>
                  Our end-of-lease cleaning does not guarantee bond return as
                  final decisions are made by landlords or agents.
                </li> */}
                <li>
                  Our guarantee covers cleaning quality only.
                  If the cleaner has not completed the agreed work or
                  the cleaning is below standard, we will re-clean the affected areas.
                </li>
                <li>
                  Re-cleans are provided only according to the original
                  checklist agreed at booking.
                </li>
              </ul>
            </section>

            {/* Section 12 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  12
                </span>
                Photos and Marketing
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  We may take before and after photos for quality and marketing
                  purposes.
                </li>
                <li>
                  No identifiable personal information will be shared without
                  consent.
                </li>
              </ul>
            </section>

            {/* Section 13 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  13
                </span>
                Privacy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We respect your privacy. All personal information is handled in
                accordance with our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-emerald-600 hover:text-emerald-700 font-medium underline"
                >
                  Privacy Policy
                </Link>{" "}
                available on our website.
              </p>
            </section>

            {/* Section 14 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  14
                </span>
                Changes to Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to update these Terms and Conditions at any
                time. Updated terms will be published on our website and apply
                immediately.
              </p>
            </section>

           
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  15
                </span>
                Governing Law
              </h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms and Conditions are governed by the laws of New South
                Wales, Australia.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Questions or Concerns?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                If you have any questions about these Terms and Conditions,
                please contact us:
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-3">
                <p className="text-gray-900 font-semibold text-lg">
                  Sustainable Shine Cleaning Services
                </p>
                <div className="flex items-center space-x-3 text-gray-700">
                  <svg
                    className="w-5 h-5 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    Email:{" "}
                    <a
                      href="mailto:info@sustainableshine.com.au"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      info@sustainableshine.com.au
                    </a>
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <svg
                    className="w-5 h-5 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>
                    Phone:{" "}
                    <a
                      href="tel:0452422059"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      0452 422 059
                    </a>
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <svg
                    className="w-5 h-5 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  <span>
                    Website:{" "}
                    <a
                      href="https://sustainableshine.com.au"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://sustainableshine.com.au
                    </a>
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/privacy-policy"
            className="inline-flex items-center px-6 py-3 bg-white text-emerald-600 border-2 border-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition-all shadow-sm hover:shadow-md"
          >
            View Privacy Policy
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
