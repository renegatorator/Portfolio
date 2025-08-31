import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer, faWrench, faCode, faRocket } from '@fortawesome/free-solid-svg-icons';
import classes from './ComingSoonPage.module.scss';
import { useTranslation } from 'next-i18next';
import PageLayout from '../PageLayout/PageLayout';
import { Routes } from '@/constants/routes';

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
          
          <h1 className={classes.title}>{t('comingSoon.title')}</h1>
          <p className={classes.description}>{t('comingSoon.description')}</p>
          
          <div className={classes.features}>
            <div className={classes.feature}>
              <FontAwesomeIcon icon={faCode} className={classes.featureIcon} />
              <span>{t('comingSoon.features.modernTech')}</span>
            </div>
            <div className={classes.feature}>
              <FontAwesomeIcon icon={faRocket} className={classes.featureIcon} />
              <span>{t('comingSoon.features.performance')}</span>
            </div>
            <div className={classes.feature}>
              <FontAwesomeIcon icon={faHammer} className={classes.featureIcon} />
              <span>{t('comingSoon.features.construction')}</span>
            </div>
          </div>
          
          <div className={classes.progressSection}>
            <div className={classes.progressBar}>
              <div className={classes.progressFill}></div>
            </div>
            <p className={classes.progressText}>{t('comingSoon.progress')}</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ComingSoonPage;
