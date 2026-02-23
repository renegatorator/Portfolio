import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import ContactForm from '@/components/forms/ContactForm/ContactForm';
import Section from '@/components/UI/Section/Section';
import SocialMediaLinks from '@/components/UI/SocialMediaLinks';
import { Routes } from '@/constants/routes';

import PageLayout from '../PageLayout/PageLayout';
import classes from './ContactPage.module.scss';

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout route={Routes.CONTACT}>
      <section className={classes.header}>
        <Typography variant="h1" className={classes.title}>
          {t('contact.title')}
        </Typography>
        <Typography variant="body1" component="p" className={classes.description}>
          {t('contact.description')}
        </Typography>
      </section>

      <div className={classes.content}>
        <ContactForm className={classes.contactForm} title={t('contact.formTitle')} fullWidth />
        <Section alignment="center" className={classes.socialMedia}>
          <SocialMediaLinks />
        </Section>
      </div>
    </PageLayout>
  );
};

export default ContactPage;
