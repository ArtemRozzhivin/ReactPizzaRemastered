import axios from 'axios';

export const fetchPizzaById = async (id: string) => {
  const { data } = await axios.get('https://633058daf5fda801f8df1ccd.mockapi.io/pizzas/' + id);
  return data;
};
