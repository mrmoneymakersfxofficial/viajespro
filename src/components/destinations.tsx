"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { destinations, siteConfig, whatsappMessages } from "@/data/content";
import { useLanguage } from "@/context/language-context";
import { Badge } from "@/components/ui/badge";
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

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goNext, goPrev]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Touch swipe support
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
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[110] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Counter */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-[110] text-white/70 text-sm font-mono">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Prev button */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-3 sm:left-6 z-[110] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="relative max-w-6xl w-full mx-4 aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10"
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

        {/* Next button */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-3 sm:right-6 z-[110] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[110] flex gap-2 max-w-[90vw] overflow-x-auto px-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                className={`relative h-12 w-16 sm:h-14 sm:w-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                  i === currentIndex
                    ? "border-emerald-400 opacity-100 scale-105"
                    : "border-white/20 opacity-50 hover:opacity-80"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Destination Card Component ────────────────────────────
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
      className="destination-card group overflow-hidden rounded-2xl border border-border bg-card backdrop-blur-sm transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/5"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      {/* FULL MARGIN Image Container */}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Floating badges */}
        <div className="absolute inset-x-0 top-0 p-3 sm:p-4 flex justify-between items-start pointer-events-none">
          <span className="rounded-lg bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] sm:text-xs font-mono font-medium text-white/90 flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {dest.duration}
          </span>
          <span className="rounded-lg bg-emerald-500 px-2.5 py-1 text-[11px] sm:text-xs font-mono font-bold text-white shadow-lg">
            {dest.price}
          </span>
        </div>

        {/* Zoom icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="h-14 w-14 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
            <ZoomIn className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground mb-2">
          {t(dest.title)}
        </h3>

        {/* Tags instead of description */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {t(dest.highlights)
            .slice(0, 3)
            .map((tag, tagIdx) => (
              <span
                key={tagIdx}
                className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <Link
            href={`/destinos/${dest.slug[language]}`}
            className="flex h-10 sm:h-11 items-center justify-center rounded-xl border border-border bg-card text-xs font-bold tracking-wide text-foreground transition-all hover:bg-muted active:scale-[0.98]"
          >
            {language === "es" ? "Ver Itinerario" : "View Itinerary"}
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 sm:h-11 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 text-xs font-bold tracking-wide text-white transition-all hover:bg-emerald-700 active:scale-[0.98]"
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

  // Build lightbox images from destination
  const activeDest = destinations.find((d) => d.id === activeLightboxDest);
  const lightboxImages = activeDest
    ? [
        { src: activeDest.image, alt: activeDest.title[language] },
        // In future, add gallery images per destination
      ]
    : [];

  return (
    <section
      id="destinos"
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-28 bg-background overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-sm border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10"
          >
            {language === "es"
              ? "Destinos Populares"
              : "Popular Destinations"}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            {language === "es"
              ? "Paquetes Turisticos"
              : "Tour Packages"}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent ml-2">
              {language === "es" ? "Exclusivos" : "Exclusive"}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            {language === "es"
              ? "Explora nuestra seleccion de destinos cuidadosamente disenados para ofrecerte la mejor experiencia de viaje en Peru."
              : "Explore our selection of destinations carefully designed to offer you the best travel experience in Peru."}
          </p>
        </div>

        {/* Destinations Grid - Full Width, Mobile First */}
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
