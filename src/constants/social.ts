// Canonical social profile URLs. Single source consumed by both the visible social links
// UI and the schema.org `sameAs` signals in PageHead, so the two can never drift apart.
export const SocialUrls = {
  GITHUB: 'https://github.com/renegatorator',
  LINKEDIN: 'https://linkedin.com/in/rene-krajnc-a3400b190',
  FACEBOOK: 'https://www.facebook.com/rene.krajnc',
} as const;

export const SOCIAL_PROFILE_URLS: readonly string[] = [
  SocialUrls.GITHUB,
  SocialUrls.LINKEDIN,
  SocialUrls.FACEBOOK,
];
