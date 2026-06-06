import { useTranslation } from 'next-i18next';

import { Project } from '@/constants/projects';
import { ProjectRichItem } from '@/types/projects';
import { formatIndex } from '@/utils/format';
import { getTranslationArray } from '@/utils/translations';

import ArchitectureSnapshot from './ArchitectureSnapshot';
import ProjectDecisions from './ProjectDecisions';
import ProjectFeatures from './ProjectFeatures';
import ProjectHeader from './ProjectHeader';
import ProjectHighlights from './ProjectHighlights';
import classes from './ProjectShowcase.module.scss';
import ProjectTechStack from './ProjectTechStack';

interface ProjectShowcaseProps {
  project: Project;
}

const ProjectShowcase = ({ project }: ProjectShowcaseProps) => {
  const { t } = useTranslation();

  const pk = project.projectKey;
  const architectureSnapshot = getTranslationArray<ProjectRichItem>(
    t(`projects.data.${pk}.architectureSnapshot`, { returnObjects: true }),
  );
  const decisions = Array.isArray(project.decisions) ? project.decisions : [];

  // Panels are numbered sequentially in render order; conditional panels only consume a
  // number when they actually render, matching the previous inline numbering behavior.
  let sectionNumber = 0;
  const nextSection = (): string => formatIndex(++sectionNumber);

  return (
    <article className={classes.showcase}>
      <ProjectHeader project={project} />

      <ProjectHighlights projectKey={pk} sectionNumber={nextSection()} />

      {architectureSnapshot.length > 0 && (
        <ArchitectureSnapshot items={architectureSnapshot} sectionNumber={nextSection()} />
      )}

      {decisions.length > 0 && (
        <ProjectDecisions
          projectKey={pk}
          projectTitle={project.title}
          decisions={decisions}
          sectionNumber={nextSection()}
        />
      )}

      <ProjectTechStack
        projectKey={pk}
        techCategories={project.techCategories}
        sectionNumber={nextSection()}
      />

      <ProjectFeatures projectKey={pk} features={project.features} sectionNumber={nextSection()} />
    </article>
  );
};

export default ProjectShowcase;
