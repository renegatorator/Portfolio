import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ProjectsPage from '@/components/layouts/ProjectsPage/ProjectsPage';
import { i18nConfig } from '@/constants/i18n';

const Projects = () => {
  return <ProjectsPage />;
};

export default Projects;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  };
}
