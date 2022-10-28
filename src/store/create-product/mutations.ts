import { CreateProductStateInterface } from './state';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const addMode = (state: CreateProductStateInterface, mode: string) => {
  state.modeToCreateProduct = mode;
}
