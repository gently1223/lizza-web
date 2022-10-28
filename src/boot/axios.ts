import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $axios: AxiosInstance;
//   }
// }

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
let api: AxiosInstance;

export default boot(({ app }) => {
  if (window.location.port === '8080') {
    api = axios.create({ baseURL: 'http://localhost:5000/testapi' });
  } else {
    if (window.location.hostname.includes('preview')) {
      api = axios.create({ baseURL: '/testapi' });
    } else {
      api = axios.create({ baseURL: '/api' });
    }
  }

  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
