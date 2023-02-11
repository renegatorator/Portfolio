import { PageData } from '@/models/general';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { FC } from 'react';

import classes from './NavItem.module.scss';

interface NavItemProps {
  page: PageData;
  handleClick: () => void;
}

const NavItem: FC<NavItemProps> = ({ page, handleClick }) => {
  const faPropIcon = page.icon as IconProp;
  return (
    <div className={classes.container}>
      <Link href={page.route} onClick={handleClick}>
        <FontAwesomeIcon icon={faPropIcon} />
        {page.pageName}
      </Link>
    </div>
  );
};

export default NavItem;
