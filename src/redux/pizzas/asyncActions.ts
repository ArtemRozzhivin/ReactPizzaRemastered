import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchPizzasPropsType, PizzaItemType } from './types';

export const fetchPizzas = createAsyncThunk<PizzaItemType[], fetchPizzasPropsType>(
  'pizzas/fetchPizzasStatus',
  async ({ activeCategory, activeSorting, searchValue }) => {
    const { data } = await axios.get(
      `https://63bd9867538970c560831fcd.mockapi.io/pizzas?
        activeCategory ? category=${activeCategory} : ''
      }&sortBy=${activeSorting.sort}&order=${activeSorting.order}`,
    );

    const searchingData = data.filter((obj: PizzaItemType) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase()),
    );

    return searchingData;
  },
);
