import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowUpRightFromSquare,
  faCode,
  faCodeBranch,
  faDatabase,
  faEnvelope,
  faFlask,
  faGears,
  faGlobe,
  faGrip,
  faKey,
  faLayerGroup,
  faList,
  faRocket,
  faScroll,
  faServer,
  faShield,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

export type ProjectStatus = 'live' | 'in-development' | 'archived';

export interface Screenshot {
  src: string;
  alt: string;
  caption: string;
  group?: string;
}

/** Key used to look up `projects.data.<categoryKey>` in locale files */
export interface TechCategory {
  categoryKey: string;
  icon: IconDefinition;
  items: string[];
}

/** Key used to look up `projects.data.<featureKey>.label/description` in locale files */
export interface ProjectFeature {
  icon: IconDefinition;
  featureKey: string;
}

export interface Project {
  id: string;
  /** Used to build i18n key paths: `projects.data.<projectKey>.*` */
  projectKey: string;
  title: string;
  status: ProjectStatus;
  isOpenSource: boolean;
  githubUrl?: string;
  demoUrl?: string;
  logoLight?: string;
  logoDark?: string;
  featuredImage: string;
  screenshots: Screenshot[];
  techCategories: TechCategory[];
  features: ProjectFeature[];
}

// Re-export icons used by consumers so they import from one place
export { faArrowUpRightFromSquare, faCodeBranch, faGithub };

export const projects: Project[] = [
  {
    id: 'ops-tracker',
    projectKey: 'opsTracker',
    title: 'Ops Tracker',
    status: 'in-development',
    isOpenSource: false,
    githubUrl: 'https://github.com/renegatorator/ops-tracker',
    demoUrl: 'https://ops-tracker.renekrajnc.com',
    logoLight: '/images/ops-tracker-screenshots/logo-light.svg',
    logoDark: '/images/ops-tracker-screenshots/logo-dark.svg',
    featuredImage: '/images/ops-tracker-screenshots/dashboard-01.png',
    techCategories: [
      { categoryKey: 'frontend', icon: faCode, items: ['Next.js 16', 'React 19', 'TypeScript', 'Mantine 8', 'SCSS Modules'] },
      { categoryKey: 'dataState', icon: faLayerGroup, items: ['TanStack Query', 'TanStack Table', 'React Hook Form', 'Zod', '@dnd-kit'] },
      { categoryKey: 'backendDb', icon: faDatabase, items: ['Supabase', 'PostgreSQL', 'Row Level Security', 'Supabase Auth'] },
      { categoryKey: 'infrastructure', icon: faServer, items: ['Vercel', 'GitHub Actions'] },
      { categoryKey: 'email', icon: faEnvelope, items: ['Resend', 'React Email'] },
      { categoryKey: 'security', icon: faShield, items: ['Google reCAPTCHA v3', 'Supabase RLS'] },
      { categoryKey: 'testing', icon: faFlask, items: ['Playwright (E2E)'] },
    ],
    features: [
      { icon: faGrip, featureKey: 'kanbanBoard' },
      { icon: faUsers, featureKey: 'rbac' },
      { icon: faList, featureKey: 'projectIssues' },
      { icon: faScroll, featureKey: 'auditTrail' },
      { icon: faEnvelope, featureKey: 'emailNotifications' },
      { icon: faGlobe, featureKey: 'i18n' },
      { icon: faRocket, featureKey: 'virtualTable' },
      { icon: faKey, featureKey: 'secureAuth' },
      { icon: faGears, featureKey: 'adminPanel' },
    ],
    screenshots: [
      // Landing
      {
        src: '/images/ops-tracker-screenshots/landing-01.png',
        alt: 'Ops Tracker landing page hero section',
        caption: 'Landing — Hero',
        group: 'Landing',
      },
      {
        src: '/images/ops-tracker-screenshots/landing-02.png',
        alt: 'Ops Tracker landing page features overview',
        caption: 'Landing — Features',
        group: 'Landing',
      },
      {
        src: '/images/ops-tracker-screenshots/landing-03.png',
        alt: 'Ops Tracker landing page footer section',
        caption: 'Landing — Footer',
        group: 'Landing',
      },
      // Dashboard
      {
        src: '/images/ops-tracker-screenshots/dashboard-01.png',
        alt: 'Ops Tracker main dashboard overview',
        caption: 'Dashboard — Overview',
        group: 'Dashboard',
      },
      {
        src: '/images/ops-tracker-screenshots/dashboard-02.png',
        alt: 'Ops Tracker dashboard personal assignments',
        caption: 'Dashboard — Assignments',
        group: 'Dashboard',
      },
      // Projects
      {
        src: '/images/ops-tracker-screenshots/projects.png',
        alt: 'Ops Tracker projects list',
        caption: 'Projects — List',
        group: 'Projects',
      },
      {
        src: '/images/ops-tracker-screenshots/new-project.png',
        alt: 'Ops Tracker create new project dialog',
        caption: 'Projects — Create',
        group: 'Projects',
      },
      // Issues
      {
        src: '/images/ops-tracker-screenshots/issues-01.png',
        alt: 'Ops Tracker issues list view',
        caption: 'Issues — List',
        group: 'Issues',
      },
      {
        src: '/images/ops-tracker-screenshots/issues-02.png',
        alt: 'Ops Tracker issue detail page',
        caption: 'Issues — Detail',
        group: 'Issues',
      },
      {
        src: '/images/ops-tracker-screenshots/project_issues.png',
        alt: 'Ops Tracker project-scoped issues',
        caption: 'Issues — Project View',
        group: 'Issues',
      },
      // Board
      {
        src: '/images/ops-tracker-screenshots/board-01.png',
        alt: 'Ops Tracker drag-and-drop Kanban board',
        caption: 'Kanban Board',
        group: 'Board',
      },
      // Create
      {
        src: '/images/ops-tracker-screenshots/create-issue.png',
        alt: 'Ops Tracker create issue form',
        caption: 'Create Issue',
        group: 'Create',
      },
      // Admin
      {
        src: '/images/ops-tracker-screenshots/admin-overview.png',
        alt: 'Ops Tracker admin panel overview',
        caption: 'Admin — Overview',
        group: 'Admin',
      },
      {
        src: '/images/ops-tracker-screenshots/admin-users.png',
        alt: 'Ops Tracker admin user management',
        caption: 'Admin — Users',
        group: 'Admin',
      },
      {
        src: '/images/ops-tracker-screenshots/admin-statuses.png',
        alt: 'Ops Tracker admin issue statuses management',
        caption: 'Admin — Statuses',
        group: 'Admin',
      },
      {
        src: '/images/ops-tracker-screenshots/admin-audit.png',
        alt: 'Ops Tracker admin global audit log',
        caption: 'Admin — Audit Log',
        group: 'Admin',
      },
      // Settings
      {
        src: '/images/ops-tracker-screenshots/project-settings.png',
        alt: 'Ops Tracker project settings page',
        caption: 'Settings — Project',
        group: 'Settings',
      },
      {
        src: '/images/ops-tracker-screenshots/super-admin-settings.png',
        alt: 'Ops Tracker super admin system settings',
        caption: 'Settings — Super Admin',
        group: 'Settings',
      },
      // Email
      {
        src: '/images/ops-tracker-screenshots/email.png',
        alt: 'Ops Tracker branded transactional email notification',
        caption: 'Email Notification',
        group: 'Email',
      },
    ],
  },
];
