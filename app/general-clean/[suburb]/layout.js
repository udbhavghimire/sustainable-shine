import { getSuburbData } from "@/data/suburbs";

export async function generateMetadata({ params }) {
  const suburbData = getSuburbData(params.suburb);
  
  if (!suburbData) {
    return {
      title: "General Cleaning | Sustainable Shine",
    };
  }

  const canonicalUrl = `https://sustainableshine.com.au/general-clean/${params.suburb}`;

  return {
    title: `General Cleaning ${suburbData.name} - Regular House Cleaning`,
    description: `Reliable general cleaning ${suburbData.name} for homes and apartments. Professional house cleaning available weekly, fortnightly, or monthly. Trusted regular cleaning services for busy ${suburbData.name} families and professionals. Local cleaners you can count on.`,
    keywords: `general cleaning ${suburbData.name}, house cleaning ${suburbData.name}, regular cleaning ${suburbData.name}, general cleaning services, house cleaners ${suburbData.name}, home cleaning, weekly cleaning service, regular house cleaning, domestic cleaning`,
    openGraph: {
      title: `General Cleaning ${suburbData.name} - Regular House Cleaning`,
      description: `Professional house cleaning services in ${suburbData.name}. Regular, reliable cleaning for busy families and professionals.`,
      type: "website",
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function GeneralCleanSuburbLayout({ children }) {
  return children;
}
