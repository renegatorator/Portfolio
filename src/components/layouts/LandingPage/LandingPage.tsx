import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { skills } from '../../../constants/rene';
import classes from './LandingPage.module.scss';
import { useTranslation } from 'next-i18next';
import PageLayout from '../PageLayout/PageLayout';
import { Routes } from '@/constants/routes';
import { Typography } from '@mui/material';

const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout route={Routes.LANDING_PAGE}>
      <section className={classes.header}>
        <Image
          src="/images/rene-profile.jpg"
          alt="Rene Krajnc"
          width={100}
          height={100}
          className={classes.avatar}
        />
        <Typography variant="h1">{t('about.title')}</Typography>
        <Typography variant="h4">{t('role')}</Typography>
      </section>
      <section className={classes.section}>
        <Typography variant="h3">{t('about.title')}</Typography>
        <Typography
          variant="body1"
          component="p"
          dangerouslySetInnerHTML={{ __html: t('about.description') }}
        />
      </section>
      <section className={classes.section}>
        <Typography variant="h3">{t('skills.title')}</Typography>
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
      </section>
      {/* TODO: uncomment this when the contact form is ready */}
      {/* <ContactForm title={t('contact.title')} className={classes.contactForm} /> */}
    </PageLayout>
  );
};

export default LandingPage;
