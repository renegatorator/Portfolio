import { faCalendarAlt, faClock,faFish, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import CountdownTimer from '@/components/UI/CountdownTimer/CountdownTimer';
import { Routes } from '@/constants/routes';

import PageLayout from '../PageLayout/PageLayout';
import classes from './FishingPage.module.scss';

const FishingPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout route={Routes.FISHING}>
      <div className={classes.container}>
        {/* Hero Section */}
        <section className={classes.hero}>
          <div className={classes.heroContent}>
            <div className={classes.heroIcon}>
              <FontAwesomeIcon icon={faFish} />
            </div>
            <Typography variant="h1" className={classes.heroTitle}>
              {t('fishing.title')}
            </Typography>
            <Typography variant="subtitle1" component="div" className={classes.heroSubtitle}>
              {t('fishing.subtitle')}
            </Typography>
          </div>
        </section>

        {/* Countdown Section */}
        <section className={classes.countdownSection}>
          <div className={classes.countdownHeader}>
            <FontAwesomeIcon icon={faCalendarAlt} className={classes.countdownIcon} />
            <Typography variant="h2">{t('fishing.countdown.title')}</Typography>
          </div>
          <CountdownTimer />
          <div className={classes.eventDetails}>
            <div className={classes.eventDetail}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <Typography variant="body1" component="span">
                {t('fishing.countdown.location')}
              </Typography>
            </div>
            <div className={classes.eventDetail}>
              <FontAwesomeIcon icon={faClock} />
              <Typography variant="body1" component="span">
                {t('fishing.countdown.time')}
              </Typography>
            </div>
          </div>
        </section>

        {/* Target Fish Section */}
        <section className={classes.targetFishSection}>
          <Typography variant="h2">{t('fishing.targetFish.title')}</Typography>
          <Typography variant="body1" component="p" className={classes.targetFishDescription}>
            {t('fishing.targetFish.description')}
          </Typography>
          <div className={classes.fishGrid}>
            {['amberjack', 'barracuda', 'bonito', 'grouper', 'mackerel'].map((fish) => (
              <div key={fish} className={classes.fishCard}>
                <div className={classes.fishIcon}>
                  <FontAwesomeIcon icon={faFish} />
                </div>
                <Typography variant="h5">{t(`fishing.targetFish.species.${fish}`)}</Typography>
                <Typography variant="body2" component="p">
                  {t(`fishing.targetFish.descriptions.${fish}`)}
                </Typography>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default FishingPage;
