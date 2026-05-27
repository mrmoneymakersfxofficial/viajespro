"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { useFavorites } from "@/context/favorites-context";
import { buildWhatsAppUrl } from "@/data/content";
import { MapPin, Heart, MessageCircle, TicketCheck } from "lucide-react";

export function BottomTabBar() {
  const { language } = useLanguage();
  const { count } = useFavorites();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const tabs = [
    {
      icon: MapPin,
      label: language === "es" ? "Destinos" : "Destinations",
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
      action: () => window.open(buildWhatsAppUrl({ type: "general", language }), "_blank"),
      isCenter: true,
    },
    {
      icon: TicketCheck,
      label: language === "es" ? "Reservas" : "Bookings",
      action: () => scrollTo("#contacto"),
    },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden">
      <div className="bg-zinc-950/90 backdrop-blur-lg border-t border-zinc-900 pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around items-center h-16 px-2">
          {tabs.map((tab) => {
            if (tab.isCenter) {
              return (
                <motion.button
                  key="whatsapp"
                  onClick={tab.action}
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center justify-center gap-0.5 -mt-5"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-dark via-gold-base to-gold-light flex items-center justify-center shadow-lg shadow-gold-dark/30">
                    <tab.icon className="w-5 h-5 text-zinc-950" />
                  </div>
                  <span className="text-[9px] font-mono tracking-wider text-gold-base font-semibold">WhatsApp</span>
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
                <span className="text-[9px] font-mono tracking-wider text-zinc-500">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
