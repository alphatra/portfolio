export type Locale = 'pl' | 'en' | 'de' | 'it' | 'zh';

import pl from './locales/pl.json';
import en from './locales/en.json';
import de from './locales/de.json';
import it from './locales/it.json';
import zh from './locales/zh.json';

import { useCallback, useSyncExternalStore } from 'react';

const dictionaries: Record<Locale, Record<string, string | string[]>> = {
  pl,
  en,
  de,
  it,
  zh
};

// --- Reactive locale store ---
let currentLocale: Locale = 'pl';

// Initialize immediately
if (typeof document !== 'undefined') {
  try {
    const stored = localStorage.getItem('locale') as Locale | null;
    if (stored && dictionaries[stored]) {
      currentLocale = stored;
    }
    document.documentElement.setAttribute('lang', currentLocale);
  } catch (e) {
    console.warn('Failed to load locale from localStorage', e);
  }
}

const listeners = new Set<() => void>();

function notifyLocaleChange() {
  listeners.forEach(cb => cb());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): Locale {
  return currentLocale;
}

export function getLocale(): Locale {
  return currentLocale;
}

export function setLocale(locale: Locale) {
  if (currentLocale === locale) return;

  currentLocale = locale;

  if (typeof document !== 'undefined') {
    try {
      localStorage.setItem('locale', locale);
      document.documentElement.setAttribute('lang', locale);
    } catch (e) {
      console.warn('Failed to save locale to localStorage', e);
    }
  }

  notifyLocaleChange();
}

// Direct access for non-React contexts
export function t_raw(key: string): string {
  const dict = dictionaries[currentLocale];
  const val = dict?.[key];
  if (Array.isArray(val)) return key;
  return (val as string) || key;
}

export const t = t_raw; // Alias for backward compatibility in Astro files

// Hook for React components
export function useI18n() {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  // Memoize translation functions based on locale
  // This ensures they don't change identity unless locale changes
  const t = useCallback((key: string): string => {
    const dict = dictionaries[locale];
    const val = dict?.[key];
    if (Array.isArray(val)) return key;
    return (val as string) || key;
  }, [locale]);

  const ta = useCallback((key: string): string[] => {
    const dict = dictionaries[locale];
    const val = dict?.[key];
    return Array.isArray(val) ? val : [];
  }, [locale]);

  return { locale, t, ta, setLocale };
}

