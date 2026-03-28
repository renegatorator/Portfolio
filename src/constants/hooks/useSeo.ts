import { useTranslation } from 'next-i18next';

import { Route, Routes } from '../routes';

type SEOType = {
  title: string;
  description: string;
};

export const useSeo = (route: Route): SEOType => {
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
    default:
      return {
        title: t('landingPage.title'),
        description: t('landingPage.description'),
      };
  }
};
