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
    },
  });

  return muiTheme;
};
