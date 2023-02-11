import { buttonKind } from '@/constants/globalConstants';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { FC } from 'react';

import classes from './BtnMain.module.scss';

interface BtnMainProps {
  text: string;
  kind: buttonKind;
  handleClick?: () => void;
  linkHref?: string;
  icon?: IconDefinition;
}

const BtnMain: FC<BtnMainProps> = ({
  text,
  kind,
  handleClick,
  linkHref,
  icon,
}) => {
  return (
    <>
      {kind === buttonKind.BUTTON && (
        <button className={classes.container} onClick={handleClick}>
          <span>{text}</span>
        </button>
      )}
      {kind === buttonKind.LINK && linkHref && (
        <Link className={classes.container} href={linkHref}>
          <span>{text}</span>
          {!!icon && <FontAwesomeIcon icon={icon} />}
        </Link>
      )}
    </>
  );
};

export default BtnMain;
