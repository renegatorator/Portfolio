import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import { Theme, ColorTokens } from '@/constants/theme';
import { getCssVarWithTheme } from '@/utils/themeUtils';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme') as Theme | null;
    const initialTheme = stored || 'light';
    setTheme(initialTheme);

    // Immediately set the theme on document to prevent flash
    document.documentElement.setAttribute('data-theme', initialTheme);
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
        main: getCssVarWithTheme(ColorTokens.PRIMARY, isDark),
        contrastText: getCssVarWithTheme(ColorTokens.PRIMARY_TEXT, isDark),
      },
      secondary: {
        main: getCssVarWithTheme(ColorTokens.BG_SECONDARY, isDark),
        contrastText: getCssVarWithTheme(ColorTokens.TEXT_PRIMARY, isDark),
      },
      background: {
        default: getCssVarWithTheme(ColorTokens.BG_PRIMARY, isDark),
        paper: getCssVarWithTheme(ColorTokens.BG_SECONDARY, isDark),
      },
      text: {
        primary: getCssVarWithTheme(ColorTokens.TEXT_PRIMARY, isDark),
        secondary: getCssVarWithTheme(ColorTokens.TEXT_SECONDARY, isDark),
      },
      action: {
        hover: getCssVarWithTheme(ColorTokens.HOVER_PRIMARY, isDark),
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-root': {
              backgroundColor: getCssVarWithTheme(ColorTokens.BG_PRIMARY, isDark),
              borderColor: getCssVarWithTheme(ColorTokens.BORDER_PRIMARY, isDark),
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: getCssVarWithTheme(ColorTokens.BG_SECONDARY, isDark),
            borderColor: getCssVarWithTheme(ColorTokens.BORDER_PRIMARY, isDark),
          },
        },
      },
    },
  });

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div
        style={{
          backgroundColor: isDark ? '#181818' : '#fff',
          color: isDark ? '#f5f5f5' : '#222',
          minHeight: '100vh',
        }}
      >
        {/* Simple loading state */}
      </div>
    );
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default appWithTranslation(MyApp);
