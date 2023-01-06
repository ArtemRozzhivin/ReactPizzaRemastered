import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalCount, calcTotalPrice } from '../../utils/calcTotalCart';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { CartSliceType, ItemCartPizza } from './types';

const cartLS = getCartFromLS();

const initialState: CartSliceType = {
  totalPrice: calcTotalPrice(cartLS),
  totalCount: calcTotalCount(cartLS),
  items: cartLS,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemCart: (state, action: PayloadAction<ItemCartPizza>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalCount = calcTotalCount(state.items);
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItemCart: (state, action: PayloadAction<{ id: string }>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem && findItem.count > 1) {
        findItem.count--;
      }

      state.totalCount = calcTotalCount(state.items);
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItemCart: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);

      state.totalCount = calcTotalCount(state.items);
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addItemCart, minusItemCart, removeItemCart, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
