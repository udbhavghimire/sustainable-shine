export function LocalBusinessSchema({ suburbData, serviceType, pageUrl }) {
  const businessName = "Sustainable Shine";
  const phoneNumber = "+61452422059";
  
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "CleaningService"],
    "@id": pageUrl,
    name: `${businessName} - ${suburbData.name}`,
    description: `Professional ${serviceType} services in ${suburbData.name}, Sydney. Trusted local cleaning company with eco-friendly products and guaranteed results.`,
    url: pageUrl,
    telephone: phoneNumber,
    priceRange: "$$",
    image: "https://sustainableshine.com.au/hero2.jpeg",
    logo: "https://sustainableshine.com.au/sustainable%20logo.png",
    
    address: {
      "@type": "PostalAddress",
      addressLocality: suburbData.name,
      addressRegion: "NSW",
      postalCode: suburbData.postcode,
      addressCountry: "AU",
    },
    
    geo: {
      "@type": "GeoCoordinates",
      addressLocality: suburbData.name,
    },
    
    areaServed: {
      "@type": "City",
      name: suburbData.name,
      "@id": `https://en.wikipedia.org/wiki/${suburbData.name.replace(/\s+/g, "_")}`,
    },
    
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "247",
      bestRating: "5",
      worstRating: "1",
    },
    
    sameAs: [
      "https://www.facebook.com/sustainableshine",
      "https://www.instagram.com/sustainableshine",
    ],
  };
}

export function ServiceSchema({ suburbData, serviceDetails, pageUrl }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    serviceType: serviceDetails.type,
    name: serviceDetails.name,
    description: serviceDetails.description,
    provider: {
      "@type": "LocalBusiness",
      name: "Sustainable Shine",
      telephone: "+61452422059",
      url: "https://sustainableshine.com.au",
    },
    areaServed: {
      "@type": "City",
      name: suburbData.name,
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: pageUrl,
      servicePhone: {
        "@type": "ContactPoint",
        telephone: "+61452422059",
        contactType: "customer service",
        areaServed: "AU",
        availableLanguage: "English",
      },
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: serviceDetails.priceRange,
    },
  };
}

export function FAQPageSchema({ faqs }) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function BreadcrumbSchema({ items }) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
