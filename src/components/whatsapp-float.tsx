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
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const tooltipTimer = setTimeout(() => setTooltip(false), 8000);
    return () => clearTimeout(tooltipTimer);
  }, []);

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    whatsappMessages.general[language]
  )}`;

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Tooltip — VIP flat style */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="relative max-w-[240px] bg-vip-card border border-vip-border p-4 shadow-gold"
          >
            <button
              onClick={() => setTooltip(false)}
              className="absolute top-2 right-2 p-1 hover:bg-white/[0.06] transition-colors"
              aria-label="Close tooltip"
            >
              <X className="w-3 h-3 text-muted-foreground" />
            </button>
            <p className="text-sm font-medium mb-1 text-zinc-200">
              {language === "es"
                ? "Necesitas ayuda?"
                : "Need help?"}
            </p>
            <p className="text-xs text-muted-foreground">
              {language === "es"
                ? "Escríbenos por WhatsApp y un asesor VIP te ayudará al instante."
                : "Write to us on WhatsApp and a VIP advisor will help you instantly."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button — VIP flat square */}
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
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] shadow-lg shadow-[#25D366]/30 flex items-center justify-center group"
        aria-label="Contact via WhatsApp"
      >
        {/* Ping */}
        <span className="absolute inset-0 bg-[#25D366] animate-ping opacity-20" />
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10" />
        {/* Hover glow */}
        <div className="absolute inset-0 bg-[#25D366] opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
      </motion.a>
    </div>
  );
}
