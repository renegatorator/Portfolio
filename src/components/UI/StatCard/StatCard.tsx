import { Typography } from '@mui/material';

import classes from './StatCard.module.scss';

interface StatCardProps {
  title: string;
  description: string;
}

const StatCard = ({ title, description }: StatCardProps) => {
  return (
    <div className={classes.container}>
      <Typography variant="h2" component="p">
        {title}
      </Typography>
      <Typography variant="body2" component="p" className={classes.statLabel}>
        {description}
      </Typography>
    </div>
  );
};

export default StatCard;
