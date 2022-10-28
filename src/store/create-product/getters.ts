import { CreateProductStateInterface } from './state';
const getters = {
  currentMode(state: CreateProductStateInterface) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return state.modeToCreateProduct;
  }
}

export default getters;
