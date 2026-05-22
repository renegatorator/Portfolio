export const PRIVACY_LAST_UPDATED = '2026-05-22';

export const PrivacySectionIds = {
  INTRO: 'intro',
  CONTROLLER: 'controller',
  DATA_WE_COLLECT: 'data-we-collect',
  PURPOSES_AND_LEGAL_BASES: 'purposes-and-legal-bases',
  COOKIES: 'cookies',
  THIRD_PARTIES: 'third-parties',
  INTERNATIONAL_TRANSFERS: 'international-transfers',
  RETENTION: 'retention',
  YOUR_RIGHTS: 'your-rights',
  SECURITY: 'security',
  CHILDREN: 'children',
  CHANGES: 'changes',
  CONTACT: 'contact',
} as const;

export type PrivacySectionId = (typeof PrivacySectionIds)[keyof typeof PrivacySectionIds];

export const PRIVACY_SECTION_ORDER: readonly PrivacySectionId[] = [
  PrivacySectionIds.INTRO,
  PrivacySectionIds.CONTROLLER,
  PrivacySectionIds.DATA_WE_COLLECT,
  PrivacySectionIds.PURPOSES_AND_LEGAL_BASES,
  PrivacySectionIds.COOKIES,
  PrivacySectionIds.THIRD_PARTIES,
  PrivacySectionIds.INTERNATIONAL_TRANSFERS,
  PrivacySectionIds.RETENTION,
  PrivacySectionIds.YOUR_RIGHTS,
  PrivacySectionIds.SECURITY,
  PrivacySectionIds.CHILDREN,
  PrivacySectionIds.CHANGES,
  PrivacySectionIds.CONTACT,
];
