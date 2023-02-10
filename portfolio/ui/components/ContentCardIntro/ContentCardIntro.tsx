import React, { FC } from 'react';
import Image, { StaticImageData } from 'next/image';

import classes from './ContentCardIntro.module.scss';

interface ContentCardIntroProps {
  title: string;
  image: StaticImageData;
  text: string;
}

const ContentCardIntro: FC<ContentCardIntroProps> = ({
  title,
  image,
  text,
}) => {
  return (
    <div className={classes.container}>
      <Image src={image} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
        {/* todo - maybe add buttons for story and projects 
          <div></div>  
          */}
      </div>
    </div>
  );
};

export default ContentCardIntro;
