"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { features, testimonials, siteConfig } from "@/data/content";
import { useLanguage } from "@/context/language-context";
import {
  ShieldCheck,
  Clock,
  Wallet,
  Star,
  MessageCircle,
} from "lucide-react";
import gsap from "gsap";

const iconMap: Record<string, React.ElementType> = {
  "shield-check": ShieldCheck,
  clock: Clock,
  wallet: Wallet,
  star: Star,
};

export function Features() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;

    (async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (featuresRef.current) {
        const items = featuresRef.current.querySelectorAll(".feature-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className="relative py-14 sm:py-20 lg:py-28 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block text-[10px] sm:text-[11px] font-mono tracking-[0.3em] text-gold-base uppercase mb-3 sm:mb-4">
            {language === "es" ? "Por Que Elegirnos" : "Why Choose Us"}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-vip tracking-wider text-foreground uppercase">
            {language === "es"
              ? "Experiencia Premium"
              : "Premium Experience"}
          </h2>
        </div>

        {/* Features + Image Layout */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Left: Image */}
          <div ref={imageRef} className="relative">
            <div className="relative overflow-hidden border dark:border-white/[0.06] border-zinc-200 shadow-sm dark:shadow-none">
              <Image
                src="/images/experience.jpg"
                alt={language === "es" ? "Experiencia VIP en Peru" : "VIP Experience in Peru"}
                width={640}
                height={426}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* Floating Stats Card */}
            <motion.div
              className="absolute -bottom-4 -right-2 sm:right-4 dark:bg-[#121212] bg-white p-3 sm:p-4 dark:shadow-xl shadow-lg shadow-zinc-200/50 border dark:border-white/[0.06] border-zinc-200"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border border-gold-base/30 flex items-center justify-center">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-gold-base" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-gold-base font-vip tracking-wider">4.9/5</div>
                  <div className="text-[9px] sm:text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
                    {language === "es" ? "2,000+ resenas" : "2,000+ reviews"}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Features Grid */}
          <div ref={featuresRef} className="grid gap-3 sm:gap-4">
            {features.map((feature) => {
              const Icon = iconMap[feature.icon] || Star;
              return (
                <motion.div
                  key={feature.icon}
                  className="feature-item group flex gap-3 sm:gap-4 p-3.5 sm:p-5 bg-card border border-border dark:hover:border-gold-dark/20 hover:border-gold-base/30 transition-all duration-300 shadow-sm dark:shadow-none"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 border border-gold-base/20 flex items-center justify-center group-hover:border-gold-base/40 transition-colors">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gold-base" />
                  </div>
                  <div>
                    <h3 className="font-vip tracking-wider text-xs sm:text-sm font-bold mb-1 uppercase">
                      {t(feature.title)}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {t(feature.description)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Section ──────────────────────────────────

export function Testimonials() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;

    (async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".testimonial-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return (
    <section
      id="experiencias"
      ref={sectionRef}
      className="relative py-14 sm:py-20 lg:py-28 bg-background overflow-hidden"
    >
      {/* Gold divider */}
      <div className="divider-gold max-w-7xl mx-auto mb-12 sm:mb-16" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block text-[10px] sm:text-[11px] font-mono tracking-[0.3em] text-gold-base uppercase mb-3 sm:mb-4">
            {language === "es" ? "Testimonios" : "Testimonials"}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-vip tracking-wider text-foreground uppercase">
            {language === "es"
              ? "Lo Que Dicen Nuestros Viajeros"
              : "What Our Travelers Say"}
          </h2>
        </div>

        {/* Testimonials Grid — 1/2/3 */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card group p-4 sm:p-6 bg-card border border-border dark:hover:border-gold-dark/20 hover:border-gold-base/30 transition-all duration-500 shadow-sm dark:shadow-none"
              whileHover={{ y: -3 }}
            >
              {/* Gold quote mark */}
              <span className="block text-2xl sm:text-3xl text-gold-base/30 font-serif leading-none mb-3 sm:mb-4 select-none">&ldquo;</span>

              {/* Stars */}
              <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-base"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground/80 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed italic">
                &ldquo;{t(testimonial.text)}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-border">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gold-base/10 border border-gold-base/20 flex items-center justify-center text-gold-base font-bold text-[10px] sm:text-xs font-vip tracking-wider">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-xs sm:text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-mono tracking-wider text-muted-foreground uppercase">
                    {t(testimonial.location)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-10 sm:mt-12 text-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.a
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
              language === "es"
                ? "Hola! Me gustaria ver testimonios de mas viajeros y conocer sus paquetes turisticos."
                : "Hello! I would like to see more traveler testimonials and learn about your tour packages."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-11 sm:h-12 bg-gradient-to-r from-gold-dark via-gold-base to-gold-light px-6 sm:px-8 text-[11px] sm:text-[12px] font-mono font-bold tracking-[0.2em] text-zinc-950 shadow-lg shadow-gold-dark/20"
          >
            <MessageCircle className="w-4 h-4" />
            {language === "es"
              ? "Escrbenos por WhatsApp"
              : "Write us on WhatsApp"}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
