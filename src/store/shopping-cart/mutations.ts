import { ProductInCart } from 'src/components/models';
import { ShoppingCartStateInterface } from './state';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const addProduct = (state: ShoppingCartStateInterface, product: ProductInCart) => {
  const productList = state.productList;
  const { uid } = product;
  const elementIndex = productList.findIndex( (item: ProductInCart) => item.uid === uid);
  console.log('elementIndex:', elementIndex);
  if(elementIndex != -1) {
    productList[elementIndex]['amount'] += 1;
  }else {
    const newState = [... productList, product];
    state.productList = newState;
  }
  state.lastMutation = 'addProduct'
}
export const removeProduct = (state: ShoppingCartStateInterface, product: ProductInCart) => {
  const productList = state.productList;
  const { uid, amount } = product;
  const elementIndex = productList.findIndex( (item: ProductInCart) => item.uid === uid);
  if(amount === 1) {
    productList.splice(elementIndex, 1);
  }else {
    productList[elementIndex]['amount'] = amount - 1;
  }
  state.lastMutation = 'removeProduct'
}
export const updateProduct = (state: ShoppingCartStateInterface, product: ProductInCart) => {
  const productList = state.productList;
  const { uid, amount} = product;
  const elementIndex = productList.findIndex( (item: ProductInCart) => item.uid === uid);
  if(elementIndex != -1) {
    productList[elementIndex]['amount'] = amount;
  }else {
    const newState = [... productList, product];
    state.productList = newState;
  }
  state.lastMutation = 'updateProduct'
}
