import { ShoppingCartStateInterface } from './state';
const getters = {
  countProducts(state: ShoppingCartStateInterface) {
    return state.productList.length;
  },
  products(state: ShoppingCartStateInterface) {
    return [...state.productList];
  },
  totalProductsMoney(state: ShoppingCartStateInterface) {
    const productsList = state.productList;
    return productsList.reduce((acc, item) => {
      const price = item.price ? item.price : 0;
      return acc + price * item.amount;
    }, 0);
  },
  countAmounts(state: ShoppingCartStateInterface) {
    const productsList = state.productList;
    return productsList.reduce((acc, item) => {
      const amount = item.amount ? item.amount : 0;
      return acc + amount;
    }, 0);
  },
  amountById: (state: ShoppingCartStateInterface) => {
    const productsList = state.productList;
    return (uid: string) => {
      const product = productsList.find((item) => item.uid === uid);
      if (product) {
        return product.amount;
      }
      return 0;
    };
  },
};
export default getters;
