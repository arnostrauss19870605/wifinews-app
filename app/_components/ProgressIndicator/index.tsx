import React from 'react';
import styles from './index.module.css';

function ProgressIndicator({ step }: any) {
  return (
    <div>
      <div className={styles.stepText}>Step {`${step}/3`}</div>
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar}></div>
      </div>
    </div>
  );
}

export default ProgressIndicator;
