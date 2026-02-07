import { Routes } from '@/constants/routes';
import PageLayout from '../PageLayout/PageLayout';
import SocialMediaLinks from '@/components/UI/SocialMediaLinks';
import classes from './ContactPage.module.scss';
import { useTranslation } from 'next-i18next';
import { Typography } from '@mui/material';
import Section from '@/components/UI/Section/Section';

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout route={Routes.CONTACT}>
      <Section
        alignment="center"
        gap={24}
        className={classes.header}
        background="transparent"
        noPadding
      >
        <Typography variant="h1" className={classes.title}>
          {t('contact.title')}
        </Typography>
        <Typography variant="body1" component="p" className={classes.description}>
          {t('contact.description')}
        </Typography>
      </Section>

      <div className={classes.content}>
        {/* TODO: uncomment this when the contact form is ready */}
        {/* <ContactForm className={classes.contactForm} title={t('contact.formTitle')} fullWidth /> */}

        <Section alignment="center" gap={48} className={classes.socialSection}>
          <SocialMediaLinks />
        </Section>
      </div>
    </PageLayout>
  );
};

export default ContactPage;
