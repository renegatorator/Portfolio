import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faGit,
  faGithub,
  faJira,
  faJs,
  faNodeJs,
  faReact,
} from '@fortawesome/free-brands-svg-icons';
import { faDocker } from '@fortawesome/free-brands-svg-icons';
import {
  faCode,
  faCubes,
  faDatabase,
  faLayerGroup,
  faMagnifyingGlass,
  faMobileAlt,
  faServer,
  faSitemap,
} from '@fortawesome/free-solid-svg-icons';

export interface Skill {
  label: string;
  icon: IconDefinition;
}

export const skills: Skill[] = [
  { label: 'Next.js', icon: faSitemap },
  { label: 'TypeScript', icon: faCode },
  { label: 'Git', icon: faGit },
  { label: 'Docker', icon: faDocker },
  { label: 'Jira', icon: faJira },
  { label: 'REST API', icon: faServer },
  { label: 'React', icon: faReact },
  { label: 'Node.js', icon: faNodeJs },
  { label: 'SCSS/CSS', icon: faCubes },
  { label: 'JavaScript', icon: faJs },
  { label: 'Material-UI', icon: faLayerGroup },
  { label: 'Responsive Design', icon: faMobileAlt },
  { label: 'SEO', icon: faMagnifyingGlass },
  { label: 'SQL', icon: faDatabase },
  { label: 'GitHub', icon: faGithub },
];
