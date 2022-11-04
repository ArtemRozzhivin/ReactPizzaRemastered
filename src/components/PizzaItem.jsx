import axios from 'axios';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { selectCartItemById } from '../redux/slices/cartSlice';

const PizzaItem = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState({});
  const location = useLocation();
  console.log(location);

  const dispatch = useDispatch();
  const item = useSelector(selectCartItemById(id));
  const count = item ? item.count : 0;
  console.log(item);
  const [activeType, setActiveType] = useState(item.types[0]);
  const [activeSize, setActiveSize] = useState(item.sizes[0]);

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

  useEffect(() => {
    const fetchItem = async () => {
      const { data } = await axios.get(`https://633058daf5fda801f8df1ccd.mockapi.io/pizzas/${id}`);
      setPizza(data);
      console.log(data);
    };
    fetchItem();
  }, []);

  if (isEmpty(pizza)) {
    return <h2>Завантаження...</h2>;
  }

  return (
    <div className="content">
      <div className="container">
        <div className="pizza-item">
          <img className="pizza-item__image" src={pizza.imageUrl} alt="pizza" />
          <div>
            <h2 className="pizza-item__title">{pizza.title}</h2>
            <div className="pizza-item__price">від {pizza.price} ₴</div>
            <div className="pizza-block__selector">
              <ul>
                {pizza.types.map((type) => (
                  <li
                    onClick={() => setActiveType(type)}
                    className={activeType === type ? 'active' : ''}
                    key={type}>
                    {pizzaTypes[type]}
                  </li>
                ))}
              </ul>
              <ul>
                {pizza.sizes.map((size) => (
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
              <div className="pizza-block__price">від {pizza.price} ₴</div>
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
        </div>
      </div>
    </div>
  );
};

export default PizzaItem;
