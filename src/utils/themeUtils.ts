import { ColorToken, Theme, Themes } from '@/constants/theme';

export const THEME_STORAGE_KEY = 'theme';

export const isTheme = (value: unknown): value is Theme =>
  value === Themes.LIGHT || value === Themes.DARK;

// Inline script injected in <Head> so it runs before first paint and before React
// hydrates, setting data-theme on <html> so CSS is correct from the very first frame
// (no theme flash) and SSR stays crawler-friendly.
export const themeInitScript = `
(function () {
  try {
    var saved = localStorage.getItem('${THEME_STORAGE_KEY}');
    if (saved !== '${Themes.LIGHT}' && saved !== '${Themes.DARK}') saved = '${Themes.DARK}';
    document.documentElement.setAttribute('data-theme', saved);
  } catch (e) {}
})();
`;

// Resolve a CSS color token to a static, theme-aware fallback value. Used for MUI theme
// generation so the palette is correct on first paint without reading computed styles.
export const getCssVarWithTheme = (token: ColorToken, isDark: boolean): string => {
  const lightFallbacks: Record<ColorToken, string> = {
    '--primary': '#0070f3',
    '--primary-text': '#fff',
    '--bg-primary': '#fff',
    '--bg-secondary': '#f5f5f5',
    '--bg-tertiary': '#eaeaea',
    '--text-primary': '#222',
    '--text-secondary': '#666',
    '--border-primary': '#ddd',
    '--border-secondary': '#ccc',
    '--hover-primary': '#f5f5f5',
    '--hover-secondary': '#e0e0e0',
  };

  const darkFallbacks: Record<ColorToken, string> = {
    '--primary': '#79b8ff',
    '--primary-text': '#0a1a2e',
    '--bg-primary': '#181818',
    '--bg-secondary': '#23272f',
    '--bg-tertiary': '#1a1d24',
    '--text-primary': '#f5f5f5',
    '--text-secondary': '#ccc',
    '--border-primary': '#333',
    '--border-secondary': '#444',
    '--hover-primary': '#333',
    '--hover-secondary': '#444',
  };

  const fallbacks = isDark ? darkFallbacks : lightFallbacks;
  return fallbacks[token] || (isDark ? '#000' : '#fff');
};
