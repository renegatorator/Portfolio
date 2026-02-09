import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import LanguageSwitcher from '@/components/UI/LanguageSwitcher';
import Logo from '@/components/UI/Logo';
import ThemeToggle from '@/components/UI/ThemeToggle';
import { Routes } from '@/constants/routes';

import classes from './PageLayout.module.scss';

const StickyHeader = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationLinks = [
    { href: Routes.LANDING_PAGE, label: t('nav.about') },
    { href: Routes.PROJECTS, label: t('nav.projects') },
    { href: Routes.CONTACT, label: t('nav.contact') },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActiveLink = (href: string) => {
    if (href === Routes.LANDING_PAGE) {
      return router.pathname === Routes.LANDING_PAGE;
    }
    return router.pathname === href;
  };

  return (
    <>
      <header className={classes.stickyHeader}>
        <div className={classes.headerContent}>
          {/* Logo/Brand */}
          <div className={classes.brand}>
            <Link href={Routes.LANDING_PAGE} locale={router.locale}>
              <Logo priority />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={classes.desktopNav}>
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                locale={router.locale}
                className={`${classes.navLink} ${isActiveLink(link.href) ? classes.active : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Controls */}
          <div className={classes.desktopControls}>
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            className={classes.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className={classes.mobileOverlay} onClick={closeMobileMenu}>
          <div className={classes.mobileSidebar} onClick={(e) => e.stopPropagation()}>
            <div className={classes.mobileSidebarHeader}>
              <Typography variant="h5">Menu</Typography>
              <button
                className={classes.closeButton}
                onClick={closeMobileMenu}
                aria-label="Close mobile menu"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <nav className={classes.mobileNav}>
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  locale={router.locale}
                  className={`${classes.mobileNavLink} ${isActiveLink(link.href) ? classes.active : ''}`}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className={classes.mobileControls}>
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StickyHeader;
