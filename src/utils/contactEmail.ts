import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { EMAIL_PATTERN } from '@/constants/formRules';
import { DEFAULT_LOCALE, Locale, SUPPORTED_LOCALES } from '@/constants/locales';
import { EmailAddresses } from '@/constants/rene';
import { SITE_URL } from '@/constants/site';

export type EmailConfirmationCopy = {
  subject: string;
  preview: string;
  heading: string;
  greeting: string;
  body: string;
  outro: string;
  signature: string;
};

type EmailLocaleSchema = {
  contact?: {
    emailConfirmation?: Partial<EmailConfirmationCopy>;
  };
};

const FALLBACK_EMAIL_CONFIRMATION_COPY: EmailConfirmationCopy = {
  subject: 'Rene Krajnc - Message received',
  preview: 'Thanks for your message — I will get back to you soon.',
  heading: 'Thank you for reaching out',
  greeting: 'Hi {{name}},',
  body: 'Thank you for contacting me through my website. I have received your message and I will get back to you as soon as possible.',
  outro: 'Best regards,',
  signature: 'Rene Krajnc',
};

const mergeEmailConfirmationCopy = (
  source: Partial<EmailConfirmationCopy> | undefined,
  fallback: EmailConfirmationCopy,
): EmailConfirmationCopy => ({
  subject: source?.subject || fallback.subject,
  preview: source?.preview || fallback.preview,
  heading: source?.heading || fallback.heading,
  greeting: source?.greeting || fallback.greeting,
  body: source?.body || fallback.body,
  outro: source?.outro || fallback.outro,
  signature: source?.signature || fallback.signature,
});

const readEmailLocaleSchema = async (locale: Locale): Promise<EmailLocaleSchema | null> => {
  try {
    const localeFilePath = path.join(process.cwd(), 'public', 'locales', locale, 'email.json');
    const localeFile = await readFile(localeFilePath, 'utf-8');
    return JSON.parse(localeFile) as EmailLocaleSchema;
  } catch {
    return null;
  }
};

const getDefaultEmailConfirmationCopy = async (): Promise<EmailConfirmationCopy> => {
  const enLocale = await readEmailLocaleSchema('en');
  return mergeEmailConfirmationCopy(
    enLocale?.contact?.emailConfirmation,
    FALLBACK_EMAIL_CONFIRMATION_COPY,
  );
};

export const getLocale = (locale?: string): Locale => {
  if (!locale) {
    return DEFAULT_LOCALE;
  }

  const normalized = locale.toLowerCase().split('-')[0];

  if ((SUPPORTED_LOCALES as readonly string[]).includes(normalized)) {
    return normalized as Locale;
  }

  return DEFAULT_LOCALE;
};

export const isValidEmail = (email: string) => EMAIL_PATTERN.test(email);

export const getEmailAssetBaseUrl = () => {
  const configuredBaseUrl = process.env.EMAIL_ASSET_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL;

  if (!configuredBaseUrl) {
    return SITE_URL;
  }

  const normalizedUrl = configuredBaseUrl.trim().replace(/\/$/, '');

  if (/localhost|127\.0\.0\.1/i.test(normalizedUrl)) {
    return SITE_URL;
  }

  return normalizedUrl;
};

export const getFromAddress = () => {
  const fallbackName = process.env.RESEND_FROM_NAME || 'Rene Info';
  const configuredFrom = process.env.RESEND_FROM_EMAIL?.trim();

  if (!configuredFrom) {
    return `${fallbackName} <${EmailAddresses.INFO}>`;
  }

  if (configuredFrom.includes('<') && configuredFrom.includes('>')) {
    return configuredFrom;
  }

  return `${fallbackName} <${configuredFrom}>`;
};

export const getEmailConfirmationCopy = async (locale: Locale): Promise<EmailConfirmationCopy> => {
  const defaultCopy = await getDefaultEmailConfirmationCopy();
  const localizedLocale = await readEmailLocaleSchema(locale);

  return mergeEmailConfirmationCopy(localizedLocale?.contact?.emailConfirmation, defaultCopy);
};
