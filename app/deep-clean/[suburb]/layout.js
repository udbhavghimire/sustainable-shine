import { getSuburbData } from "@/data/suburbs";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const suburbData = getSuburbData(resolvedParams.suburb);

  if (!suburbData) {
    return {
      title: "Deep Cleaning | Sustainable Shine",
      description: "Professional deep cleaning services in Sydney.",
    };
  }

  const pageUrl = `https://sustainableshine.com.au/deep-clean/${resolvedParams.suburb}`;
  const imageUrl = "https://sustainableshine.com.au/hero2.jpeg";

  return {
    metadataBase: new URL("https://sustainableshine.com.au"),

    title: `Deep Cleaning ${suburbData.name} | Professional House Cleaning | Book Now`,
    description: `Professional deep cleaning ${suburbData.name} for homes & apartments. Expert deep clean includes oven cleaning, grout scrubbing & sanitization. Trusted spring cleaning ${suburbData.name}. Book today!`,
    keywords: `deep cleaning ${suburbData.name}, deep cleaning services ${suburbData.name}, deep clean ${suburbData.name}, house deep cleaning ${suburbData.name}, spring cleaning ${suburbData.name}, deep house cleaning, professional deep clean, intensive cleaning, deep cleaners ${suburbData.name}`,

    authors: [{ name: "Sustainable Shine" }],
    creator: "Sustainable Shine",
    publisher: "Sustainable Shine",

    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
        { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      ],
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },

    openGraph: {
      title: `Deep Cleaning ${suburbData.name} | Professional House Deep Clean`,
      description: `Professional deep cleaning services in ${suburbData.name}. Hospital-grade sanitization and thorough deep clean service. Transform your space today.`,
      type: "website",
      locale: "en_AU",
      siteName: "Sustainable Shine",
      url: pageUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Professional Deep Cleaning Services in ${suburbData.name} - Sustainable Shine`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `Deep Cleaning ${suburbData.name} | Professional House Deep Clean`,
      description: `Professional deep cleaning services in ${suburbData.name}. Hospital-grade sanitization and thorough deep clean service.`,
      images: [imageUrl],
      creator: "@sustainableshine",
      site: "@sustainableshine",
    },

    alternates: {
      canonical: pageUrl,
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    category: "Cleaning Services",

    other: {
      "geo.region": "AU-NSW",
      "geo.placename": suburbData.name,
      "geo.position": "",
    },
  };
}

export default function DeepCleanSuburbLayout({ children }) {
  return children;
}
