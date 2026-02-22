import { Email, Message, Person } from '@mui/icons-material';
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import classNames from 'classnames';
import Script from 'next/script';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';

import { useRecaptchaV3 } from '@/utils/hooks/useRecaptchaV3';

import classes from './ContactForm.module.scss';

const CAPTCHA_ACTION = 'contact_form_submit';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormProps {
  title?: string;
  fullWidth?: boolean;
  className?: string;
}

const ContactForm = ({ title, fullWidth = false, className }: ContactFormProps) => {
  const { t } = useTranslation();
  const {
    captchaErrorType,
    captchaReady,
    clearCaptchaError,
    handleScriptError,
    handleScriptLoad,
    siteKey,
    verifyCaptcha,
  } = useRecaptchaV3({
    action: CAPTCHA_ACTION,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const isCaptchaValid = await verifyCaptcha();
    if (!isCaptchaValid) {
      return;
    }

    // TODO: handle form submission here (e.g., send to API)
    alert(JSON.stringify(data, null, 2));
    reset();
    clearCaptchaError();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classNames(classes.container, className, { [classes.fullWidth]: fullWidth })}
    >
      {siteKey && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
          strategy="afterInteractive"
          onLoad={handleScriptLoad}
          onError={handleScriptError}
        />
      )}

      {!!title && <Typography variant="h3">{title}</Typography>}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label={t('name')}
          placeholder="John Doe"
          fullWidth
          error={!!errors.name}
          helperText={errors.name ? t('contact.validation.nameRequired') : ''}
          slotProps={{
            input: {
              className: classes.input,
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            },
          }}
          {...register('name', { required: true })}
        />

        <TextField
          label={t('contact.email')}
          type="email"
          placeholder="john.doe@example.com"
          fullWidth
          error={!!errors.email}
          helperText={
            errors.email?.type === 'required'
              ? t('contact.validation.emailRequired')
              : errors.email?.type === 'pattern'
                ? t('contact.validation.emailInvalid')
                : ''
          }
          slotProps={{
            input: {
              className: classes.input,
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            },
          }}
          {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
        />

        <TextField
          label={t('contact.message')}
          placeholder={t('contact.messagePlaceholder')}
          multiline
          rows={4}
          fullWidth
          error={!!errors.message}
          helperText={errors.message ? t('contact.validation.messageRequired') : ''}
          slotProps={{
            input: {
              className: classes.textarea,
              startAdornment: (
                <InputAdornment position="start" className={classes.messageIcon}>
                  <Message />
                </InputAdornment>
              ),
            },
          }}
          {...register('message', { required: true })}
        />

        {!!captchaErrorType && (
          <Typography color="error" variant="body2">
            {captchaErrorType === 'load'
              ? t('contact.captchaLoadError')
              : t('contact.captchaVerifyError')}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting || !siteKey || !captchaReady}
        >
          {t('contact.send')}
        </Button>
      </Box>
    </form>
  );
};

export default ContactForm;
