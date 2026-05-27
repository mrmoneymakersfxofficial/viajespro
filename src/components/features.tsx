"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { features, testimonials, siteConfig } from "@/data/content";
import { useLanguage } from "@/context/language-context";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  Clock,
  Wallet,
  Star,
  MessageCircle,
  Quote,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    if (!sectionRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
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
        { opacity: 0, x: -60, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
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
        { opacity: 0, y: 40, x: 30 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-36 bg-muted/50"
    >
      {/* Decorative */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-sm border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10"
          >
            {language === "es"
              ? "✨ Por Qué Elegirnos"
              : "✨ Why Choose Us"}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            {language === "es"
              ? "Tu Viaje en las Mejores Manos"
              : "Your Trip in the Best Hands"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {language === "es"
              ? "Nos destacamos por ofrecer un servicio de calidad excepcional que hace de cada viaje una experiencia perfecta."
              : "We stand out for offering exceptional quality service that makes every trip a perfect experience."}
          </p>
        </div>

        {/* Features + Image Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/10">
              <Image
                src="/images/experience.jpg"
                alt={
                  language === "es"
                    ? "Experiencia de viaje en Perú"
                    : "Travel experience in Peru"
                }
                width={640}
                height={426}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* Floating Stats Card */}
            <motion.div
              className="absolute -bottom-6 -right-4 sm:right-4 bg-background rounded-2xl p-4 shadow-xl border border-border"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">4.9/5</div>
                  <div className="text-xs text-muted-foreground">
                    {language === "es"
                      ? "2,000+ reseñas"
                      : "2,000+ reviews"}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Features Grid */}
          <div ref={featuresRef} className="grid gap-5">
            {features.map((feature) => {
              const Icon = iconMap[feature.icon] || Star;
              return (
                <motion.div
                  key={feature.icon}
                  className="feature-item group flex gap-4 p-5 rounded-2xl bg-card border border-border hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-200 dark:group-hover:bg-emerald-500/30 transition-colors">
                    <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">
                      {t(feature.title)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
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
    if (!sectionRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
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
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="experiencias"
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-36 bg-background"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-sm border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10"
          >
            {language === "es"
              ? "💬 Testimonios"
              : "💬 Testimonials"}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            {language === "es"
              ? "Lo Que Dicen Nuestros Viajeros"
              : "What Our Travelers Say"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {language === "es"
              ? "Miles de viajeros confían en nosotros para hacer realidad sus sueños de explorar Perú."
              : "Thousands of travelers trust us to make their dreams of exploring Peru come true."}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card group relative p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500"
              whileHover={{ y: -4 }}
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-emerald-500/20 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground/90 mb-6 leading-relaxed italic">
                &ldquo;{t(testimonial.text)}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-500/20">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {t(testimonial.location)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.a
            href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
              language === "es"
                ? "¡Hola! 🌎 Me gustaría ver testimonios de más viajeros y conocer sus paquetes turísticos."
                : "Hello! 🌎 I would like to see more traveler testimonials and learn about your tour packages."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xl shadow-emerald-600/25 transition-colors">
              <MessageCircle className="w-5 h-5" />
              {language === "es"
                ? "Escríbenos por WhatsApp"
                : "Write us on WhatsApp"}
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
