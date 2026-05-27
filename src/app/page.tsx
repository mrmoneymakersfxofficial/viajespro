"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Destinations } from "@/components/destinations";
import { Features, Testimonials } from "@/components/features";
import { About, Contact, Footer } from "@/components/footer";
import { BottomTabBar } from "@/components/bottom-tab-bar";

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
      <BottomTabBar />
    </>
  );
}
