import React, { useContext } from 'react';

import { SearchContext } from '../../App';

import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search-icon.svg';
import closeIcon from '../../assets/img/close.svg';

function Search() {
  const { search, setSearch } = useContext(SearchContext);
	console.log(SearchContext)

  return (
    <div className={styles.container}>
      <img className={styles.iconSearch} src={searchIcon} alt="searchIcon" />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        data-error="Помилка"
        className={styles.searchInput}
        placeholder="Введіть назву піцци..."
      />
      {search && (
        <img
          onClick={() => setSearch('')}
          className={styles.iconClose}
          src={closeIcon}
          alt="searchIcon"
        />
      )}
    </div>
  );
}

export default Search;
