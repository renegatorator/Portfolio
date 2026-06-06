import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import Reveal from '@/components/UI/Reveal/Reveal';
import TechBadge from '@/components/UI/TechBadge/TechBadge';
import { TechCategory } from '@/constants/projects';

import classes from './ProjectShowcase.module.scss';

interface ProjectTechStackProps {
  projectKey: string;
  techCategories: TechCategory[];
  sectionNumber: string;
}

const ProjectTechStack = ({ projectKey, techCategories, sectionNumber }: ProjectTechStackProps) => {
  const { t } = useTranslation();

  return (
    <Reveal delayMs={60}>
      <section className={`${classes.panel} ${classes.panelMuted}`}>
        <Typography variant="overline" component="h3" className={classes.panelTitle}>
          <span className={classes.panelNumber}>{sectionNumber}</span>
          <span>{t('projects.page.techStack')}</span>
        </Typography>
        <div className={classes.techGrid}>
          {techCategories.map((category) => (
            <div key={category.categoryKey} className={classes.techCategory}>
              <div className={classes.categoryHeader}>
                <FontAwesomeIcon icon={category.icon} className={classes.categoryIcon} />
                <Typography variant="caption" component="span" className={classes.categoryLabel}>
                  {t(`projects.data.${projectKey}.techCategories.${category.categoryKey}`)}
                </Typography>
              </div>
              <div className={classes.badgeRow}>
                {category.items.map((item) => (
                  <TechBadge key={item} label={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
};

export default ProjectTechStack;
