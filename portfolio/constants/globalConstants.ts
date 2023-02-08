import { MenuItem } from '@/models/general';
import { routes } from './routes';

export const pages: MenuItem[] = [
  {
    pageName: 'Home',
    route: routes.HOME,
    // icon: ''
  },
  {
    pageName: 'My story',
    route: routes.MY_STORY,
    // icon: ''
  },
  {
    pageName: 'Projects',
    route: routes.PROJECTS,
    // icon: ''
  },
  {
    pageName: 'Images',
    route: routes.IMAGES,
    // icon: ''
  },
];

export const menuItems: MenuItem[] = pages.filter(
  (page) => page.route !== routes.HOME
);
