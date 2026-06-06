import { Typography } from '@mui/material';
import { Trans, useTranslation } from 'next-i18next';

import Reveal from '@/components/UI/Reveal/Reveal';
import { PrivacySectionId, PrivacySectionIds } from '@/constants/privacy';
import { Routes } from '@/constants/routes';
import { formatIndex } from '@/utils/format';
import { getTranslationArray } from '@/utils/translations';

import classes from './PrivacyPage.module.scss';

const SECTIONS_WITH_BULLETS: ReadonlySet<PrivacySectionId> = new Set([
  PrivacySectionIds.DATA_WE_COLLECT,
  PrivacySectionIds.PURPOSES_AND_LEGAL_BASES,
  PrivacySectionIds.COOKIES,
  PrivacySectionIds.THIRD_PARTIES,
  PrivacySectionIds.RETENTION,
  PrivacySectionIds.YOUR_RIGHTS,
  PrivacySectionIds.SECURITY,
]);

interface PrivacySectionProps {
  id: PrivacySectionId;
  index: number;
}

const PrivacySection = ({ id, index }: PrivacySectionProps) => {
  const { t } = useTranslation();

  const bulletList = SECTIONS_WITH_BULLETS.has(id)
    ? getTranslationArray<string>(t(`privacy.sections.${id}.bullets`, { returnObjects: true }))
    : [];

  return (
    <Reveal delayMs={index * 40}>
      <article id={id} className={classes.section}>
        <header className={classes.sectionHeader}>
          <span className={classes.sectionIndex}>{formatIndex(index + 1)}</span>
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
                <a className={classes.inlineLink} href={`mailto:${t('privacy.contactEmail')}`} />
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
};

export default PrivacySection;
