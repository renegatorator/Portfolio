import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useEffect,useState } from 'react';

import classes from './CountdownTimer.module.scss';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2025-09-19T15:00:00+02:00'); // Slovenian time (UTC+2)

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={classes.countdownContainer}>
      <div className={classes.countdownItem}>
        <Typography
          variant="h2"
          className={classes.number}
          component="div"
          sx={{ fontSize: '3rem' }}
        >
          {timeLeft.days.toString().padStart(2, '0')}
        </Typography>
        <Typography variant="caption" component="div" className={classes.label}>
          {t('fishing.countdown.labels.days')}
        </Typography>
      </div>
      <Typography
        variant="h2"
        component="div"
        className={classes.separator}
        sx={{ fontSize: '2rem' }}
      >
        :
      </Typography>
      <div className={classes.countdownItem}>
        <Typography
          variant="h2"
          className={classes.number}
          component="div"
          sx={{ fontSize: '3rem' }}
        >
          {timeLeft.hours.toString().padStart(2, '0')}
        </Typography>
        <Typography variant="caption" component="div" className={classes.label}>
          {t('fishing.countdown.labels.hours')}
        </Typography>
      </div>
      <Typography
        variant="h2"
        component="div"
        className={classes.separator}
        sx={{ fontSize: '2rem' }}
      >
        :
      </Typography>
      <div className={classes.countdownItem}>
        <Typography
          variant="h2"
          className={classes.number}
          component="div"
          sx={{ fontSize: '3rem' }}
        >
          {timeLeft.minutes.toString().padStart(2, '0')}
        </Typography>
        <Typography variant="caption" component="div" className={classes.label}>
          {t('fishing.countdown.labels.minutes')}
        </Typography>
      </div>
      <Typography
        variant="h2"
        component="div"
        className={classes.separator}
        sx={{ fontSize: '2rem' }}
      >
        :
      </Typography>
      <div className={classes.countdownItem}>
        <Typography
          variant="h2"
          className={classes.number}
          component="div"
          sx={{ fontSize: '3rem' }}
        >
          {timeLeft.seconds.toString().padStart(2, '0')}
        </Typography>
        <Typography variant="caption" component="div" className={classes.label}>
          {t('fishing.countdown.labels.seconds')}
        </Typography>
      </div>
    </div>
  );
};

export default CountdownTimer;
