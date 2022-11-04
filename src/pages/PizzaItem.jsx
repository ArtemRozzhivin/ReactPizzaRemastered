import axios from 'axios';
import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PizzaItem = () => {
  const { id } = useParams();
  const [item, setItem] = useState({});

  const pizzaTypes = ['тонка', 'традиційна'];

  useEffect(() => {
    const fetchItem = async () => {
      const { data } = await axios.get(`https://633058daf5fda801f8df1ccd.mockapi.io/pizzas/${id}`);
      setItem(data);
      console.log(data);
    };
    fetchItem();
  }, []);

  if (isEmpty(item)) {
    return <h2>Завантаження...</h2>;
  }

  return (
    <div className="content">
      <div className="container">
        <div className="pizza-item">
          <img className="pizza-item__image" src={item.imageUrl} alt="pizza" />
          <div>
            <h2 className="pizza-item__title">{item.title}</h2>
            <div className="pizza-item__price">від {item.price} ₴</div>
            <div className="pizza-item__selector">
              <ul>
                {item.types.map((type) => (
                  <li key={type}>{pizzaTypes[type]}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaItem;
