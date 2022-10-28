import { ProductInCart } from 'src/components/models';

export interface ShoppingCartStateInterface {
  productList: ProductInCart[];
  lastMutation: string;
  modalIsOpened: boolean
}

function state(): ShoppingCartStateInterface {


  return {
    productList: [],
    lastMutation: '',
    modalIsOpened: false
  }
};

export default state;

