import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import FishingPage from '@/components/layouts/FishingPage/FishingPage';

const Fishing = () => {
  return <FishingPage />;
};

export default Fishing;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
