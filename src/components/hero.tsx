"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { buildWhatsAppUrl } from "@/data/content";
import { useLanguage } from "@/context/language-context";
import { MessageCircle, ChevronDown, Sparkles } from "lucide-react";
import gsap from "gsap";

// ─── Hero Slides Configuration ──────────────────────────────
const heroSlides = [
  {
    image: "/images/hero/hero-01-machupicchu.jpg",
    alt: "Machu Picchu al amanecer - Viajeros VIP",
    title: { es: "Vive la Aventura de", en: "Live the Adventure of" },
    highlight: { es: "Conocer Perú", en: "Discovering Peru" },
    subtitle: {
      es: "Paquetes turísticos exclusivos diseñados para crear recuerdos que durarán toda la vida. Desde las ruinas milenarias de Machu Picchu hasta la exuberante selva amazónica.",
      en: "Exclusive tour packages designed to create memories that will last a lifetime. From the ancient ruins of Machu Picchu to the lush Amazon rainforest.",
    },
    badge: { es: "✦ Experiencias de Élite", en: "✦ Elite Experiences" },
  },
  {
    image: "/images/hero/hero-02-colca.jpg",
    alt: "Cañón del Colca y Andes - Viajeros VIP",
    title: { es: "Descubre el Poder de", en: "Discover the Power of" },
    highlight: { es: "Los Andes", en: "the Andes" },
    subtitle: {
      es: "Atrévete a explorar el Cañón del Colca, el vuelo del cóndor y los paisajes más imponentes de la cordillera de los Andes peruanos.",
      en: "Dare to explore the Colca Canyon, the flight of the condor, and the most stunning landscapes of the Peruvian Andes mountain range.",
    },
    badge: { es: "✦ Aventuras Andinas", en: "✦ Andean Adventures" },
  },
  {
    image: "/images/hero/hero-03-amazon.jpg",
    alt: "Río Amazonas al atardecer - Viajeros VIP",
    title: { es: "Adéntrate en la", en: "Dive into the" },
    highlight: { es: "Selva Amazónica", en: "Amazon Rainforest" },
    subtitle: {
      es: "Navega por el río más caudaloso del mundo. Aventura, naturaleza virgen y cultura ancestral te esperan en la amazonía peruana.",
      en: "Navigate the mightiest river on Earth. Adventure, pristine nature, and ancestral culture await you in the Peruvian Amazon.",
    },
    badge: { es: "✦ Naturaleza Salvaje", en: "✦ Wild Nature" },
  },
  {
    image: "/images/hero/hero-04-huacachina.jpg",
    alt: "Oasis de Huacachina - Viajeros VIP",
    title: { es: "Explora el Desierto de", en: "Explore the Desert of" },
    highlight: { es: "Huacachina", en: "Huacachina" },
    subtitle: {
      es: "Dunas infinitas, atardeceres de fuego y un oasis escondido. Vive la experiencia más exclusiva de la costa peruana.",
      en: "Endless dunes, fiery sunsets, and a hidden oasis. Experience the most exclusive adventure on the Peruvian coast.",
    },
    badge: { es: "✦ Oasis de Lujo", en: "✦ Luxury Oasis" },
  },
];

// ─── Hero Component ────────────────────────────────────────
export function Hero() {
  const { language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const [textKey, setTextKey] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const whatsappUrl = buildWhatsAppUrl({ type: "general", language });
  const slide = heroSlides[activeSlide];

  // ─── Auto-rotation every 4s ───
  const goToNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    setTextKey((k) => k + 1);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(goToNext, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [goToNext]);

  // ─── GSAP entrance animations ───
  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.4"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(
        statsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.3"
      );

    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      if (scrollY < heroHeight) {
        const overlay = heroRef.current.querySelector(".hero-overlay") as HTMLElement;
        if (overlay) overlay.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToDestinations = () => {
    const el = document.querySelector("#destinos");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const ctaPrimary = language === "es" ? "Reservar Ahora" : "Book Now";
  const ctaSecondary = language === "es" ? "Ver Destinos" : "View Destinations";

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ─── Multi-Background Carousel ─── */}
      <div className="absolute inset-0 w-full">
        {heroSlides.map((s, i) => (
          <div
            key={s.image}
            className="absolute inset-0 w-full transition-opacity duration-[1200ms] ease-in-out will-change-transform"
            style={{ opacity: i === activeSlide ? 1 : 0, zIndex: i === activeSlide ? 1 : 0 }}
          >
            <Image
              src={s.image}
              alt={s.alt}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
              quality={85}
            />
          </div>
        ))}

        {/* Dark overlay */}
        <div className="hero-overlay absolute inset-0 w-full will-change-transform bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a] z-[2]" />
        <div className="absolute inset-0 w-full bg-gradient-to-r from-black/60 via-transparent to-black/40 z-[2]" />
        {/* Gold shimmer */}
        <div className="absolute inset-0 w-full bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08),transparent_50%)] z-[2]" />
      </div>

      {/* ─── Progress Indicators ─── */}
      <div className="absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveSlide(i);
              setTextKey((k) => k + 1);
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = setInterval(goToNext, 4000);
              }
            }}
            className="relative overflow-hidden"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div
              className={`h-1 rounded-full transition-all duration-500 ${
                i === activeSlide
                  ? "w-8 bg-gold-base"
                  : "w-4 bg-white/25 hover:bg-white/40"
              }`}
            />
            {/* Auto-progress bar on active dot */}
            {i === activeSlide && (
              <motion.div
                className="absolute inset-0 bg-gold-light/50 rounded-full origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 4, ease: "linear" }}
                key={`progress-${activeSlide}`}
              />
            )}
          </button>
        ))}
      </div>

      {/* ─── Content (Synced Text) ─── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-28 sm:pt-24 sm:pb-32">
        {/* Badge — Animated per slide */}
        <div ref={badgeRef} className="h-8 sm:h-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${textKey}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 sm:py-2 border border-gold-base/30 bg-gold-base/5 backdrop-blur-md text-gold-base text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              {slide.badge[language]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Title — Animated per slide */}
        <div ref={titleRef} className="mt-6 sm:mt-8 min-h-[5rem] sm:min-h-[7rem]">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${textKey}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-[1.1]"
            >
              <span className="font-vip tracking-wider block">
                {slide.title[language]}
              </span>
              <span className="text-gold-gradient font-vip tracking-wider block">
                {slide.highlight[language]}
              </span>
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Subtitle — Animated per slide */}
        <div className="min-h-[2.5rem] sm:min-h-[3rem]">
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${textKey}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              ref={subtitleRef}
              className="max-w-lg sm:max-w-2xl mx-auto text-sm sm:text-base text-zinc-300 mb-8 sm:mb-10 leading-relaxed"
            >
              {slide.subtitle[language]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16 w-full">
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 bg-gradient-to-r from-gold-dark via-gold-base to-gold-light px-8 text-[11px] sm:text-[12px] font-mono font-bold tracking-[0.2em] text-zinc-950 shadow-lg shadow-gold-dark/20 transition-transform"
          >
            <MessageCircle className="w-4 h-4" />
            {ctaPrimary}
          </motion.a>

          <motion.button
            onClick={scrollToDestinations}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 border border-white/20 bg-white/10 backdrop-blur-md text-zinc-100 hover:bg-white/15 hover:border-white/30 text-[11px] sm:text-[12px] font-mono tracking-[0.2em] transition-colors"
          >
            {ctaSecondary}
          </motion.button>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4 max-w-4xl mx-auto">
          {[
            { value: "5,000+", label: { es: "Viajeros Felices", en: "Happy Travelers" } },
            { value: "50+", label: { es: "Destinos", en: "Destinations" } },
            { value: "98%", label: { es: "Satisfacción", en: "Satisfaction" } },
            { value: "15+", label: { es: "Años de Experiencia", en: "Years of Experience" } },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-3 sm:p-4 bg-white/[0.05] backdrop-blur-md border border-white/[0.08] hover:border-gold-base/20 transition-colors"
              whileHover={{ borderColor: "rgba(212,175,55,0.2)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gold-base font-vip tracking-wider">
                {stat.value}
              </div>
              <div className="text-[9px] sm:text-[10px] md:text-[11px] font-mono tracking-wider text-zinc-500 mt-1 sm:mt-1.5 uppercase">
                {stat.label[language]}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[5] pointer-events-none" />

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <button
          onClick={scrollToDestinations}
          className="p-2 border border-white/10 bg-white/5 backdrop-blur-md text-zinc-400 hover:text-gold-base hover:border-gold-base/30 transition-all"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </motion.div>
    </section>
  );
}
