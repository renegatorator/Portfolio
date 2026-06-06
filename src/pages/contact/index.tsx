import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ContactPage from '@/components/layouts/ContactPage/ContactPage';
import { i18nConfig } from '@/constants/i18n';

const Contact = () => {
  return <ContactPage />;
};

export default Contact;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  };
}
