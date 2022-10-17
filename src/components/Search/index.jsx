import React, { useContext, useRef, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

import { SearchContext } from '../../App';

import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search-icon.svg';
import closeIcon from '../../assets/img/close.svg';

function Search() {
  const inputRef = useRef();
  const { search, setSearch } = useContext(SearchContext);
  const [value, setValue] = useState('');

  const onUpdateSearch = useCallback(
    debounce((str) => {
      setSearch(str);
    }, 400),
    [],
  );

  const onChangeValue = (e) => {
    setValue(e.target.value);
    onUpdateSearch(e.target.value);
  };

  const clearInput = () => {
    setValue('');
    setSearch('');
    inputRef.current.focus();
  };

  return (
    <div className={styles.container}>
      <img className={styles.iconSearch} src={searchIcon} alt="searchIcon" />
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChangeValue(e)}
        type="text"
        data-error="Помилка"
        className={styles.searchInput}
        placeholder="Введіть назву піцци..."
      />
      {value && (
        <img onClick={clearInput} className={styles.iconClose} src={closeIcon} alt="searchIcon" />
      )}
    </div>
  );
}

export default Search;
