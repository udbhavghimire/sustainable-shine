"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What areas do you service in Sydney?",
      answer:
        "We provide cleaning services across all Sydney suburbs including North Shore, Eastern Suburbs, Inner West, Western Sydney, and the CBD. We also service the Greater Sydney area. Contact us to confirm if we service your specific location.",
    },
    {
      question: "Are your cleaning products eco-friendly and safe?",
      answer:
        "Yes! We exclusively use eco-friendly, non-toxic cleaning products that are safe for children, pets, and the environment. Our products are biodegradable and free from harsh chemicals while still delivering exceptional cleaning results.",
    },
    {
      question: "How do I book a cleaning service?",
      answer:
        "Booking is easy! Simply fill out our online booking form with your details and preferred date/time, call us directly at +61 452 422 059, or send us an email. We'll confirm your booking within 24 hours and send you a confirmation with all the details.",
    },
    {
      question: "What happens if I'm not satisfied with the cleaning?",
      answer:
        "Your satisfaction is our top priority. We offer a 100% satisfaction guarantee. If you're not completely happy with our service, contact us within 24 hours and we'll return to re-clean the areas of concern at no additional charge.",
    },
    {
      question: "Do I need to be home during the cleaning?",
      answer:
        "No, you don't need to be home. Many of our clients provide us with access instructions and go about their day. Our team is fully insured and police-checked, so you can trust us with your property. However, you're welcome to be home if you prefer.",
    },
    {
      question: "What's included in a deep cleaning service?",
      answer:
        "Our deep cleaning service is comprehensive and includes everything in our general cleaning plus: inside appliances (oven, fridge, microwave), inside cabinets and drawers, baseboards, door frames, light fixtures, window sills, behind furniture, grout cleaning, and more. It's perfect for spring cleaning or moving in/out.",
    },
    {
      question: "How long does a typical cleaning take?",
      answer:
        "The duration depends on the size of your property and type of service. Generally, a standard 2-3 bedroom home takes 2-3 hours for general cleaning and 4-5 hours for deep cleaning. We'll provide an estimated time when you book.",
    },
    {
      question: "Do you provide cleaning supplies and equipment?",
      answer:
        "Yes! We bring all necessary cleaning supplies, equipment, and eco-friendly products. You don't need to provide anything. If you have specific products you'd like us to use, just let us know in advance.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "We require at least 24 hours notice for cancellations or rescheduling to avoid a cancellation fee. We understand that emergencies happen, so please contact us as soon as possible if you need to change your appointment.",
    },
    {
      question: "Are you licensed and insured?",
      answer:
        "Absolutely! Sustainable Shine is fully licensed, insured, and bonded. All our cleaning professionals are police-checked, professionally trained, and covered by comprehensive insurance for your peace of mind.",
    },
    {
      question: "Can you work around my schedule?",
      answer:
        "Yes! We offer flexible scheduling including evenings and weekends to accommodate your busy lifestyle. For office cleaning, we can work after hours to avoid disrupting your business operations.",
    },
    {
      question: "Do you offer regular cleaning packages?",
      answer:
        "Yes! We offer weekly, fortnightly, and monthly cleaning packages at discounted rates. Regular clients receive priority scheduling and exclusive benefits. Contact us to create a custom cleaning schedule that fits your needs and budget.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-emerald-500 font-semibold text-sm uppercase tracking-wide">
            FAQs
          </span>
          <h2 className="heading-2 text-gray-900 mt-4 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our cleaning services in Sydney.
            Can't find the answer you're looking for? Feel free to contact us.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 pr-8">
                      {faq.question}
                    </h3>
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        className="w-5 h-5 text-emerald-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
