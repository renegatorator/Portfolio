import Head from 'next/head';
import { useTranslation } from 'next-i18next';

import { useSeo } from '@/constants/hooks/useSeo';
import { Locale, SUPPORTED_LOCALES } from '@/constants/locales';
import { Route, Routes } from '@/constants/routes';
import { SITE_URL } from '@/constants/site';

const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  sl: 'sl_SI',
  de: 'de_DE',
};

interface PageHeadProps {
  route?: Route;
}

const PageHead = ({ route }: PageHeadProps) => {
  const { i18n } = useTranslation();
  const { title, description } = useSeo(route || Routes.LANDING_PAGE);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;
  const routePath = route || Routes.LANDING_PAGE;
  const currentLocale = i18n.language as Locale;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={OG_LOCALE[currentLocale] ?? OG_LOCALE.en} />

      {SUPPORTED_LOCALES.map((locale) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={locale}
          href={`${baseUrl}/${locale}${routePath}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${routePath}`} />

      <link rel="canonical" href={`${baseUrl}${routePath}`} />
    </Head>
  );
};

export default PageHead;
