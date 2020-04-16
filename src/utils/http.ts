import axios from 'axios';
import { apiHost } from '../constants';
// eslint-disable-next-line import/no-cycle
import { store } from '../redux/store';

const AxiosRequestInterceptor = async (config: any) => {
  const configTemp = config;
  configTemp.headers = {
    'Content-Type': 'application/json',
    //"x-api-key": apiKey,
    ...configTemp.headers,
  };

  // TODO: get token from store
  try {
    // const { accessToken } = store.getState().users.token;
    // if (accessToken) {
    configTemp.headers = {
      Authorization: `Bearer ${`JST`}`,
      ...configTemp.headers,
      //   };
    };
  } catch (e) {
    console.log('Access Token Error => ', e);
  }

  return configTemp;
};

axios.defaults.timeout = 30000;
axios.defaults.baseURL = apiHost;
axios.interceptors.request.use(AxiosRequestInterceptor);
