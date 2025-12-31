import Navbar from "@/components/navbar";
import BookingCalculator from "@/components/booking-calculator";
import Footer from "@/components/footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title:
    "Book Your Cleaning Service - Instant Quote Calculator | Sustainable Shine",
  description:
    "Get an instant quote for professional cleaning services in Sydney. Calculate your price for general cleaning, deep cleaning, end of lease, and move-in services. Eco-friendly products, 100% satisfaction guarantee. Book online today!",
  keywords:
    "cleaning service booking, instant quote calculator, Sydney cleaning, eco-friendly cleaning, end of lease cleaning, deep cleaning, move-in cleaning, professional cleaners",
  openGraph: {
    title:
      "Book Your Cleaning Service - Instant Quote Calculator | Sustainable Shine",
    description:
      "Get an instant quote for professional cleaning services. Customize your package with our easy calculator.",
    type: "website",
  },
};

export default function BookingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <BookingCalculator />
      <Footer />
    </main>
  );
}
