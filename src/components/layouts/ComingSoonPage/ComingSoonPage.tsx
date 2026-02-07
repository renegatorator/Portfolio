import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer, faWrench, faCode, faRocket } from '@fortawesome/free-solid-svg-icons';
import classes from './ComingSoonPage.module.scss';
import { useTranslation } from 'next-i18next';
import PageLayout from '../PageLayout/PageLayout';
import { Routes } from '@/constants/routes';
import { Typography } from '@mui/material';
import ProgressBar from '@/components/UI/ProgressBar';

const ComingSoonPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout route={Routes.PROJECTS}>
      <div className={classes.container}>
        <div className={classes.mainContent}>
          <div className={classes.iconContainer}>
            <FontAwesomeIcon icon={faHammer} className={classes.mainIcon} />
            <FontAwesomeIcon icon={faWrench} className={classes.secondaryIcon} />
          </div>

          <Typography variant="h1" className={classes.title}>
            {t('comingSoon.title')}
          </Typography>
          <Typography variant="body1" className={classes.description}>
            {t('comingSoon.description')}
          </Typography>

          <div className={classes.features}>
            <div className={classes.feature}>
              <FontAwesomeIcon icon={faCode} className={classes.featureIcon} />
              <Typography variant="caption" component="span">
                {t('comingSoon.features.modernTech')}
              </Typography>
            </div>
            <div className={classes.feature}>
              <FontAwesomeIcon icon={faRocket} className={classes.featureIcon} />
              <Typography variant="caption" component="span">
                {t('comingSoon.features.performance')}
              </Typography>
            </div>
            <div className={classes.feature}>
              <FontAwesomeIcon icon={faHammer} className={classes.featureIcon} />
              <Typography variant="caption" component="span">
                {t('comingSoon.features.construction')}
              </Typography>
            </div>
          </div>

          <div className={classes.progressSection}>
            <ProgressBar progress={60} animated />
            <Typography variant="caption" component="p" className={classes.progressText}>
              {t('comingSoon.progress')}
            </Typography>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ComingSoonPage;
