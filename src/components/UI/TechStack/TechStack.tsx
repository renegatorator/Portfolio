import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import Section from '@/components/UI/Section/Section';
import { skills } from '@/constants/rene';
import { useBreakpoint } from '@/utils/hooks/useBreakpoint';

import classes from './TechStack.module.scss';

const TechStack = () => {
  const { t } = useTranslation();
  const [showAllSkills, setShowAllSkills] = useState(false);
  const isSmallScreen = useBreakpoint('sm');

  return (
    <Section gap={32} alignment="center">
      <Typography variant="h3" component="h2">
        {t('about.techStack')}
      </Typography>
      <div className={classes.techStack}>
        {(isSmallScreen && !showAllSkills ? skills.slice(0, 4) : skills).map((skill, idx) => (
          <div key={idx} className={classes.techBadge}>
            <FontAwesomeIcon icon={skill.icon} />
            <Typography variant="body2" component="span">
              {skill.label}
            </Typography>
          </div>
        ))}
      </div>
      {isSmallScreen && (
        <Button
          variant="outlined"
          onClick={() => setShowAllSkills(!showAllSkills)}
          className={classes.showMoreButton}
          startIcon={<FontAwesomeIcon icon={showAllSkills ? faMinus : faPlus} />}
        >
          {showAllSkills ? t('showLess') : t('showMore')}
        </Button>
      )}
    </Section>
  );
};

export default TechStack;
