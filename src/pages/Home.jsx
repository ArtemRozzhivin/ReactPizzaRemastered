import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { setCategory, setSort } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import SortPopup from '../components/SortPopup';
import PizzaBlock from '../components/PizzaBlock';
import PizzaBlockSkeleton from '../components/PizzaBlock/PizzaBlockSkeleton';
import '../scss/app.scss';

function Home() {
  const dispatch = useDispatch();
  const { activeCategory, activeSorting } = useSelector((state) => state.filter);

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useContext(SearchContext);

  const fetchPizzas = async () => {
    await axios
      .get(
        `https://633058daf5fda801f8df1ccd.mockapi.io/pizzas?${
          activeCategory ? `category=${activeCategory}` : ''
        }&sortBy=${activeSorting.sort}&order=${activeSorting.order}`,
      )
      .then((res) => setPizzas(res.data))
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(true));
  };

  useEffect(() => {
    setIsLoading(false);
    fetchPizzas();
  }, [activeCategory, activeSorting]);

  const setActiveCategory = (id) => {
    dispatch(setCategory(id));
  };

  const setActiveSorting = (id) => {
    dispatch(setSort(id));
  };

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories value={activeCategory} onChangeCategory={(id) => setActiveCategory(id)} />
          <SortPopup value={activeSorting} onChangeSortPopup={(item) => setActiveSorting(item)} />
        </div>
        <h2 className="content__title">Усі піци</h2>

        <div className="content__items">
          {isLoading
            ? pizzas
                .filter((obj) => obj.title.toLowerCase().includes(search.toLowerCase()))
                .map((obj) => <PizzaBlock key={obj.id} {...obj} />)
            : [...new Array(12)].map((_, index) => <PizzaBlockSkeleton key={index} />)}
        </div>
      </div>
    </div>
  );
}

export default Home;
