import { createContext, useEffect, useState } from 'react';

import GlobalLoader from '@/components/UI/GlobalLoader/GlobalLoader';
import { Theme } from '@/constants/theme';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const ThemeProviderCustom = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(
    (typeof window !== 'undefined' && (localStorage.getItem('theme') as Theme)) || 'dark',
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Wait for fonts and initial render to prevent layout shift
    const initializeTheme = async () => {
      if (typeof document !== 'undefined' && document.fonts) {
        await document.fonts.ready;
      }
      // Small delay to ensure CSS is applied
      requestAnimationFrame(() => {
        setMounted(true);
      });
    };

    initializeTheme();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  if (!mounted) return <GlobalLoader />;

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
