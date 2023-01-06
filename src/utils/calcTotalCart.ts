import { ItemCartPizza } from '../redux/cart/types';

export const calcTotalCount = (items: ItemCartPizza[]) => {
  return items.reduce((sum, obj) => obj.count + sum, 0);
};

export const calcTotalPrice = (items: ItemCartPizza[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
