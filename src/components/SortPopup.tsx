import React, { memo, useEffect, useRef, useState } from 'react';

type SortPopupProps = {
  value: SortingType;
  onChangeSortPopup: (sorting: SortingType) => void;
};

export type SortingType = {
  sort: string;
  name: string;
  order: string;
};

type PopupClick = MouseEvent & {
  path: Node[];
};

export const sorting: SortingType[] = [
  { sort: 'rating', name: 'популярностью', order: 'desc' },
  { sort: 'price', name: 'ціною', order: 'desc' },
  { sort: 'title', name: 'алфавітом', order: 'asc' },
];

const SortPopup: React.FC<SortPopupProps> = ({ value, onChangeSortPopup }) => {
  const sortRef = useRef<HTMLDivElement>(null);
  const [visibleSortPopup, setVisibleSortPopup] = useState(false);

  const changeSorting = (sort: SortingType) => {
    onChangeSortPopup(sort);
    setVisibleSortPopup(!visibleSortPopup);
  };

  useEffect(() => {
    const hideSortPopup = (event: MouseEvent) => {
      const _event = event as PopupClick;
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setVisibleSortPopup(false);
      }
    };
    document.body.addEventListener('click', hideSortPopup);

    return () => {
      document.body.removeEventListener('click', hideSortPopup);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={visibleSortPopup ? 'open' : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортування за:</b>
        <span onClick={() => setVisibleSortPopup(!visibleSortPopup)}>{value.name}</span>
      </div>
      {visibleSortPopup && (
        <div className="sort__popup">
          <ul>
            {sorting.map((objSort) => (
              <li
                onClick={() => changeSorting(objSort)}
                className={value.name === objSort.name ? 'active' : ''}
                key={objSort.name}>
                {objSort.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortPopup;
