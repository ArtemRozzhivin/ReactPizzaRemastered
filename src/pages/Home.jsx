import React, { useEffect, useRef } from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import { selectFilter, setCategory, setFilters, setSort } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import SortPopup, { sorting } from '../components/SortPopup';
import PizzaBlock from '../components/PizzaBlock';
import PizzaBlockSkeleton from '../components/PizzaBlock/PizzaBlockSkeleton';
import NotFoundItem from '../components/notFoundItem/NotFoundItem';

import '../scss/app.scss';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { activeCategory, activeSorting, searchValue } = useSelector(selectFilter);
  const { pizzas, status } = useSelector(selectPizzaData);

  const getPizzas = async () => {
    dispatch(fetchPizzas({ activeCategory, activeSorting, searchValue }));
  };

  useEffect(() => {
    if (window.location.searchValue) {
      const urlParams = qs.parse(window.location.searchValue.substring(1));
      const sortBy = sorting.find((obj) => obj.sort === urlParams.sortBy);
      dispatch(setFilters({ category: Number(urlParams.category), sortBy: sortBy }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
      window.scrollTo(0, 0);
    }

    isSearch.current = false;
  }, [activeCategory, activeSorting, searchValue]);

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

        {status === 'error' ? (
          <NotFoundItem>По даній адресі сторінки не знайдено. Спробуйте пізніше.</NotFoundItem>
        ) : (
          <div className="content__items">
            {status === 'loading' ? (
              [...new Array(12)].map((_, index) => <PizzaBlockSkeleton key={index} />)
            ) : pizzas.length === 0 ? (
              <NotFoundItem>На жаль, піци не знайдено.</NotFoundItem>
            ) : (
              pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

//зробити окреме вікно для кожної піци
//зроботи аутлет
