import { IconButton, Tooltip } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme } from '@/utils/hooks/useTheme';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'} placement="bottom">
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
        {isDark ? <LightMode sx={{ fontSize: 20 }} /> : <DarkMode sx={{ fontSize: 20 }} />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
