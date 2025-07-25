import Head from 'next/head';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { skills } from '../../../constants/rene';
import classes from './LandingPage.module.scss';
import { useTranslation } from 'next-i18next';
import ThemeToggle from '@/components/UI/ThemeToggle';
import LanguageSwitcher from '@/components/UI/LanguageSwitcher';
import ContactForm from '@/components/forms/ContactForm/ContactForm';

const LandingPage = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <div className={classes.landing}>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('metaDescription')} />
      </Head>
      <header className={classes.header}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
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
          <a href="#about">{t('nav.about')}</a>
          <a href="#projects">{t('nav.projects')}</a>
          <a href="#skills">{t('nav.skills')}</a>
          <a href="#contact">{t('nav.contact')}</a>
          <a
            href="https://www.linkedin.com/in/rene-krajnc-a3400b190/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            {t('nav.linkedin')}
          </a>
        </nav>
      </header>
      <main>
        <section id="about" className={classes.section}>
          <h3>{t('about.title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('about.description') }} />
        </section>
        <section id="projects" className={classes.section}>
          <h3>{t('projects.title')}</h3>
          <ul>
            <li>{t('projects.one')}</li>
            <li>{t('projects.two')}</li>
            <li>{t('projects.three')}</li>
          </ul>
        </section>
        <section id="skills" className={classes.section}>
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
        <section id="contact" className={classes.section}>
          <h3>{t('contact.title')}</h3>
          <ContactForm />
        </section>
      </main>
      <footer className={classes.footer}>
        <p dangerouslySetInnerHTML={{ __html: t('footer', { year }) }} />
      </footer>
    </div>
  );
};

export default LandingPage;
