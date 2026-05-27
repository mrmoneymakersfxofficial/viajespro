"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { useFavorites } from "@/context/favorites-context";
import { buildWhatsAppUrl, destinations } from "@/data/content";
import {
  MapPin,
  Heart,
  MessageCircle,
  LayoutGrid,
  Crown,
  X,
  Clock,
} from "lucide-react";
import Link from "next/link";

// ─── Bottom Drawer (Categorías) ─────────────────────────────
function CategoryDrawer({
  open,
  onClose,
  language,
}: {
  open: boolean;
  onClose: () => void;
  language: "es" | "en";
}) {
  const t = (item: { es: string; en: string }) => item[language];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-x-0 bottom-0 z-[75] bg-[#0a0a0a] rounded-t-3xl max-h-[70vh] overflow-y-auto"
          >
            {/* Handle */}
            <div className="sticky top-0 z-10 bg-[#0a0a0a] pt-3 pb-2 px-6 flex justify-center">
              <div className="w-10 h-1 bg-zinc-700 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-6 pt-2 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-vip tracking-[0.2em] text-gold-base uppercase font-bold">
                  {language === "es" ? "Todos los Destinos" : "All Destinations"}
                </h3>
                <p className="text-[10px] text-zinc-500 font-mono tracking-wider mt-1 uppercase">
                  {language === "es"
                    ? "Explora nuestras experiencias exclusivas"
                    : "Explore our exclusive experiences"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-zinc-500 hover:text-gold-base transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            {/* Destination List */}
            <div className="px-4 py-3 pb-10">
              {destinations.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                >
                  <Link
                    href={`/destinos/${dest.slug[language]}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/[0.03] transition-colors group"
                  >
                    {/* Mini Image */}
                    <div className="relative w-14 h-14 overflow-hidden border border-white/[0.06] flex-shrink-0">
                      <img
                        src={dest.image}
                        alt={t(dest.title)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-vip tracking-[0.15em] text-zinc-200 group-hover:text-gold-base transition-colors uppercase truncate font-bold">
                        {t(dest.title)}
                      </h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[9px] font-mono tracking-wider text-zinc-500 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {dest.duration}
                        </span>
                        <span className="text-[10px] font-mono tracking-wider text-gold-base font-bold">
                          {dest.price}
                        </span>
                      </div>
                    </div>
                    {/* Arrow */}
                    <span className="text-zinc-600 group-hover:text-gold-base transition-colors text-xs">
                      &rsaquo;
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Bottom Tab Bar ────────────────────────────────────────
export function BottomTabBar() {
  const { language } = useLanguage();
  const { count } = useFavorites();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const tabs = [
    {
      icon: MapPin,
      label: language === "es" ? "Explorar" : "Explore",
      action: () => scrollTo("#destinos"),
    },
    {
      icon: Heart,
      label: language === "es" ? "Favoritos" : "Favorites",
      action: () => scrollTo("#destinos"),
      badge: count > 0 ? count : undefined,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      action: () =>
        window.open(
          buildWhatsAppUrl({ type: "general", language }),
          "_blank"
        ),
      isCenter: true,
    },
    {
      icon: LayoutGrid,
      label: language === "es" ? "Destinos" : "Destinations",
      action: () => setDrawerOpen(true),
    },
    {
      icon: Crown,
      label: language === "es" ? "Club VIP" : "VIP Club",
      action: () => scrollTo("#contacto"),
    },
  ];

  return (
    <>
      {/* Tab Bar */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden">
        <div className="bg-zinc-950/90 backdrop-blur-lg border-t border-zinc-900 pb-[env(safe-area-inset-bottom)]">
          <div className="flex justify-around items-center h-16 px-1">
            {tabs.map((tab) => {
              if (tab.isCenter) {
                return (
                  <motion.button
                    key="whatsapp"
                    onClick={tab.action}
                    whileTap={{ scale: 0.9 }}
                    className="flex flex-col items-center justify-center gap-0.5 -mt-5"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-dark via-gold-base to-gold-light flex items-center justify-center shadow-lg shadow-gold-dark/30">
                      <tab.icon className="w-5 h-5 text-zinc-950" />
                    </div>
                    <span className="text-[9px] font-mono tracking-wider text-gold-base font-semibold">
                      WhatsApp
                    </span>
                  </motion.button>
                );
              }
              return (
                <motion.button
                  key={tab.label}
                  onClick={tab.action}
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center justify-center gap-0.5 relative py-1"
                >
                  <div className="relative">
                    <tab.icon className="w-5 h-5 text-zinc-500" />
                    {tab.badge && (
                      <span className="absolute -top-1.5 -right-2 bg-gold-base text-zinc-950 text-[8px] font-bold w-4 h-4 flex items-center justify-center">
                        {tab.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] font-mono tracking-wider text-zinc-500">
                    {tab.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Drawer */}
      <CategoryDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        language={language}
      />
    </>
  );
}
