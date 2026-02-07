import { createTheme } from '@mui/material/styles';
import { ColorTokens } from '@/constants/theme';
import { getCssVarWithTheme } from '@/utils/themeUtils';

import { useTheme } from '@/context/ThemeContext';

export const useMuiTheme = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const muiTheme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: getCssVarWithTheme(ColorTokens.PRIMARY, isDark),
        contrastText: getCssVarWithTheme(ColorTokens.PRIMARY_TEXT, isDark),
      },
      secondary: {
        main: getCssVarWithTheme(ColorTokens.BG_SECONDARY, isDark),
        contrastText: getCssVarWithTheme(ColorTokens.TEXT_PRIMARY, isDark),
      },
      background: {
        default: getCssVarWithTheme(ColorTokens.BG_PRIMARY, isDark),
        paper: getCssVarWithTheme(ColorTokens.BG_SECONDARY, isDark),
      },
      text: {
        primary: getCssVarWithTheme(ColorTokens.TEXT_PRIMARY, isDark),
        secondary: getCssVarWithTheme(ColorTokens.TEXT_SECONDARY, isDark),
      },
      action: {
        hover: getCssVarWithTheme(ColorTokens.HOVER_PRIMARY, isDark),
      },
    },
    typography: {
      fontFamily: "'Segoe UI', Arial, sans-serif",
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        margin: 0,
        color: getCssVarWithTheme(ColorTokens.TEXT_PRIMARY, isDark),
      },
      h2: {
        fontSize: '1.8rem',
        fontWeight: 600,
        margin: 0,
        color: getCssVarWithTheme(ColorTokens.TEXT_PRIMARY, isDark),
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 600,
        margin: 0,
        color: getCssVarWithTheme(ColorTokens.TEXT_PRIMARY, isDark),
      },
      h4: {
        fontSize: '1.2rem',
        fontWeight: 600,
        margin: 0,
        color: getCssVarWithTheme(ColorTokens.TEXT_PRIMARY, isDark),
      },
      h5: {
        fontSize: '1rem',
        fontWeight: 600,
        margin: 0,
        color: getCssVarWithTheme(ColorTokens.TEXT_PRIMARY, isDark),
      },
      h6: {
        fontSize: '0.95rem',
        fontWeight: 600,
        margin: 0,
        color: getCssVarWithTheme(ColorTokens.TEXT_PRIMARY, isDark),
      },
      body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.6,
        color: getCssVarWithTheme(ColorTokens.TEXT_PRIMARY, isDark),
      },
      body2: {
        fontSize: '0.95rem',
        fontWeight: 400,
        color: getCssVarWithTheme(ColorTokens.TEXT_PRIMARY, isDark),
      },
      subtitle1: {
        fontSize: '1.3rem',
        fontWeight: 400,
        color: getCssVarWithTheme(ColorTokens.TEXT_SECONDARY, isDark),
      },
      subtitle2: {
        fontSize: '1rem',
        fontWeight: 500,
        color: getCssVarWithTheme(ColorTokens.TEXT_SECONDARY, isDark),
      },
      caption: {
        fontSize: '0.9rem',
        fontWeight: 500,
        color: getCssVarWithTheme(ColorTokens.TEXT_SECONDARY, isDark),
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-root': {
              backgroundColor: getCssVarWithTheme(ColorTokens.BG_PRIMARY, isDark),
              borderColor: getCssVarWithTheme(ColorTokens.BORDER_PRIMARY, isDark),
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: getCssVarWithTheme(ColorTokens.BG_SECONDARY, isDark),
            borderColor: getCssVarWithTheme(ColorTokens.BORDER_PRIMARY, isDark),
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          h1: {
            margin: 0,
          },
          h2: {
            margin: 0,
          },
          h3: {
            margin: 0,
          },
          h4: {
            margin: 0,
          },
          h5: {
            margin: 0,
          },
          h6: {
            margin: 0,
          },
        },
      },
    },
  });

  return muiTheme;
};
