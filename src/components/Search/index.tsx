import React, { useRef, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search-icon.svg';
import closeIcon from '../../assets/img/close.svg';
import { useDispatch } from 'react-redux';
import { setSearching } from '../../redux/slices/filterSlice';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');

  const onUpdateSearch = useCallback(
    debounce((str:string) => {
      dispatch(setSearching(str));
    }, 400),
    [],
  );

  const onChangeValue = (e:any) => {
    setValue(e.target.value);
    onUpdateSearch(e.target.value);
  };

  const clearInput = () => {
    setValue('');
    dispatch(setSearching(''));
    inputRef.current?.focus();
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
        placeholder="Введіть назву піци..."
      />
      {value && (
        <img onClick={clearInput} className={styles.iconClose} src={closeIcon} alt="searchIcon" />
      )}
    </div>
  );
}

export default Search;
