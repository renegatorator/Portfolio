import { PageData } from '@/models/general';
import classNames from 'classnames';
import React, { FC, useState } from 'react';
import BtnHamburger from '../buttons/BtnHamburger/BtnHamburger';
import classes from './Navigation.module.scss';
import NavMenu from './NavMenu/NavMenu';

interface NavigationProps {
  navItems: PageData[];
}

const Navigation: FC<NavigationProps> = ({ navItems }) => {
  const [menuOpen, setMenUOpen] = useState(false);
  return (
    <nav className={classes.container}>
      <div className={classes.menuButton}>
        <BtnHamburger
          isOpen={menuOpen}
          handleClick={() => setMenUOpen(!menuOpen)}
        />
      </div>

      <div
        className={classNames(classes.navMenu, { [classes.isOpen]: menuOpen })}
      >
        <NavMenu
          handleItemClick={() => setMenUOpen(false)}
          navItems={navItems}
        />
      </div>
    </nav>
  );
};

export default Navigation;
