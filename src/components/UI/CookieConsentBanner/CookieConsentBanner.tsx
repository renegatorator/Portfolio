import { faCookieBite } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Trans, useTranslation } from 'next-i18next';

import { Routes } from '@/constants/routes';
import { useCookieConsent } from '@/context/CookieConsentContext';

import classes from './CookieConsentBanner.module.scss';

const CookieConsentBanner = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { mounted, isBannerOpen, accept } = useCookieConsent();

  if (!mounted || !isBannerOpen) {
    return null;
  }

  return (
    <div
      className={classes.wrapper}
      role="dialog"
      aria-modal="false"
      aria-label={t('cookies.banner.ariaLabel')}
    >
      <div className={classes.banner}>
        <div className={classes.iconWrap} aria-hidden="true">
          <FontAwesomeIcon icon={faCookieBite} className={classes.icon} />
        </div>
        <section className={classes.body}>
          <div className={classes.copy}>
            <Typography variant="h6" component="p" className={classes.title}>
              {t('cookies.banner.title')}
            </Typography>
            <Typography variant="body2" component="p" className={classes.description}>
              <Trans
                i18nKey="cookies.banner.body"
                components={{
                  privacyLink: (
                    <Link
                      href={`${Routes.PRIVACY}#cookies`}
                      locale={router.locale}
                      className={classes.inlineLink}
                    />
                  ),
                }}
              />
            </Typography>
          </div>

          <div className={classes.actions}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={accept}
              className={classes.button}
            >
              {t('cookies.banner.accept')}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
