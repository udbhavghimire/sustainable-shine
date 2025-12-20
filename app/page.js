import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import About from "@/components/about";
import OurWork from "@/components/our-work";
import Reviews from "@/components/reviews";
import FAQ from "@/components/faq";
import BookingForm from "@/components/booking-form";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <OurWork />
      <Reviews />
      <FAQ />
      <BookingForm />
      <CTA />
      <Footer />
    </main>
  );
}
