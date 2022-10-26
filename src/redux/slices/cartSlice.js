import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	totalCount: 0,
	totalPrice: 0,
	items: []
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

			state.totalCount = state.items.reduce((sum, obj) => obj.count + sum, 0)
			state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
		},
		removeItemCart: (state, action) => {
			state.items.filter((obj) => obj.id !== action.payload.id)
		},
		clearItems: (state) => {
			state.items = []
			state.totalPrice = 0
		},
	}
})

export const {addItemCart, removeItemCart, clearItems} = cartSlice.actions

export default cartSlice.reducer
