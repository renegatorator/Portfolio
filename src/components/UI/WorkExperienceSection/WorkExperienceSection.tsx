import { Typography } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import DownloadCV from '@/components/UI/DownloadCV/DownloadCV';
import Reveal from '@/components/UI/Reveal/Reveal';
import { workExperiences } from '@/constants/rene';

import WorkExperienceCard from './WorkExperienceCard/WorkExperienceCard';
import classes from './WorkExperienceSection.module.scss';

const WorkExperienceSection = () => {
  const { t } = useTranslation();

  return (
    <div className={classes.shell}>
      <Reveal>
        <header className={classes.header}>
          <div className={classes.headerLeft}>
            <Typography variant="h3" component="h2" className={classes.title}>
              {t('workExperience.title')}
            </Typography>
            <Typography variant="subtitle1" component="p" className={classes.subtitle}>
              {t('workExperience.subtitle')}
            </Typography>
          </div>
          <DownloadCV variant="outlined" />
        </header>
      </Reveal>

      <div className={classes.timeline}>
        {workExperiences.map((experience, index) => (
          <div key={experience.id} className={classes.entry}>
            <div className={classes.timelineLeft}>
              <div
                className={`${classes.avatar} ${experience.current ? classes.avatarCurrent : ''}`}
              >
                {experience.current && <div className={classes.avatarRing} />}
                <Image
                  src={experience.logo}
                  alt={experience.company}
                  width={56}
                  height={56}
                  className={classes.avatarImg}
                />
              </div>
            </div>

            <Reveal delayMs={index * 140} className={classes.cardReveal}>
              <WorkExperienceCard experience={experience} />
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperienceSection;
