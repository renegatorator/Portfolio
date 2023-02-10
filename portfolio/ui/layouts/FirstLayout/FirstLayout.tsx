import React, { FC } from 'react';
import classes from './FirstLayout.module.scss';
import bgImg from '../../../assets/images/bg/tech.jpg';
import Navigation from '@/ui/components/Navigation/Navigation';
import { menuItems, pages } from '@/constants/globalConstants';
import { useRouter } from 'next/router';
import { routes } from '@/constants/routes';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

interface FirstLayoutProps {
  page: React.ReactNode;
}

const FirstLayout: FC<FirstLayoutProps> = ({ page }) => {
  console.log(faHouse);
  const faPropIcon: IconProp = faHouse as IconProp;
  const router = useRouter();
  const currentPage = pages.find((page) => page.route === router.asPath);
  console.log(currentPage);
  return (
    <div
      className={classes.container}
      style={{ backgroundImage: `url('${bgImg.src}')` }}
    >
      <header>
        {currentPage?.route !== routes.HOME && (
          <Link className={classes.home} href={routes.HOME}>
            <FontAwesomeIcon icon={faPropIcon} />
          </Link>
        )}
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
