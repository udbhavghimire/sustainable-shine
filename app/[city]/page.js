import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import ServiceChecklist from "@/components/service-checklist";
import About from "@/components/about";
import OurWork from "@/components/our-work";
import Reviews from "@/components/reviews";
import FAQ from "@/components/faq";
import BookingForm from "@/components/booking-form";
import CTA from "@/components/cta";
import Footer from "@/components/footer";
import {
  getSuburbData,
  getAllSuburbSlugs,
  isValidSuburb,
} from "@/data/suburbs";
import { notFound } from "next/navigation";

// Generate static params for all suburbs
export async function generateStaticParams() {
  const slugs = getAllSuburbSlugs();
  return slugs.map((slug) => ({
    city: slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const suburbData = getSuburbData(resolvedParams.city);

  if (!suburbData) {
    return {
      title: "Page Not Found | Sustainable Shine",
      description: "The page you're looking for doesn't exist.",
    };
  }

  return {
    title: suburbData.metaTitle,
    description: suburbData.metaDescription,
    keywords: suburbData.keywords,
    openGraph: {
      title: suburbData.metaTitle,
      description: suburbData.metaDescription,
      type: "website",
      locale: "en_AU",
      siteName: "Sustainable Shine",
      images: [
        {
          url: "/hero2.jpeg",
          width: 1200,
          height: 630,
          alt: `Professional Cleaning Services in ${suburbData.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: suburbData.metaTitle,
      description: suburbData.metaDescription,
      images: ["/hero2.jpeg"],
    },
    alternates: {
      canonical: `https://sustainableshine.com.au/${resolvedParams.city}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function CityPage({ params }) {
  const resolvedParams = await params;

  // Validate suburb
  if (!isValidSuburb(resolvedParams.city)) {
    notFound();
  }

  const suburbData = getSuburbData(resolvedParams.city);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero city={suburbData} />
      <About city={suburbData} />
      <Services city={suburbData} />
      <ServiceChecklist city={suburbData} />
      <OurWork city={suburbData} />
      <Reviews city={suburbData} />
      <FAQ city={suburbData} />
      <BookingForm city={suburbData} />
      <CTA city={suburbData} />
      <Footer city={suburbData} />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `Sustainable Shine - ${suburbData.name}`,
            description: suburbData.description,
            image: "https://sustainableshine.com.au/hero2.jpeg",
            "@id": `https://sustainableshine.com.au/${resolvedParams.city}`,
            url: `https://sustainableshine.com.au/${resolvedParams.city}`,
            telephone: "+61-XXX-XXX-XXX",
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              streetAddress: suburbData.name,
              addressLocality: suburbData.name,
              addressRegion: "NSW",
              postalCode: suburbData.postcode,
              addressCountry: "AU",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "",
              longitude: "",
            },
            areaServed: {
              "@type": "City",
              name: suburbData.name,
            },
            sameAs: [
              "https://www.facebook.com/sustainableshine",
              "https://www.instagram.com/sustainableshine",
            ],
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "07:00",
              closes: "19:00",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "5000",
            },
          }),
        }}
      />
    </main>
  );
}
