import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ComingSoonPage from '@/components/layouts/ComingSoonPage/ComingSoonPage';

const Projects = () => {
  return <ComingSoonPage maintenanceReasons={['construction', 'update']} />;
};

export default Projects;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
