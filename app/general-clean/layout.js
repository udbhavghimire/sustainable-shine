const pageUrl = "https://sustainableshine.com.au/general-clean";
const imageUrl = "https://sustainableshine.com.au/hero2.jpeg";

export const metadata = {
  metadataBase: new URL("https://sustainableshine.com.au"),

  title: "General Cleaning Sydney | Regular House Cleaning Services - Book Now",
  description:
    "Reliable general cleaning services Sydney for homes and apartments. Professional house cleaning available weekly, fortnightly, or monthly. Trusted regular cleaning service for busy Sydney families and professionals. Book your house cleaners today!",
  keywords:
    "general cleaning Sydney, house cleaning Sydney, regular cleaning Sydney, general cleaning services, house cleaners Sydney, home cleaning Sydney, weekly cleaning service, regular house cleaning, domestic cleaning Sydney, residential cleaning Sydney",

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
    title: "General Cleaning Services Sydney | Regular House Cleaning",
    description:
      "Regular, reliable house cleaning Sydney. Professional cleaners for busy families and professionals. Flexible weekly, fortnightly, or monthly service.",
    type: "website",
    locale: "en_AU",
    siteName: "Sustainable Shine",
    url: pageUrl,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "Professional General Cleaning Services in Sydney - Sustainable Shine",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "General Cleaning Services Sydney | Regular House Cleaning",
    description:
      "Regular, reliable house cleaning Sydney. Professional cleaners for busy families and professionals. Flexible weekly, fortnightly, or monthly service.",
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

export default function GeneralCleanLayout({ children }) {
  return children;
}
