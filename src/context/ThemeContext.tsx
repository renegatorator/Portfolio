import { createContext, useCallback, useSyncExternalStore } from 'react';

import { Theme, Themes } from '@/constants/theme';
import { isTheme, THEME_STORAGE_KEY } from '@/utils/themeUtils';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: Themes.DARK,
  toggleTheme: () => {},
});

type Listener = () => void;
const listeners = new Set<Listener>();

const getClientSnapshot = (): Theme => {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  return isTheme(saved) ? saved : Themes.DARK;
};

const getServerSnapshot = (): Theme => Themes.DARK;

const subscribe = (listener: Listener) => {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) listener();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
};

const writeTheme = (theme: Theme) => {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  document.documentElement.setAttribute('data-theme', theme);
  listeners.forEach((listener) => listener());
};

export const ThemeProviderCustom = ({ children }: { children: React.ReactNode }) => {
  const theme = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    writeTheme(theme === Themes.DARK ? Themes.LIGHT : Themes.DARK);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
