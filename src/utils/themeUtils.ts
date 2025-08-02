import { ColorToken } from '@/constants/theme';

/**
 * Utility function to get CSS custom properties from the document
 * @param variableName - The CSS custom property name (e.g., '--background-color')
 * @returns The computed value of the CSS custom property
 */
export const getCssVar = (token: ColorToken): string => {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  }
  return '';
};
