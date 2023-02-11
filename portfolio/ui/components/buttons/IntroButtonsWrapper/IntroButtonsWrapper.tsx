import { PageData } from '@/models/general';
import React, { FC } from 'react';
import BtnImage from '../BtnImage/BtnImage';

import classes from './IntroButtonsWrapper.module.scss';

interface IntroButtonsWrapperProps {
  pages: PageData[];
}

const IntroButtonsWrapper: FC<IntroButtonsWrapperProps> = ({ pages }) => {
  return (
    <div className={classes.container}>
      {pages?.map((page, index) => (
        <BtnImage key={`p-${index}-${page.pageName}`} page={page} />
      ))}
    </div>
  );
};

export default IntroButtonsWrapper;
