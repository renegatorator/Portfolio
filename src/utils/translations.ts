// Typed accessors for i18next `returnObjects` lookups. i18next types
// `t(key, { returnObjects: true })` as `string`, so the unavoidable cast is centralized
// here instead of being repeated (and drifting) across components.

export const getTranslationArray = <T>(value: unknown): T[] =>
  Array.isArray(value) ? (value as T[]) : [];

export const getTranslationObject = <T>(value: unknown): T => value as T;
