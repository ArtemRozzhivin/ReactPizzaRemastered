import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
	pizzas: [],
	status: 'loading', //loading,completed,error
}

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async ({activeCategory, activeSorting, searchValue}) => {
		const { data } = await axios.get(
			`https://633058daf5fda801f8df1ccd.mockapi.io/pizzas?${
				activeCategory ? `category=${activeCategory}` : ''
			}&sortBy=${activeSorting.sort}&order=${activeSorting.order}`,
		);
		const searchingData = data.filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
		return searchingData
  }
)

export const pizzaSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setPizzas: (state, action) => {
			console.log(state)
			state.pizzas = action.payload
		},
	},
	extraReducers: {
		[fetchPizzas.pending]: (state) => {
			state.pizzas = [];
			state.status = 'loading'
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.status = 'completed'
			state.pizzas = action.payload
		},
		[fetchPizzas.rejected]: (state) => {
			state.pizzas = [];
			state.status = 'error'
		}
	}
})

export const selectPizzaData = (state) => state.pizzas

export const {setPizzas} = pizzaSlice.actions

export default pizzaSlice.reducer
