"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { hasHindiVersion, languageFromPath, localizePath, type Language } from "@/lib/i18n";

export type { Language };

const STORAGE_KEY = "language";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function persist(lang: Language) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* storage unavailable (private mode etc.) */
  }
}

/**
 * The language comes from the URL ("/hi/..." = Hindi), so Hindi pages are
 * server-rendered in Hindi and indexable. Switching language navigates to the
 * counterpart URL.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const language = languageFromPath(pathname);

  // Returning visitors who picked Hindi earlier land on the Hindi version
  useEffect(() => {
    try {
      if (
        localStorage.getItem(STORAGE_KEY) === "hi" &&
        languageFromPath(window.location.pathname) === "en" &&
        hasHindiVersion(window.location.pathname)
      ) {
        router.replace(localizePath(window.location.pathname + window.location.search + window.location.hash, "hi"));
      }
    } catch {
      /* ignore */
    }
    // only on first load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep <html lang> in sync for screen readers, translation tools and fonts
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback(
    (lang: Language) => {
      persist(lang);
      const current = window.location.pathname + window.location.search + window.location.hash;
      const target = localizePath(current, lang);
      if (target !== current) router.push(target);
    },
    [router]
  );

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "hi" : "en");
  }, [language, setLanguage]);

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage }),
    [language, setLanguage, toggleLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
