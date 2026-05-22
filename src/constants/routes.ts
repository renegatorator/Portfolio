export const Routes = {
  LANDING_PAGE: '/',
  PROJECTS: '/projects',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
} as const;

export type Route = (typeof Routes)[keyof typeof Routes];
