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
import FloatingBookingButton from "@/components/floating-booking-button";
import {
  LocalBusinessSchema,
  ServicePageSchema,
  BreadcrumbSchema,
} from "@/components/schema-markup";

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

  const pageUrl = `https://sustainableshine.com.au/${resolvedParams.city}`;
  const imageUrl = "https://sustainableshine.com.au/hero2.jpeg";

  return {
    metadataBase: new URL("https://sustainableshine.com.au"),
    
    title: suburbData.metaTitle,
    description: suburbData.metaDescription,
    keywords: suburbData.keywords,
    
    authors: [{ name: "Sustainable Shine" }],
    creator: "Sustainable Shine",
    publisher: "Sustainable Shine",
    
    // Favicon and Icons
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
      title: suburbData.metaTitle,
      description: suburbData.metaDescription,
      type: "website",
      locale: "en_AU",
      siteName: "Sustainable Shine",
      url: pageUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Professional Cleaning Services in ${suburbData.name} - Sustainable Shine`,
        },
      ],
    },
    
    twitter: {
      card: "summary_large_image",
      title: suburbData.metaTitle,
      description: suburbData.metaDescription,
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
      <FloatingBookingButton />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            LocalBusinessSchema({
              suburbData,
              serviceType: "House Cleaning",
              pageUrl: `https://sustainableshine.com.au/${resolvedParams.city}`,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            ServicePageSchema({
              serviceType: "House Cleaning",
              serviceName: `House Cleaning Services ${suburbData.name}`,
              description: `Professional house cleaning services in ${suburbData.name}, Sydney. General cleaning, deep cleaning, and end of lease cleaning by trusted local cleaners.`,
              pageUrl: `https://sustainableshine.com.au/${resolvedParams.city}`,
              priceFrom: "149",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            BreadcrumbSchema({
              items: [
                { name: "Home", url: "https://sustainableshine.com.au" },
                {
                  name: suburbData.name,
                  url: `https://sustainableshine.com.au/${resolvedParams.city}`,
                },
              ],
            }),
          ),
        }}
      />
    </main>
  );
}
