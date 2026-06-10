import '../styles/globals.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

import TechBackground from '@/components/background';
import CookieConsentBanner from '@/components/UI/CookieConsentBanner';
import { i18nConfig } from '@/constants/i18n';
import { CookieConsentProvider } from '@/context/CookieConsentContext';
import { ThemeProviderCustom } from '@/context/ThemeContext';
import { useMuiTheme } from '@/utils/hooks/useMuiTheme';

const AppWithTheme = ({ Component, pageProps, router, ...rest }: AppProps) => {
  const muiTheme = useMuiTheme();

  return (
    <ThemeProvider theme={muiTheme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon0.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <CssBaseline />
      {/* Mounted once here (not in PageLayout) so the canvas survives route changes. */}
      <TechBackground />
      <Component {...pageProps} router={router} {...rest} />
      <CookieConsentBanner />
    </ThemeProvider>
  );
};

const MyApp = (props: AppProps) => (
  <ThemeProviderCustom>
    <CookieConsentProvider>
      <AppWithTheme {...props} />
    </CookieConsentProvider>
  </ThemeProviderCustom>
);

export default appWithTranslation(MyApp, i18nConfig);
