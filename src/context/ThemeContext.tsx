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

const readStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return Themes.DARK;
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(saved) ? saved : Themes.DARK;
  } catch {
    return Themes.DARK;
  }
};

const getClientSnapshot = (): Theme => readStoredTheme();
const getServerSnapshot = (): Theme => Themes.DARK;

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme);
};

const subscribe = (listener: Listener) => {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) return;
    const nextTheme = isTheme(event.newValue) ? event.newValue : Themes.DARK;
    applyTheme(nextTheme);
    listener();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
};

const writeTheme = (theme: Theme) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage writes can fail (private mode, quota, sandboxed iframes); still
    // apply the theme in memory so the current session reflects the change.
  }
  applyTheme(theme);
  listeners.forEach((listener) => listener());
};

export const ThemeProviderCustom = ({ children }: { children: React.ReactNode }) => {
  const theme = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    writeTheme(theme === Themes.DARK ? Themes.LIGHT : Themes.DARK);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
