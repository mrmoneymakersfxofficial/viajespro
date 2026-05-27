"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { destinations, siteConfig, whatsappMessages } from "@/data/content";
import { useLanguage } from "@/context/language-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, MapPin, Clock, Star, ArrowRight } from "lucide-react";
import gsap from "gsap";

export function Destinations() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;

    (async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current || !titleRef.current) return;

      // GSAP title animation on scroll
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

      // Staggered card reveal
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
            stagger: 0.12,
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

    return () => { cancelled = true; };
  }, []);

  const getWhatsAppUrl = (destId: string) => {
    const msg =
      whatsappMessages[destId as keyof typeof whatsappMessages] ||
      whatsappMessages.general;
    return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
      msg[language]
    )}`;
  };

  return (
    <section
      id="destinos"
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-36 bg-background"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-sm border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10"
          >
            {language === "es"
              ? "📍 Destinos Populares"
              : "📍 Popular Destinations"}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            {language === "es"
              ? "Paquetes Turísticos"
              : "Tour Packages"}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent ml-3">
              {language === "es" ? "Exclusivos" : "Exclusive"}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {language === "es"
              ? "Explora nuestra selección de destinos cuidadosamente diseñados para ofrecerte la mejor experiencia de viaje en Perú."
              : "Explore our selection of destinations carefully designed to offer you the best travel experience in Peru."}
          </p>
        </div>

        {/* Destinations Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              className="destination-card group relative rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image */}
              <div className="relative h-64 sm:h-72 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={t(dest.title)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Price Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-emerald-600 text-white border-0 px-3 py-1 font-semibold shadow-lg">
                    {dest.price}
                  </Badge>
                </div>

                {/* Duration */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <Badge className="bg-black/50 text-white border-0 backdrop-blur-md gap-1">
                    <Clock className="w-3 h-3" />
                    {dest.duration}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  <h3 className="text-xl font-bold">{t(dest.title)}</h3>
                </div>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {t(dest.description)}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {t(dest.highlights).slice(0, 3).map((highlight, hIdx) => (
                    <span
                      key={hIdx}
                      className="inline-flex items-center text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <motion.a
                  href={getWhatsAppUrl(dest.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-4 h-4" />
                  {language === "es" ? "Consultar por WhatsApp" : "Inquire via WhatsApp"}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
