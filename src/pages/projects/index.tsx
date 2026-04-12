import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ComingSoonPage from '@/components/layouts/ComingSoonPage/ComingSoonPage';
import { MaintenanceReasons } from '@/constants/maintenance';

const Projects = () => {
  return (
    <ComingSoonPage
      maintenanceReasons={[MaintenanceReasons.CONSTRUCTION, MaintenanceReasons.UPDATE]}
    />
  );
};

export default Projects;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
