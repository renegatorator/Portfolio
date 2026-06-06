import { DEFAULT_LOCALE, Locale } from '@/constants/locales';

export const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  sl: 'sl_SI',
  de: 'de_DE',
};

export const OG_IMAGE_PATH = '/og-image.jpg';
export const OG_IMAGE_WIDTH = '1200';
export const OG_IMAGE_HEIGHT = '630';
export const OG_IMAGE_TYPE = 'image/jpeg';

export const PROFILE_IMAGE_PATH = '/images/rene-profile.jpg';

// Build a locale-prefixed absolute URL. The default locale is served unprefixed
// (mirrors the Next.js i18n routing + the canonical redirect middleware).
export const buildLocalisedUrl = (baseUrl: string, locale: Locale, routePath: string): string => {
  if (locale === DEFAULT_LOCALE) return `${baseUrl}${routePath}`;
  const path = routePath === '/' ? '' : routePath;
  return `${baseUrl}/${locale}${path}`;
};
