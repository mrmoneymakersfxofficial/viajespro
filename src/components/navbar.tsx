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
            ? "bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/[0.06]"
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
              {/* Using text logo since we may not have the VIP logo image yet */}
              <div className="flex items-center h-full">
                <span className="font-vip text-lg sm:text-xl font-bold tracking-wider">
                  <span className="text-gold-gradient">VIAJEROS</span>
                  <span className="text-white ml-1.5">VIP</span>
                </span>
              </div>
            </motion.a>

            {/* Desktop Navigation - Minimalist VIP */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-[11px] font-mono tracking-[0.2em] text-zinc-500 hover:text-gold-base transition-colors uppercase"
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                >
                  {t(link.label)}
                </motion.a>
              ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              {mounted && (
                <motion.button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono tracking-widest text-zinc-500 hover:text-gold-base transition-colors uppercase"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Toggle language"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="font-semibold">{language}</span>
                </motion.button>
              )}

              {/* Theme Toggle */}
              {mounted && (
                <motion.button
                  onClick={toggleTheme}
                  className="p-2 text-zinc-500 hover:text-gold-base transition-colors"
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

              {/* VIP Club Button */}
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

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-zinc-400 hover:text-gold-base transition-colors"
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Navigation - VIP Style */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-4 right-4 bg-[#121212]/95 backdrop-blur-xl border border-white/[0.06] p-4"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="px-4 py-3 text-sm font-mono tracking-[0.15em] text-zinc-400 hover:text-gold-base hover:bg-white/[0.03] transition-colors uppercase"
                  >
                    {t(link.label)}
                  </motion.a>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/[0.06]">
                <a
                  href="#contacto"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    handleNavClick("#contacto");
                  }}
                  className="flex h-11 items-center justify-center bg-gradient-to-r from-gold-dark via-gold-base to-gold-light text-[11px] font-mono font-bold tracking-[0.2em] text-zinc-950"
                >
                  CLUB VIP
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
