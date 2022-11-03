import React from 'react';

import styles from './NotFoundItem.module.scss';

function NotFoundItem({ children }) {
  return (
    <div className={styles.notFoundItem}>
      <div className={styles.title}>Нічого не знайдено 😕</div>
      <div className={styles.text}>{children}</div>
    </div>
  );
}

export default NotFoundItem;
