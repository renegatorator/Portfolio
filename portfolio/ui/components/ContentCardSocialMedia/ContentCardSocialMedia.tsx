import React, { FC } from 'react';

import classes from './ContentCardSocialMedia.module.scss';
import { MediaButton } from '@/models/general';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ContentCardSocialMediaProps {
  mediaBtns: MediaButton[];
}

const ContentCardSocialMedia: FC<ContentCardSocialMediaProps> = ({
  mediaBtns,
}) => {
  return (
    <div className={classes.container}>
      <div>
        <h2>{'Or contact me on social media'}</h2>
        <div className={classes.BtnWrapper}>
          {mediaBtns.map((btn, index) => (
            <Link key={`${btn.name}-${index}`} href={btn.href}>
              <FontAwesomeIcon icon={btn.icon} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentCardSocialMedia;
