import { useCallback, useEffect, useRef } from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../redux/store';
import Categories from '../components/Categories';
import SortPopup, { sorting, SortingType } from '../components/SortPopup';
import PizzaBlock from '../components/PizzaBlock';
import PizzaBlockSkeleton from '../components/PizzaBlock/PizzaBlockSkeleton';
import NotFoundItem from '../components/notFoundItem/NotFoundItem';

import '../scss/app.scss';
import { selectPizzaData } from '../redux/pizzas/selectors';
import { selectFilter } from '../redux/filter/selectors';
import { fetchPizzas } from '../redux/pizzas/asyncActions';
import { setCategory, setFilters, setSort } from '../redux/filter/slice';

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { activeCategory, activeSorting, searchValue } = useSelector(selectFilter);
  const { pizzas, status } = useSelector(selectPizzaData);

  const getPizzas = async () => {
    dispatch(fetchPizzas({ activeCategory, activeSorting, searchValue }));
  };

  useEffect(() => {
    if (window.location.search) {
      const urlParams = qs.parse(window.location.search.substring(1));
      const sortBy = sorting.find((obj) => obj.sort === urlParams.sortBy);

      if (sortBy) {
        dispatch(setFilters({ category: Number(urlParams.category), sortBy: sortBy }));
      }

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

  const setActiveCategory = useCallback((id: number) => {
    dispatch(setCategory(id));
  }, []);

  const setActiveSorting = useCallback((obj: SortingType) => {
    dispatch(setSort(obj));
  }, []);

  const renderPizzas = () => {
    if (status === 'loading') {
      return (
        <div className="content__items">
          {[...new Array(4)].map((_, index) => (
            <PizzaBlockSkeleton key={index} />
          ))}
        </div>
      );
    } else if (status === 'error') {
      return <NotFoundItem>По даній адресі сторінки не знайдено. Спробуйте пізніше.</NotFoundItem>;
    } else if (pizzas.length === 0) {
      return <NotFoundItem>На жаль, піци не знайдено.</NotFoundItem>;
    } else {
      return (
        <div className="content__items">
          {pizzas.map((obj: any) => (
            <PizzaBlock key={obj.id} {...obj} />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            value={activeCategory}
            setActiveCategory={(id: number) => setActiveCategory(id)}
          />
          <SortPopup
            value={activeSorting}
            onChangeSortPopup={(item: SortingType) => setActiveSorting(item)}
          />
        </div>
        <h2 className="content__title">Усі піци</h2>

        {renderPizzas()}
      </div>
    </div>
  );
};

export default Home;
