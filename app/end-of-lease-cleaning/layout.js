const pageUrl = "https://sustainableshine.com.au/end-of-lease-cleaning";
const imageUrl = "https://sustainableshine.com.au/hero2.webp";

export const metadata = {
  metadataBase: new URL("https://sustainableshine.com.au"),
  
  title: "End of Lease Cleaning Sydney | 100% Bond Back Guarantee",
  description: "Professional end of lease cleaning Sydney with 100% bond back guarantee. Expert bond cleaners trusted by 5000+ tenants. Same-day move out cleaning available. Meet all real estate inspection standards. Book now!",
  keywords: "end of lease cleaning Sydney, bond cleaning Sydney, move out cleaning Sydney, exit cleaning Sydney, rental cleaning Sydney, end of lease cleaners, bond back guarantee, vacate cleaning Sydney, lease cleaning Sydney, end of tenancy cleaning",
  
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
    title: "End of Lease Cleaning Sydney | 100% Bond Back Guarantee",
    description: "Professional end of lease cleaning Sydney. Get your full bond back with our guarantee. Trusted by 5000+ tenants.",
    type: "website",
    locale: "en_AU",
    siteName: "Sustainable Shine",
    url: pageUrl,
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "Professional End of Lease Cleaning in Sydney - Bond Back Guarantee",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "End of Lease Cleaning Sydney | 100% Bond Back Guarantee",
    description: "Professional end of lease cleaning Sydney. Get your full bond back with our guarantee. Trusted by 5000+ tenants.",
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

export default function EndOfLeaseCleaningLayout({ children }) {
  return children;
}
