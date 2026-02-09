import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faJs, faNodeJs,faReact } from '@fortawesome/free-brands-svg-icons';
import { faDocker } from '@fortawesome/free-brands-svg-icons';
import { faCode, faCubes, faServer, faSitemap } from '@fortawesome/free-solid-svg-icons';

export interface Skill {
  label: string;
  icon: IconDefinition;
}

export const skills: Skill[] = [
  { label: 'JavaScript', icon: faJs },
  { label: 'TypeScript', icon: faCode },
  { label: 'React', icon: faReact },
  { label: 'Next.js', icon: faSitemap },
  { label: 'Node.js', icon: faNodeJs },
  { label: 'SCSS', icon: faCubes },
  { label: 'GraphQL', icon: faServer },
  { label: 'Docker', icon: faDocker },
];
