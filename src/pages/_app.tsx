import '../styles/globals.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import CookieConsentBanner from '@/components/UI/CookieConsentBanner';
import { CookieConsentProvider } from '@/context/CookieConsentContext';
import { ThemeProviderCustom } from '@/context/ThemeContext';
import { useMuiTheme } from '@/utils/hooks/useMuiTheme';

const AppWithTheme = ({ Component, pageProps, router, ...rest }: AppProps) => {
  const muiTheme = useMuiTheme();

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
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

export default appWithTranslation(MyApp);
