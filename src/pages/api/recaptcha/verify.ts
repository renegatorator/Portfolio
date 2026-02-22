import type { NextApiRequest, NextApiResponse } from 'next';

type VerifyResponse = {
  success: boolean;
  message?: string;
};

type RecaptchaVerifyResult = {
  success: boolean;
  score?: number;
  action?: string;
  'error-codes'?: string[];
};

const DEFAULT_MIN_SCORE = 0.5;

const getMinScore = () => {
  const rawMinScore = process.env.RECAPTCHA_MIN_SCORE;

  if (!rawMinScore) {
    return DEFAULT_MIN_SCORE;
  }

  const parsedMinScore = Number(rawMinScore);

  if (Number.isNaN(parsedMinScore) || parsedMinScore < 0 || parsedMinScore > 1) {
    return DEFAULT_MIN_SCORE;
  }

  return parsedMinScore;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<VerifyResponse>) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ success: false, message: 'Method not allowed.' });
    return;
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const token = typeof req.body?.token === 'string' ? req.body.token : '';
  const action = typeof req.body?.action === 'string' ? req.body.action : '';
  const minScore = getMinScore();

  if (!secret) {
    res.status(500).json({ success: false, message: 'reCAPTCHA secret key is not configured.' });
    return;
  }

  if (!token) {
    res.status(400).json({ success: false, message: 'Missing CAPTCHA token.' });
    return;
  }

  if (!action) {
    res.status(400).json({ success: false, message: 'Missing CAPTCHA action.' });
    return;
  }

  const params = new URLSearchParams({
    secret,
    response: token,
  });

  try {
    const verifyResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    if (!verifyResponse.ok) {
      res.status(502).json({ success: false, message: 'Failed to verify CAPTCHA with Google.' });
      return;
    }

    const verifyData = (await verifyResponse.json()) as RecaptchaVerifyResult;

    if (!verifyData.success) {
      res.status(401).json({ success: false, message: 'Invalid CAPTCHA token.' });
      return;
    }

    if (verifyData.action !== action) {
      res.status(401).json({ success: false, message: 'Invalid CAPTCHA action.' });
      return;
    }

    if (typeof verifyData.score !== 'number' || verifyData.score < minScore) {
      res.status(401).json({ success: false, message: 'CAPTCHA score below required threshold.' });
      return;
    }

    res.status(200).json({ success: true });
  } catch {
    res.status(500).json({ success: false, message: 'Unexpected CAPTCHA verification error.' });
  }
};

export default handler;
