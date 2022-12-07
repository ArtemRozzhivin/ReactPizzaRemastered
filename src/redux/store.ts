import { configureStore, createReducer } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import cartReducer from "./slices/cartSlice"
import pizzaReducer from "./slices/pizzaSlice"

export const store = configureStore({
	reducer: {
		filter: filterReducer,
		cart: cartReducer,
		pizzas: pizzaReducer,
	}
})

export type RootState = ReturnType<typeof store.getState>

