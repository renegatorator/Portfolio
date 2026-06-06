import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import Reveal from '@/components/UI/Reveal/Reveal';
import { DEFAULT_LOCALE, Locale } from '@/constants/locales';
import { PRIVACY_LAST_UPDATED, PRIVACY_SECTION_ORDER } from '@/constants/privacy';
import { Routes } from '@/constants/routes';
import { formatLongDate } from '@/utils/format';

import PageLayout from '../PageLayout/PageLayout';
import classes from './PrivacyPage.module.scss';
import PrivacySection from './PrivacySection';
import PrivacyToc from './PrivacyToc';

const summaryCards = [
  { titleKey: 'privacy.summary.collect.title', bodyKey: 'privacy.summary.collect.body' },
  { titleKey: 'privacy.summary.share.title', bodyKey: 'privacy.summary.share.body' },
  { titleKey: 'privacy.summary.rights.title', bodyKey: 'privacy.summary.rights.body' },
];

const PrivacyPage = () => {
  const { i18n, t } = useTranslation();
  const currentLocale = (i18n.resolvedLanguage || i18n.language || DEFAULT_LOCALE) as Locale;
  const lastUpdated = formatLongDate(currentLocale, PRIVACY_LAST_UPDATED);

  return (
    <PageLayout route={Routes.PRIVACY}>
      <section className={classes.shell}>
        <div className={classes.orbs} aria-hidden="true" />
        <Reveal>
          <header className={classes.header}>
            <div className={classes.chip}>
              <FontAwesomeIcon icon={faShieldHalved} className={classes.chipIcon} />
              <Typography variant="caption" component="span">
                {t('privacy.chip')}
              </Typography>
            </div>
            <Typography variant="h1" className={classes.title}>
              {t('privacy.title')}
            </Typography>
            <Typography variant="body1" component="p" className={classes.lead}>
              {t('privacy.lead')}
            </Typography>
            <Typography variant="caption" component="p" className={classes.lastUpdated}>
              {t('privacy.lastUpdated', { date: lastUpdated })}
            </Typography>
          </header>
        </Reveal>

        <Reveal delayMs={100}>
          <div className={classes.summaryGrid}>
            {summaryCards.map((card) => (
              <div className={classes.summaryCard} key={card.titleKey}>
                <Typography variant="overline" component="span" className={classes.summaryEyebrow}>
                  {t(card.titleKey)}
                </Typography>
                <Typography variant="body2" component="p" className={classes.summaryBody}>
                  {t(card.bodyKey)}
                </Typography>
              </div>
            ))}
          </div>
        </Reveal>

        <div className={classes.body}>
          <PrivacyToc />

          <div className={classes.content}>
            {PRIVACY_SECTION_ORDER.map((id, index) => (
              <PrivacySection key={id} id={id} index={index} />
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PrivacyPage;
