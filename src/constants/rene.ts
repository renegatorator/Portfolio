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

export interface WorkExperience {
  id: string;
  company: string;
  companyUrl?: string;
  logo: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  tech: string[];
  current?: boolean;
}

export const workExperiences: WorkExperience[] = [
  {
    id: 'equaleyes',
    company: 'Equaleyes',
    companyUrl: 'https://equaleyes.com/',
    logo: '/images/eq.png',
    role: 'Senior Frontend Engineer',
    period: '08/2023 – Present',
    location: 'Maribor, Slovenia',
    current: true,
    highlights: [
      'Lead frontend development for blockchain-based products for nChain / Teranode (UK)',
      'Build scalable web apps with React, Next.js, TypeScript and React Query',
      'Mentor junior developers, conduct code reviews and drive frontend best practices',
      'Contribute to architectural decisions for production-grade, high-traffic web apps',
    ],
    tech: ['React', 'Next.js', 'TypeScript', 'React Query', 'Blockchain'],
  },
  {
    id: 'margento',
    company: 'Margento',
    companyUrl: 'https://www.margento.com/',
    logo: '/images/margento.png',
    role: 'Software Engineer',
    period: '01/2022 – 08/2023',
    location: 'Maribor, Slovenia',
    highlights: [
      'Built React applications for Slovenian Railways, Arriva, Nomago and Marprom',
      'Developed ticket purchasing platforms and public transport passenger apps',
      'Created interfaces for ticket vending machines deployed at train stations across Slovenia',
      'Integrated backend APIs ensuring reliable data flow across complex transport systems',
    ],
    tech: ['React', 'TypeScript', 'REST APIs'],
  },
  {
    id: 'direct4me',
    company: 'Direct4.me',
    companyUrl: 'https://www.direct4me.si/',
    logo: '/images/d4me.png',
    role: 'Frontend Developer',
    period: '09/2019 – 12/2021',
    location: 'Maribor, Slovenia',
    highlights: [
      'Developed web portals and admin interfaces for a smart parcel delivery SaaS platform',
      'Built user, company and delivery-box management UIs serving an international client base',
      'Integrated APIs and developed reusable UI components within a DotNetNuke CMS',
      'Collaborated in an international agile team delivering cross-border logistics solutions',
    ],
    tech: ['React', 'JavaScript', 'REST APIs', 'DotNetNuke'],
  },
];
