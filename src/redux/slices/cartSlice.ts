import { RootState } from './../store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ItemCartPizza = {
	id: string; 
	title: string;
	price: number;
	imageUrl: string;
	size: number;
	type: string;
	count: number;
}

interface CartSliceType {
	totalCount: number;
	totalPrice: number;
	items: ItemCartPizza[];
} 

const initialState: CartSliceType = {
	totalCount: 0,
	totalPrice: 0,
	items: []
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItemCart: (state, action: PayloadAction<ItemCartPizza>) => {
			const findItem = state.items.find((obj) => obj.id === action.payload.id)

			if(findItem){
				findItem.count++; 
			}else {
				state.items.push({...action.payload, count: 1})
			}

			calcTotalCount(state);
			calcTotalPrice(state);
		},
		minusItemCart: (state, action: PayloadAction<{id: string}>) => {
			const findItem = state.items.find((obj) => obj.id === action.payload.id)

			if(findItem){
				if(findItem.count > 1){
					findItem.count--;
				}
			}

			calcTotalCount(state);
			calcTotalPrice(state);
		},
		removeItemCart: (state, action: PayloadAction<{id: string}>) => {
			state.items = state.items.filter((obj) => obj.id !== action.payload.id)

			calcTotalCount(state);
			calcTotalPrice(state);
		},
		clearItems: (state) => {
			state.items = []
			state.totalPrice = 0
			state.totalCount = 0
		},
	}
})

const calcTotalCount = (state: CartSliceType) => {
	state.totalCount = state.items.reduce((sum, obj) => obj.count + sum, 0)
}

const calcTotalPrice = (state: CartSliceType) => {
	state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
}
export const selectCart = (state: RootState) => state.cart
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find((obj) => obj.id === id)
export const {addItemCart, minusItemCart, removeItemCart, clearItems} = cartSlice.actions

export default cartSlice.reducer
