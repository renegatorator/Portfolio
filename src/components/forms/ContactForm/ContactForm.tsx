import { Email, Message, Person } from '@mui/icons-material';
import { Alert, Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import classNames from 'classnames';
import Script from 'next/script';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

import { EMAIL_PATTERN } from '@/constants/formRules';
import { useContactForm } from '@/utils/hooks/useContactForm';
import { useRecaptchaV3 } from '@/utils/hooks/useRecaptchaV3';

import classes from './ContactForm.module.scss';

const CAPTCHA_ACTION = 'contact_form_submit';
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

  useEffect(() => {
    document.body.classList.add('show-recaptcha-badge');

    return () => {
      document.body.classList.remove('show-recaptcha-badge');
    };
  }, []);

  const { errors, handleSubmit, isSubmitting, onSubmit, register, submitError, submitSuccess } =
    useContactForm({
      verifyCaptcha,
      clearCaptchaError,
    });

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
          onReady={handleScriptLoad}
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
          {...register('email', { required: true, pattern: EMAIL_PATTERN })}
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

        {!!submitError && (
          <Alert severity="error" variant="outlined">
            {submitError}
          </Alert>
        )}

        {submitSuccess && (
          <Alert severity="success" variant="outlined">
            {t('contact.sendSuccess')}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting || !siteKey || !captchaReady}
        >
          {isSubmitting ? t('contact.sending') : t('contact.send')}
        </Button>
      </Box>
    </form>
  );
};

export default ContactForm;
