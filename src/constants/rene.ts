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
  faBox,
  faCode,
  faCubes,
  faDatabase,
  faGears,
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
  { label: 'CI/CD', icon: faGears },
  { label: 'Headless CMS', icon: faBox },
  { label: 'React', icon: faReact },
  { label: 'SCSS/CSS', icon: faCubes },
  { label: 'JavaScript', icon: faJs },
  { label: 'SEO', icon: faMagnifyingGlass },
  { label: 'Responsive Design', icon: faMobileAlt },
  { label: 'Node.js', icon: faNodeJs },
  { label: 'GitHub', icon: faGithub },
  { label: 'SQL', icon: faDatabase },
  { label: 'Material-UI', icon: faLayerGroup },
];

export const EmailAddresses = {
  INFO: 'info@renekrajnc.com',
  ADMIN: 'admin@renekrajnc.com',
  NOREPLY: 'noreply@renekrajnc.com',
  RENE: 'rene@renekrajnc.com',
} as const;

export type EmailAddress = (typeof EmailAddresses)[keyof typeof EmailAddresses];

export const reneKrajnc = 'Rene Krajnc';

type CurrentRole = { current: true; endDate?: never };
type PastRole = { current?: false; endDate: string };

export type WorkExperience = {
  id: string;
  company: string;
  companyUrl?: string;
  logo: string;
  startDate: string;
  tech: string[];
} & (CurrentRole | PastRole);

export const workExperiences: WorkExperience[] = [
  {
    id: 'equaleyes',
    company: 'Equaleyes',
    companyUrl: 'https://equaleyes.com/',
    logo: '/images/eq.png',
    startDate: '08/2023',
    current: true,
    tech: ['React', 'Next.js', 'TypeScript', 'React Query', 'Blockchain'],
  },
  {
    id: 'margento',
    company: 'Margento',
    companyUrl: 'https://www.margento.com/',
    logo: '/images/margento.png',
    startDate: '01/2022',
    endDate: '08/2023',
    tech: ['React', 'TypeScript', 'REST APIs'],
  },
  {
    id: 'direct4me',
    company: 'Direct4.me',
    companyUrl: 'https://www.direct4me.si/',
    logo: '/images/d4me.png',
    startDate: '09/2019',
    endDate: '12/2021',
    tech: ['React', 'JavaScript', 'REST APIs', 'DotNetNuke'],
  },
];
