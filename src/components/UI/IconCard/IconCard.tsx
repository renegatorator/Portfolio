import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';

import classes from './IconCard.module.scss';

export interface IconCardProps {
  icon: IconDefinition;
  title: string;
}

const IconCard = ({ icon, title }: IconCardProps) => {
  return (
    <div className={classes.container}>
      <FontAwesomeIcon icon={icon} className={classes.icon} />
      <Typography variant="caption" component="span">
        {title}
      </Typography>
    </div>
  );
};

export default IconCard;
