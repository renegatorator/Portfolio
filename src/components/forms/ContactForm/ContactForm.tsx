import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import classes from './ContactForm.module.scss';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const { t } = useTranslation('common');
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
    <form className={classes.contactForm} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder={t('contact.namePlaceholder')}
        {...register('name', { required: true })}
      />
      {errors.name && (
        <span style={{ color: 'red' }}>{t('contact.namePlaceholder')} is required</span>
      )}
      <input
        type="email"
        placeholder={t('contact.emailPlaceholder')}
        {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
      />
      {errors.email && (
        <span style={{ color: 'red' }}>{t('contact.emailPlaceholder')} is invalid</span>
      )}
      <textarea
        placeholder={t('contact.messagePlaceholder')}
        {...register('message', { required: true })}
      />
      {errors.message && (
        <span style={{ color: 'red' }}>{t('contact.messagePlaceholder')} is required</span>
      )}
      <button type="submit" disabled={isSubmitting}>
        {t('contact.send')}
      </button>
    </form>
  );
};

export default ContactForm;
