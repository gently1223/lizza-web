import { ShoppingData } from 'src/components/models';
import { ServicePackOption } from 'src/models/ServicePackOption';
import { ShoppingDataStateInterface } from './state';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const addData = (state: ShoppingDataStateInterface, data: ShoppingData) => {
  state.shoppingData = {
    name: '',
    phone: parseInt(''),
    email: '',
    street: '',
    numberInt: '',
    zipCode: 0,
    colony: '',
    city: '',
    state: '',
    packService: ''
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  state.shoppingData = {...data}
}

export const setuXFromViewRoute = (state: ShoppingDataStateInterface, value: string) => {
  state.uXFromViewRoute = value;
}
export const setquotationShipmentId = (state: ShoppingDataStateInterface, value: string) => {
  state.quotationShipmentId = value;
}
export const setrateShipmentId = (state: ShoppingDataStateInterface, value: string) => {
  state.rateShipmentId = value;
}
export const setpriceShipment = (state: ShoppingDataStateInterface, value: string) => {
  state.priceShipment = value;
}

export const setZipCodeValid = (state: ShoppingDataStateInterface, value: boolean) => {
  state.zipCodeValid = value;
}
export const setQuoteCreated = (state: ShoppingDataStateInterface, value: boolean) => {
  state.quoteCreated = value;
}
export const setPackServiceOptions = (state: ShoppingDataStateInterface, value: ServicePackOption[]) => {
  state.packServiceOptions = value;
}
export const setPackServiceSelected = (state: ShoppingDataStateInterface, value: string) => {
  state.packServiceSelected = value;
}


