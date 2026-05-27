"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { aboutContent, footerContent, siteConfig } from "@/data/content";
import { useLanguage } from "@/context/language-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Plane,
  Facebook,
  Instagram,
} from "lucide-react";
import gsap from "gsap";

// ─── About Section ─────────────────────────────────────────

export function About() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;

    (async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    })();

    return () => { cancelled = true; };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="text-center">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-sm border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10"
          >
            {t(aboutContent.title)}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            {t(aboutContent.subtitle)}
          </h2>
          <div className="space-y-5 text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
            {aboutContent.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {t(p)}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ───────────────────────────────────────

export function Contact() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;

    (async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    })();

    return () => { cancelled = true; };
  }, []);

  const whatsappGeneral = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    language === "es"
      ? "¡Hola! 🌎 Me gustaría obtener información sobre sus paquetes turísticos a Perú."
      : "Hello! 🌎 I would like to get information about your tour packages to Peru."
  )}`;

  return (
    <section id="contacto" ref={sectionRef} className="relative py-20 sm:py-28 bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.08),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={contentRef}>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge
              variant="outline"
              className="mb-4 px-4 py-1.5 text-sm border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10"
            >
              {language === "es" ? "📞 Contacto" : "📞 Contact"}
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              {language === "es"
                ? "¿Listo para Tu Aventura?"
                : "Ready for Your Adventure?"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {language === "es"
                ? "Contáctanos ahora y un asesor te ayudará a planificar el viaje perfecto."
                : "Contact us now and an advisor will help you plan the perfect trip."}
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* WhatsApp */}
            <motion.a
              href={whatsappGeneral}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-border hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500"
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-500/30 group-hover:scale-110 transition-all duration-300">
                <MessageCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">WhatsApp</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {language === "es"
                  ? "Respuesta inmediata"
                  : "Immediate response"}
              </p>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                +51 958 446 061
              </span>
            </motion.a>

            {/* Phone */}
            <motion.a
              href={`tel:${siteConfig.phone}`}
              className="group flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-border hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500"
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center mb-4 group-hover:bg-teal-200 dark:group-hover:bg-teal-500/30 group-hover:scale-110 transition-all duration-300">
                <Phone className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">
                {language === "es" ? "Llámanos" : "Call Us"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {language === "es"
                  ? "Lunes a Sábado"
                  : "Monday to Saturday"}
              </p>
              <span className="text-teal-600 dark:text-teal-400 font-semibold text-sm">
                +51 958 446 061
              </span>
            </motion.a>

            {/* Location */}
            <motion.div
              className="group flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-border hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 sm:col-span-2 lg:col-span-1"
              whileHover={{ y: -8 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center mb-4 group-hover:bg-cyan-200 dark:group-hover:bg-cyan-500/30 group-hover:scale-110 transition-all duration-300">
                <MapPin className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="font-bold text-lg mb-2">
                {language === "es" ? "Ubicación" : "Location"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {language === "es"
                  ? "Oficina central en Perú"
                  : "Main office in Peru"}
              </p>
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm">
                Perú
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────

export function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="relative bg-foreground text-background pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">
                <span className="text-emerald-400">Viajes</span>
                <span className="text-white">PRO</span>
              </span>
            </div>
            <p className="text-background/60 text-sm leading-relaxed">
              {t(footerContent.tagline)}
            </p>
            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <motion.a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-background/10 hover:bg-emerald-600 flex items-center justify-center transition-colors"
                whileHover={{ y: -2 }}
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-background/10 hover:bg-emerald-600 flex items-center justify-center transition-colors"
                whileHover={{ y: -2 }}
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-emerald-400">
              {t(footerContent.quickLinks.title)}
            </h3>
            <ul className="space-y-3">
              {footerContent.quickLinks.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-background/60 hover:text-white transition-colors"
                  >
                    {t(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-emerald-400">
              {t(footerContent.popularDestinations.title)}
            </h3>
            <ul className="space-y-3">
              {footerContent.popularDestinations.links.map((link) => (
                <li key={link.label.es}>
                  <a
                    href={link.href}
                    className="text-sm text-background/60 hover:text-white transition-colors"
                  >
                    {t(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-emerald-400">
              {t(footerContent.contact.title)}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-background/60">
                <Phone className="w-4 h-4 text-emerald-400" />
                +51 958 446 061
              </li>
              <li className="flex items-center gap-2 text-sm text-background/60">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                WhatsApp
              </li>
              <li className="flex items-center gap-2 text-sm text-background/60">
                <MapPin className="w-4 h-4 text-emerald-400" />
                Per&uacute;
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/50">{t(footerContent.copyright)}</p>
          <a
            href={siteConfig.provider.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-background/50 hover:text-emerald-400 transition-colors group"
          >
            {language === "es" ? "Dise&ntilde;o y desarrollo por" : "Design and development by"}{" "}
            <span className="font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">
              {siteConfig.provider.name}
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
