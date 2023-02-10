import { MenuItem } from '@/models/general';
import classNames from 'classnames';
import React, { FC, useState } from 'react';
import BtnHamburger from '../buttons/BtnHamburger/BtnHamburger';
import classes from './Navigation.module.scss';
import NavMenu from './NavMenu/NavMenu';

interface NavigationProps {
  navItems: MenuItem[];
}

const Navigation: FC<NavigationProps> = ({ navItems }) => {
  const [menuOpen, setMemUOpen] = useState(false);
  return (
    <nav className={classes.container}>
      <div className={classes.menuButton}>
        <BtnHamburger handleChange={setMemUOpen} />
      </div>

      <div
        className={classNames(classes.navMenu, { [classes.isOpen]: menuOpen })}
      >
        <NavMenu navItems={navItems} />
      </div>
    </nav>
  );
};

export default Navigation;
