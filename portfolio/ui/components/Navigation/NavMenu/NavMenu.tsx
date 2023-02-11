import { PageData } from '@/models/general';
import React, { FC } from 'react';
import NavItem from '../NavItem/NavItem';

import classes from './NavMenu.module.scss';

interface NavMenuProps {
  navItems: PageData[];
  handleItemClick: () => void;
}

const NavMenu: FC<NavMenuProps> = ({ navItems, handleItemClick }) => {
  return (
    <ul className={classes.container}>
      {navItems.map((item, index) => (
        <li key={`item-${index}`}>
          <NavItem handleClick={handleItemClick} page={item} />
        </li>
      ))}
    </ul>
  );
};

export default NavMenu;
