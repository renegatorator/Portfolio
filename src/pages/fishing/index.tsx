import FishingPage from '@/components/layouts/FishingPage/FishingPage';
import { Routes } from '@/constants/routes';

const Fishing = () => {
  return <FishingPage />;
};

export default Fishing;

// TODO: page is hidden for now and redirects to landing page. Update when ready
// export async function getStaticProps(
//   {
//     locale
//   }: { locale: string },
// ) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common'])),
//     },
//   };
// }

export async function getServerSideProps() {
  return {
    redirect: {
      destination: Routes.LANDING_PAGE,
      permanent: false,
    },
    props: {},
  };
}

// Prevent search engines from indexing
export const getStaticHead = () => ({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
});
