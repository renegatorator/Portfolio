import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowUpRightFromSquare,
  faCodeBranch,
  faLightbulb,
  faScaleBalanced,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Typography,
} from '@mui/material';
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

interface RichItem {
  title: string;
  description: string;
}

interface DecisionCopy {
  challengeShort: string;
  challenge: string;
  solution: string;
  tradeoff: string;
}

type DecisionRowVariant = 'challenge' | 'solution' | 'tradeoff';

interface DecisionRowProps {
  icon: IconDefinition;
  label: string;
  text: string;
  variant: DecisionRowVariant;
  muted?: boolean;
}

const decisionVariantClass: Record<DecisionRowVariant, string> = {
  challenge: 'decisionItemIconChallenge',
  solution: 'decisionItemIconSolution',
  tradeoff: 'decisionItemIconTradeoff',
};

const decisionLabelVariantClass: Record<DecisionRowVariant, string> = {
  challenge: 'decisionItemLabelChallenge',
  solution: 'decisionItemLabelSolution',
  tradeoff: 'decisionItemLabelTradeoff',
};

const DecisionRow = ({ icon, label, text, variant, muted }: DecisionRowProps) => (
  <div className={classes.decisionItem}>
    <div className={`${classes.decisionItemIcon} ${classes[decisionVariantClass[variant]]}`}>
      <FontAwesomeIcon icon={icon} />
    </div>
    <div className={classes.decisionItemBody}>
      <Typography
        variant="caption"
        component="span"
        className={`${classes.decisionItemLabel} ${classes[decisionLabelVariantClass[variant]]}`}
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        component="p"
        className={`${classes.decisionItemText} ${muted ? classes.decisionItemTextMuted : ''}`}
      >
        {text}
      </Typography>
    </div>
  </div>
);

interface StatCopy {
  value: string;
  label: string;
}

const statusConfig = {
  live: { labelKey: 'projects.page.status.live', className: 'live' },
  'in-development': { labelKey: 'projects.page.status.inDevelopment', className: 'inDev' },
  archived: { labelKey: 'projects.page.status.archived', className: 'archived' },
} as const;

const formatSectionNumber = (n: number): string => `0${n}`.slice(-2);

const ProjectShowcase = ({ project }: ProjectShowcaseProps) => {
  const { t } = useTranslation();

  const { labelKey: statusLabelKey, className: statusClass } = statusConfig[project.status];

  const featuredIndex = project.screenshots.findIndex((s) => s.src === project.featuredImage);
  const initialIndex = featuredIndex >= 0 ? featuredIndex : 0;

  const demoHost = project.demoUrl
    ? project.demoUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : undefined;

  const pk = project.projectKey;
  const highlights = t(`projects.data.${pk}.highlights`, { returnObjects: true }) as RichItem[];
  const architectureSnapshot = t(`projects.data.${pk}.architectureSnapshot`, {
    returnObjects: true,
  }) as RichItem[];
  const keyProps = t(`projects.data.${pk}.keyProps`, { returnObjects: true }) as string[];

  const hasStats = Array.isArray(project.stats) && project.stats.length > 0;
  const hasDecisions = Array.isArray(project.decisions) && project.decisions.length > 0;

  let sectionNumber = 0;
  const nextSection = (): string => formatSectionNumber(++sectionNumber);

  return (
    <article className={classes.showcase}>
      {/* ── Hero header ────────────────────────────────────────────── */}
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
                  {project.stats!.map((stat) => {
                    const copy = t(`projects.data.${pk}.stats.${stat.statKey}`, {
                      returnObjects: true,
                    }) as StatCopy;
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

            {Array.isArray(keyProps) && keyProps.length > 0 && (
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

      {/* ── Engineering Highlights ─────────────────────────────────── */}
      <Reveal>
        <section className={classes.panel}>
          <Typography variant="overline" component="h3" className={classes.panelTitle}>
            <span className={classes.panelNumber}>{nextSection()}</span>
            <span>{t('projects.page.engineeringHighlights')}</span>
          </Typography>
          <p className={classes.description}>
            <Trans
              i18nKey={`projects.data.${pk}.description`}
              components={{ highlight: <span className={classes.descriptionEm} /> }}
            />
          </p>
          {Array.isArray(highlights) && highlights.length > 0 && (
            <ul className={classes.highlightsGrid}>
              {highlights.map((item, idx) => (
                <li key={idx} className={classes.highlightCard}>
                  <span className={classes.highlightNumber}>{formatSectionNumber(idx + 1)}</span>
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

      {/* ── Architecture Snapshot ──────────────────────────────────── */}
      {Array.isArray(architectureSnapshot) && architectureSnapshot.length > 0 && (
        <Reveal delayMs={60}>
          <section className={`${classes.panel} ${classes.panelMuted}`}>
            <Typography variant="overline" component="h3" className={classes.panelTitle}>
              <span className={classes.panelNumber}>{nextSection()}</span>
              <span>{t('projects.page.architectureSnapshot')}</span>
            </Typography>
            <ol className={classes.archFlow}>
              {architectureSnapshot.map((item, idx) => (
                <li key={idx} className={classes.archStep}>
                  <span className={classes.archStepNumber}>{formatSectionNumber(idx + 1)}</span>
                  <div className={classes.archStepBody}>
                    <Typography variant="body2" component="span" className={classes.archStepTitle}>
                      {item.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      component="p"
                      className={classes.archStepDescription}
                    >
                      {item.description}
                    </Typography>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>
      )}

      {/* ── Challenges & Decisions ─────────────────────────────────── */}
      {hasDecisions && (
        <Reveal delayMs={60}>
          <section className={classes.panel}>
            <Typography variant="overline" component="h3" className={classes.panelTitle}>
              <span className={classes.panelNumber}>{nextSection()}</span>
              <span>{t('projects.page.decisionsTitle')}</span>
            </Typography>
            <p className={classes.panelSubtitle}>
              {t('projects.page.decisionsSubtitle', { project: project.title })}
            </p>
            <div className={classes.decisionsContainer}>
              {project.decisions!.map((decision, idx) => {
                const copy = t(`projects.data.${pk}.decisions.${decision.decisionKey}`, {
                  returnObjects: true,
                }) as DecisionCopy;
                return (
                  <Accordion
                    key={decision.decisionKey}
                    defaultExpanded={idx === 0}
                    disableGutters
                    elevation={0}
                    square={false}
                    className={classes.decisionAccordion}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className={classes.decisionExpand} />}
                      className={classes.decisionSummary}
                      classes={{ content: classes.decisionSummaryContent }}
                    >
                      <Typography
                        variant="body2"
                        component="span"
                        className={classes.decisionShort}
                      >
                        {copy.challengeShort}
                      </Typography>
                      <Chip
                        label={t('projects.page.decision.challenge')}
                        size="small"
                        className={`${classes.decisionChip} ${classes.decisionChipChallenge}`}
                      />
                    </AccordionSummary>
                    <AccordionDetails className={classes.decisionDetails}>
                      <DecisionRow
                        icon={faTriangleExclamation}
                        label={t('projects.page.decision.challenge')}
                        text={copy.challenge}
                        variant="challenge"
                      />
                      <DecisionRow
                        icon={faLightbulb}
                        label={t('projects.page.decision.solution')}
                        text={copy.solution}
                        variant="solution"
                      />
                      <DecisionRow
                        icon={faScaleBalanced}
                        label={t('projects.page.decision.tradeoff')}
                        text={copy.tradeoff}
                        variant="tradeoff"
                        muted
                      />
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </div>
          </section>
        </Reveal>
      )}

      {/* ── Tech Stack ─────────────────────────────────────────────── */}
      <Reveal delayMs={60}>
        <section className={`${classes.panel} ${classes.panelMuted}`}>
          <Typography variant="overline" component="h3" className={classes.panelTitle}>
            <span className={classes.panelNumber}>{nextSection()}</span>
            <span>{t('projects.page.techStack')}</span>
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
        </section>
      </Reveal>

      {/* ── Key Features ───────────────────────────────────────────── */}
      <Reveal delayMs={60}>
        <section className={classes.panel}>
          <Typography variant="overline" component="h3" className={classes.panelTitle}>
            <span className={classes.panelNumber}>{nextSection()}</span>
            <span>{t('projects.page.keyFeatures')}</span>
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
        </section>
      </Reveal>
    </article>
  );
};

export default ProjectShowcase;
