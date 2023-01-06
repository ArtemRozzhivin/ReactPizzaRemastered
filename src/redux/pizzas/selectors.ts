import { RootState } from '../store';

export const selectPizzaById = (id: string) => (state: RootState) =>
  state.pizzas.pizzas.find((obj) => obj.id === id);
export const selectPizzaData = (state: RootState) => state.pizzas;
