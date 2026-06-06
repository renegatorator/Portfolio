import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faLightbulb,
  faScaleBalanced,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Chip, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import Reveal from '@/components/UI/Reveal/Reveal';
import { ProjectDecision } from '@/constants/projects';
import { ProjectDecisionCopy } from '@/types/projects';
import { getTranslationObject } from '@/utils/translations';

import classes from './ProjectShowcase.module.scss';

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

interface ProjectDecisionsProps {
  projectKey: string;
  projectTitle: string;
  decisions: ProjectDecision[];
  sectionNumber: string;
}

const ProjectDecisions = ({
  projectKey,
  projectTitle,
  decisions,
  sectionNumber,
}: ProjectDecisionsProps) => {
  const { t } = useTranslation();

  return (
    <Reveal delayMs={60}>
      <section className={classes.panel}>
        <Typography variant="overline" component="h3" className={classes.panelTitle}>
          <span className={classes.panelNumber}>{sectionNumber}</span>
          <span>{t('projects.page.decisionsTitle')}</span>
        </Typography>
        <p className={classes.panelSubtitle}>
          {t('projects.page.decisionsSubtitle', { project: projectTitle })}
        </p>
        <div className={classes.decisionsContainer}>
          {decisions.map((decision, idx) => {
            const copy = getTranslationObject<ProjectDecisionCopy>(
              t(`projects.data.${projectKey}.decisions.${decision.decisionKey}`, {
                returnObjects: true,
              }),
            );
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
                  <Typography variant="body2" component="span" className={classes.decisionShort}>
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
  );
};

export default ProjectDecisions;
