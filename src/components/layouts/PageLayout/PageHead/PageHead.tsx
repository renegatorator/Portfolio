import Head from 'next/head';
import { useTranslation } from 'next-i18next';

import { useSeo } from '@/constants/hooks/useSeo';
import { DEFAULT_LOCALE, Locale, SUPPORTED_LOCALES } from '@/constants/locales';
import { reneKrajnc } from '@/constants/rene';
import { Route, Routes } from '@/constants/routes';
import { SITE_URL } from '@/constants/site';

const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  sl: 'sl_SI',
  de: 'de_DE',
};

const OG_IMAGE_PATH = '/og-image.jpg';
const OG_IMAGE_WIDTH = '1200';
const OG_IMAGE_HEIGHT = '630';
const OG_IMAGE_TYPE = 'image/png';

const buildLocalisedUrl = (baseUrl: string, locale: Locale, routePath: string) =>
  locale === DEFAULT_LOCALE ? `${baseUrl}${routePath}` : `${baseUrl}/${locale}${routePath}`;

interface PageHeadProps {
  route?: Route;
}

const PageHead = ({ route }: PageHeadProps) => {
  const { i18n } = useTranslation();
  const { title, description } = useSeo(route || Routes.LANDING_PAGE);

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL;
  const routePath = route || Routes.LANDING_PAGE;
  const currentLocale = (i18n.language as Locale) || DEFAULT_LOCALE;
  const pageUrl = buildLocalisedUrl(baseUrl, currentLocale, routePath);
  const imageUrl = `${baseUrl}${OG_IMAGE_PATH}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={reneKrajnc} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={OG_LOCALE[currentLocale] ?? OG_LOCALE.en} />
      {SUPPORTED_LOCALES.filter((locale) => locale !== currentLocale).map((locale) => (
        <meta
          key={locale}
          property="og:locale:alternate"
          content={OG_LOCALE[locale] ?? OG_LOCALE.en}
        />
      ))}
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:type" content={OG_IMAGE_TYPE} />
      <meta property="og:image:width" content={OG_IMAGE_WIDTH} />
      <meta property="og:image:height" content={OG_IMAGE_HEIGHT} />
      <meta property="og:image:alt" content={title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={title} />

      {SUPPORTED_LOCALES.map((locale) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={locale}
          href={buildLocalisedUrl(baseUrl, locale, routePath)}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}${routePath}`} />

      <link rel="canonical" href={pageUrl} />
    </Head>
  );
};

export default PageHead;
