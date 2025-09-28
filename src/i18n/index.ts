export type Locale = 'pl' | 'en' | 'de' | 'it' | 'zh';

import pl from './locales/pl.json';
import en from './locales/en.json';
import de from './locales/de.json';
import it from './locales/it.json';
import zh from './locales/zh.json';

// React runtime utilities for subscription-based updates
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
try {
  // Initialize from localStorage on the client
  if (typeof document !== 'undefined') {
    const stored = (localStorage.getItem('locale') as Locale | null) || 'pl';
    currentLocale = stored;
    document.documentElement.setAttribute('lang', currentLocale);
  }
} catch {
  // no-op for SSR or restricted environments
}

const listeners = new Set<() => void>();

function notifyLocaleChange() {
  for (const cb of listeners) cb();
}

function getSnapshot(): Locale {
  return currentLocale;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

export function getLocale(): Locale {
  return currentLocale;
}

export function setLocale(locale: Locale) {
  currentLocale = locale;
  try {
    if (typeof document !== 'undefined') {
      localStorage.setItem('locale', locale);
      document.documentElement.setAttribute('lang', locale);
    }
  } catch {
    // ignore
  }
  notifyLocaleChange();
}

export function t(key: string): string {
  const dict = dictionaries[currentLocale] || {};
  const val = dict[key];
  if (Array.isArray(val)) return key; // prevent array where string expected
  return (val as string) || key;
}

export function ta(key: string): string[] {
  const dict = dictionaries[currentLocale] || {};
  const val = dict[key];
  return Array.isArray(val) ? val : [];
}

// Hook for React components to re-render on locale changes
export function useI18n() {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const translate = useCallback((key: string) => t(key), [locale]);
  const translateArray = useCallback((key: string) => ta(key), [locale]);
  return { locale, t: translate, ta: translateArray, setLocale };
}

