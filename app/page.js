import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import ServiceChecklist from "@/components/service-checklist";
import HowItWorks from "@/components/how-it-works";
import About from "@/components/about";
import OurWork from "@/components/our-work";
import Reviews from "@/components/reviews";
import AreasWeServe from "@/components/areas-we-serve";
import Blogs from "@/components/blogs";
import FAQ from "@/components/faq";

import CTA from "@/components/cta";
import FloatingBookingButton from "@/components/floating-booking-button";

export default async function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Reviews />
      <Services />
      <HowItWorks />
      <ServiceChecklist />
      <AreasWeServe />
      <OurWork />

      <Blogs />
      <FAQ />

      <CTA />
      <FloatingBookingButton />
    </main>
  );
}
