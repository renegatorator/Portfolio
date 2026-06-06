import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LandingPage from '@/components/layouts/LandingPage/LandingPage';
import { i18nConfig } from '@/constants/i18n';

const Home = () => {
  return <LandingPage />;
};

export default Home;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  };
}
