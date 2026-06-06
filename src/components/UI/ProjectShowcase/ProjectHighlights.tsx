import { Typography } from '@mui/material';
import { Trans, useTranslation } from 'next-i18next';

import Reveal from '@/components/UI/Reveal/Reveal';
import { ProjectRichItem } from '@/types/projects';
import { formatIndex } from '@/utils/format';
import { getTranslationArray } from '@/utils/translations';

import classes from './ProjectShowcase.module.scss';

interface ProjectHighlightsProps {
  projectKey: string;
  sectionNumber: string;
}

const ProjectHighlights = ({ projectKey, sectionNumber }: ProjectHighlightsProps) => {
  const { t } = useTranslation();

  const highlights = getTranslationArray<ProjectRichItem>(
    t(`projects.data.${projectKey}.highlights`, { returnObjects: true }),
  );

  return (
    <Reveal>
      <section className={classes.panel}>
        <Typography variant="overline" component="h3" className={classes.panelTitle}>
          <span className={classes.panelNumber}>{sectionNumber}</span>
          <span>{t('projects.page.engineeringHighlights')}</span>
        </Typography>
        <p className={classes.description}>
          <Trans
            i18nKey={`projects.data.${projectKey}.description`}
            components={{ highlight: <span className={classes.descriptionEm} /> }}
          />
        </p>
        {highlights.length > 0 && (
          <ul className={classes.highlightsGrid}>
            {highlights.map((item, idx) => (
              <li key={idx} className={classes.highlightCard}>
                <span className={classes.highlightNumber}>{formatIndex(idx + 1)}</span>
                <div className={classes.highlightBody}>
                  <Typography variant="body2" component="span" className={classes.highlightTitle}>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    component="p"
                    className={classes.highlightDescription}
                  >
                    {item.description}
                  </Typography>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Reveal>
  );
};

export default ProjectHighlights;
