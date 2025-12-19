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
  openGraph: {
    title: "Sustainable Shine Cleaning | Professional Cleaning Services Sydney",
    description:
      "Top-rated cleaning services in Sydney. Eco-friendly solutions for homes and offices.",
    type: "website",
  },
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
