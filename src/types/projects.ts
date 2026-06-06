// Shapes returned by i18next `returnObjects` lookups under `projects.data.<projectKey>.*`.
// Kept separate from the project data model in `@/constants/projects` because these
// describe localized copy, not the structural project definition.

export interface ProjectRichItem {
  title: string;
  description: string;
}

export interface ProjectStatCopy {
  value: string;
  label: string;
}

export interface ProjectDecisionCopy {
  challengeShort: string;
  challenge: string;
  solution: string;
  tradeoff: string;
}
