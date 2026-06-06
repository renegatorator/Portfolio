import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ContactPage from '@/components/layouts/ContactPage/ContactPage';

const Contact = () => {
  return <ContactPage />;
};

export default Contact;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
