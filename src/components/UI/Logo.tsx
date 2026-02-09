import classNames from 'classnames';
import Image from 'next/image';
import { useEffect,useState } from 'react';

import styles from './Logo.module.scss';

interface LogoProps {
  className?: string;
  priority?: boolean;
}

const Logo = ({ className = '', priority = false }: LogoProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDarkTheme(theme === 'dark');
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop: Full logo */}
      <Image
        src={isDarkTheme ? '/images/logo/logo-full-dark.png' : '/images/logo/logo-full.png'}
        alt="Rene Krajnc"
        width={200}
        height={40}
        className={classNames(styles.desktopLogo, className)}
        priority={priority}
      />
      {/* Mobile: Initials logo */}
      <Image
        src={isDarkTheme ? '/images/logo/logo-initials-dark.png' : '/images/logo/logo-initials.png'}
        alt="Rene Krajnc"
        width={40}
        height={40}
        className={`${styles.mobileLogo} ${className}`}
        priority={priority}
      />
    </>
  );
};

export default Logo;
