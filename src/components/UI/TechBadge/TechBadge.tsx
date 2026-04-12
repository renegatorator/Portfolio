import { Typography } from '@mui/material';

import classes from './TechBadge.module.scss';

interface TechBadgeProps {
  label: string;
}

const TechBadge = ({ label }: TechBadgeProps) => {
  return (
    <span className={classes.badge}>
      <Typography variant="caption" component="span" className={classes.label}>
        {label}
      </Typography>
    </span>
  );
};

export default TechBadge;
