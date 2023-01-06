import { SortingType } from '../filter/types';

export type PizzaItemType = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  types: number[];
  category: number;
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  FULFILLED = 'completed',
  ERROR = 'error',
}

export interface PizzaSliceType {
  pizzas: PizzaItemType[];
  status: Status;
}

export type fetchPizzasPropsType = {
  activeCategory: number;
  searchValue: string;
  activeSorting: SortingType;
};
