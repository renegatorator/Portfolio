import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';

export const CookieConsentStates = {
  UNSET: 'unset',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
} as const;

export type CookieConsentState =
  (typeof CookieConsentStates)[keyof typeof CookieConsentStates];

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

type Listener = () => void;
const listeners = new Set<Listener>();

const readStoredConsent = (): CookieConsentState => {
  if (typeof window === 'undefined') {
    return CookieConsentStates.UNSET;
  }
  try {
    const stored = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    return isCookieConsentState(stored) ? stored : CookieConsentStates.UNSET;
  } catch {
    return CookieConsentStates.UNSET;
  }
};

const getClientSnapshot = (): CookieConsentState => readStoredConsent();
const getServerSnapshot = (): CookieConsentState => CookieConsentStates.UNSET;

const subscribe = (listener: Listener) => {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== COOKIE_CONSENT_STORAGE_KEY) return;
    listener();
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
};

const writeStoredConsent = (consent: CookieConsentState) => {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, consent);
  } catch {
    // Storage writes can fail (private mode, quota, sandboxed iframes);
    // listeners still fire so in-memory state stays in sync this session.
  }
  listeners.forEach((listener) => listener());
};

interface CookieConsentProviderProps {
  children: ReactNode;
}

export const CookieConsentProvider = ({ children }: CookieConsentProviderProps) => {
  const consent = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [manualOpen, setManualOpen] = useState(false);

  const isBannerOpen = mounted && (consent === CookieConsentStates.UNSET || manualOpen);

  const accept = useCallback(() => {
    writeStoredConsent(CookieConsentStates.ACCEPTED);
    setManualOpen(false);
  }, []);

  const reject = useCallback(() => {
    writeStoredConsent(CookieConsentStates.REJECTED);
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

  return (
    <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => useContext(CookieConsentContext);
