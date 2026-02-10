export const Routes = {
  LANDING_PAGE: '/',
  PROJECTS: '/projects',
  FISHING: '/fishing',
  CONTACT: '/contact',
} as const;

export type Route = (typeof Routes)[keyof typeof Routes];
