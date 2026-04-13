import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare, faCheck, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Chip, Typography } from '@mui/material';
import Image from 'next/image';
import { Trans, useTranslation } from 'next-i18next';

import Reveal from '@/components/UI/Reveal/Reveal';
import ScreenshotCarousel from '@/components/UI/ScreenshotCarousel/ScreenshotCarousel';
import TechBadge from '@/components/UI/TechBadge/TechBadge';
import { Project } from '@/constants/projects';

import classes from './ProjectShowcase.module.scss';

interface ProjectShowcaseProps {
  project: Project;
}

const statusConfig = {
  live: { labelKey: 'projects.page.status.live', className: 'live' },
  'in-development': { labelKey: 'projects.page.status.inDevelopment', className: 'inDev' },
  archived: { labelKey: 'projects.page.status.archived', className: 'archived' },
} as const;

const ProjectShowcase = ({ project }: ProjectShowcaseProps) => {
  const { t } = useTranslation();

  const { labelKey: statusLabelKey, className: statusClass } = statusConfig[project.status];

  const featuredIndex = project.screenshots.findIndex((s) => s.src === project.featuredImage);
  const initialIndex = featuredIndex >= 0 ? featuredIndex : 0;

  const demoHost = project.demoUrl
    ? project.demoUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : undefined;

  const pk = project.projectKey;
  const highlights = t(`projects.data.${pk}.highlights`, { returnObjects: true }) as string[];

  return (
    <article className={classes.showcase}>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className={classes.header}>
        <div className={classes.headerMeta}>
          <Reveal>
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

          <Reveal delayMs={60}>
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

          <Reveal delayMs={120}>
            <Typography variant="subtitle1" component="p" className={classes.tagline}>
              {t(`projects.data.${pk}.tagline`)}
            </Typography>
          </Reveal>
        </div>

        <Reveal delayMs={180} className={classes.ctaRow}>
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
        </Reveal>
      </div>

      {/* ── Screenshot carousel ────────────────────────────────────── */}
      <Reveal delayMs={80} className={classes.carouselWrap}>
        <ScreenshotCarousel
          screenshots={project.screenshots}
          initialIndex={initialIndex}
          urlBase={demoHost}
        />
      </Reveal>

      {/* ── About ──────────────────────────────────────────────────── */}
      <Reveal>
        <div className={classes.panel}>
          <Typography variant="overline" component="h3" className={classes.panelTitle}>
            {t('projects.page.about')}
          </Typography>
          <div className={classes.aboutGrid}>
            <p className={classes.description}>
              <Trans
                i18nKey={`projects.data.${pk}.description`}
                components={{ highlight: <span className={classes.descriptionEm} /> }}
              />
            </p>
            <ul className={classes.highlights}>
              {Array.isArray(highlights) &&
                highlights.map((item, idx) => (
                  <li key={idx} className={classes.highlight}>
                    <FontAwesomeIcon icon={faCheck} className={classes.checkIcon} />
                    <Typography variant="body2" component="span">
                      {item}
                    </Typography>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </Reveal>

      {/* ── Tech Stack ─────────────────────────────────────────────── */}
      <Reveal delayMs={60}>
        <div className={classes.panel}>
          <Typography variant="overline" component="h3" className={classes.panelTitle}>
            {t('projects.page.techStack')}
          </Typography>
          <div className={classes.techGrid}>
            {project.techCategories.map((category) => (
              <div key={category.categoryKey} className={classes.techCategory}>
                <div className={classes.categoryHeader}>
                  <FontAwesomeIcon icon={category.icon} className={classes.categoryIcon} />
                  <Typography variant="caption" component="span" className={classes.categoryLabel}>
                    {t(`projects.data.${pk}.techCategories.${category.categoryKey}`)}
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
        </div>
      </Reveal>

      {/* ── Key Features ───────────────────────────────────────────── */}
      <Reveal delayMs={60}>
        <div className={classes.panel}>
          <Typography variant="overline" component="h3" className={classes.panelTitle}>
            {t('projects.page.keyFeatures')}
          </Typography>
          <ul className={classes.featuresGrid}>
            {project.features.map((feature) => (
              <li key={feature.featureKey} className={classes.featureCard}>
                <div className={classes.featureIcon}>
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <div className={classes.featureContent}>
                  <Typography variant="body2" component="span" className={classes.featureLabel}>
                    {t(`projects.data.${pk}.features.${feature.featureKey}.label`)}
                  </Typography>
                  <Typography
                    variant="caption"
                    component="p"
                    className={classes.featureDescription}
                  >
                    {t(`projects.data.${pk}.features.${feature.featureKey}.description`)}
                  </Typography>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </article>
  );
};

export default ProjectShowcase;
