import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Chip, Typography } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import Reveal from '@/components/UI/Reveal/Reveal';
import ScreenshotCarousel from '@/components/UI/ScreenshotCarousel/ScreenshotCarousel';
import { Project, ProjectStatus } from '@/constants/projects';
import { ProjectStatCopy } from '@/types/projects';
import { getTranslationArray, getTranslationObject } from '@/utils/translations';

import classes from './ProjectShowcase.module.scss';

const statusConfig = {
  live: { labelKey: 'projects.page.status.live', className: 'live' },
  'in-development': { labelKey: 'projects.page.status.inDevelopment', className: 'inDev' },
  archived: { labelKey: 'projects.page.status.archived', className: 'archived' },
} as const satisfies Record<ProjectStatus, { labelKey: string; className: string }>;

interface ProjectHeaderProps {
  project: Project;
}

const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const { t } = useTranslation();

  const { labelKey: statusLabelKey, className: statusClass } = statusConfig[project.status];

  const featuredIndex = project.screenshots.findIndex((s) => s.src === project.featuredImage);
  const initialIndex = featuredIndex >= 0 ? featuredIndex : 0;

  const demoHost = project.demoUrl
    ? project.demoUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : undefined;

  const pk = project.projectKey;
  const stats = Array.isArray(project.stats) ? project.stats : [];
  const keyProps = getTranslationArray<string>(
    t(`projects.data.${pk}.keyProps`, { returnObjects: true }),
  );
  const hasStats = stats.length > 0;

  return (
    <div className={classes.hero}>
      <div className={classes.heroHeader}>
        <Reveal>
          {project.logoLight && project.logoDark ? (
            <div className={classes.logoWrap}>
              <Image
                src={project.logoLight}
                alt={project.title}
                width={220}
                height={52}
                className={`${classes.logo} ${classes.logoLight}`}
                priority
              />
              <Image
                src={project.logoDark}
                alt={project.title}
                width={220}
                height={52}
                className={`${classes.logo} ${classes.logoDark}`}
                priority
              />
            </div>
          ) : (
            <Typography variant="h2" component="h2" className={classes.title}>
              {project.title}
            </Typography>
          )}
        </Reveal>

        <Reveal delayMs={60}>
          <div className={classes.badges}>
            <Chip
              label={t(statusLabelKey)}
              size="small"
              className={`${classes.statusChip} ${classes[statusClass]}`}
            />
            {project.isOpenSource && (
              <Chip
                icon={<FontAwesomeIcon icon={faCodeBranch} className={classes.chipIcon} />}
                label={t('projects.page.openSource')}
                size="small"
                className={classes.openSourceChip}
              />
            )}
          </div>
        </Reveal>

        <Reveal delayMs={120}>
          <Typography variant="subtitle1" component="p" className={classes.tagline}>
            {t(`projects.data.${pk}.tagline`)}
          </Typography>
        </Reveal>
      </div>

      <div className={classes.heroBody}>
        <div className={classes.heroLeft}>
          <Reveal delayMs={140} className={classes.ctaWrap}>
            <div className={classes.ctaRow}>
              {project.demoUrl && (
                <Button
                  variant="contained"
                  size="small"
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  endIcon={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}
                  className={classes.ctaBtn}
                >
                  {t('projects.page.liveDemo')}
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  variant="outlined"
                  size="small"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<FontAwesomeIcon icon={faGithub} />}
                  className={classes.ctaBtn}
                >
                  {t('projects.page.viewOnGithub')}
                </Button>
              )}
            </div>
            <Typography variant="caption" component="p" className={classes.ctaTrust}>
              {t('projects.page.ctaTrust')}
            </Typography>
          </Reveal>

          {hasStats && (
            <Reveal delayMs={200}>
              <div className={classes.statsGrid}>
                {stats.map((stat) => {
                  const copy = getTranslationObject<ProjectStatCopy>(
                    t(`projects.data.${pk}.stats.${stat.statKey}`, { returnObjects: true }),
                  );
                  return (
                    <div key={stat.statKey} className={classes.statCard}>
                      <div className={classes.statIcon}>
                        <FontAwesomeIcon icon={stat.icon} />
                      </div>
                      <div className={classes.statBody}>
                        <Typography variant="h6" component="span" className={classes.statValue}>
                          {copy.value}
                        </Typography>
                        <Typography
                          variant="caption"
                          component="span"
                          className={classes.statLabel}
                        >
                          {copy.label}
                        </Typography>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          )}

          {keyProps.length > 0 && (
            <Reveal delayMs={260}>
              <div className={classes.keyProps}>
                {keyProps.map((prop, i) => (
                  <span key={i} className={classes.keyProp}>
                    {prop}
                  </span>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        <Reveal delayMs={80} className={classes.heroRight}>
          <ScreenshotCarousel
            screenshots={project.screenshots}
            initialIndex={initialIndex}
            urlBase={demoHost}
          />
        </Reveal>
      </div>
    </div>
  );
};

export default ProjectHeader;
