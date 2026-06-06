import styles from './GlobalLoader.module.scss';

const GlobalLoader = () => {
  return (
    <div className={styles.loaderContainer} aria-label="Loading..." role="status">
      <div className={styles.loader}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </div>
  );
};

export default GlobalLoader;
