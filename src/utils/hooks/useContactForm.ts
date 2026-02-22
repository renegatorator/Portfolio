import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface UseContactFormOptions {
  verifyCaptcha: () => Promise<boolean>;
  clearCaptchaError: () => void;
}

export const useContactForm = ({ verifyCaptcha, clearCaptchaError }: UseContactFormOptions) => {
  const { i18n, t } = useTranslation();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);
    setSubmitSuccess(false);

    const isCaptchaValid = await verifyCaptcha();
    if (!isCaptchaValid) {
      return;
    }

    try {
      const response = await fetch('/api/contact/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          locale: i18n.resolvedLanguage || i18n.language || 'en',
        }),
      });

      const result = (await response.json()) as { success: boolean };

      if (!response.ok || !result.success) {
        setSubmitError(t('contact.sendError'));
        return;
      }

      reset();
      clearCaptchaError();
      setSubmitSuccess(true);
    } catch {
      setSubmitError(t('contact.sendError'));
    }
  };

  return {
    errors,
    handleSubmit,
    isSubmitting,
    onSubmit,
    register,
    submitError,
    submitSuccess,
  };
};
