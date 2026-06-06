// Zero-pad a 1-based index to two digits (1 -> "01", 12 -> "12"). Used for the numbered
// section/step/highlight markers across the projects and privacy pages.
export const formatIndex = (n: number): string => String(n).padStart(2, '0');

// Format an ISO `YYYY-MM-DD` date as a long, locale-aware string. Falls back to the raw
// ISO string if the locale or date is unusable.
export const formatLongDate = (locale: string, isoDate: string): string => {
  try {
    const [y, m, d] = isoDate.split('-').map(Number);
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(y, m - 1, d));
  } catch {
    return isoDate;
  }
};
