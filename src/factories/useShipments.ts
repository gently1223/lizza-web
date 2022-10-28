import { AxiosError } from 'axios';
import axios from 'axios';

const API_KEY_MIENVIO = process.env.API_KEY_MIENVIO_PROD || '';
const URL_MIENVIO = process.env.URL_MIENVIO_PROD || '';

export const useShipments = () => {
  const createDirection = async (
    details: any
  ): Promise<{
    success: boolean;
    value: string;
  }> => {
    try {
      const data = JSON.stringify(details);

      const result = await axios.post<unknown, { data: string; status: number }>(
        `${URL_MIENVIO}/addresses`,
        data,
        {
          headers: {
            Authorization: `Bearer ${API_KEY_MIENVIO}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('El resultado del post /createDirection es: ', result.data);
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
      console.log('My error in createDirection is: ', error);
      const myError = error as AxiosError;
      return {
        success: false,
        value: myError.response as unknown as string,
      };
    }
  };

  const createCotizacion = async (
    details: any
  ): Promise<{
    success: boolean;
    value: string;
  }> => {
    try {
      console.error('este: ', details)
      const data = JSON.stringify(details);

      const result = await axios.post<unknown, { data: string; status: number }>(
        `${URL_MIENVIO}/shipments`,
        data,
        {
          headers: {
            Authorization: `Bearer ${API_KEY_MIENVIO}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('El resultado del post /createCotizacion es: ', result.data);
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
      console.log('My error in createCotizacion is: ', error);
      const myError = error as AxiosError;
      return {
        success: false,
        value: myError.response as unknown as string,
      };
    }
  };

  const getRates = async (
    quote_shipment_id: string
  ): Promise<{
    success: boolean;
    value: string;
  }> => {
    try {
      const url = `${URL_MIENVIO}/shipments/${quote_shipment_id}/rates`;

      const result = await axios.get<unknown, { data: string; status: number }>(
        url,
        {
          headers: {
            Authorization: `Bearer ${API_KEY_MIENVIO}`,
          },
        }
      );

      console.log('Consultando: ', url);
      return {
        success: true,
        value: result.data,
      };
    } catch (error) {
      console.log('My error in getRates is: ', error);
      const myError = error as AxiosError;
      return {
        success: false,
        value: myError.response as unknown as string,
      };
    }
  };

  const getRateCarrier = async (
    quote_shipment_id: string,
    carrier: string
  ): Promise<{
    success: boolean;
    value: string;
  }> => {
    try {
      const url = `${URL_MIENVIO}/shipments/${quote_shipment_id}/rates/${carrier}`;

      const result = await axios.get<unknown, { data: string; status: number }>(
        url,
        {
          headers: {
            Authorization: `Bearer ${API_KEY_MIENVIO}`,
          },
        }
      );

      console.log('Consultando: ', url);
      return {
        success: true,
        value: result.data,
      };
    } catch (error) {
      console.log('My error in getRateCarrier is: ', error);
      const myError = error as AxiosError;
      return {
        success: false,
        value: myError.response as unknown as string,
      };
    }
  };

  const updateShipment = async (
    quote_shipment_id: string,
    request: any
  ): Promise<{
    success: boolean;
    value: string;
  }> => {
    try {
      const data = JSON.stringify(request);
      const url = `${URL_MIENVIO}/shipments/${quote_shipment_id}/`;

      console.log('Consultando: ', url);
      const result = await axios.put<unknown, { data: string; status: number }>(
        url,
        data,
        {
          headers: {
            Authorization: `Bearer ${API_KEY_MIENVIO}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('El resultado del post /updateShipment es: ', result.data);
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
      console.log('My error in createDirection is: ', error);
      const myError = error as AxiosError;
      return {
        success: false,
        value: myError.response as unknown as string,
      };
    }
  };

  const purchase = async (
    body: any
  ): Promise<{
    success: boolean;
    value: string;
  }> => {
    try {
      const data = JSON.stringify(body);

      const result = await axios.post<unknown, { data: string; status: number }>(
        `${URL_MIENVIO}/purchases`,
        data,
        {
          headers: {
            Authorization: `Bearer ${API_KEY_MIENVIO}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('El resultado del post /purchase es: ', result.data);
      if (result.status === 400) {
        return {
          success: false,
          value: result.data,
        };
      }

      if (result.status === 406) {
        return {
          success: false,
          value: 'Saldo insuficiente en wallet',
        };
      }

      return {
        success: true,
        value: result.data,
      };
    } catch (error) {
      console.log('My error in createCotizacion is: ', error);
      const myError = error as AxiosError;
      return {
        success: false,
        value: myError.response as unknown as string,
      };
    }
  };

  return {
    createDirection,
    createCotizacion,
    getRates,
    getRateCarrier,
    updateShipment,
    purchase,
  };
};
