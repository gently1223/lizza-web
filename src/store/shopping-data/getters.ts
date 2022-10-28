import { ShoppingDataStateInterface } from './state';
const getters = {
  allData(state: ShoppingDataStateInterface) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return state.shoppingData;
  },
  uXFromViewRoute(state: ShoppingDataStateInterface) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return state.uXFromViewRoute ;
  },
  quotationShipmentId(state: ShoppingDataStateInterface) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return state.quotationShipmentId;
  },
  rateShipmentId(state: ShoppingDataStateInterface) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return state.rateShipmentId;
  },
  priceShipment(state: ShoppingDataStateInterface) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return state.priceShipment;
  },
  zipCodeValid(state: ShoppingDataStateInterface) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return state.zipCodeValid;
  },
  quoteCreated(state: ShoppingDataStateInterface) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return state.quoteCreated;
  },
  packServiceOptions(state: ShoppingDataStateInterface) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return state.packServiceOptions;
  },
  packServiceSelected(state: ShoppingDataStateInterface) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return state.packServiceSelected;
  },


}

export default getters;
