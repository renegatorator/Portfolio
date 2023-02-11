import { routes } from '@/constants/routes';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface PageData {
  pageName: string;
  route: routes;
  icon?: IconDefinition;
}
