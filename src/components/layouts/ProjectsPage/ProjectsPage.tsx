import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import Reveal from '@/components/UI/Reveal/Reveal';
import ProjectShowcase from '@/components/UI/ProjectShowcase/ProjectShowcase';
import { Routes } from '@/constants/routes';
import { projects } from '@/constants/projects';

import PageLayout from '../PageLayout/PageLayout';
import classes from './ProjectsPage.module.scss';

const ProjectsPage = () => {
  const { t } = useTranslation();

  return (
    <PageLayout route={Routes.PROJECTS}>
      <section className={classes.pageShell}>
      <div className={classes.page}>
        <div className={classes.pageHeader}>
          <Reveal>
            <Typography variant="h1" className={classes.pageTitle}>
              {t('projects.title')}
            </Typography>
          </Reveal>
          <Reveal delayMs={80}>
            <Typography variant="body1" component="p" className={classes.pageDescription}>
              {t('projects.page.description')}
            </Typography>
          </Reveal>
        </div>

        <div className={classes.divider} role="separator" />

        <div className={classes.projectsList}>
          {projects.map((project) => (
            <ProjectShowcase key={project.id} project={project} />
          ))}
        </div>
      </div>
      </section>
    </PageLayout>
  );
};

export default ProjectsPage;
