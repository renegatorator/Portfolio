import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { skills } from '../../../constants/rene';
import classes from './LandingPage.module.scss';
import { useTranslation } from 'next-i18next';
import ContactForm from '@/components/forms/ContactForm/ContactForm';
import PageLayout from '../PageLayout/PageLayout';
import { Routes } from '@/constants/routes';

const LandingPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
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
          <Link href={Routes.ABOUT} locale={router.locale}>
            {t('nav.about')}
          </Link>
          <Link href={Routes.PROJECTS} locale={router.locale}>
            {t('nav.projects')}
          </Link>
          <Link href={Routes.SKILLS} locale={router.locale}>
            {t('nav.skills')}
          </Link>
          <Link href={Routes.CONTACT} locale={router.locale}>
            {t('nav.contact')}
          </Link>
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
