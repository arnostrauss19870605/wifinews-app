import React from 'react';
import styles from './index.module.css';

function ProgressIndicator() {
  return (
    <div>
      <div className={styles.stepText}>Step 2/3</div>
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar}></div>
      </div>
    </div>
  );
}

export default ProgressIndicator;
