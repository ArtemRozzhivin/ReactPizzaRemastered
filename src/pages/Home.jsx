import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import SortPopup from '../components/SortPopup';
import PizzaBlock from '../components/PizzaBlock';
import PizzaBlockSkeleton from '../components/PizzaBlock/PizzaBlockSkeleton';
import '../scss/app.scss';

function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPizzas = async () => {
    const response = await axios
      .get('https://633058daf5fda801f8df1ccd.mockapi.io/pizzas')
      .then((res) => setPizzas(res.data))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(true));
  };

  useEffect(() => {
    setIsLoading(false);
    fetchPizzas();
  }, []);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories />
          <SortPopup />
        </div>
        <h2 className="content__title">Усі піци</h2>

        <div className="content__items">
          {isLoading
            ? pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
            : [...new Array(12)].map((_, index) => <PizzaBlockSkeleton key={index} />)}
        </div>
      </div>
    </div>
  );
}

export default Home;
