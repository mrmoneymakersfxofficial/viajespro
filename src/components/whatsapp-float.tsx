"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { siteConfig, whatsappMessages } from "@/data/content";
import { useLanguage } from "@/context/language-context";

export function WhatsAppFloat() {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState(true);

  useEffect(() => {
    // Show button after 2 seconds
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);

    // Hide tooltip after 6 seconds
    const tooltipTimer = setTimeout(() => setTooltip(false), 8000);
    return () => clearTimeout(tooltipTimer);
  }, []);

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    whatsappMessages.general[language]
  )}`;

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="relative max-w-[260px] bg-card border border-border rounded-2xl p-4 shadow-xl shadow-black/10"
          >
            <button
              onClick={() => setTooltip(false)}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted transition-colors"
              aria-label="Close tooltip"
            >
              <X className="w-3 h-3 text-muted-foreground" />
            </button>
            <p className="text-sm font-medium mb-1">
              {language === "es"
                ? "¿Necesitas ayuda? 💬"
                : "Need help? 💬"}
            </p>
            <p className="text-xs text-muted-foreground">
              {language === "es"
                ? "Escríbenos por WhatsApp y un asesor te ayudará con tu reserva al instante."
                : "Write to us on WhatsApp and an advisor will help you with your booking instantly."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 flex items-center justify-center group"
        aria-label="Contact via WhatsApp"
      >
        {/* Ping animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white relative z-10" />

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
      </motion.a>
    </div>
  );
}
