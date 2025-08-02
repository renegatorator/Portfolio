import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import { Theme, ColorTokens } from '@/constants/theme';
import { getCssVar } from '@/utils/themeUtils';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme') as Theme | null;
    setTheme(stored || 'light');
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleThemeChange = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') as Theme;
      setTheme(currentTheme || 'light');
    };

    // Listen for theme changes
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, [mounted]);

  const isDark = theme === 'dark';

  const muiTheme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: getCssVar(ColorTokens.PRIMARY),
        contrastText: getCssVar(ColorTokens.PRIMARY_TEXT),
      },
      secondary: {
        main: getCssVar(ColorTokens.BG_SECONDARY),
        contrastText: getCssVar(ColorTokens.TEXT_PRIMARY),
      },
      background: {
        default: getCssVar(ColorTokens.BG_PRIMARY),
        paper: getCssVar(ColorTokens.BG_SECONDARY),
      },
      text: {
        primary: getCssVar(ColorTokens.TEXT_PRIMARY),
        secondary: getCssVar(ColorTokens.TEXT_SECONDARY),
      },
      action: {
        hover: getCssVar(ColorTokens.HOVER_PRIMARY),
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-root': {
              backgroundColor: getCssVar(ColorTokens.BG_PRIMARY),
              borderColor: getCssVar(ColorTokens.BORDER_PRIMARY),
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: getCssVar(ColorTokens.BG_SECONDARY),
            borderColor: getCssVar(ColorTokens.BORDER_PRIMARY),
          },
        },
      },
    },
  });

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default appWithTranslation(MyApp);
