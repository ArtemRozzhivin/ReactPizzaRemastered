import React from 'react';

import style from './Loading.module.scss';

const Loading: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.ldsRing}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
