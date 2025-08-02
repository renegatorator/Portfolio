import { Theme } from '@/constants/theme';
import { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme') as Theme | null;
    setTheme(stored || 'light');
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  if (!mounted) return null; // Prevent mismatch

  return (
    <Tooltip
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      placement="bottom"
    >
      <IconButton
        onClick={toggleTheme}
        aria-label="Toggle theme"
        sx={{
          color: 'var(--text-primary)',
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-primary)',
          '&:hover': {
            backgroundColor: 'var(--hover-primary)',
            borderColor: 'var(--primary)',
            color: 'var(--primary)',
          },
          '&:focus': {
            outline: 'none',
            borderColor: 'var(--primary)',
          },
          transition: 'all 0.2s ease-in-out',
          width: 40,
          height: 40,
        }}
      >
        {theme === 'light' ? (
          <DarkMode sx={{ fontSize: 20 }} />
        ) : (
          <LightMode sx={{ fontSize: 20 }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
