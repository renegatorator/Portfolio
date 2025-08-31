import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFish, 
  faAnchor, 
  faWater, 
  faSun, 
  faMapMarkerAlt,
  faCalendarAlt,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import classes from './FishingPage.module.scss';
import { useTranslation } from 'next-i18next';
import PageLayout from '../PageLayout/PageLayout';
import { Routes } from '@/constants/routes';
import CountdownTimer from '@/components/UI/CountdownTimer/CountdownTimer';

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
            <h1 className={classes.heroTitle}>{t('fishing.title')}</h1>
            <p className={classes.heroSubtitle}>{t('fishing.subtitle')}</p>
          </div>
        </section>

        {/* Countdown Section */}
        <section className={classes.countdownSection}>
          <div className={classes.countdownHeader}>
            <FontAwesomeIcon icon={faCalendarAlt} className={classes.countdownIcon} />
            <h2>{t('fishing.countdown.title')}</h2>
            {/* <p>{t('fishing.countdown.description')}</p> */}
          </div>
          <CountdownTimer />
          <div className={classes.eventDetails}>
            <div className={classes.eventDetail}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span>{t('fishing.countdown.location')}</span>
            </div>
            <div className={classes.eventDetail}>
              <FontAwesomeIcon icon={faClock} />
              <span>{t('fishing.countdown.time')}</span>
            </div>
          </div>
        </section>

        {/* Target Fish Section */}
        <section className={classes.targetFishSection}>
          <h2>{t('fishing.targetFish.title')}</h2>
          <p className={classes.targetFishDescription}>{t('fishing.targetFish.description')}</p>
          <div className={classes.fishGrid}>
            {['amberjack', 'barracuda', 'bonito', 'grouper', 'tuna', 'mackerel'].map((fish) => (
              <div key={fish} className={classes.fishCard}>
                <div className={classes.fishIcon}>
                  <FontAwesomeIcon icon={faFish} />
                </div>
                <h3>{t(`fishing.targetFish.species.${fish}`)}</h3>
                <p>{t(`fishing.targetFish.descriptions.${fish}`)}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </PageLayout>
  );
};

export default FishingPage;
