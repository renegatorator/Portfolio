import { ExpandMore } from '@mui/icons-material';
import { FormControl, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { DE, GB, SI } from 'country-flag-icons/react/3x2';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Locale, LOCALE_LABELS, SUPPORTED_LOCALES } from '@/constants/locales';

import styles from './LanguageSwitcher.module.scss';

const FLAG_COMPONENTS: Record<Locale, typeof GB> = { en: GB, sl: SI, de: DE };

const languages = SUPPORTED_LOCALES.map((code) => ({
  code,
  label: LOCALE_LABELS[code],
  Flag: FLAG_COMPONENTS[code],
}));

const LanguageSwitcher = () => {
  const router = useRouter();
  const { i18n } = useTranslation();

  const handleChange = (event: SelectChangeEvent) => {
    const locale = event.target.value;
    if (locale === i18n.language) {
      return;
    }
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <>
      <div className={styles.globalStyles}></div>
      <FormControl size="small" className={styles.languageSwitcher}>
        <Select
          value={i18n.language}
          onChange={handleChange}
          displayEmpty
          IconComponent={ExpandMore}
          className={styles.select}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
          }}
        >
          {languages.map((lang) => (
            <MenuItem key={lang.code} value={lang.code} className={styles.menuItem}>
              <lang.Flag className={styles.flag} />
              <Typography variant="body2">{lang.label}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default LanguageSwitcher;
