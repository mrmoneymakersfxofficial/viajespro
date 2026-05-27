"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { heroContent, siteConfig, whatsappMessages } from "@/data/content";
import { useLanguage } from "@/context/language-context";
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
            alt="Machu Picchu - Viajeros VIP"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
        </div>
        {/* Dark VIP gradient overlays */}
        <div className="hero-overlay absolute inset-0 will-change-transform bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
        {/* Gold ambient shimmer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08),transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16">
        {/* Badge */}
        <motion.div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gold-base/30 bg-gold-base/5 backdrop-blur-md text-gold-base text-[11px] font-mono tracking-[0.2em] uppercase mb-8"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {t(heroContent.badge)}
        </motion.div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-[1.1]"
        >
          <span className="font-vip tracking-wider">
            {t(heroContent.title)}
          </span>
          <br />
          <span className="text-gold-gradient font-vip tracking-wider">
            {t(heroContent.titleHighlight)}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 mb-10 leading-relaxed"
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 h-12 bg-gradient-to-r from-gold-dark via-gold-base to-gold-light px-8 text-[12px] font-mono font-bold tracking-[0.2em] text-zinc-950 shadow-lg shadow-gold-dark/20 transition-transform"
          >
            <MessageCircle className="w-4 h-4" />
            {t(heroContent.ctaPrimary)}
          </motion.a>

          <motion.button
            onClick={scrollToDestinations}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center h-12 px-8 border border-white/15 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 hover:border-white/25 text-[12px] font-mono tracking-[0.2em] transition-colors"
          >
            {t(heroContent.ctaSecondary)}
          </motion.button>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto"
        >
          {heroContent.stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-4 bg-white/[0.03] backdrop-blur-md border border-white/[0.06]"
              whileHover={{
                borderColor: "rgba(212,175,55,0.2)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold-base font-vip tracking-wider">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs font-mono tracking-wider text-zinc-500 mt-1.5 uppercase">
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
          className="p-2 border border-white/10 bg-white/5 backdrop-blur-md text-zinc-500 hover:text-gold-base hover:border-gold-base/30 transition-all"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </motion.div>
    </section>
  );
}
