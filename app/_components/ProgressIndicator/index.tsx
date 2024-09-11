import React from 'react';
import styles from './index.module.css';

function ProgressIndicator({ currentStep, totalSteps }: any) {
  return (
    <div>
      <div className={styles.stepText}>
        Step {`${currentStep}/${totalSteps}`}
      </div>
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar}></div>
      </div>
    </div>
  );
}

export default ProgressIndicator;
