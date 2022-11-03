import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	activeCategory: 0,
	searchValue: '',
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
		setSearching: (state, action) => {
			state.searchValue = action.payload
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

export const selectFilter = (state) => state.filter

export const {setCategory, setSort, setFilters, setSearching} = filterSlice.actions

export default filterSlice.reducer
