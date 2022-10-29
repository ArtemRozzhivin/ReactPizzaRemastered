import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
	pizzas: []
}

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasStatus',
  async (activeCategory, activeSorting, search) => {
		const { data } = await axios.get(
			`https://633058daf5fda801f8df1ccd.mockapi.io/pizzas?${
				activeCategory ? `category=${activeCategory}` : ''
			}&sortBy=${activeSorting.sort}&order=${activeSorting.order}`,
		);
		// data = data.filter((obj) => obj.title.toLowerCase().includes(search.toLowerCase()))
		console.log(data, 'data')
		return data
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
		[fetchPizzas.pending]: (state, action) => {
			console.log('Start')
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			setPizzas(data)
		},
		[fetchPizzas.rejected]: (state, action) => {
			console.log('Error')
		}
	}
})

export const {setPizzas} = pizzaSlice.actions

export default pizzaSlice.reducer
