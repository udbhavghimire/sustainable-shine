import { getSuburbData } from "@/data/suburbs";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const suburbData = getSuburbData(resolvedParams.suburb);
  
  if (!suburbData) {
    return {
      title: "General Cleaning | Sustainable Shine",
      description: "Professional general cleaning services in Sydney.",
    };
  }

  const pageUrl = `https://sustainableshine.com.au/general-clean/${resolvedParams.suburb}`;
  const imageUrl = "https://sustainableshine.com.au/hero2.jpeg";

  return {
    metadataBase: new URL("https://sustainableshine.com.au"),
    
    title: `General Cleaning ${suburbData.name} | House Cleaning | Book Now`,
    description: `Reliable general cleaning ${suburbData.name} for homes & apartments. Professional house cleaning weekly, fortnightly or monthly. Trusted regular cleaning for busy ${suburbData.name} residents. Book today!`,
    keywords: `general cleaning ${suburbData.name}, house cleaning ${suburbData.name}, regular cleaning ${suburbData.name}, general cleaning services, house cleaners ${suburbData.name}, home cleaning, weekly cleaning service, regular house cleaning, domestic cleaning`,
    
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
      title: `General Cleaning ${suburbData.name} | Regular House Cleaning`,
      description: `Professional house cleaning services in ${suburbData.name}. Regular, reliable cleaning for busy families and professionals.`,
      type: "website",
      locale: "en_AU",
      siteName: "Sustainable Shine",
      url: pageUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Professional General Cleaning Services in ${suburbData.name} - Sustainable Shine`,
        },
      ],
    },
    
    twitter: {
      card: "summary_large_image",
      title: `General Cleaning ${suburbData.name} | Regular House Cleaning`,
      description: `Professional house cleaning services in ${suburbData.name}. Regular, reliable cleaning for busy families and professionals.`,
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

export default function GeneralCleanSuburbLayout({ children }) {
  return children;
}
