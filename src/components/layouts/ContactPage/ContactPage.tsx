import { Routes } from '@/constants/routes';
import PageLayout from '../PageLayout/PageLayout';
import SocialMediaLinks from '@/components/UI/SocialMediaLinks';
import classes from './ContactPage.module.scss';
import { useTranslation } from 'next-i18next';

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout route={Routes.CONTACT}>
      <section className={classes.header}>
        <h1 className={classes.title}>{t('contact.title')}</h1>

        <div className={classes.description}>
          <p>{t('contact.description')}</p>
        </div>
      </section>

      <div className={classes.content}>
        {/* TODO: uncomment this when the contact form is ready */}
        {/* <ContactForm className={classes.contactForm} title={t('contact.formTitle')} fullWidth /> */}

        <div className={classes.socialSection}>
          <SocialMediaLinks />
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactPage;
