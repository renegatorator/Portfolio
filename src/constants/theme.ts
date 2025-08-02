export const Themes = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type Theme = (typeof Themes)[keyof typeof Themes];

export const ColorTokens = {
  // Primary colors
  PRIMARY: '--primary',
  PRIMARY_TEXT: '--primary-text',

  // Background colors
  BG_PRIMARY: '--bg-primary',
  BG_SECONDARY: '--bg-secondary',
  BG_TERTIARY: '--bg-tertiary',

  // Text colors
  TEXT_PRIMARY: '--text-primary',
  TEXT_SECONDARY: '--text-secondary',

  // Border colors
  BORDER_PRIMARY: '--border-primary',
  BORDER_SECONDARY: '--border-secondary',

  // Interactive colors
  HOVER_PRIMARY: '--hover-primary',
  HOVER_SECONDARY: '--hover-secondary',
} as const;

export type ColorToken = (typeof ColorTokens)[keyof typeof ColorTokens];
