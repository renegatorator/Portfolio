import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';
import { Trans, useTranslation } from 'next-i18next';

import Reveal from '@/components/UI/Reveal/Reveal';
import { DEFAULT_LOCALE, Locale } from '@/constants/locales';
import { PRIVACY_LAST_UPDATED, PRIVACY_SECTION_ORDER, PrivacySectionId } from '@/constants/privacy';
import { Routes } from '@/constants/routes';

import PageLayout from '../PageLayout/PageLayout';
import classes from './PrivacyPage.module.scss';

const formatLastUpdated = (locale: string) => {
  try {
    const [y, m, d] = PRIVACY_LAST_UPDATED.split('-').map(Number);
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(y, m - 1, d));
  } catch {
    return PRIVACY_LAST_UPDATED;
  }
};

const SECTIONS_WITH_BULLETS: ReadonlySet<PrivacySectionId> = new Set([
  'data-we-collect',
  'purposes-and-legal-bases',
  'cookies',
  'third-parties',
  'retention',
  'your-rights',
  'security',
]);

const PrivacyPage = () => {
  const { i18n, t } = useTranslation();
  const currentLocale = (i18n.resolvedLanguage || i18n.language || DEFAULT_LOCALE) as Locale;
  const lastUpdated = formatLastUpdated(currentLocale);

  const summaryCards = [
    {
      titleKey: 'privacy.summary.collect.title',
      bodyKey: 'privacy.summary.collect.body',
    },
    {
      titleKey: 'privacy.summary.share.title',
      bodyKey: 'privacy.summary.share.body',
    },
    {
      titleKey: 'privacy.summary.rights.title',
      bodyKey: 'privacy.summary.rights.body',
    },
  ];

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
          <aside className={classes.toc} aria-label={t('privacy.tocAriaLabel')}>
            <Typography variant="overline" component="p" className={classes.tocTitle}>
              {t('privacy.tocTitle')}
            </Typography>
            <nav>
              <ol className={classes.tocList}>
                {PRIVACY_SECTION_ORDER.map((id, index) => (
                  <li key={id}>
                    <a href={`#${id}`} className={classes.tocLink}>
                      <span className={classes.tocIndex}>{String(index + 1).padStart(2, '0')}</span>
                      <span>{t(`privacy.sections.${id}.title`)}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className={classes.content}>
            {PRIVACY_SECTION_ORDER.map((id, index) => {
              const hasBullets = SECTIONS_WITH_BULLETS.has(id);
              const bullets = hasBullets
                ? (t(`privacy.sections.${id}.bullets`, { returnObjects: true }) as unknown)
                : null;
              const bulletList = Array.isArray(bullets) ? (bullets as string[]) : [];

              return (
                <Reveal key={id} delayMs={index * 40}>
                  <article id={id} className={classes.section}>
                    <header className={classes.sectionHeader}>
                      <span className={classes.sectionIndex}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <Typography variant="h2" component="h2" className={classes.sectionTitle}>
                        {t(`privacy.sections.${id}.title`)}
                      </Typography>
                    </header>
                    <Typography variant="body1" component="p" className={classes.sectionBody}>
                      <Trans
                        i18nKey={`privacy.sections.${id}.body`}
                        components={{
                          strong: <strong />,
                          em: <em />,
                          mailLink: (
                            <a
                              className={classes.inlineLink}
                              href={`mailto:${t('privacy.contactEmail')}`}
                            />
                          ),
                          dpaLink: (
                            <a
                              className={classes.inlineLink}
                              href="https://www.ip-rs.si/"
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          ),
                          resendLink: (
                            <a
                              className={classes.inlineLink}
                              href="https://resend.com/legal/privacy-policy"
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          ),
                          googleLink: (
                            <a
                              className={classes.inlineLink}
                              href="https://policies.google.com/privacy"
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          ),
                          vercelLink: (
                            <a
                              className={classes.inlineLink}
                              href="https://vercel.com/legal/privacy-policy"
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          ),
                          contactLink: <a className={classes.inlineLink} href={Routes.CONTACT} />,
                        }}
                      />
                    </Typography>

                    {bulletList.length > 0 && (
                      <ul className={classes.bulletList}>
                        {bulletList.map((bullet) => (
                          <li key={bullet} className={classes.bullet}>
                            <Typography variant="body2" component="span">
                              {bullet}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PrivacyPage;
