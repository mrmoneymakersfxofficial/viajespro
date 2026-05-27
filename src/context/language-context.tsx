"use client";

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Language } from "@/data/content";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (obj: Record<Language, string> | { es: string; en: string }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  const t = useCallback(
    (obj: Record<Language, string> | { es: string; en: string }) => {
      return obj[language] || obj.es;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
