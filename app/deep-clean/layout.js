const pageUrl = "https://sustainableshine.com.au/deep-clean";
const imageUrl = "https://sustainableshine.com.au/hero2.webp";

export const metadata = {
  metadataBase: new URL("https://sustainableshine.com.au"),
  
  title: "Deep Cleaning Sydney | Professional House Deep Clean Services",
  description: "Intensive deep cleaning services Sydney for homes and apartments. Professional deep clean includes oven cleaning, grout scrubbing, and sanitization. Hospital-grade spring cleaning perfect for thorough maintenance. Book your deep house cleaning today!",
  keywords: "deep cleaning Sydney, deep cleaning services Sydney, deep clean Sydney, house deep cleaning, spring cleaning Sydney, deep house cleaning, professional deep clean, intensive cleaning Sydney, deep cleaners Sydney, deep cleaning service",
  
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
    title: "Deep Cleaning Services Sydney | Professional House Deep Clean",
    description: "Intensive deep cleaning for Sydney homes. Hospital-grade sanitization and thorough deep clean service. Transform your space today.",
    type: "website",
    locale: "en_AU",
    siteName: "Sustainable Shine",
    url: pageUrl,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "Professional Deep Cleaning Services in Sydney - Sustainable Shine",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Deep Cleaning Services Sydney | Professional House Deep Clean",
    description: "Intensive deep cleaning for Sydney homes. Hospital-grade sanitization and thorough deep clean service. Transform your space today.",
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
};

export default function DeepCleanLayout({ children }) {
  return children;
}
