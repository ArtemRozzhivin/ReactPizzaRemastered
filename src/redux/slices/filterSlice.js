import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	activeCategory: 0,
	activeSorting: {
    sort: 'rating',
    name: 'популярностью',
    order: 'desc',
  },
}



export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategory: (state, action) => {
			state.activeCategory = action.payload
		},
		setSort: (state, action) => {
			state.activeSorting = action.payload
		},
		setFilters: (state, action) => {
			state.activeSorting = action.payload.sortBy
			state.activeCategory = action.payload.category
		},
	}
})

export const {setCategory, setSort, setFilters} = filterSlice.actions

export default filterSlice.reducer
