import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import Reveal from '@/components/UI/Reveal/Reveal';
import { ProjectFeature } from '@/constants/projects';

import classes from './ProjectShowcase.module.scss';

interface ProjectFeaturesProps {
  projectKey: string;
  features: ProjectFeature[];
  sectionNumber: string;
}

const ProjectFeatures = ({ projectKey, features, sectionNumber }: ProjectFeaturesProps) => {
  const { t } = useTranslation();

  return (
    <Reveal delayMs={60}>
      <section className={classes.panel}>
        <Typography variant="overline" component="h3" className={classes.panelTitle}>
          <span className={classes.panelNumber}>{sectionNumber}</span>
          <span>{t('projects.page.keyFeatures')}</span>
        </Typography>
        <ul className={classes.featuresGrid}>
          {features.map((feature) => (
            <li key={feature.featureKey} className={classes.featureCard}>
              <div className={classes.featureIcon}>
                <FontAwesomeIcon icon={feature.icon} />
              </div>
              <div className={classes.featureContent}>
                <Typography variant="body2" component="span" className={classes.featureLabel}>
                  {t(`projects.data.${projectKey}.features.${feature.featureKey}.label`)}
                </Typography>
                <Typography variant="caption" component="p" className={classes.featureDescription}>
                  {t(`projects.data.${projectKey}.features.${feature.featureKey}.description`)}
                </Typography>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
};

export default ProjectFeatures;
