import { RootState } from './../store';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { SortingType } from './filterSlice';

type PizzaItemType = {
	id: string; 
	title: string;
	imageUrl: string;
	price: number;
	sizes: number[];
	types: number[];
	category: number;
	rating: number;
}

enum Status {
	LOADING = 'loading',
	FULFILLED = 'completed',
	ERROR = 'error',
}

interface PizzaSliceType {
	pizzas: PizzaItemType[],
	status: Status;
} 

const initialState: PizzaSliceType = {
	pizzas: [],
	status: Status.LOADING,
}

type fetchPizzasPropsType = {
	activeCategory: number,
	searchValue: string,
	activeSorting: SortingType,
}

export const fetchPizzas = createAsyncThunk<PizzaItemType[], fetchPizzasPropsType>(
  'pizzas/fetchPizzasStatus',
  async ({activeCategory, activeSorting, searchValue}) => {
		const { data } = await axios.get(
			`https://633058daf5fda801f8df1ccd.mockapi.io/pizzas?${
				activeCategory ? `category=${activeCategory}` : ''
			}&sortBy=${activeSorting.sort}&order=${activeSorting.order}`,
		);
		const searchingData = data.filter((obj: PizzaItemType) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
		return searchingData;
  }
)

export const pizzaSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setPizzas: (state, action: PayloadAction<PizzaItemType[]>) => {
			state.pizzas = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.pizzas = [];
			state.status = Status.LOADING
		})

		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.status = Status.FULFILLED
			state.pizzas = action.payload
		})

		builder.addCase(fetchPizzas.rejected, (state) => {
			state.pizzas = [];
			state.status = Status.ERROR
		})

	}
})

export const selectPizzaById = (id: string) => (state: RootState) => state.pizzas.pizzas.find((obj) => obj.id === id)
export const selectPizzaData = (state: RootState) => state.pizzas

export const {setPizzas} = pizzaSlice.actions

export default pizzaSlice.reducer
