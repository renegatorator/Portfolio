import classNames from 'classnames';
import Image from 'next/image';

import { useTheme } from '@/utils/hooks/useTheme';

import styles from './Logo.module.scss';

interface LogoProps {
  className?: string;
  priority?: boolean;
}

const Logo = ({ className = '', priority = false }: LogoProps) => {
  const { isDark } = useTheme();

  return (
    <>
      {/* Desktop: Full logo */}
      <Image
        src={isDark ? '/images/logo/logo-full-dark.png' : '/images/logo/logo-full.png'}
        alt="Rene Krajnc"
        width={140}
        height={48}
        className={classNames(styles.desktopLogo, className)}
        priority={priority}
      />
      {/* Mobile: Initials logo */}
      <Image
        src={isDark ? '/images/logo/logo-initials-dark.png' : '/images/logo/logo-initials.png'}
        alt="Rene Krajnc"
        width={40}
        height={27}
        className={`${styles.mobileLogo} ${className}`}
        priority={priority}
      />
    </>
  );
};

export default Logo;
