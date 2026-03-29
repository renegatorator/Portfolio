import { faCalendar, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Chip, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { WorkExperience } from '@/constants/rene';

import classes from './WorkExperienceCard.module.scss';

interface WorkExperienceCardProps {
  experience: WorkExperience;
}

const WorkExperienceCard = ({ experience }: WorkExperienceCardProps) => {
  const { t } = useTranslation();
  const { id, company, companyUrl, logo, startDate, endDate, tech, current } = experience;

  const role = t(`workExperience.experiences.${id}.role`);
  const location = t(`workExperience.experiences.${id}.location`);
  const highlights = t(`workExperience.experiences.${id}.highlights`, {
    returnObjects: true,
  }) as string[];
  const period = current
    ? `${startDate} – ${t('workExperience.present')}`
    : `${startDate} – ${endDate}`;

  return (
    <article className={classes.card}>
      <div className={classes.header}>
        <div className={classes.headerLeft}>
          <div className={classes.companyRow}>
            <Image src={logo} alt={company} width={40} height={40} className={classes.logoCard} />
            {companyUrl ? (
              <Link
                href={companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.companyLink}
              >
                <Typography variant="overline" component="span" className={classes.company}>
                  {company}
                </Typography>
              </Link>
            ) : (
              <Typography variant="overline" component="span" className={classes.company}>
                {company}
              </Typography>
            )}
          </div>
          <Typography variant="h4" component="h3" className={classes.role}>
            {role}
          </Typography>
          <div className={classes.meta}>
            <span className={classes.metaItem}>
              <FontAwesomeIcon icon={faCalendar} className={classes.metaIcon} />
              <Typography variant="body2" component="span">
                {period}
              </Typography>
            </span>
            <span className={classes.metaItem}>
              <FontAwesomeIcon icon={faLocationDot} className={classes.metaIcon} />
              <Typography variant="body2" component="span">
                {location}
              </Typography>
            </span>
          </div>
        </div>
        {current && (
          <Chip label={t('workExperience.present')} size="small" className={classes.currentBadge} />
        )}
      </div>

      <ul className={classes.highlights}>
        {highlights.map((point, i) => (
          <li key={i} className={classes.highlight}>
            <Typography variant="body2" component="span">
              {point}
            </Typography>
          </li>
        ))}
      </ul>

      <div className={classes.techRow}>
        {tech.map((item) => (
          <span key={item} className={classes.techPill}>
            {item}
          </span>
        ))}
      </div>
    </article>
  );
};

export default WorkExperienceCard;
