import ThemeToggle from '@/components/UI/ThemeToggle';
import LanguageSwitcher from '@/components/UI/LanguageSwitcher';
import classes from './PageLayout.module.scss';

const StickyHeader = () => (
  <header className={classes.stickyHeader}>
    <div className={classes.headerContent}>
      <ThemeToggle />
      <LanguageSwitcher />
    </div>
  </header>
);

export default StickyHeader;
