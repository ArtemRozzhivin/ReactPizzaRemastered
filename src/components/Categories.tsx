import React from 'react';

const categories = ['Всі', "М'ясні", 'Вегетаріанська', 'Гриль', 'Гострі', 'Закриті'];

type CategoriesProps = {
	value: number;
	onChangeCategory: any;
}

const Categories: React.FC<CategoriesProps> = ({value, onChangeCategory}) => {

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={value === index ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
