import { MediaButton, PageData } from '@/models/general';
import { routes } from './routes';
import {
  faHouse,
  faEnvelopesBulk,
  faDiagramProject,
  faBookOpenReader,
} from '@fortawesome/free-solid-svg-icons';
import bgStory from '@/assets/images/rene-soldier-1.jpg';
import bgProjects from '@/assets/images/qol-athens.jpg';
import bgContact from '@/assets/images/rene-social-media.jpg';
import { faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

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
    image: bgStory,
  },
  {
    pageName: 'Projects',
    route: routes.PROJECTS,
    icon: faDiagramProject,
    image: bgProjects,
  },
  {
    pageName: 'Contact',
    route: routes.CONTACT,
    icon: faEnvelopesBulk,
    image: bgContact,
  },
];

console.log('pages', pages);

export const menuItems: PageData[] = pages.filter(
  (page) => page.route !== routes.HOME
);

export enum buttonKind {
  BUTTON,
  LINK,
}

export const mediaButtons: MediaButton[] = [
  {
    name: 'Facebook',
    icon: faFacebook,
    href: 'https://www.facebook.com/rene.krajnc',
  },
  {
    name: 'Facebook',
    icon: faLinkedin,
    href: 'https://www.linkedin.com/in/rene-krajnc-a3400b190/',
  },
];
