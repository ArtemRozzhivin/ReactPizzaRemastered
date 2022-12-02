import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { addItemCart, selectCartItemById } from '../../redux/slices/cartSlice';

function PizzaBlock({ id, title, price, imageUrl, sizes, types }) {
  const dispatch = useDispatch();
  const item = useSelector(selectCartItemById(id));
	console.log(item)
  const count = item ? item.count : 0;

  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);

  const pizzaTypes = ['тонка', 'традиційна'];

  const addPizzaToCart = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      size: activeSize,
      type: pizzaTypes[activeType],
    };
    dispatch(addItemCart(item));
  };

  return (
    <div className="pizza-block">
      <Link to={`/pizzas/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>

      <div className="pizza-block__selector">
        <ul>
          {types.map((type) => (
            <li
              onClick={() => setActiveType(type)}
              className={activeType === type ? 'active' : ''}
              key={type}>
              {pizzaTypes[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size) => (
            <li
              onClick={() => setActiveSize(size)}
              className={activeSize === size ? 'active' : ''}
              key={size}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">від {price} ₴</div>
        <button onClick={addPizzaToCart} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Додати</span>
          {count > 0 && <i>{count}</i>}
        </button>
      </div>
    </div>
  );
}

export default PizzaBlock;
