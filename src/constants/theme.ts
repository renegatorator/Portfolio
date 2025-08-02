export const Themes = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type Theme = (typeof Themes)[keyof typeof Themes];

export const ColorTokens = {
  // Background colors
  BACKGROUND_COLOR: '--background-color',
  CARD_BG: '--card-bg',
  INPUT_BG: '--input-bg',
  HEADER_BG: '--header-bg',
  FOOTER_BG: '--footer-bg',

  // Text colors
  TEXT_COLOR: '--text-color',

  // Accent and interactive colors
  ACCENT_COLOR: '--accent-color',
  LINK_COLOR: '--link-color',
  BUTTON_BG: '--button-bg',
  BUTTON_TEXT: '--button-text',

  // Border and hover colors
  BORDER_COLOR: '--border-color',
  HOVER_COLOR: '--hover-color',
} as const;

export type ColorToken = (typeof ColorTokens)[keyof typeof ColorTokens];
