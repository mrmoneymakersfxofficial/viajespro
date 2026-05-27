"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { destinations, siteConfig, whatsappMessages } from "@/data/content";
import { useLanguage } from "@/context/language-context";
import { MessageCircle, Clock, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import gsap from "gsap";

// ─── Lightbox Component ────────────────────────────────────
function Lightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: { src: string; alt: string }[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goNext, goPrev]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const touchStartRef = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]/98 backdrop-blur-md"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[110] flex h-11 w-11 items-center justify-center bg-white/[0.06] hover:bg-white/10 text-zinc-400 hover:text-gold-base transition-colors border border-white/[0.06]"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-[110] text-zinc-500 text-sm font-mono tracking-wider">
          {currentIndex + 1} / {images.length}
        </div>

        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-3 sm:left-6 z-[110] flex h-11 w-11 items-center justify-center bg-white/[0.06] hover:bg-white/10 text-zinc-400 hover:text-gold-base transition-colors border border-white/[0.06]"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="relative max-w-6xl w-full mx-4 aspect-[4/3] sm:aspect-video overflow-hidden border border-white/[0.06]"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </motion.div>

        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-3 sm:right-6 z-[110] flex h-11 w-11 items-center justify-center bg-white/[0.06] hover:bg-white/10 text-zinc-400 hover:text-gold-base transition-colors border border-white/[0.06]"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[110] flex gap-2 max-w-[90vw] overflow-x-auto px-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                className={`relative h-12 w-16 sm:h-14 sm:w-20 overflow-hidden flex-shrink-0 border-2 transition-all ${
                  i === currentIndex
                    ? "border-gold-base opacity-100"
                    : "border-white/10 opacity-40 hover:opacity-70"
                }`}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Destination Card ──────────────────────────────────────
function DestinationCard({
  dest,
  language,
  index,
  onOpenLightbox,
}: {
  dest: typeof destinations[0];
  language: "es" | "en";
  index: number;
  onOpenLightbox: (destId: string) => void;
}) {
  const t = (item: { es: string; en: string }) => item[language];

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    language === "es"
      ? `Hola! Deseo cotizar el paquete premium a: *${t(dest.title)}* \u2708\ufe0f`
      : `Hello! I want to quote the premium package for: *${t(dest.title)}* \u2708\ufe0f`
  )}`;

  return (
    <motion.div
      className="destination-card group overflow-hidden border border-white/[0.06] bg-[#121212] transition-all duration-500 hover:border-gold-dark/30"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Full Margin Image */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden cursor-zoom-in"
        onClick={() => onOpenLightbox(dest.id)}
      >
        <Image
          src={dest.image}
          alt={t(dest.title)}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={index === 0}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/20 to-transparent" />

        {/* Floating badges */}
        <div className="absolute inset-x-0 top-0 p-3 sm:p-4 flex justify-between items-start pointer-events-none">
          <span className="border border-white/[0.1] bg-[#0a0a0a]/80 backdrop-blur-md px-2.5 py-1 text-[11px] sm:text-xs font-mono tracking-wider text-zinc-300 flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {dest.duration}
          </span>
          <span className="border border-gold-base/30 bg-[#0a0a0a]/80 backdrop-blur-md px-2.5 py-1 text-[11px] sm:text-xs font-mono tracking-wider font-bold text-gold-base">
            {dest.price}
          </span>
        </div>

        {/* Zoom icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="h-14 w-14 bg-gold-base/10 backdrop-blur-md flex items-center justify-center border border-gold-base/20">
            <ZoomIn className="w-6 h-6 text-gold-base" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        {/* Title - VIP Style */}
        <h3 className="text-lg sm:text-xl font-vip tracking-wider text-zinc-100 uppercase group-hover:text-gold-light transition-colors">
          {t(dest.title)}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2.5 mb-5">
          {t(dest.highlights)
            .slice(0, 3)
            .map((tag, tagIdx) => (
              <span
                key={tagIdx}
                className="bg-white/[0.03] border border-white/[0.04] px-2 py-0.5 text-[10px] font-mono tracking-wider text-zinc-500"
              >
                {tag}
              </span>
            ))}
        </div>

        {/* CTA Buttons - VIP */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href={`/destinos/${dest.slug[language]}`}
            className="flex h-10 sm:h-11 items-center justify-center border border-white/[0.06] bg-white/[0.02] text-[11px] font-mono tracking-[0.15em] text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-200 transition-colors uppercase"
          >
            {language === "es" ? "Itinerario" : "Itinerary"}
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 sm:h-11 items-center justify-center gap-1.5 bg-gold-base text-[11px] font-mono tracking-[0.15em] font-bold text-zinc-950 hover:bg-gold-light transition-colors uppercase"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            {language === "es" ? "Reservar" : "Book"}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Destinations Section ─────────────────────────────
export function Destinations() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeLightboxDest, setActiveLightboxDest] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;

    (async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current || !titleRef.current) return;

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".destination-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleOpenLightbox = useCallback((destId: string) => {
    setActiveLightboxDest(destId);
  }, []);

  const activeDest = destinations.find((d) => d.id === activeLightboxDest);
  const lightboxImages = activeDest
    ? [{ src: activeDest.image, alt: activeDest.title[language] }]
    : [];

  return (
    <section
      id="destinos"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-28 bg-background overflow-hidden"
    >
      {/* Gold accent line at top */}
      <div className="divider-gold mb-16" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block text-[11px] font-mono tracking-[0.3em] text-gold-base uppercase mb-4">
            {language === "es"
              ? "Destinos Exclusivos"
              : "Exclusive Destinations"}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-vip tracking-wider text-foreground mb-4 uppercase">
            {language === "es"
              ? "Paquetes Turisticos"
              : "Tour Packages"}
            <span className="text-gold-gradient ml-3">
              {language === "es" ? "Vip" : "Vip"}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto font-mono">
            {language === "es"
              ? "Explora nuestra seleccion de destinos cuidadosamente disenados para ofrecerte la mejor experiencia de viaje en Peru."
              : "Explore our selection of destinations carefully designed to offer you the best travel experience in Peru."}
          </p>
        </div>

        {/* Destinations Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
        >
          {destinations.map((dest, index) => (
            <DestinationCard
              key={dest.id}
              dest={dest}
              language={language}
              index={index}
              onOpenLightbox={handleOpenLightbox}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeDest && (
        <Lightbox
          images={lightboxImages}
          initialIndex={0}
          onClose={() => setActiveLightboxDest(null)}
        />
      )}
    </section>
  );
}
