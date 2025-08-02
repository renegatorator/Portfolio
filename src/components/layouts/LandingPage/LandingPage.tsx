import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { skills } from '../../../constants/rene';
import classes from './LandingPage.module.scss';
import { useTranslation } from 'next-i18next';
import ContactForm from '@/components/forms/ContactForm/ContactForm';
import PageLayout from '../PageLayout/PageLayout';
import { Routes } from '@/constants/routes';

const LandingPage = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <PageLayout route={Routes.LANDING_PAGE}>
      <header className={classes.header}>
        <Image
          src="/images/rene-profile.jfif"
          alt="Rene Krajnc"
          width={100}
          height={100}
          className={classes.avatar}
        />
        <h1>Rene Krajnc</h1>
        <h2>{t('role')}</h2>
        <nav>
          <a href={Routes.ABOUT}>{t('nav.about')}</a>
          <a href={Routes.PROJECTS}>{t('nav.projects')}</a>
          <a href={Routes.SKILLS}>{t('nav.skills')}</a>
          <a href={Routes.CONTACT}>{t('nav.contact')}</a>
        </nav>
      </header>
      <section className={classes.section}>
        <h3>{t('about.title')}</h3>
        <p dangerouslySetInnerHTML={{ __html: t('about.description') }} />
      </section>
      <section className={classes.section}>
        <h3>{t('projects.title')}</h3>
        <ul>
          <li>{t('projects.one')}</li>
          <li>{t('projects.two')}</li>
          <li>{t('projects.three')}</li>
        </ul>
      </section>
      <section className={classes.section}>
        <h3>{t('skills.title')}</h3>
        <div className={classes.skillsGrid}>
          {skills.map((skill, idx) => (
            <span
              key={idx}
              title={skill.label}
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <FontAwesomeIcon icon={skill.icon} /> {skill.label}
            </span>
          ))}
        </div>
      </section>
      <section className={classes.section}>
        <h3>{t('contact.title')}</h3>
        <ContactForm />
      </section>
      <footer className={classes.footer}>
        <p dangerouslySetInnerHTML={{ __html: t('footer', { year }) }} />
      </footer>
    </PageLayout>
  );
};

export default LandingPage;
