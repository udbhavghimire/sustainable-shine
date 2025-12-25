import Navbar from "@/components/navbar";
import BookingCalculator from "@/components/booking-calculator";
import Footer from "@/components/footer";

export default function BookingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <BookingCalculator />
      <Footer />
    </main>
  );
}
