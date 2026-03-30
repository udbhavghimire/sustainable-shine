import { getSuburbData } from "@/data/suburbs";

export async function generateMetadata({ params }) {
  const suburbData = getSuburbData(params.suburb);
  
  if (!suburbData) {
    return {
      title: "Deep Cleaning | Sustainable Shine",
    };
  }

  const canonicalUrl = `https://sustainableshine.com.au/deep-clean/${params.suburb}`;

  return {
    title: `Deep Cleaning ${suburbData.name} - Professional House Deep Clean`,
    description: `Intensive deep cleaning ${suburbData.name} for homes and apartments. Professional deep clean service includes oven cleaning, grout scrubbing, and sanitization. Expert spring cleaning ${suburbData.name} for thorough home maintenance. Local cleaners familiar with ${suburbData.name} properties.`,
    keywords: `deep cleaning ${suburbData.name}, deep cleaning services ${suburbData.name}, deep clean ${suburbData.name}, house deep cleaning ${suburbData.name}, spring cleaning ${suburbData.name}, deep house cleaning, professional deep clean, intensive cleaning, deep cleaners ${suburbData.name}`,
    openGraph: {
      title: `Deep Cleaning ${suburbData.name} - Professional House Deep Clean`,
      description: `Professional deep cleaning services in ${suburbData.name}. Hospital-grade sanitization and thorough deep clean service. Transform your space today.`,
      type: "website",
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function DeepCleanSuburbLayout({ children }) {
  return children;
}
