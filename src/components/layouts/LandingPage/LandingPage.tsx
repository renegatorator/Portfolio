import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';
import Image from 'next/image';
import { Trans, useTranslation } from 'next-i18next';

import Section from '@/components/UI/Section/Section';
import { Routes } from '@/constants/routes';

import { skills } from '../../../constants/rene';
import PageLayout from '../PageLayout/PageLayout';
import classes from './LandingPage.module.scss';

const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout route={Routes.LANDING_PAGE}>
      {/* Hero Section */}
      <Section alignment="center" background="gradient" shadow="large" gap={20}>
        <Image
          src="/images/rene-profile.jpg"
          alt="Rene Krajnc"
          width={120}
          height={120}
          className={classes.avatar}
        />
        <Typography variant="h1" component="h1">
          {t('name')}
        </Typography>
        <Typography variant="h4" component="h2">
          {t('role')}
        </Typography>
        <Typography
          variant="subtitle1"
          component="p"
          sx={{ maxWidth: '700px', textAlign: 'center' }}
        >
          <Trans
            i18nKey="tagline"
            components={{
              highlight: <span style={{ color: 'var(--primary)', fontWeight: 600 }} />,
            }}
          />
        </Typography>
      </Section>

      {/* Tech Stack Section */}
      <Section gap={32} alignment="center">
        <Typography variant="h3" component="h2">
          {t('about.techStack')}
        </Typography>
        <div className={classes.techStack}>
          {skills.map((skill, idx) => (
            <div key={idx} className={classes.techBadge}>
              <FontAwesomeIcon icon={skill.icon} />
              <Typography variant="body2" component="span">
                {skill.label}
              </Typography>
            </div>
          ))}
        </div>
      </Section>

      {/* About Section */}
      <Section gap={20}>
        <Typography variant="h3" component="h2">
          {t('about.title')}
        </Typography>
        <Typography variant="subtitle1" component="p" sx={{ fontWeight: 600 }}>
          {t('about.headline')}
        </Typography>
        <Typography variant="body1" component="p" sx={{ lineHeight: 1.7 }}>
          {t('about.description')}
        </Typography>
      </Section>
    </PageLayout>
  );
};

export default LandingPage;
