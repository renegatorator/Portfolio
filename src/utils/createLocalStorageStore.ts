type Listener = () => void;

interface LocalStorageStoreConfig<T> {
  key: string;
  // Value returned during SSR and used as the fallback when reads fail.
  serverValue: T;
  // Validate/normalize a raw localStorage value. `fallback` is the previously cached value
  // (or `serverValue`) so callers can choose to keep the prior value on invalid input.
  parse: (raw: string | null, fallback: T) => T;
  // Serialize a value before persisting. Defaults to `String`.
  serialize?: (value: T) => string;
  // Side effect run whenever the value changes via write or a cross-tab storage event
  // (e.g. syncing an attribute on the document element). Not run on initial read.
  onChange?: (value: T) => void;
}

export interface LocalStorageStore<T> {
  subscribe: (listener: Listener) => () => void;
  getClientSnapshot: () => T;
  getServerSnapshot: () => T;
  read: () => T;
  write: (value: T) => void;
}

// Builds a `useSyncExternalStore`-compatible store backed by localStorage with cross-tab
// synchronization. Shared by ThemeContext and CookieConsentContext, which previously each
// reimplemented this listener/storage-event/persistence pattern.
export const createLocalStorageStore = <T>(
  config: LocalStorageStoreConfig<T>,
): LocalStorageStore<T> => {
  const { key, serverValue, parse, serialize = String, onChange } = config;

  const listeners = new Set<Listener>();
  let cache: T | null = null;

  const read = (): T => {
    if (cache !== null) return cache;
    if (typeof window === 'undefined') return serverValue;
    try {
      cache = parse(window.localStorage.getItem(key), serverValue);
    } catch {
      cache = serverValue;
    }
    return cache;
  };

  const notify = () => listeners.forEach((listener) => listener());

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key) return;
      cache = parse(event.newValue, cache ?? serverValue);
      onChange?.(cache);
      listener();
    };
    window.addEventListener('storage', onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener('storage', onStorage);
    };
  };

  const write = (value: T) => {
    cache = value;
    try {
      window.localStorage.setItem(key, serialize(value));
    } catch {
      // Storage writes can fail (private mode, quota, sandboxed iframes); the in-memory
      // cache remains the authoritative value for the current session.
    }
    onChange?.(value);
    notify();
  };

  return {
    subscribe,
    getClientSnapshot: read,
    getServerSnapshot: () => serverValue,
    read,
    write,
  };
};
