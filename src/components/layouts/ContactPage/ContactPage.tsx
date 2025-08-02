import { Routes } from '@/constants/routes';
import PageLayout from '../PageLayout/PageLayout';
import ContactForm from '@/components/forms/ContactForm/ContactForm';
import SocialMediaLinks from '@/components/UI/SocialMediaLinks';
import classes from './ContactPage.module.scss';
import { useTranslation } from 'next-i18next';

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout route={Routes.CONTACT}>
      <div className={classes.contactContainer}>
        <h1 className={classes.title}>{t('contact.title')}</h1>

        <div className={classes.description}>
          <p>{t('contact.description')}</p>
        </div>

        <div className={classes.content}>
          <div className={classes.formSection}>
            <h2>{t('contact.formTitle')}</h2>
            <ContactForm />
          </div>

          <div className={classes.socialSection}>
            <SocialMediaLinks />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactPage;
