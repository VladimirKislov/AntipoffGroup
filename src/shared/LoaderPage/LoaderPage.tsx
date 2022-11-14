import React from 'react';
import styles from './loaderpage.css';

export function LoaderPage() {
  return (
    <div className={styles.loaderContainer}>
      <span className={styles.loader}></span>
    </div>
  );
}
