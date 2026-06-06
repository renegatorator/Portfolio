import { createContext, useCallback, useMemo, useSyncExternalStore } from 'react';

import { Theme, Themes } from '@/constants/theme';
import { createLocalStorageStore } from '@/utils/createLocalStorageStore';
import { isTheme, THEME_STORAGE_KEY } from '@/utils/themeUtils';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: Themes.DARK,
  toggleTheme: () => {},
});

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme);
};

const themeStore = createLocalStorageStore<Theme>({
  key: THEME_STORAGE_KEY,
  serverValue: Themes.DARK,
  parse: (raw) => (isTheme(raw) ? raw : Themes.DARK),
  onChange: applyTheme,
});

export const ThemeProviderCustom = ({ children }: { children: React.ReactNode }) => {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getClientSnapshot,
    themeStore.getServerSnapshot,
  );

  const toggleTheme = useCallback(() => {
    themeStore.write(theme === Themes.DARK ? Themes.LIGHT : Themes.DARK);
  }, [theme]);

  const value = useMemo<ThemeContextProps>(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
