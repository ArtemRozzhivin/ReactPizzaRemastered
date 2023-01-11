export const getCartFromLS = () => {
  const cart = localStorage.getItem('cart');

  return cart ? JSON.parse(cart) : [];
};
