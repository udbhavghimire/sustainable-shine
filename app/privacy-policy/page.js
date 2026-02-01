import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Sustainable Shine Cleaning Services",
  description:
    "Privacy Policy for Sustainable Shine Cleaning Services. Learn how we collect, use, and protect your personal information in accordance with Australian Privacy Principles.",
  keywords:
    "privacy policy, data protection, personal information, Australian Privacy Principles, cleaning services privacy",
  openGraph: {
    title: "Privacy Policy | Sustainable Shine Cleaning Services",
    description:
      "Learn how Sustainable Shine Cleaning Services protects your privacy and handles your personal information.",
    type: "website",
    url: "https://sustainableshine.com.au/privacy",
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
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
              Sustainable Shine Cleaning Services ("we", "us", "our") is
              committed to protecting your privacy and ensuring that your
              personal information is handled safely and responsibly.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              This Privacy Policy explains how we collect, use, store, and
              disclose your personal information in accordance with the{" "}
              <strong>Privacy Act 1988 (Cth)</strong> and the{" "}
              <strong>Australian Privacy Principles (APPs)</strong>.
            </p>

            {/* Section 1 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  1
                </span>
                What is Personal Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Personal Information is information or an opinion that
                identifies an individual. This may include, but is not limited
                to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Full name</li>
                <li>Phone number</li>
                <li>Email address</li>
                <li>Residential or business address</li>
                <li>Booking and service details</li>
                <li>Payment-related information</li>
                <li>Any other information you provide to us</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  2
                </span>
                How We Collect Personal Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may collect your personal information when you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Visit our website</li>
                <li>Submit an enquiry or booking request</li>
                <li>Contact us by phone, email, or message</li>
                <li>Request a quote</li>
                <li>Use our services</li>
                <li>Provide feedback or reviews</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                We may also collect limited technical data such as IP address,
                browser type, and website usage through cookies.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  3
                </span>
                Why We Collect Personal Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect your personal information to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Provide cleaning services</li>
                <li>Respond to enquiries and quote requests</li>
                <li>Manage bookings and scheduling</li>
                <li>Process payments</li>
                <li>Communicate with customers</li>
                <li>Improve our services and website</li>
                <li>Meet legal and regulatory obligations</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                We only collect information that is reasonably necessary for our
                business operations.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  4
                </span>
                Disclosure of Personal Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may disclose your personal information to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Employees or contractors providing cleaning services</li>
                <li>Payment processors and service providers</li>
                <li>IT, website, or booking system providers</li>
                <li>Government authorities if required by law</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                We do not sell, rent, or trade your personal information to
                third parties.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  5
                </span>
                Sensitive Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Sensitive information (such as health information) will only be
                collected if:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>It is necessary for service delivery, and</li>
                <li>You have provided consent, or</li>
                <li>It is required or authorised by law</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  6
                </span>
                Security of Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We take reasonable steps to protect your personal information
                from:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Misuse</li>
                <li>Loss</li>
                <li>Unauthorised access</li>
                <li>Modification or disclosure</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Your information is stored securely and only accessed by
                authorised persons.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  7
                </span>
                Access and Correction
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may request access to the personal information we hold about
                you and request corrections if the information is inaccurate or
                outdated.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Requests can be made by contacting us using the details below.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  8
                </span>
                Cookies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our website may use cookies to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Improve website performance</li>
                <li>Analyse traffic</li>
                <li>Enhance user experience</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                You can disable cookies through your browser settings if you
                prefer.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  9
                </span>
                Retention of Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We retain personal information only for as long as necessary to
                provide our services or comply with legal requirements.
              </p>
              <p className="text-gray-700 leading-relaxed">
                When information is no longer required, it is securely deleted
                or anonymised.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  10
                </span>
                Third-Party Links
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites. We are
                not responsible for the privacy practices of those websites and
                encourage users to review their privacy policies.
              </p>
            </section>

            {/* Section 11 */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  11
                </span>
                Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Any changes will be posted on this page and become effective
                immediately upon publication.
              </p>
            </section>

            {/* Section 12 - Contact */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-bold text-sm mr-3">
                  12
                </span>
                Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                If you have any questions, concerns, or complaints regarding
                this Privacy Policy, please contact us:
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

        {/* Back to Home Button */}
        <div className="mt-12 text-center">
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
        </div>
      </div>
    </div>
  );
}
