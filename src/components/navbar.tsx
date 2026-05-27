"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Sun, Moon } from "lucide-react";
import { navLinks } from "@/data/content";
import { useLanguage } from "@/context/language-context";
import { useTheme } from "next-themes";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "dark:bg-[#0a0a0a]/80 bg-white/80 backdrop-blur-md border-b dark:border-white/[0.06] border-zinc-200/80"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#inicio");
              }}
              className="relative w-40 h-12 sm:w-44 transition-transform active:scale-[0.98]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center h-full">
                <span className="font-vip text-lg sm:text-xl font-bold tracking-wider">
                  <span className="text-gold-gradient">VIAJEROS</span>
                  <span className="dark:text-white text-zinc-900 ml-1.5">VIP</span>
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="relative text-[11px] font-mono tracking-[0.2em] text-zinc-600 dark:text-zinc-300 dark:opacity-80 hover:text-gold-base dark:hover:text-gold-base hover:tracking-[0.28em] dark:hover:tracking-[0.28em] hover:opacity-100 dark:hover:opacity-100 transition-all duration-300 ease-out uppercase"
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                >
                  {t(link.label)}
                </motion.a>
              ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              {/* Language */}
              {mounted && (
                <motion.button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono tracking-widest text-zinc-600 dark:text-zinc-500 hover:text-gold-base transition-colors uppercase"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Toggle language"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="font-semibold">{language}</span>
                </motion.button>
              )}

              {/* Theme */}
              {mounted && (
                <motion.button
                  onClick={toggleTheme}
                  className="p-2 text-zinc-600 dark:text-zinc-500 hover:text-gold-base transition-colors"
                  whileHover={{ rotate: 15 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </motion.button>
              )}

              {/* CLUB VIP Button */}
              <motion.a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contacto");
                }}
                className="hidden sm:inline-flex h-9 items-center justify-center bg-gradient-to-r from-gold-dark via-gold-base to-gold-light px-5 text-[11px] font-mono font-bold tracking-[0.2em] text-zinc-950 shadow-lg shadow-gold-dark/10 transition-transform duration-300 hover:scale-105 active:scale-[0.98]"
                whileTap={{ scale: 0.95 }}
              >
                CLUB VIP
              </motion.a>

              {/* Mobile Menu Toggle */}
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-zinc-700 dark:text-zinc-400 hover:text-gold-base transition-colors"
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                <Menu className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[59] bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            {/* Full-screen panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="fixed inset-0 z-[60] bg-[#0a0a0a] md:hidden overflow-y-auto"
            >
              {/* Subtle radial gold gradient */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.02),transparent_70%)] pointer-events-none" />

              {/* Close button */}
              <div className="relative flex justify-end p-5">
                <button onClick={() => setMobileOpen(false)} className="p-2 text-zinc-400 hover:text-gold-base transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Logo */}
              <div className="relative px-8 mb-12">
                <span className="font-vip text-2xl font-bold tracking-wider">
                  <span className="text-gold-gradient">VIAJEROS</span>
                  <span className="text-white ml-2">VIP</span>
                </span>
              </div>

              {/* Links with stagger */}
              <nav className="relative px-8 flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                    onClick={(e) => { e.preventDefault(); setMobileOpen(false); handleNavClick(link.href); }}
                    className="py-3 text-lg sm:text-xl font-vip tracking-[0.3em] text-zinc-300 hover:text-gold-base transition-colors uppercase border-b border-white/[0.04]"
                  >
                    {t(link.label)}
                  </motion.a>
                ))}
              </nav>

              {/* Club VIP CTA at bottom */}
              <div className="relative px-8 mt-10">
                <motion.a
                  href="#contacto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  onClick={(e) => { e.preventDefault(); setMobileOpen(false); handleNavClick("#contacto"); }}
                  className="flex h-12 items-center justify-center bg-gradient-to-r from-gold-dark via-gold-base to-gold-light text-[11px] font-mono font-bold tracking-[0.2em] text-zinc-950"
                >
                  CLUB VIP
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
