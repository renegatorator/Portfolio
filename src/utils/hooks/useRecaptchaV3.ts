import { useEffect, useState } from 'react';

import { ApiRoutes } from '@/constants/apiRoutes';
import { RecaptchaAction } from '@/constants/recaptcha';
import { ApiResult, SiteKeyResponse } from '@/types/api';
import { parseJsonResponse } from '@/utils/api';

interface UseRecaptchaV3Options {
  action: RecaptchaAction;
}

type CaptchaErrorType = 'load' | 'verify' | null;

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export const useRecaptchaV3 = ({ action }: UseRecaptchaV3Options) => {
  const [captchaErrorType, setCaptchaErrorType] = useState<CaptchaErrorType>(null);
  const [siteKey, setSiteKey] = useState<string | null>(null);
  const [captchaReady, setCaptchaReady] = useState(false);

  useEffect(() => {
    const fetchSiteKey = async () => {
      try {
        const response = await fetch(ApiRoutes.RECAPTCHA_SITE_KEY);
        if (!response.ok) {
          throw new Error('Failed to load reCAPTCHA site key');
        }

        const data = await parseJsonResponse<SiteKeyResponse>(response);
        if (!data?.siteKey) {
          throw new Error('Missing reCAPTCHA site key');
        }
        setSiteKey(data.siteKey);
      } catch {
        setCaptchaErrorType('load');
      }
    };

    void fetchSiteKey();
  }, []);

  useEffect(() => {
    if (!siteKey) {
      return;
    }

    if (window.grecaptcha) {
      setCaptchaReady(true);
      setCaptchaErrorType(null);
    }
  }, [siteKey]);

  const handleScriptLoad = () => {
    setCaptchaReady(true);
  };

  const handleScriptError = () => {
    setCaptchaReady(false);
    setCaptchaErrorType('load');
  };

  const clearCaptchaError = () => {
    setCaptchaErrorType(null);
  };

  const verifyCaptcha = async (): Promise<boolean> => {
    if (!siteKey || !captchaReady || !window.grecaptcha) {
      setCaptchaErrorType('load');
      return false;
    }

    try {
      await new Promise<void>((resolve) => {
        window.grecaptcha?.ready(resolve);
      });

      const token = await window.grecaptcha.execute(siteKey, { action });

      if (!token) {
        setCaptchaErrorType('verify');
        return false;
      }

      const verificationResponse = await fetch(ApiRoutes.RECAPTCHA_VERIFY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, action }),
      });

      if (!verificationResponse.ok) {
        setCaptchaErrorType('verify');
        return false;
      }

      const verificationData = await parseJsonResponse<ApiResult>(verificationResponse);

      if (!verificationData?.success) {
        setCaptchaErrorType('verify');
        return false;
      }

      return true;
    } catch {
      setCaptchaErrorType('verify');
      return false;
    }
  };

  return {
    captchaErrorType,
    captchaReady,
    siteKey,
    handleScriptLoad,
    handleScriptError,
    clearCaptchaError,
    verifyCaptcha,
  };
};
