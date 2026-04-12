export const SUPPORTED_LOCALES = ['en', 'sl', 'de'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE = 'en' satisfies Locale;

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  sl: 'Slovenščina',
  de: 'Deutsch',
};
