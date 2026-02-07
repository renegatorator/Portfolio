import { Routes } from '@/constants/routes';
import PageLayout from '../PageLayout/PageLayout';
import SocialMediaLinks from '@/components/UI/SocialMediaLinks';
import classes from './ContactPage.module.scss';
import { useTranslation } from 'next-i18next';
import { Typography } from '@mui/material';

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout route={Routes.CONTACT}>
      <section className={classes.header}>
        <Typography variant="h1" className={classes.title}>
          {t('contact.title')}
        </Typography>

        <div className={classes.description}>
          <Typography variant="body1" component="p">
            {t('contact.description')}
          </Typography>
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
