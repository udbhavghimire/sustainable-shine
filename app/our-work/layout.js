export const metadata = {
  title: "Our Work - Before & After Cleaning Transformations | Sustainable Shine Sydney",
  description:
    "See real before and after photos from our professional cleaning jobs across Sydney. Bathrooms, kitchens, ovens, balconies and more — transformed by Sustainable Shine.",
  keywords:
    "cleaning before and after Sydney, cleaning results Sydney, professional cleaning photos, house cleaning transformation Sydney, deep cleaning results, Sustainable Shine work",

  openGraph: {
    title: "Our Work - Before & After Cleaning Transformations | Sustainable Shine",
    description:
      "Real before and after cleaning photos from Sydney homes. Bathrooms, ovens, balconies and kitchens transformed by our professional eco-friendly cleaners.",
    type: "website",
    locale: "en_AU",
    siteName: "Sustainable Shine Cleaning",
    url: "https://sustainableshine.com.au/our-work",
    images: [
      {
        url: "https://sustainableshine.com.au/hero2.webp",
        width: 1200,
        height: 630,
        alt: "Before and After Professional Cleaning - Sustainable Shine Sydney",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Our Work - Before & After Cleaning Transformations | Sustainable Shine",
    description:
      "Real before and after cleaning photos from Sydney homes. See the Sustainable Shine difference.",
    images: ["https://sustainableshine.com.au/hero2.webp"],
  },

  alternates: {
    canonical: "https://sustainableshine.com.au/our-work",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function OurWorkLayout({ children }) {
  return children;
}
