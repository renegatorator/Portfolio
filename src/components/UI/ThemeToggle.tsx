import { Theme } from '@/constants/theme';
import { useEffect, useState } from 'react';

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
    <button onClick={toggleTheme} aria-label="Toggle theme">
      {/* {theme === 'light' ? '🌞 Light' : '🌙 Dark'} */}
      {theme === 'light' ? '🌞' : '🌙'}
    </button>
  );
};

export default ThemeToggle;
