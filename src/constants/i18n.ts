import type { UserConfig } from 'next-i18next';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/constants/locales';

// Single source of truth for the next-i18next runtime config. Derived from the typed
// locale constants so the locale list is declared in exactly one place. Passed explicitly
// to appWithTranslation and serverSideTranslations (see TROUBLESHOOT.md in next-i18next),
// which removes the need for a root next-i18next.config.js file.
export const i18nConfig: UserConfig = {
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: [...SUPPORTED_LOCALES],
  },
  returnObjects: true,
};
