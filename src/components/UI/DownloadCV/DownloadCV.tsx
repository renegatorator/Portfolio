import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Button, SxProps, Theme } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { DEFAULT_LOCALE, Locale, SUPPORTED_LOCALES } from '@/constants/locales';

import classes from './DownloadCV.module.scss';

interface DownloadCVProps {
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  sx?: SxProps<Theme>;
}

const CV_MAP: Record<Locale, string> = {
  en: '/cv/Rene_Krajnc_EN_2026.pdf',
  sl: '/cv/Rene_Krajnc_EN_2026.pdf',
  de: '/cv/Rene_Krajnc_DE_2026.pdf',
};

const isLocale = (value: string | undefined): value is Locale =>
  (SUPPORTED_LOCALES as readonly string[]).includes(value ?? '');

const DownloadCV = ({ variant = 'outlined', size = 'medium', className, sx }: DownloadCVProps) => {
  const { t } = useTranslation();
  const { locale } = useRouter();

  const cvPath = CV_MAP[isLocale(locale) ? locale : DEFAULT_LOCALE];

  return (
    <Button
      variant={variant}
      size={size}
      startIcon={<FileDownloadOutlinedIcon />}
      component="a"
      href={cvPath}
      download
      className={`${classes.btn}${className ? ` ${className}` : ''}`}
      sx={sx}
    >
      {t('workExperience.downloadCv')}
    </Button>
  );
};

export default DownloadCV;
