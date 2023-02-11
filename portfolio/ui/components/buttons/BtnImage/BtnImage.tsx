import { PageData } from '@/models/general';
import Link from 'next/link';
import Image from 'next/image';
import React, { FC } from 'react';

import classes from './BtnImage.module.scss';

interface BtnImageProps {
  page: PageData;
}

const BtnImage: FC<BtnImageProps> = ({ page }) => {
  console.log('image: ', page.image);
  return (
    <Link href={page.route} className={classes.container}>
      <Image
        src={page.image?.src || ''}
        alt={page.pageName}
        width={page.image?.width}
        height={page.image?.height}
      />
      <span>{page.pageName}</span>
    </Link>
  );
};

export default BtnImage;
