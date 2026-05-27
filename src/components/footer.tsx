"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { aboutContent, footerContent, siteConfig, buildWhatsAppUrl } from "@/data/content";
import { useLanguage } from "@/context/language-context";
import {
  MessageCircle,
  Phone,
  MapPin,
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
      gsap.fromTo(contentRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: contentRef.current, start: "top 85%", toggleActions: "play none none none" } });
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-14 sm:py-20 bg-background overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="text-center">
          <span className="inline-block text-[10px] sm:text-[11px] font-mono tracking-[0.3em] text-gold-base uppercase mb-3 sm:mb-4">
            {t(aboutContent.title)}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-vip tracking-wider text-foreground mb-4 sm:mb-6 uppercase">
            {t(aboutContent.subtitle)}
          </h2>
          <div className="space-y-4 sm:space-y-5 text-muted-foreground text-xs sm:text-sm lg:text-base leading-relaxed max-w-3xl mx-auto">
            {aboutContent.paragraphs.map((p, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15, duration: 0.6 }} viewport={{ once: true }}>
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
      gsap.fromTo(contentRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: contentRef.current, start: "top 85%", toggleActions: "play none none none" } });
    })();
    return () => { cancelled = true; };
  }, []);

  const whatsappGeneral = buildWhatsAppUrl({ type: "general", language });

  return (
    <section id="contacto" ref={sectionRef} className="relative py-14 sm:py-20 bg-background overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-px bg-gradient-to-r from-transparent via-gold-base/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={contentRef}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="inline-block text-[10px] sm:text-[11px] font-mono tracking-[0.3em] text-gold-base uppercase mb-3 sm:mb-4">
              {language === "es" ? "Contacto" : "Contact"}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-vip tracking-wider text-foreground uppercase">
              {language === "es" ? "Listo Para Tu Aventura?" : "Ready for Your Adventure?"}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
            {/* WhatsApp */}
            <motion.a href={whatsappGeneral} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center text-center p-6 sm:p-8 bg-card border border-border dark:hover:border-gold-dark/20 hover:border-gold-base/30 transition-all duration-500 shadow-sm dark:shadow-none" whileHover={{ y: -6 }} whileTap={{ scale: 0.98 }}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 border border-gold-base/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:border-gold-base/40 group-hover:shadow-gold transition-all">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gold-base" />
              </div>
              <h3 className="font-vip tracking-wider text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 uppercase text-foreground">WhatsApp</h3>
              <p className="text-[10px] sm:text-[11px] font-mono tracking-wider text-muted-foreground mb-2 sm:mb-3 uppercase">{language === "es" ? "Respuesta inmediata" : "Immediate response"}</p>
              <span className="text-gold-base text-xs sm:text-sm font-mono tracking-wider">+51 958 446 061</span>
            </motion.a>

            {/* Phone */}
            <motion.a href={`tel:${siteConfig.phone}`} className="group flex flex-col items-center text-center p-6 sm:p-8 bg-card border border-border dark:hover:border-gold-dark/20 hover:border-gold-base/30 transition-all duration-500 shadow-sm dark:shadow-none" whileHover={{ y: -6 }} whileTap={{ scale: 0.98 }}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 border border-gold-base/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:border-gold-base/40 group-hover:shadow-gold transition-all">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-gold-base" />
              </div>
              <h3 className="font-vip tracking-wider text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 uppercase text-foreground">{language === "es" ? "Llamanos" : "Call Us"}</h3>
              <p className="text-[10px] sm:text-[11px] font-mono tracking-wider text-muted-foreground mb-2 sm:mb-3 uppercase">{language === "es" ? "Lunes a Sabado" : "Monday to Saturday"}</p>
              <span className="text-gold-base text-xs sm:text-sm font-mono tracking-wider">+51 958 446 061</span>
            </motion.a>

            {/* Location */}
            <motion.div className="group flex flex-col items-center text-center p-6 sm:p-8 bg-card border border-border dark:hover:border-gold-dark/20 hover:border-gold-base/30 transition-all duration-500 sm:col-span-2 lg:col-span-1 shadow-sm dark:shadow-none" whileHover={{ y: -6 }}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 border border-gold-base/20 flex items-center justify-center mb-3 sm:mb-4 group-hover:border-gold-base/40 group-hover:shadow-gold transition-all">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-gold-base" />
              </div>
              <h3 className="font-vip tracking-wider text-xs sm:text-sm font-bold mb-1.5 sm:mb-2 uppercase text-foreground">{language === "es" ? "Ubicacion" : "Location"}</h3>
              <p className="text-[10px] sm:text-[11px] font-mono tracking-wider text-muted-foreground mb-2 sm:mb-3 uppercase">{language === "es" ? "Oficina central" : "Main office"}</p>
              <span className="text-gold-base text-xs sm:text-sm font-mono tracking-wider">Peru</span>
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
    <footer className="relative dark:bg-[#080808] bg-[#1a1a1c] text-zinc-400 dark:text-zinc-400 pt-14 sm:pt-16 pb-6 sm:pb-8 overflow-hidden">
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-b dark:from-background from-[#eceae5] to-transparent pointer-events-none" />
      {/* Gold line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-base/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-3 sm:mb-4">
              <span className="font-vip text-lg sm:text-xl font-bold tracking-[0.15em]">
                <span className="text-gold-gradient">VIAJEROS</span>
                <span className="text-white ml-1.5">VIP</span>
              </span>
            </div>
            <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed font-mono">{t(footerContent.tagline)}</p>
            <div className="flex gap-2.5 sm:gap-3 mt-5 sm:mt-6">
              <motion.a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 border dark:border-white/[0.08] border-white/10 hover:border-gold-base/40 flex items-center justify-center text-zinc-500 hover:text-gold-base transition-all" whileHover={{ y: -2 }} aria-label="Facebook"><Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></motion.a>
              <motion.a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 border dark:border-white/[0.08] border-white/10 hover:border-gold-base/40 flex items-center justify-center text-zinc-500 hover:text-gold-base transition-all" whileHover={{ y: -2 }} aria-label="Instagram"><Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-vip tracking-[0.2em] text-[10px] sm:text-xs font-bold mb-3 sm:mb-4 text-gold-base uppercase">{t(footerContent.quickLinks.title)}</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {footerContent.quickLinks.links.map((link) => (
                <li key={link.href}><a href={link.href} className="text-xs sm:text-sm text-zinc-500 hover:text-gold-base transition-colors font-mono tracking-wider">{t(link.label)}</a></li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="font-vip tracking-[0.2em] text-[10px] sm:text-xs font-bold mb-3 sm:mb-4 text-gold-base uppercase">{t(footerContent.popularDestinations.title)}</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {footerContent.popularDestinations.links.map((link) => (
                <li key={link.label.es}><a href={link.href} className="text-xs sm:text-sm text-zinc-500 hover:text-gold-base transition-colors font-mono tracking-wider">{t(link.label)}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-vip tracking-[0.2em] text-[10px] sm:text-xs font-bold mb-3 sm:mb-4 text-gold-base uppercase">{t(footerContent.contact.title)}</h3>
            <ul className="space-y-2.5 sm:space-y-3">
              <li className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500 font-mono tracking-wider"><Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-base" />+51 958 446 061</li>
              <li className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500 font-mono tracking-wider"><MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-base" />WhatsApp</li>
              <li className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500 font-mono tracking-wider"><MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-base" />Peru</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-12 border-t dark:border-white/[0.06] border-white/10 pt-6 sm:pt-8">
          <div className="flex flex-col items-center justify-between gap-3 sm:gap-4 text-center sm:text-left sm:flex-row">
            <p className="text-[10px] sm:text-[11px] text-zinc-600 font-mono tracking-wider">
              &copy; {new Date().getFullYear()} Viajeros VIP. {language === "es" ? "Todos los derechos reservados." : "All rights reserved."}
            </p>
            <p>
              <span className="text-[10px] sm:text-[11px] text-zinc-600 font-mono tracking-wider">{language === "es" ? "Desarrollado por" : "Developed by"} </span>
              <a href={siteConfig.provider.url} target="_blank" rel="noopener noreferrer" className="text-[10px] sm:text-[11px] text-gold-base hover:text-gold-light font-semibold underline underline-offset-4 transition-colors tracking-wider">{siteConfig.provider.name}</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
