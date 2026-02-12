import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faGit, faGithub, faJs, faNodeJs, faReact } from '@fortawesome/free-brands-svg-icons';
import { faDocker } from '@fortawesome/free-brands-svg-icons';
import {
  faCode,
  faCubes,
  faLayerGroup,
  faMobileAlt,
  faServer,
  faSitemap,
} from '@fortawesome/free-solid-svg-icons';

export interface Skill {
  label: string;
  icon: IconDefinition;
}

export const skills: Skill[] = [
  { label: 'TypeScript', icon: faCode },
  { label: 'React', icon: faReact },
  { label: 'Next.js', icon: faSitemap },
  { label: 'JavaScript', icon: faJs },
  { label: 'SCSS/CSS', icon: faCubes },
  { label: 'Material-UI', icon: faLayerGroup },
  { label: 'Node.js', icon: faNodeJs },
  { label: 'Git', icon: faGit },
  { label: 'REST API', icon: faServer },
  { label: 'Responsive Design', icon: faMobileAlt },
  { label: 'Docker', icon: faDocker },
  { label: 'GitHub', icon: faGithub },
];
