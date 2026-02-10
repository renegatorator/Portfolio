import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import { useSeo } from '@/constants/hooks/useSeo';
import { Route, Routes } from '@/constants/routes';

interface PageHeadProps {
  route?: Route;
}

const PageHead = ({ route }: PageHeadProps) => {
  const { i18n } = useTranslation();
  const { title, description } = useSeo(route || Routes.LANDING_PAGE);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.renekrajnc.com';
  const routePath = route || Routes.LANDING_PAGE;
  const currentLocale = i18n.language;

  const ogLocale = currentLocale === 'sl' ? 'sl_SI' : currentLocale === 'de' ? 'de_DE' : 'en_US';

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={ogLocale} />

      {/* Hreflang tags for alternate language versions */}
      <link rel="alternate" hrefLang="en" href={`${baseUrl}/en${routePath}`} />
      <link rel="alternate" hrefLang="sl" href={`${baseUrl}/sl${routePath}`} />
      <link rel="alternate" hrefLang="de" href={`${baseUrl}/de${routePath}`} />
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${routePath}`} />

      {/* Canonical URL */}
      <link rel="canonical" href={`${baseUrl}${routePath}`} />
    </Head>
  );
};

export default PageHead;
