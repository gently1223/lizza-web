
export interface CreateProductStateInterface {
  modeToCreateProduct: string;

}

function state(): CreateProductStateInterface {
  return {
    modeToCreateProduct: ''
  }
};

export default state;

