import { ReactNode } from 'react';
import classes from './PageLayout.module.scss';
import Head from 'next/head';
import { useSeo } from '@/constants/hooks/useSeo';
import { Routes, Route } from '@/constants/routes';

interface PageLayoutProps {
  children: ReactNode;
  route?: Route;
}

const PageLayout = ({ children, route = Routes.LANDING_PAGE }: PageLayoutProps) => {
  const { title, description } = useSeo(route);

  console.log('PageLayout SEO data:', { title, description, route });

  return (
    <div className={classes.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      {children}
    </div>
  );
};

export default PageLayout;
