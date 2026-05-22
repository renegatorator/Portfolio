import { Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { MouseEvent, ReactNode } from 'react';

import { Route, Routes } from '@/constants/routes';
import { useCookieConsent } from '@/context/CookieConsentContext';

import PageHead from './PageHead/PageHead';
import classes from './PageLayout.module.scss';
import StickyHeader from './StickyHeader/StickyHeader';

interface PageLayoutProps {
  children: ReactNode;
  route?: Route;
}

const PageLayout = ({ children, route = Routes.LANDING_PAGE }: PageLayoutProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { openPreferences } = useCookieConsent();
  const year = new Date().getFullYear();

  const handleCookiePreferencesClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    openPreferences();
  };

  return (
    <div className={classes.container}>
      <PageHead route={route} />
      <StickyHeader />
      <main className={classes.main}>{children}</main>
      <footer className={classes.footer}>
        <div className={classes.footerInner}>
          <nav className={classes.footerLinks} aria-label={t('footer.links.title')}>
            <Link href={Routes.PRIVACY} locale={router.locale} className={classes.footerLink}>
              {t('footer.links.privacy')}
            </Link>
            <span aria-hidden="true" className={classes.footerSeparator}>
              ·
            </span>
            <Link href={Routes.CONTACT} locale={router.locale} className={classes.footerLink}>
              {t('footer.links.contact')}
            </Link>
            <span aria-hidden="true" className={classes.footerSeparator}>
              ·
            </span>
            <button
              type="button"
              className={classes.footerLinkButton}
              onClick={handleCookiePreferencesClick}
            >
              {t('footer.links.cookies')}
            </button>
          </nav>
        </div>

        <div className={classes.footerCopyright}>
          <Typography variant="caption" component="p">
            {t('footer.copyright', { year })}
          </Typography>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
