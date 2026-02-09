import { ColorToken } from '@/constants/theme';

// Get CSS custom properties from the document
export const getCssVar = (token: ColorToken): string => {
  if (typeof window !== 'undefined') {
    const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
    if (value) return value;
  }

  return getDefaultFallback(token);
};

// Get a default fallback color for a given token
const getDefaultFallback = (token: ColorToken): string => {
  const fallbacks: Record<ColorToken, string> = {
    // Primary colors
    '--primary': '#0070f3',
    '--primary-text': '#fff',

    // Background colors
    '--bg-primary': '#fff',
    '--bg-secondary': '#f5f5f5',
    '--bg-tertiary': '#eaeaea',

    // Text colors
    '--text-primary': '#222',
    '--text-secondary': '#666',

    // Border colors
    '--border-primary': '#ddd',
    '--border-secondary': '#ccc',

    // Interactive colors
    '--hover-primary': '#f5f5f5',
    '--hover-secondary': '#e0e0e0',
  };

  return fallbacks[token] || '#000';
};

// Get CSS variable with theme-aware fallback
export const getCssVarWithTheme = (token: ColorToken, isDark: boolean): string => {
  // Always use theme-aware fallback for MUI theme generation to avoid lag
  return getThemeAwareFallback(token, isDark);
};

// Get theme-aware fallback colors
const getThemeAwareFallback = (token: ColorToken, isDark: boolean): string => {
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
    '--primary-text': '#f5f5f5',
    '--bg-primary': '#181818',
    '--bg-secondary': '#23272f',
    '--bg-tertiary': '#2a2a2a',
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
