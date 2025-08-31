export const Routes = {
  LANDING_PAGE: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
  SKILLS: '/skills',
  FISHING: '/fishing',
  CONTACT: '/contact',
  BLOG: '/blog',
  RESUME: '/resume',
} as const;

export type Route = (typeof Routes)[keyof typeof Routes];
