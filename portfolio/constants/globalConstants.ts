import { PageData } from '@/models/general';
import { routes } from './routes';
import {
  faHouse,
  faEnvelopesBulk,
  faDiagramProject,
  faBookOpenReader,
} from '@fortawesome/free-solid-svg-icons';

export const pages: PageData[] = [
  {
    pageName: 'Home',
    route: routes.HOME,
    icon: faHouse,
  },
  {
    pageName: 'My story',
    route: routes.MY_STORY,
    icon: faBookOpenReader,
  },
  {
    pageName: 'Projects',
    route: routes.PROJECTS,
    icon: faDiagramProject,
  },
  {
    pageName: 'Contact',
    route: routes.CONTACT,
    icon: faEnvelopesBulk,
  },
];

export const menuItems: PageData[] = pages.filter(
  (page) => page.route !== routes.HOME
);
