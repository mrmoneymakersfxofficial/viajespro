"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { siteConfig, destinations } from "@/data/content";
import {
  MessageCircle,
  Clock,
  MapPin,
  Star,
  ShieldCheck,
  Users,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import gsap from "gsap";

// ─── Types ────────────────────────────────────────────────
type Destination = (typeof destinations)[0];

// ─── Lightbox ─────────────────────────────────────────────
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
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[110] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-[110] text-white/70 text-sm font-mono">
          {currentIndex + 1} / {images.length}
        </div>

        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-3 sm:left-6 z-[110] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
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

        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-3 sm:right-6 z-[110] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
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
                className={`relative h-12 w-16 sm:h-14 sm:w-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                  i === currentIndex
                    ? "border-emerald-400 opacity-100 scale-105"
                    : "border-white/20 opacity-50 hover:opacity-80"
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

// ─── Client Component ─────────────────────────────────────
export default function DestinationPageClient({ dest }: { dest: Destination }) {
  const { language } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const t = (item: { es: string; en: string }) => item[language];
  const tArr = (item: { es: string[]; en: string[] }) => item[language];

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;

    (async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      if (!pageRef.current) return;

      const sections = pageRef.current.querySelectorAll(".animate-in");
      gsap.fromTo(
        sections,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pageRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Gallery images (hero + related destinations as "more views")
  const galleryImages = [
    { src: dest.image, alt: t(dest.title) },
    ...destinations
      .filter((d) => d.id !== dest.id)
      .slice(0, 4)
      .map((d) => ({ src: d.image, alt: t(d.title) })),
  ];

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    language === "es"
      ? `Hola! Deseo cotizar el paquete premium a: *${t(dest.title)}* \u2708\ufe0f`
      : `Hello! I want to quote the premium package for: *${t(dest.title)}* \u2708\ufe0f`
  )}`;

  return (
    <div ref={pageRef}>
      {/* Hero Image Full Width */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden">
        <Image
          src={dest.image}
          alt={t(dest.title)}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

        {/* Back button */}
        <div className="absolute top-20 sm:top-24 left-4 sm:left-6 z-20">
          <Link
            href="/#destinos"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/40 backdrop-blur-md text-white text-sm font-medium border border-white/10 hover:bg-black/60 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === "es" ? "Volver" : "Back"}
          </Link>
        </div>

        {/* Content overlay */}
        <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 lg:p-16">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/90 px-3 py-1 text-xs font-bold text-white">
                {dest.price}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 backdrop-blur-md px-3 py-1 text-xs font-mono font-medium text-white">
                <Clock className="w-3 h-3" />
                {dest.duration}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 backdrop-blur-md px-3 py-1 text-xs font-mono font-medium text-white">
                <MapPin className="w-3 h-3" />
                Peru
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-2 tracking-tight">
              {t(dest.title)}
            </h1>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl">
              {t(dest.description)}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: Itinerary & Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Highlights */}
            <div className="animate-in">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                {language === "es" ? "Que incluye este paquete" : "What this package includes"}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {tArr(dest.highlights).map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-muted/50 border border-border"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Gallery Section */}
            <div className="animate-in">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                {language === "es" ? "Galeria" : "Gallery"}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-zoom-in border border-border hover:border-emerald-500/30 transition-colors ${
                      i === 0 ? "col-span-2 sm:col-span-2" : ""
                    }`}
                    onClick={() => setLightboxIndex(i)}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Day by day (placeholder) */}
            <div className="animate-in">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                {language === "es" ? "Itinerario sugerido" : "Suggested itinerary"}
              </h2>
              <div className="space-y-4">
                {Array.from({ length: Math.ceil(parseInt(dest.duration) / 2) }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4 p-4 rounded-xl bg-card border border-border"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                      {i < Math.ceil(parseInt(dest.duration) / 2) - 1 && (
                        <div className="w-0.5 flex-1 bg-border mt-2" />
                      )}
                    </div>
                    <div className="pt-2">
                      <h3 className="font-bold text-sm mb-1">
                        {language === "es" ? `Dia ${i + 1}` : `Day ${i + 1}`}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {language === "es"
                          ? "Actividades programadas con guia profesional. Incluye transporte, entradas y almuerzo."
                          : "Scheduled activities with a professional guide. Includes transport, entrance fees, and lunch."}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="animate-in sticky top-24 space-y-4">
              {/* Price Card */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
                <div className="mb-4">
                  <span className="text-3xl sm:text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                    {dest.price}
                  </span>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {dest.duration}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-emerald-500" />
                    {language === "es" ? "Grupos pequenos (max 12)" : "Small groups (max 12)"}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    {language === "es" ? "Seguro de viaje incluido" : "Travel insurance included"}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-emerald-500" />
                    {language === "es" ? "Guia profesional certificado" : "Certified professional guide"}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    {language === "es" ? "Disponible todo el ano" : "Available year-round"}
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors shadow-lg shadow-emerald-600/20"
                >
                  <MessageCircle className="w-5 h-5" />
                  {language === "es" ? "Reservar por WhatsApp" : "Book via WhatsApp"}
                </a>

                <p className="text-[11px] text-muted-foreground text-center mt-3">
                  {language === "es"
                    ? "Respuesta inmediata. Sin compromiso."
                    : "Immediate response. No commitment."}
                </p>
              </div>

              {/* Related Destinations */}
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-bold text-sm mb-3">
                  {language === "es" ? "Otros destinos" : "Other destinations"}
                </h3>
                <div className="space-y-2.5">
                  {destinations
                    .filter((d) => d.id !== dest.id)
                    .slice(0, 3)
                    .map((d) => (
                      <Link
                        key={d.id}
                        href={`/destinos/${d.slug[language]}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <div className="relative h-12 w-16 rounded-lg overflow-hidden flex-shrink-0 border border-border">
                          <Image
                            src={d.image}
                            alt={t(d.title)}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="64px"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate">{t(d.title)}</p>
                          <p className="text-xs text-muted-foreground">{d.price}</p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
