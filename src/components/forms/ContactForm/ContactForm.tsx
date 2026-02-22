import { Email, Message, Person } from '@mui/icons-material';
import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';

import classes from './ContactForm.module.scss';

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
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // TODO: handle form submission here (e.g., send to API)
    alert(JSON.stringify(data, null, 2));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classNames(classes.container, className, { [classes.fullWidth]: fullWidth })}
    >
      {!!title && <Typography variant="h3">{title}</Typography>}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label={t('name')}
          placeholder="John Doe"
          fullWidth
          error={!!errors.name}
          helperText={errors.name && `${t('name')} is required`}
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
          helperText={errors.email && `${t('contact.email')} is invalid`}
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
          helperText={errors.message && `${t('contact.message')} is required`}
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

        <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
          {t('contact.send')}
        </Button>
      </Box>
    </form>
  );
};

export default ContactForm;
