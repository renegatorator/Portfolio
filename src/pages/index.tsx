import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LandingPage from '@/components/layouts/LandingPage/LandingPage';

const Home = () => {
  return <LandingPage />;
};

export default Home;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
