export type ItemCartPizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
};

export interface CartSliceType {
  totalCount: number;
  totalPrice: number;
  items: ItemCartPizza[];
}
