import { useWhyDidYouUpdate } from 'ahooks';
import React, { memo } from 'react';

const categories = ['Всі', "М'ясні", 'Вегетаріанська', 'Гриль', 'Гострі', 'Закриті'];

type CategoriesProps = {
  value: number;
  setActiveCategory: (category: number) => void;
};

const Categories: React.FC<CategoriesProps> = memo(({ value, setActiveCategory }) => {
  // useWhyDidYouUpdate('Categories', { value, setActiveCategory });

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            key={index}
            onClick={() => setActiveCategory(index)}
            className={value === index ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
