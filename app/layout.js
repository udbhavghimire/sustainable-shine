import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sustainable Shine Cleaning | Professional Cleaning Services Sydney",
  description:
    "Top-rated cleaning services in Sydney. Offering general cleaning, deep cleaning, end of lease cleaning, and more. Eco-friendly solutions for homes and offices. Book now!",
  keywords:
    "cleaning services Sydney, house cleaning Sydney, deep cleaning Sydney, end of lease cleaning Sydney, office cleaning Sydney, eco-friendly cleaning, professional cleaners Sydney",
  authors: [{ name: "Sustainable Shine Cleaning" }],

  // Open Graph metadata for Facebook, LinkedIn, WhatsApp
  openGraph: {
    title: "Sustainable Shine Cleaning | Professional Cleaning Services Sydney",
    description:
      "Top-rated eco-friendly cleaning services in Sydney. From general cleaning to deep cleaning and end of lease. 5000+ happy clients. Book your free quote today!",
    type: "website",
    locale: "en_AU",
    siteName: "Sustainable Shine Cleaning",
    url: "https://sustainableshine.com.au",
    images: [
      {
        url: "/Sustainable Shine Logo.avif",
        width: 1200,
        height: 630,
        alt: "Sustainable Shine Cleaning - Professional Eco-Friendly Cleaning Services Sydney",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Sustainable Shine Cleaning | Professional Cleaning Services Sydney",
    description:
      "Top-rated eco-friendly cleaning services in Sydney. 5000+ happy clients. Book your free quote today!",
    images: ["/Sustainable Shine Logo.avif"],
    creator: "@SustainableShine",
    site: "@SustainableShine",
  },

  // Additional metadata
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

  // Verification and other metadata
  verification: {
    // google: "your-google-verification-code", // Add when available
    // bing: "your-bing-verification-code", // Add when available
  },

  alternates: {
    canonical: "https://sustainableshine.com.au",
  },

  category: "Cleaning Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
