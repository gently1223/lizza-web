import { AxiosError } from 'axios';
import { api } from 'boot/axios';

export const useStripe = () => {
  const createPaymentLink = async (
    name: string,
    description: string,
    price: number,
    image: string,
    stock: number,
    isActive: boolean,
    dimensions: any,
  ): Promise<{ success: boolean; value: string }> => {
    console.log('create link');
    //TODO to support multiple products on the same link need to pass a list
    try {
      // const result = await api.post<unknown, { data: string; status: number }>(
      //   '/link',
      //   {
      //     name,
      //     description,
      //     price,
      //     image,
      //     stock,
      //     isActive,
      //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      //     dimensions
      //   }
      // );
      const result = await api.post<unknown, { data: string; status: number }>(
        '/linkEmailNewCollection',
        {
          name,
          description,
          price,
          image,
          stock,
          isActive,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          dimensions
        }
      );
      console.log('El resultado de la nueva colección es: ', result);
      //The link id
      console.log(result);
      if (result.status === 400) {
        return { success: false, value: result.data };
      }
      return { success: true, value: result.data };
    } catch (e) {
      const a = e as AxiosError;
      return { success: false, value: a.message };
    }
  };

  const createPaymentLinkEmail = async (
    name: string,
    description: string,
    price: number,
    image: string,
    stock: number,
    isActive: boolean,
    dimensions: any,
  ): Promise<{ success: boolean; value: string }> => {
    console.log('create link');
    //TODO to support multiple products on the same link need to pass a list
    try {
      const result = await api.post<unknown, { data: string; status: number }>(
        '/linkEmail',
        {
          name,
          description,
          price,
          image,
          stock,
          isActive,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          dimensions
        }
      );
      //The link id
      console.log(result);
      if (result.status === 400) {
        return { success: false, value: result.data };
      }
      return { success: true, value: result.data };
    } catch (e) {
      const a = e as AxiosError;
      return { success: false, value: a.message };
    }
  };

  const createPaymentLinkCart = async (
    items: any[],
    shipment_id: string,
    store_name: string
  ): Promise<{ success: boolean; value: string }> => {
    try {
      const result = await api.post<unknown, { data: string; status: number }>(
        '/linkCart', {items, shipment_id, store_name}
      );
      console.log('El resultado del post /linkCart es: ', result);
      if (result.status === 400) {
        return {
          success: false,
          value: result.data,
        };
      }

      return {
        success: true,
        value: result.data,
      };
    } catch (error) {
      console.log('My error is: ', error);
      const myError = error as AxiosError;
      return {
        success: false,
        value: myError.message,
      };
    }
  };

  const createInhousePaymentLink = async (
    id: string,
    price: number
  ): Promise<{ success: boolean; value: string }> => {
    console.log('create link');
    //TODO to support multiple products on the same link need to pass a list
    try {
      const result = await api.post<unknown, { data: string; status: number }>(
        '/inhouse',
        {
          id,
          price,
        }
      );
      //The link id
      console.log(result);
      if (result.status === 400) {
        return { success: false, value: result.data };
      }
      return { success: true, value: result.data };
    } catch (e) {
      const a = e as AxiosError;
      return { success: false, value: a.message };
    }
  };

  const createPriceShipmentLink = async (
    shipment_price: string,
    quotationShipmentId: string,
    rateShipmentId: string
  ): Promise<{ success: boolean; value: string }> => {
    console.log('create link');
    //TODO to support multiple products on the same link need to pass a list
    try {
      const result = await api.post<unknown, { data: string; status: number }>(
        '/createPriceShipment',
        {
          shipment_price,
          quotationShipmentId,
          rateShipmentId,
        }
      );
      //The link id
      console.log(result);
      if (result.status === 400) {
        return { success: false, value: result.data };
      }
      return { success: true, value: result.data };
    } catch (e) {
      const a = e as AxiosError;
      return { success: false, value: a.message };
    }
  };

  return { createPaymentLink, createPaymentLinkEmail, createInhousePaymentLink, createPaymentLinkCart, createPriceShipmentLink };
};
