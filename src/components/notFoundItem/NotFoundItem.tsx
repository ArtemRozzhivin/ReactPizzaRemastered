import React from 'react';

import styles from './NotFoundItem.module.scss';

type NotFoundItemProps = {
  children: React.ReactNode;
}

const NotFoundItem: React.FC<NotFoundItemProps> = ({ children }) => {
  return (
    <div className={styles.notFoundItem}>
      <div className={styles.title}>Нічого не знайдено 😕</div>
      <div className={styles.text}>{children}</div>
    </div>
  );
}

export default NotFoundItem;
