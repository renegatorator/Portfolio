import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { ReactNode } from 'react';

import { Route, Routes } from '@/constants/routes';

import PageHead from './PageHead/PageHead';
import classes from './PageLayout.module.scss';
import StickyHeader from './StickyHeader/StickyHeader';

interface PageLayoutProps {
  children: ReactNode;
  route?: Route;
}

const PageLayout = ({ children, route = Routes.LANDING_PAGE }: PageLayoutProps) => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <div className={classes.container}>
      <PageHead route={route} />
      <StickyHeader />
      <main className={classes.main}>{children}</main>
      <footer className={classes.footer}>
        <Typography variant="caption" component="p">
          {t('footer', { year })}
        </Typography>
      </footer>
    </div>
  );
};

export default PageLayout;
