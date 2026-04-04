import { getSuburbData, getAllSuburbSlugs } from "@/data/suburbs";

export async function generateStaticParams() {
  const slugs = getAllSuburbSlugs();
  return slugs.map((suburb) => ({
    suburb,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const suburbData = getSuburbData(resolvedParams.suburb.toLowerCase());

  if (!suburbData) {
    return {
      title: "End of Lease Cleaning | Sustainable Shine",
      description: "Professional end of lease cleaning services in Sydney.",
    };
  }

  const pageUrl = `https://sustainableshine.com.au/end-of-lease-cleaning/${resolvedParams.suburb}`;
  const imageUrl = "https://sustainableshine.com.au/hero2.jpeg";

  return {
    metadataBase: new URL("https://sustainableshine.com.au"),

    title: `End of Lease Cleaning ${suburbData.name} | Bond Back Guarantee`,
    description: `Leaving a rental in ${suburbData.name}? We clean to the full REIQ checklist, covering every item your property manager will check. Backed by our 100% bond back guarantee.`,
    keywords: `end of lease cleaning ${suburbData.name}, bond cleaning ${suburbData.name}, move out cleaning ${suburbData.name}, exit cleaning ${suburbData.name}, rental cleaning ${suburbData.name}, end of lease cleaners ${suburbData.name}, bond back guarantee, vacate cleaning, lease cleaning`,

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
      title: `End of Lease Cleaning ${suburbData.name} | Bond Back Guarantee`,
      description: `Professional end of lease cleaning in ${suburbData.name}. 100% bond back guarantee. Trusted by tenants for move out cleaning.`,
      type: "website",
      locale: "en_AU",
      siteName: "Sustainable Shine",
      url: pageUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Professional End of Lease Cleaning in ${suburbData.name} - Bond Guarantee`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `End of Lease Cleaning ${suburbData.name} | Bond Back Guarantee`,
      description: `Professional end of lease cleaning in ${suburbData.name}. 100% bond back guarantee. Trusted by tenants for move out cleaning.`,
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
      "geo.placename": `${suburbData.name}, NSW, Australia`,
      "geo.country": "AU",
    },
  };
}

export default function EndOfLeaseCleaningSuburbLayout({ children }) {
  return children;
}
