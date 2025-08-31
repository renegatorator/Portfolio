import { ReactNode } from 'react';
import classes from './PageLayout.module.scss';
import Head from 'next/head';
import { useSeo } from '@/constants/hooks/useSeo';
import { Routes, Route } from '@/constants/routes';
import StickyHeader from './StickyHeader';
import { useTranslation } from 'next-i18next';

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
        <p dangerouslySetInnerHTML={{ __html: t('footer', { year }) }} />
      </footer>
    </div>
  );
};

export default PageLayout;
