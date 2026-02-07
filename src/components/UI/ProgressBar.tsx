import React from 'react';
import styles from './ProgressBar.module.scss';

interface ProgressBarProps {
  progress?: number; // 0-100
  animated?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress = 60, animated = true }) => {
  return (
    <div className={styles.progressBar}>
      <div
        className={styles.progressFill}
        style={{
          width: `${progress}%`,
          animation: animated ? undefined : 'none',
        }}
      />
    </div>
  );
};

export default ProgressBar;
