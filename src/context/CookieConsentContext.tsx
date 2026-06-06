import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';

import { createLocalStorageStore } from '@/utils/createLocalStorageStore';

export const CookieConsentStates = {
  UNSET: 'unset',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
} as const;

export type CookieConsentState = (typeof CookieConsentStates)[keyof typeof CookieConsentStates];

export const COOKIE_CONSENT_STORAGE_KEY = 'cookie-consent-v1';

interface CookieConsentContextValue {
  consent: CookieConsentState;
  mounted: boolean;
  isBannerOpen: boolean;
  accept: () => void;
  reject: () => void;
  openPreferences: () => void;
  closeBanner: () => void;
}

const defaultValue: CookieConsentContextValue = {
  consent: CookieConsentStates.UNSET,
  mounted: false,
  isBannerOpen: false,
  accept: () => {},
  reject: () => {},
  openPreferences: () => {},
  closeBanner: () => {},
};

const CookieConsentContext = createContext<CookieConsentContextValue>(defaultValue);

const isCookieConsentState = (value: unknown): value is CookieConsentState =>
  value === CookieConsentStates.ACCEPTED ||
  value === CookieConsentStates.REJECTED ||
  value === CookieConsentStates.UNSET;

// Keeps the previously cached value when a cross-tab event carries an invalid/cleared value,
// so clearing the key elsewhere does not silently reset an explicit choice.
const consentStore = createLocalStorageStore<CookieConsentState>({
  key: COOKIE_CONSENT_STORAGE_KEY,
  serverValue: CookieConsentStates.UNSET,
  parse: (raw, fallback) => (isCookieConsentState(raw) ? raw : fallback),
});

interface CookieConsentProviderProps {
  children: ReactNode;
}

export const CookieConsentProvider = ({ children }: CookieConsentProviderProps) => {
  const consent = useSyncExternalStore(
    consentStore.subscribe,
    consentStore.getClientSnapshot,
    consentStore.getServerSnapshot,
  );
  const mounted = useSyncExternalStore(
    consentStore.subscribe,
    () => true,
    () => false,
  );
  const [manualOpen, setManualOpen] = useState(false);

  const isBannerOpen = mounted && (consent === CookieConsentStates.UNSET || manualOpen);

  const accept = useCallback(() => {
    consentStore.write(CookieConsentStates.ACCEPTED);
    setManualOpen(false);
  }, []);

  const reject = useCallback(() => {
    consentStore.write(CookieConsentStates.REJECTED);
    setManualOpen(false);
  }, []);

  const openPreferences = useCallback(() => {
    setManualOpen(true);
  }, []);

  const closeBanner = useCallback(() => {
    setManualOpen(false);
  }, []);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      mounted,
      isBannerOpen,
      accept,
      reject,
      openPreferences,
      closeBanner,
    }),
    [consent, mounted, isBannerOpen, accept, reject, openPreferences, closeBanner],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
};

export const useCookieConsent = () => useContext(CookieConsentContext);
