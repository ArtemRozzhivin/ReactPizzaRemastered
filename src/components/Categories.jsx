import React from 'react';

const categories = ['Всі', "М'ясні", 'Вегетаріанська', 'Гриль', 'Гострі', 'Закриті'];

function Categories() {
  const [activeCategory, setActiveCategory] = React.useState(0);

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            key={index}
            onClick={() => setActiveCategory(index)}
            className={activeCategory === index ? 'active' : ''}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
