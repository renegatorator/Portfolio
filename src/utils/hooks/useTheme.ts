import { ThemeContext } from '@/context/ThemeContext';
import { useContext } from 'react';

export const useTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return { theme, toggleTheme, isDark: theme !== 'light' };
};
