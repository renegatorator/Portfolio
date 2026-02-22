import type { NextApiRequest, NextApiResponse } from 'next';

type SiteKeyResponse = {
  siteKey?: string;
  message?: string;
};

const handler = (_req: NextApiRequest, res: NextApiResponse<SiteKeyResponse>) => {
  const siteKey = process.env.RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    res.status(500).json({ message: 'reCAPTCHA site key is not configured.' });
    return;
  }

  res.status(200).json({ siteKey });
};

export default handler;
