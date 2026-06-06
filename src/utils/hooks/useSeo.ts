import { useTranslation } from 'next-i18next';

import { Route, Routes } from '@/constants/routes';

export interface Seo {
  title: string;
  description: string;
}

export const useSeo = (route: Route): Seo => {
  const { t } = useTranslation();

  switch (route) {
    case Routes.LANDING_PAGE:
      return {
        title: t('landingPage.title'),
        description: t('landingPage.description'),
      };
    case Routes.PROJECTS:
      return {
        title: t('projects.seo.title'),
        description: t('projects.seo.description'),
      };
    case Routes.CONTACT:
      return {
        title: t('contact.seo.title'),
        description: t('contact.seo.description'),
      };
    case Routes.PRIVACY:
      return {
        title: t('privacy.seo.title'),
        description: t('privacy.seo.description'),
      };
    default:
      return {
        title: t('landingPage.title'),
        description: t('landingPage.description'),
      };
  }
};
