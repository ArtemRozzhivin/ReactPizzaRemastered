import React from 'react';

import styles from './NotFoundItem.module.scss';

function NotFoundItem() {
  return (
    <div className={styles.notFoundItem}>
      <div className={styles.title}>Нічого не знайдено 😕</div>
      <div className={styles.text}>По даній адресі сторінки не знайдено</div>
    </div>
  );
}

export default NotFoundItem;
