import { ReactNode } from 'react';
import classes from './PageLayout.module.scss';
import Head from 'next/head';
import { useSeo } from '@/constants/hooks/useSeo';
import { Routes, Route } from '@/constants/routes';
import StickyHeader from './StickyHeader';
import { useTranslation } from 'next-i18next';
import { Typography } from '@mui/material';

interface PageLayoutProps {
  children: ReactNode;
  route?: Route;
}

const PageLayout = ({ children, route = Routes.LANDING_PAGE }: PageLayoutProps) => {
  const { t } = useTranslation();
  const { title, description } = useSeo(route);
  const year = new Date().getFullYear();

  return (
    <div className={classes.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
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
