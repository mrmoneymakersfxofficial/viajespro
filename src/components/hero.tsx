"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { heroContent, siteConfig, whatsappMessages } from "@/data/content";
import { useLanguage } from "@/context/language-context";
import { Button } from "@/components/ui/button";
import { MessageCircle, ChevronDown, Sparkles } from "lucide-react";
import gsap from "gsap";

export function Hero() {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    whatsappMessages.general[language]
  )}`;

  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8 }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.4"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(
        statsRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.3"
      );

    // Parallax effect on scroll
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      if (scrollY < heroHeight) {
        const overlay = heroRef.current.querySelector(
          ".hero-overlay"
        ) as HTMLElement;
        if (overlay) {
          overlay.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
        const img = heroRef.current.querySelector(
          ".hero-image"
        ) as HTMLElement;
        if (img) {
          img.style.transform = `translateY(${scrollY * 0.15}px) scale(${1 + scrollY * 0.0003})`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToDestinations = () => {
    const el = document.querySelector("#destinos");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <div className="hero-image absolute inset-0 will-change-transform">
          <Image
            src="/images/hero-machupicchu.jpg"
            alt="Machu Picchu - Peru Travel"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
        </div>
        {/* Gradient Overlays */}
        <div className="hero-overlay absolute inset-0 will-change-transform bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.15),transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16">
        {/* Badge */}
        <motion.div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          {t(heroContent.badge)}
        </motion.div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 tracking-tight leading-[1.1]"
        >
          {t(heroContent.title)}
          <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            {t(heroContent.titleHighlight)}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="max-w-3xl mx-auto text-lg sm:text-xl text-white/80 mb-10 leading-relaxed"
        >
          {t(heroContent.subtitle)}
        </p>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16,185,129,0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-xl shadow-xl shadow-emerald-600/25 gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              {t(heroContent.ctaPrimary)}
            </Button>
          </motion.a>

          <motion.button
            onClick={scrollToDestinations}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:text-white px-8 py-6 text-lg rounded-xl"
            >
              {t(heroContent.ctaSecondary)}
            </Button>
          </motion.button>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto"
        >
          {heroContent.stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-400">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-white/70 mt-1">
                {t(stat.label)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <button
          onClick={scrollToDestinations}
          className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/60 hover:text-white hover:bg-white/20 transition-all"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      </motion.div>
    </section>
  );
}
