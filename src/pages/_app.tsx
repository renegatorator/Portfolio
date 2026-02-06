import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProviderCustom } from '@/context/ThemeContext';
import '../styles/globals.css';
import { useMuiTheme } from '@/utils/hooks/useMuiTheme';

const AppWithTheme = ({ Component, pageProps, router, ...rest }: AppProps) => {
 const muiTheme = useMuiTheme();

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Component {...pageProps} router={router} {...rest} />
    </ThemeProvider>
  );
};

const MyApp = (props: AppProps) => (
  <ThemeProviderCustom>
    <AppWithTheme {...props} />
  </ThemeProviderCustom>
);

export default appWithTranslation(MyApp);
