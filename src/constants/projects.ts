import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowUpRightFromSquare,
  faCode,
  faCodeBranch,
  faDatabase,
  faGears,
  faGlobe,
  faGrip,
  faLayerGroup,
  faRocket,
  faScroll,
  faServer,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

export type ProjectStatus = 'live' | 'in-development' | 'archived';

export interface Screenshot {
  src: string;
  alt: string;
  caption: string;
  subtitle?: string;
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
    logoLight: '/images/ops-tracker-images/logo-light.svg',
    logoDark: '/images/ops-tracker-images/logo-dark.svg',
    featuredImage: '/images/ops-tracker-images/dashboard-01.png',
    techCategories: [
      {
        categoryKey: 'frontend',
        icon: faCode,
        items: ['Next.js 16', 'React 19', 'TypeScript', 'Mantine 8', 'SCSS Modules'],
      },
      {
        categoryKey: 'dataState',
        icon: faLayerGroup,
        items: ['TanStack Query v5', 'TanStack Table v8', 'Zod v4', '@dnd-kit'],
      },
      {
        categoryKey: 'backendDb',
        icon: faDatabase,
        items: ['Supabase', 'PostgreSQL', 'Row Level Security', 'Supabase Auth'],
      },
      {
        categoryKey: 'infrastructure',
        icon: faServer,
        items: ['Vercel', 'GitHub Actions', 'Playwright (E2E)'],
      },
    ],
    features: [
      { icon: faGrip, featureKey: 'kanbanBoard' },
      { icon: faUsers, featureKey: 'rbac' },
      { icon: faRocket, featureKey: 'virtualTable' },
      { icon: faScroll, featureKey: 'auditTrail' },
      { icon: faGlobe, featureKey: 'i18n' },
      { icon: faGears, featureKey: 'adminPanel' },
    ],
    screenshots: [
      {
        src: '/images/ops-tracker-images/dashboard-01.png',
        alt: 'Ops Tracker main dashboard overview with project stats',
        caption: 'Dashboard Overview',
        subtitle: 'Server Components + HydrationBoundary prefetch; TanStack Query on the client',
        group: 'Dashboard',
      },
      {
        src: '/images/ops-tracker-images/dashboard-02.png',
        alt: 'Ops Tracker dashboard personal assignments view',
        caption: 'Dashboard — Assignments',
        subtitle:
          'Personal workload view; data prefetched server-side and dehydrated into the client',
        group: 'Dashboard',
      },
      {
        src: '/images/ops-tracker-images/board.png',
        alt: 'Ops Tracker drag-and-drop Kanban board',
        caption: 'Kanban Board',
        subtitle: '@dnd-kit drag-and-drop with status-driven columns and optimistic updates',
        group: 'Board',
      },
      {
        src: '/images/ops-tracker-images/issues-01.png',
        alt: 'Ops Tracker virtualized issues table',
        caption: 'Issues Table',
        subtitle: 'TanStack Table v8 + @tanstack/react-virtual — smooth rendering at scale',
        group: 'Issues',
      },
      {
        src: '/images/ops-tracker-images/single-issue.png',
        alt: 'Ops Tracker issue detail page with audit log',
        caption: 'Issue Detail',
        subtitle:
          'Prefetched RSC detail with inline editing, status transitions, and per-issue audit log',
        group: 'Issues',
      },
      {
        src: '/images/ops-tracker-images/projects.png',
        alt: 'Ops Tracker projects list',
        caption: 'Projects',
        subtitle:
          'Multi-project workspace; unique project keys (e.g. OPS-1) and role-filtered views',
        group: 'Projects',
      },
      {
        src: '/images/ops-tracker-images/admin-01.png',
        alt: 'Ops Tracker admin panel with role management',
        caption: 'Admin Panel',
        subtitle:
          'Three-tier RBAC (user / admin / super_admin) enforced via Supabase RLS + Server Action checks',
        group: 'Admin',
      },
    ],
  },
];
