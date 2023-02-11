import React, { FC } from 'react';
import Image, { StaticImageData } from 'next/image';

import classes from './ContentCardIntro.module.scss';

interface ContentCardIntroProps {
  title: string;
  image: StaticImageData;
  text1: string;
  text2?: string;
}

const ContentCardIntro: FC<ContentCardIntroProps> = ({
  title,
  image,
  text1,
  text2,
}) => {
  return (
    <div className={classes.container}>
      <Image src={image} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>{text1}</p>
        {text2 && <p>{text2}</p>}
      </div>
    </div>
  );
};

export default ContentCardIntro;
