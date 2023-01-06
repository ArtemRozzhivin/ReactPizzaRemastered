import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceType, SetFilltersType, SortingType } from './types';

const initialState: FilterSliceType = {
  activeCategory: 0,
  searchValue: '',
  activeSorting: {
    sort: 'rating',
    name: 'популярностью',
    order: 'desc',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.activeCategory = action.payload;
    },
    setSearching: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSort: (state, action: PayloadAction<SortingType>) => {
      state.activeSorting = action.payload;
    },
    setFilters: (state, action: PayloadAction<SetFilltersType>) => {
      state.activeSorting = action.payload.sortBy;
      state.activeCategory = action.payload.category;
    },
  },
});

export const { setCategory, setSort, setFilters, setSearching } = filterSlice.actions;

export default filterSlice.reducer;
