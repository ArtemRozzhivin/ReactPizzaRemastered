import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	totalCount: 0,
	totalPrice: 0,
	items: []
}

const calcTotalCount = (state) => {
	state.totalCount = state.items.reduce((sum, obj) => obj.count + sum, 0)
}

const calcTotalPrice = (state) => {
	state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItemCart: (state, action) => {
			const findItem = state.items.find((obj) => obj.id === action.payload.id)

			if(findItem){
				findItem.count++; 
			}else {
				state.items.push({...action.payload, count: 1})
			}

			calcTotalCount(state);
			calcTotalPrice(state);
		},
		minusItemCart: (state, action) => {
			const findItem = state.items.find((obj) => obj.id === action.payload.id)

			if(findItem){
				if(findItem.count > 1){
					findItem.count--;
				}
			}

			calcTotalCount(state);
			calcTotalPrice(state);
		},
		removeItemCart: (state, action) => {
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

export const selectCart = (state) => state.cart
export const selectCartItemById = (id) => (state) => state.cart.items.find((obj) => obj.id === id)
export const {addItemCart, minusItemCart, removeItemCart, clearItems} = cartSlice.actions

export default cartSlice.reducer
