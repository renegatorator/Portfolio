import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import Reveal from '@/components/UI/Reveal/Reveal';
import { ProjectRichItem } from '@/types/projects';
import { formatIndex } from '@/utils/format';

import classes from './ProjectShowcase.module.scss';

interface ArchitectureSnapshotProps {
  items: ProjectRichItem[];
  sectionNumber: string;
}

const ArchitectureSnapshot = ({ items, sectionNumber }: ArchitectureSnapshotProps) => {
  const { t } = useTranslation();

  return (
    <Reveal delayMs={60}>
      <section className={`${classes.panel} ${classes.panelMuted}`}>
        <Typography variant="overline" component="h3" className={classes.panelTitle}>
          <span className={classes.panelNumber}>{sectionNumber}</span>
          <span>{t('projects.page.architectureSnapshot')}</span>
        </Typography>
        <ol className={classes.archFlow}>
          {items.map((item, idx) => (
            <li key={idx} className={classes.archStep}>
              <span className={classes.archStepNumber}>{formatIndex(idx + 1)}</span>
              <div className={classes.archStepBody}>
                <Typography variant="body2" component="span" className={classes.archStepTitle}>
                  {item.title}
                </Typography>
                <Typography variant="caption" component="p" className={classes.archStepDescription}>
                  {item.description}
                </Typography>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </Reveal>
  );
};

export default ArchitectureSnapshot;
