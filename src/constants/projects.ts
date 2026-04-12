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

export interface TechCategory {
  label: string;
  icon: IconDefinition;
  items: string[];
}

export interface ProjectFeature {
  icon: IconDefinition;
  label: string;
  description?: string;
}

export interface DescriptionPart {
  text: string;
  em?: boolean;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  descriptionParts?: DescriptionPart[];
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
  highlights: string[];
}

// Re-export icons used by consumers so they import from one place
export { faArrowUpRightFromSquare, faCodeBranch, faGithub };

export const projects: Project[] = [
  {
    id: 'ops-tracker',
    title: 'Ops Tracker',
    tagline:
      'A production-grade Jira-like project management tool — built with Next.js 16, Supabase, and TypeScript.',
    description:
      'Ops Tracker is a full-stack project management and issue tracking application demonstrating production-level frontend architecture backed by a real Supabase (PostgreSQL) database. It covers authentication, role-based access control, Kanban boards, project-scoped issues, full audit trails, transactional email, and internationalisation across three languages — everything a real B2B SaaS requires.',
    descriptionParts: [
      { text: 'Ops Tracker is a ' },
      { text: 'full-stack', em: true },
      { text: ' project management and issue tracking application demonstrating ' },
      { text: 'production-level', em: true },
      { text: ' frontend architecture backed by a real ' },
      { text: 'Supabase', em: true },
      { text: ' (PostgreSQL) database. It covers authentication, ' },
      { text: 'role-based access control', em: true },
      { text: ', ' },
      { text: 'Kanban boards', em: true },
      { text: ', project-scoped issues, ' },
      { text: 'full audit trails', em: true },
      { text: ', ' },
      { text: 'transactional email', em: true },
      { text: ', and ' },
      { text: 'internationalisation', em: true },
      { text: ' across three languages — everything a real ' },
      { text: 'B2B SaaS', em: true },
      { text: ' requires.' },
    ],
    status: 'in-development',
    isOpenSource: false,
    githubUrl: 'https://github.com/renekrajnc/ops-tracker',
    demoUrl: 'https://ops-tracker.renekrajnc.com',
    logoLight: '/images/ops-tracker-screenshots/logo-light.svg',
    logoDark: '/images/ops-tracker-screenshots/logo-dark.svg',
    featuredImage: '/images/ops-tracker-screenshots/dashboard-01.png',
    highlights: [
      'Next.js 16 App Router with server components, server actions, and proxy middleware',
      'Supabase Row Level Security enforced at the database layer — zero trust by default',
      'Three-tier RBAC: User, Admin, and Super Admin with Postgres enum roles',
      'Full audit trail — every mutation logged to PostgreSQL with action badges',
      'Branded transactional email via Resend on issue create and assignment',
      'Playwright end-to-end tests covering the critical authentication and issue path',
      'Multilingual (English, German, Slovenian) via next-intl',
    ],
    techCategories: [
      {
        label: 'Frontend',
        icon: faCode,
        items: ['Next.js 16', 'React 19', 'TypeScript', 'Mantine 8', 'SCSS Modules'],
      },
      {
        label: 'Data & State',
        icon: faLayerGroup,
        items: ['TanStack Query', 'TanStack Table', 'React Hook Form', 'Zod', '@dnd-kit'],
      },
      {
        label: 'Backend & DB',
        icon: faDatabase,
        items: ['Supabase', 'PostgreSQL', 'Row Level Security', 'Supabase Auth'],
      },
      {
        label: 'Infrastructure',
        icon: faServer,
        items: ['Vercel', 'GitHub Actions'],
      },
      {
        label: 'Email',
        icon: faEnvelope,
        items: ['Resend', 'React Email'],
      },
      {
        label: 'Security',
        icon: faShield,
        items: ['Google reCAPTCHA v3', 'Supabase RLS'],
      },
      {
        label: 'Testing',
        icon: faFlask,
        items: ['Playwright (E2E)'],
      },
    ],
    features: [
      {
        icon: faGrip,
        label: 'Drag-and-Drop Kanban Board',
        description:
          'Per-project Kanban board powered by @dnd-kit with columns driven by configurable workflow statuses.',
      },
      {
        icon: faUsers,
        label: 'Role-Based Access Control',
        description:
          'Three-tier RBAC — User, Admin, Super Admin — enforced at the database layer via Supabase RLS.',
      },
      {
        icon: faList,
        label: 'Project-Scoped Issues',
        description:
          'Human-readable issue keys (e.g. RKP-1), Bug/Ticket types, status transitions, and assignee management.',
      },
      {
        icon: faScroll,
        label: 'Full Audit Trail',
        description:
          'Every mutating action is recorded to PostgreSQL audit_logs with colour-coded action badges and meaningful summaries.',
      },
      {
        icon: faEnvelope,
        label: 'Transactional Email',
        description:
          'Branded HTML email templates via Resend — automatic notifications on issue create and assignment.',
      },
      {
        icon: faGlobe,
        label: 'Internationalisation',
        description:
          'Full i18n via next-intl across English, German, and Slovenian including all validation messages and error text.',
      },
      {
        icon: faRocket,
        label: 'Virtualised Issue Table',
        description:
          'Large issue lists rendered with TanStack Table and virtual scrolling for smooth performance at scale.',
      },
      {
        icon: faKey,
        label: 'Secure Authentication',
        description:
          'Supabase Auth with optional Google reCAPTCHA v3 bot protection on the login form — gracefully degraded when unconfigured.',
      },
      {
        icon: faGears,
        label: 'Admin Control Panel',
        description:
          'Dedicated /admin area for user role management, issue status CRUD, global audit log, and super-admin settings.',
      },
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
