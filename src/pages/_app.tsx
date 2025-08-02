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
        main: getCssVar(ColorTokens.ACCENT_COLOR),
      },
      secondary: {
        main: getCssVar(ColorTokens.BUTTON_BG),
      },
      background: {
        default: getCssVar(ColorTokens.BACKGROUND_COLOR),
        paper: getCssVar(ColorTokens.CARD_BG),
      },
      text: {
        primary: getCssVar(ColorTokens.TEXT_COLOR),
        secondary: getCssVar(ColorTokens.TEXT_COLOR),
      },
      action: {
        hover: getCssVar(ColorTokens.HOVER_COLOR),
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-root': {
              backgroundColor: getCssVar(ColorTokens.INPUT_BG),
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: getCssVar(ColorTokens.CARD_BG),
            borderColor: getCssVar(ColorTokens.BORDER_COLOR),
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
