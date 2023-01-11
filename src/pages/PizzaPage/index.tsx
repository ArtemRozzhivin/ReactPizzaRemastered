import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { selectCartItemById } from '../../redux/cart/selectors';
import { addItemCart } from '../../redux/cart/slice';
import { ItemCartPizza } from '../../redux/cart/types';

const PizzaItem: React.FC = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();

  const [activeType, setActiveType] = useState(state.types[0]);
  const [activeSize, setActiveSize] = useState(state.sizes[0]);

  const item = useSelector(selectCartItemById(state.id));
  const count: number = item ? item.count : 0;

  const pizzaTypes = ['тонка', 'традиційна'];

  const addPizzaToCart = () => {
    const pizzaCart: ItemCartPizza = {
      ...state,
      size: activeSize,
      type: pizzaTypes[activeType],
      count: 0,
    };
    dispatch(addItemCart(pizzaCart));
  };

  return (
    <div>
      {state ? (
        <div className="content">
          <div className="container">
            <div className="pizza-page">
              <div className="pizza-page__top">
                <div className="pizza-page__image">
                  <img src={state.imageUrl} alt="pizza" />
                </div>
                <div>
                  <h2 className="pizza-page__title">{state.title}</h2>
                  <div className="pizza-page__description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis tempore
                    architecto hic possimus eum eveniet, maiores quasi impedit aliquam distinctio.
                  </div>
                  <div className="pizza-block__selector">
                    <ul>
                      {state.types.map((type: number) => (
                        <li
                          onClick={() => setActiveType(type)}
                          className={activeType === type ? 'active' : ''}
                          key={type}>
                          {pizzaTypes[type]}
                        </li>
                      ))}
                    </ul>
                    <ul>
                      {state.sizes.map((size: number) => (
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
                    <div className="pizza-page__price">від {state.price} ₴</div>

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
              <div className="pizza-page__info">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ullam quam illum
                enim beatae, sunt molestias unde eos sint, quis rem numquam dicta eaque at assumenda
                modi nam laborum minima molestiae voluptas dolores? Perspiciatis id sequi maiores
                qui temporibus iure blanditiis, ex, corrupti minima reiciendis consequatur veritatis
                error ipsum incidunt?
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Завантаження...</div>
      )}
    </div>
  );
};

export default PizzaItem;
