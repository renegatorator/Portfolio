import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'sl', label: 'Slovenščina' },
  { code: 'de', label: 'Deutsch' },
];

const LanguageSwitcher = () => {
  const router = useRouter();
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <select onChange={handleChange} value={i18n.language} aria-label="Select language">
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
