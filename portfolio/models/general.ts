import { routes } from '@/constants/routes';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { StaticImageData } from 'next/image';

export interface PageData {
  pageName: string;
  route: routes;
  icon?: IconDefinition;
  image?: StaticImageData;
}

export interface MediaButton {
  name: string;
  icon: IconDefinition;
  href: string;
}
