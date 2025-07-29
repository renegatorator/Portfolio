import { useTranslation } from 'next-i18next';
import { Routes, Route } from '../routes';

type SEOType = {
  title: string;
  description: string;
};

export const useSeo = (route: Route): SEOType => {
  const { t } = useTranslation();

  const getSeoData = (): SEOType => {
    switch (route) {
      case Routes.LANDING_PAGE:
        const landingTitle = t('landingPage.title');
        const landingDesc = t('landingPage.description');
        console.log('Landing page SEO:', { title: landingTitle, description: landingDesc });

        // Fallback to root title if landingPage.title doesn't work
        const finalTitle = landingTitle === 'landingPage.title' ? t('title') : landingTitle;
        const finalDesc =
          landingDesc === 'landingPage.description'
            ? 'Rene Krajnc - Successful Developer Portfolio'
            : landingDesc;

        return {
          title: finalTitle,
          description: finalDesc,
        };
      case Routes.ABOUT:
        return {
          title: t('about.seo.title'),
          description: t('about.seo.description'),
        };
      case Routes.PROJECTS:
        return {
          title: t('projects.seo.title'),
          description: t('projects.seo.description'),
        };
      case Routes.SKILLS:
        return {
          title: t('skills.seo.title'),
          description: t('skills.seo.description'),
        };
      case Routes.CONTACT:
        return {
          title: t('contact.seo.title'),
          description: t('contact.seo.description'),
        };
      case Routes.BLOG:
        return {
          title: t('blog.seo.title'),
          description: t('blog.seo.description'),
        };
      case Routes.RESUME:
        return {
          title: t('resume.seo.title'),
          description: t('resume.seo.description'),
        };
      default:
        return {
          title: t('landingPage.title'),
          description: t('landingPage.description'),
        };
    }
  };

  return getSeoData();
};
