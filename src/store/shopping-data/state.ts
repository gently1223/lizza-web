import { ShoppingData } from 'src/components/models';
import { ServicePackOption } from 'src/models/ServicePackOption';

export interface ShoppingDataStateInterface {
  shoppingData: ShoppingData;
  uXFromViewRoute: string;
  quotationShipmentId: string;
  rateShipmentId: string;
  priceShipment: string;
  zipCodeValid : boolean;
  quoteCreated : boolean;
  packServiceOptions: ServicePackOption[];
  packServiceSelected: string;
}

function state(): ShoppingDataStateInterface {
  return {
    shoppingData: {
      name: '',
      phone: parseInt(''),
      email: '',
      street: '',
      numberInt: '',
      zipCode: parseInt(''),
      colony: '',
      city: '',
      state: '',
      packService: ''
    },
    uXFromViewRoute: '',
    quotationShipmentId: '', //297970,
    rateShipmentId: '', //174479
    priceShipment: '',
    zipCodeValid : false,
    quoteCreated : false,
    packServiceOptions: [],
    packServiceSelected: ''
  }
};

export default state;

