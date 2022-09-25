import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Categories from './components/Categories';
import SortPopup from './components/SortPopup';
import './scss/app.scss';
import PizzaBlock from './components/PizzaBlock';
import axios from 'axios';

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPizzas = async () => {
    const response = await axios
      .get('https://633058daf5fda801f8df1ccd.mockapi.io/pizzas')
      .then((res) => setPizzas(res.data));
  };

  useEffect(() => {
    setIsLoading(false);
    fetchPizzas();
    setIsLoading(true);
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <SortPopup />
            </div>
            <h2 className="content__title">Усі піци</h2>
            {isLoading ? (
              <div className="content__items">
                {pizzas.map((obj) => (
                  <PizzaBlock key={obj.id} {...obj} />
                ))}
              </div>
            ) : (
              'Завантаження піцц...'
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
