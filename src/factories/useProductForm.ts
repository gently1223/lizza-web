import { reactive, toRefs } from 'vue';
// import { api } from 'boot/axios';
import { Product } from 'src/components/models';
// import { auth } from 'boot/firebase';

const state = reactive({
  products: <Product[]>[],
  formProducts: <Product[]>[],
  product: <Product>{},
});

export const useProductForm = () => {
  //   const select = (post: Post) => {};
  let index = 0;

  const nextProduct = () => {
    const nexProduct = state.formProducts[index];
    if (nexProduct) {
      state.product = { ...nexProduct };
      index++;
      return true;
    }
    return false;
  };
  //Clean posts selected
  const clean = () => {
    state.formProducts = [];
  };

  return { ...toRefs(state), clean, nextProduct };
};
