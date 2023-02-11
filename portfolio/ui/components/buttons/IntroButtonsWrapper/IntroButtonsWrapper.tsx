import { PageData } from '@/models/general';
import React, { FC } from 'react';
import BtnIntro from '../BtnIntro/BtnIntro';

import classes from './IntroButtonsWrapper.module.scss';

interface IntroButtonsWrapperProps {
  pages: PageData[];
}

const IntroButtonsWrapper: FC<IntroButtonsWrapperProps> = ({ pages }) => {
  return (
    <div className={classes.container}>
      {pages?.map((page, index) => (
        <BtnIntro key={`p-${index}-${page.pageName}`} page={page} />
      ))}
    </div>
  );
};

export default IntroButtonsWrapper;
