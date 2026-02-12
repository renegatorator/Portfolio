import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import Section from '@/components/UI/Section/Section';
import { Routes } from '@/constants/routes';

import { skills } from '../../../constants/rene';
import PageLayout from '../PageLayout/PageLayout';
import classes from './LandingPage.module.scss';

const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout route={Routes.LANDING_PAGE}>
      <Section alignment="center" background="gradient" shadow="large">
        <Image
          src="/images/rene-profile.jpg"
          alt="Rene Krajnc"
          width={100}
          height={100}
          className={classes.avatar}
        />
        <Typography variant="h1">{t('about.title')}</Typography>
        <Typography variant="h4">{t('role')}</Typography>
      </Section>
      <Section>
        <Typography variant="h3">{t('about.title')}</Typography>
        <Typography variant="body1" component="p">
          {t('about.description')}
        </Typography>
      </Section>
      <Section gap={24}>
        <Typography variant="h3">{t('about.skills')}</Typography>
        <div className={classes.skillsGrid}>
          {skills.map((skill, idx) => (
            <Typography
              key={idx}
              variant="body1"
              component="div"
              title={skill.label}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <FontAwesomeIcon icon={skill.icon} /> {skill.label}
            </Typography>
          ))}
        </div>
      </Section>
      {/* TODO: uncomment this when the contact form is ready */}
      {/* <ContactForm title={t('contact.title')} className={classes.contactForm} /> */}
    </PageLayout>
  );
};

export default LandingPage;
