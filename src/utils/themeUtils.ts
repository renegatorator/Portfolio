import { ColorToken } from '@/constants/theme';

/**
 * Utility function to get CSS custom properties from the document
 * @param token - The CSS custom property name (e.g., '--primary')
 * @returns The computed value of the CSS custom property
 */
export const getCssVar = (token: ColorToken): string => {
  let value = '';
  if (typeof window !== 'undefined') {
    value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  }
  return value || getDefaultFallback(token);
};

/**
 * Get a default fallback color for a given token
 * @param token - The color token
 * @returns A default fallback color
 */
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
