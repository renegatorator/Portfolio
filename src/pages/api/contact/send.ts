import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

import { EmailAddresses } from '@/constants/rene';
import ContactConfirmationEmail from '@/emails/ContactConfirmationEmail';
import ContactInquiryEmail from '@/emails/ContactInquiryEmail';
import {
  getEmailAssetBaseUrl,
  getEmailConfirmationCopy,
  getFromAddress,
  getLocale,
  isValidEmail,
} from '@/utils/contactEmail';

type SendContactResponse = {
  success: boolean;
  message?: string;
};

type ContactRequestBody = {
  name?: string;
  email?: string;
  message?: string;
  locale?: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<SendContactResponse>) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ success: false, message: 'Method not allowed.' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    res.status(500).json({ success: false, message: 'Missing RESEND_API_KEY.' });
    return;
  }

  const { name, email, locale, message } = req.body as ContactRequestBody;

  const safeName = typeof name === 'string' ? name.trim() : '';
  const safeEmail = typeof email === 'string' ? email.trim() : '';
  const safeMessage = typeof message === 'string' ? message.trim() : '';

  if (!safeName || !safeEmail || !safeMessage) {
    res.status(400).json({ success: false, message: 'Missing required fields.' });
    return;
  }

  if (!isValidEmail(safeEmail)) {
    res.status(400).json({ success: false, message: 'Invalid email format.' });
    return;
  }

  const resolvedLocale = getLocale(locale);
  const confirmationCopy = await getEmailConfirmationCopy(resolvedLocale);
  const resend = new Resend(apiKey);

  const logoUrl = `${getEmailAssetBaseUrl()}/images/logo/logo-full-email.png`;

  const from = getFromAddress();

  try {
    await resend.emails.send({
      from,
      to: [EmailAddresses.INFO],
      subject: `New contact form message from ${safeName}`,
      replyTo: safeEmail,
      react: ContactInquiryEmail({
        logoUrl,
        name: safeName,
        email: safeEmail,
        message: safeMessage,
      }),
    });

    await resend.emails.send({
      from,
      to: [safeEmail],
      subject: confirmationCopy.subject,
      replyTo: EmailAddresses.INFO,
      react: ContactConfirmationEmail({
        body: confirmationCopy.body,
        greeting: confirmationCopy.greeting,
        heading: confirmationCopy.heading,
        logoUrl,
        name: safeName,
        outro: confirmationCopy.outro,
        preview: confirmationCopy.preview,
        signature: confirmationCopy.signature,
      }),
    });

    res.status(200).json({ success: true });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to send emails.' });
  }
};

export default handler;
