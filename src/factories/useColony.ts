import { AxiosError } from 'axios';
import axios from 'axios';


const API_KEY_COLONY_TEST = process.env.API_KEY_COLONY_TEST || '';
const API_KEY_COLONY_PROD = process.env.API_KEY_COLONY_PROD || '';

export const getColonys = () => {

  const getColonysArray = async (
    codigo_postal: number
  ): Promise<{
    success: boolean;
    value: any;
  }> => {
    try {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const url = `https://api.copomex.com/query/info_cp/${codigo_postal}?type=simplified&token=${API_KEY_COLONY_PROD}`;
      console.log('Consultando la URL = ', url);

      const result = await axios.get<unknown, { data: string; status: number }>(url);
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
      console.log('My error in getRates is: ', error);
      const myError = error as AxiosError;
      return {
        success: false,
        value: myError.message,
      };
    }
  };


  return {
    getColonysArray
  };
};
