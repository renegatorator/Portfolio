import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ComingSoonPage from '@/components/layouts/ComingSoonPage/ComingSoonPage';

const Skills = () => {
  return <ComingSoonPage />;
};

export default Skills;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
