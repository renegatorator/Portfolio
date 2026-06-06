import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import { PRIVACY_SECTION_ORDER } from '@/constants/privacy';
import { formatIndex } from '@/utils/format';

import classes from './PrivacyPage.module.scss';

const PrivacyToc = () => {
  const { t } = useTranslation();

  return (
    <aside className={classes.toc} aria-label={t('privacy.tocAriaLabel')}>
      <Typography variant="overline" component="p" className={classes.tocTitle}>
        {t('privacy.tocTitle')}
      </Typography>
      <nav>
        <ol className={classes.tocList}>
          {PRIVACY_SECTION_ORDER.map((id, index) => (
            <li key={id}>
              <a href={`#${id}`} className={classes.tocLink}>
                <span className={classes.tocIndex}>{formatIndex(index + 1)}</span>
                <span>{t(`privacy.sections.${id}.title`)}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
};

export default PrivacyToc;
