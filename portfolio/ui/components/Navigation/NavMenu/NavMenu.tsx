import { MenuItem } from '@/models/general';
import Link from 'next/link';
import React, { FC } from 'react';

import classes from './NavMenu.module.scss';

interface NavMenuProps {
  navItems: MenuItem[];
}

const NavMenu: FC<NavMenuProps> = ({ navItems }) => {
  return (
    <ul className={classes.container}>
      {navItems.map((item, index) => (
        <li key={`item-${index}`}>
          <Link href={item.route}>
            <span>{item.pageName}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavMenu;
