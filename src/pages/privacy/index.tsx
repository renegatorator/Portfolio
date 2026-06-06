import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import PrivacyPage from '@/components/layouts/PrivacyPage/PrivacyPage';
import { i18nConfig } from '@/constants/i18n';

const Privacy = () => {
  return <PrivacyPage />;
};

export default Privacy;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  };
}
