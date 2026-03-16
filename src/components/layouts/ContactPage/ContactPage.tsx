import { Typography } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import ContactForm from '@/components/forms/ContactForm/ContactForm';
import Reveal from '@/components/UI/Reveal/Reveal';
import SocialMediaLinks from '@/components/UI/SocialMediaLinks';
import { reneKrajnc } from '@/constants/rene';
import { Routes } from '@/constants/routes';

import PageLayout from '../PageLayout/PageLayout';
import classes from './ContactPage.module.scss';

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout route={Routes.CONTACT}>
      <section className={classes.contactShell}>
        <Reveal>
          <header className={classes.header}>
            <span className={classes.availableBadge}>
              <span className={classes.availableDot} />
              {t('availability')}
            </span>
            <Typography variant="h1" className={classes.title}>
              {t('contact.title')}
            </Typography>
            <Typography variant="body1" component="p" className={classes.description}>
              {t('contact.description')}
            </Typography>
          </header>
        </Reveal>

        <div className={classes.content}>
          <Reveal direction="left" delayMs={120} className={classes.formReveal}>
            <ContactForm className={classes.contactForm} title={t('contact.formTitle')} fullWidth />
          </Reveal>

          <Reveal direction="right" delayMs={180} className={classes.connectReveal}>
            <aside className={classes.connectCard}>
              <div className={classes.profileBlock}>
                <Image
                  src="/images/rene-profile.jpg"
                  alt={reneKrajnc}
                  width={132}
                  height={132}
                  className={classes.profileImage}
                />
                <div className={classes.profileCopy}>
                  <Typography variant="h4" component="h2">
                    {t('contact.socialMedia.title')}
                  </Typography>
                  <Typography variant="body1" component="p">
                    {t('contact.socialMedia.description')}
                  </Typography>
                </div>
              </div>

              <SocialMediaLinks compact />
            </aside>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
};

export default ContactPage;
