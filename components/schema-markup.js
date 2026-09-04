const BUSINESS_NAME = "Sustainable Shine";
const PHONE = "+61452422059";
const BASE_URL = "https://sustainableshine.com.au";
const LOGO = `${BASE_URL}/sustainable%20logo.png`;
const HERO_IMAGE = `${BASE_URL}/hero2.webp`;

const OPENING_HOURS = [
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
];

const AGGREGATE_RATING = {
  "@type": "AggregateRating",
  ratingValue: "4.9",
  reviewCount: "247",
  bestRating: "5",
  worstRating: "1",
};

const SAME_AS = [
  "https://www.facebook.com/sustainableshine",
  "https://www.instagram.com/sustainableshine",
  "https://www.google.com/maps/place/Sustainable+Shine+Cleaning+Services/@-33.8483996,151.0309815,17z",
];

export function OrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: BUSINESS_NAME,
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO,
      width: 200,
      height: 60,
    },
    telephone: PHONE,
    email: "info@sustainableshine.com.au",
    description:
      "Professional eco-friendly cleaning services in Sydney. General cleaning, deep cleaning, and end of lease cleaning for homes and offices.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "NSW",
      addressCountry: "AU",
    },
    areaServed: {
      "@type": "State",
      name: "New South Wales",
    },
    sameAs: SAME_AS,
  };
}

export function WebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: `${BUSINESS_NAME} - Professional Cleaning Services Sydney`,
    description:
      "Top-rated eco-friendly cleaning services in Sydney. Book general cleaning, deep cleaning, or end of lease cleaning online.",
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function HomePageLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "CleaningService"],
    "@id": `${BASE_URL}/#localbusiness`,
    name: BUSINESS_NAME,
    url: BASE_URL,
    telephone: PHONE,
    email: "info@sustainableshine.com.au",
    priceRange: "$$",
    image: HERO_IMAGE,
    logo: LOGO,
    description:
      "Professional eco-friendly house cleaning services in Sydney. Expert general cleaning, deep cleaning, and end of lease cleaning for homes, apartments, and offices. Fully insured and police-checked cleaners.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "NSW",
      addressCountry: "AU",
      addressLocality: "Sydney",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-33.8688",
      longitude: "151.2093",
    },
    areaServed: {
      "@type": "State",
      name: "New South Wales",
    },
    openingHoursSpecification: OPENING_HOURS,
    aggregateRating: AGGREGATE_RATING,
    sameAs: SAME_AS,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cleaning Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "General House Cleaning",
            url: `${BASE_URL}/general-clean`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Deep Cleaning",
            url: `${BASE_URL}/deep-clean`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "End of Lease Cleaning",
            url: `${BASE_URL}/end-of-lease-cleaning`,
          },
        },
      ],
    },
  };
}

export function ServicePageSchema({ serviceType, serviceName, description, pageUrl, priceFrom }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    serviceType,
    name: serviceName,
    description,
    url: pageUrl,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#localbusiness`,
      name: BUSINESS_NAME,
      telephone: PHONE,
      url: BASE_URL,
    },
    areaServed: {
      "@type": "State",
      name: "New South Wales",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${BASE_URL}/booking`,
      servicePhone: {
        "@type": "ContactPoint",
        telephone: PHONE,
        contactType: "customer service",
        areaServed: "AU",
        availableLanguage: "English",
      },
    },
    ...(priceFrom && {
      offers: {
        "@type": "Offer",
        priceCurrency: "AUD",
        price: priceFrom,
        availability: "https://schema.org/InStock",
      },
    }),
  };
}

export function LocalBusinessSchema({ suburbData, serviceType, pageUrl }) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "CleaningService"],
    "@id": pageUrl,
    name: `${BUSINESS_NAME} - ${suburbData.name}`,
    description: `Professional ${serviceType} services in ${suburbData.name}, Sydney. Trusted local cleaning company with eco-friendly products and guaranteed results.`,
    url: pageUrl,
    telephone: PHONE,
    priceRange: "$$",
    image: HERO_IMAGE,
    logo: LOGO,
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
    openingHoursSpecification: OPENING_HOURS,
    aggregateRating: AGGREGATE_RATING,
    sameAs: SAME_AS,
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

export function BlogListingSchema({ blogs = [] }) {
  const pageUrl = `${BASE_URL}/blog`;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    name: "Blog | Sustainable Shine - Cleaning Tips & Insights",
    description:
      "Expert advice, eco-friendly cleaning tips, and insights to keep your home sparkling clean.",
    url: pageUrl,
    isPartOf: {
      "@id": `${BASE_URL}/#website`,
    },
    about: {
      "@type": "Thing",
      name: "House cleaning and eco-friendly home care",
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: blogs.length,
      itemListElement: blogs.map((blog, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${BASE_URL}/blog/${blog.slug}`,
        name: blog.title,
      })),
    },
  };
}

export function BlogPostingSchema({ blog }) {
  const pageUrl = `${BASE_URL}/blog/${blog.slug}`;
  const stripHtml = (html) =>
    html ? String(html).replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim() : "";
  const description =
    blog.meta_description ||
    blog.excerpt ||
    stripHtml(blog.content).slice(0, 160) ||
    "Read our latest blog post from Sustainable Shine.";
  const authorName = blog.author_name || blog.author || BUSINESS_NAME;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${pageUrl}#article`,
    headline: blog.title,
    description,
    url: pageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    datePublished: blog.published_date || blog.created_at,
    dateModified: blog.updated_at || blog.published_date || blog.created_at,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: BUSINESS_NAME,
      logo: {
        "@type": "ImageObject",
        url: LOGO,
      },
    },
    ...(blog.featured_image && {
      image: {
        "@type": "ImageObject",
        url: blog.featured_image,
      },
    }),
    ...(blog.category && { articleSection: blog.category }),
    ...(Array.isArray(blog.tags) && blog.tags.length > 0
      ? { keywords: blog.tags.join(", ") }
      : blog.tags
        ? { keywords: String(blog.tags) }
        : {}),
  };
}
