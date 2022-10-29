import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { setCategory, setFilters, setSort } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import SortPopup, { sorting } from '../components/SortPopup';
import PizzaBlock from '../components/PizzaBlock';
import PizzaBlockSkeleton from '../components/PizzaBlock/PizzaBlockSkeleton';

import '../scss/app.scss';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { activeCategory, activeSorting } = useSelector((state) => state.filter);
  const { pizzas } = useSelector((state) => state.pizzas);

  const [isLoading, setIsLoading] = useState(false);
  const { search } = useContext(SearchContext);

  const getPizzas = async () => {
    try {
      dispatch(fetchPizzas(activeCategory, activeSorting, search));
    } catch (error) {
      console.log(new Error(error));
    } finally {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (window.location.search) {
      const urlParams = qs.parse(window.location.search.substring(1));

      const sortBy = sorting.find((obj) => obj.sort === urlParams.sortBy);

      dispatch(setFilters({ category: Number(urlParams.category), sortBy: sortBy }));

      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    setIsLoading(false);

    if (!isSearch.current) {
      getPizzas();
      window.scrollTo(0, 0);
    }

    isSearch.current = false;
  }, [activeCategory, activeSorting, search]);

  useEffect(() => {
    if (isMounted.current) {
      const params = qs.stringify({
        category: activeCategory,
        sortBy: activeSorting.sort,
        order: activeSorting.order,
      });

      navigate(`?${params}`);
    }
    isMounted.current = true;
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
            ? pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
            : [...new Array(12)].map((_, index) => <PizzaBlockSkeleton key={index} />)}
        </div>
      </div>
    </div>
  );
}

export default Home;

//реализовать в редуксе добавление, удаление и отображение пиц
