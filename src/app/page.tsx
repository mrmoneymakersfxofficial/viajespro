"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Destinations } from "@/components/destinations";
import { Features, Testimonials } from "@/components/features";
import { About, Contact, Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Destinations />
        <Features />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
