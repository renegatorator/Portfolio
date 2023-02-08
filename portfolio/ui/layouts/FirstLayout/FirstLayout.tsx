import React, { FC } from 'react';
import classes from './FirstLayout.module.scss';
import bgImg from '../../../images/bg/photo-maldives.jpg';
import Navigation from '@/ui/components/Navigation/Navigation';
import { menuItems, pages } from '@/constants/globalConstants';
import { useRouter } from 'next/router';

interface FirstLayoutProps {
  page: React.ReactNode;
}

const FirstLayout: FC<FirstLayoutProps> = ({ page }) => {
  const router = useRouter();
  const currentPage = pages.find((page) => page.route === router.asPath);
  console.log(currentPage);
  return (
    <div
      className={classes.container}
      style={{ backgroundImage: `url('${bgImg.src}')` }}
    >
      <header>
        <h1>{currentPage?.pageName}</h1>
        <Navigation navItems={menuItems} />
      </header>
      <div>{page}</div>

      <footer>
        <span>{`Copyright Rene Krajnc ${new Date().getFullYear()}`}</span>
      </footer>
    </div>
  );
};

export default FirstLayout;
