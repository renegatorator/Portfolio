import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import classes from './AvailabilityChip.module.scss';

const AvailabilityChip = () => {
  const { t } = useTranslation();

  return (
    <div className={classes.chip}>
      <span className={classes.dot} aria-hidden="true" />
      <Typography variant="caption" component="p" className={classes.label}>
        <span className={classes.full}>{t('availability')}</span>
        <span className={classes.short}>{t('availabilityShort')}</span>
      </Typography>
    </div>
  );
};

export default AvailabilityChip;
