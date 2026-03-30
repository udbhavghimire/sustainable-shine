import { getSuburbData } from "@/data/suburbs";

export async function generateMetadata({ params }) {
  const suburbData = getSuburbData(params.suburb);
  
  if (!suburbData) {
    return {
      title: "End of Lease Cleaning | Sustainable Shine",
    };
  }

  const canonicalUrl = `https://sustainableshine.com.au/end-of-lease-cleaning/${params.suburb}`;

  return {
    title: `End of Lease Cleaning ${suburbData.name} - Bond Back Guarantee`,
    description: `Professional end of lease cleaning ${suburbData.name} for apartments, houses, and units. Expert bond cleaning ${suburbData.name} service with 100% guarantee. Get your full bond back with trusted move out cleaning in ${suburbData.name}. Local cleaners familiar with ${suburbData.name} property standards.`,
    keywords: `end of lease cleaning ${suburbData.name}, bond cleaning ${suburbData.name}, move out cleaning ${suburbData.name}, exit cleaning ${suburbData.name}, rental cleaning ${suburbData.name}, end of lease cleaners ${suburbData.name}, bond back guarantee, vacate cleaning, lease cleaning`,
    openGraph: {
      title: `End of Lease Cleaning ${suburbData.name} - Bond Back Guarantee`,
      description: `Professional end of lease cleaning in ${suburbData.name}. 100% bond back guarantee. Trusted by tenants for move out cleaning.`,
      type: "website",
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function EndOfLeaseCleaningSuburbLayout({ children }) {
  return children;
}
