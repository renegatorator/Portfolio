import { PageData } from '@/models/general';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { FC } from 'react';

import classes from './BtnIntro.module.scss';

interface BtnIntroProps {
  page: PageData;
}

const BtnIntro: FC<BtnIntroProps> = ({ page }) => {
  const faPropIcon = page.icon as IconProp;
  return (
    <div className={classes.container}>
      <Link href={page.route}>
        <FontAwesomeIcon icon={faPropIcon} />
        {page.pageName}
      </Link>
    </div>
  );
};

export default BtnIntro;
