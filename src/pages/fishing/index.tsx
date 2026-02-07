import FishingPage from '@/components/layouts/FishingPage/FishingPage';
import { Routes } from '@/constants/routes';

const Fishing = () => {
  return <FishingPage />;
};

export default Fishing;

// TODO: page is hidden for now and redirects to landing page. Update when ready
export async function getStaticProps(
  {
    // locale
  }: { locale: string },
) {
  return {
    redirect: {
      destination: Routes.LANDING_PAGE,
      permanent: false,
    },
    props: {},
    // props: {
    //   ...(await serverSideTranslations(locale, ['common'])),
    // },
  };
}

// Prevent search engines from indexing
export const getStaticHead = () => ({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
});
