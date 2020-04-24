import axios from 'axios';
import { store } from '../redux/store';

const AxiosRequestInterceptor = async (config: any) => {
  const configTemp = config;
  const token = store.getState().auth.token;

  configTemp.headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...configTemp.headers,
  };

  return configTemp;
};

axios.defaults.timeout = 30000;
axios.defaults.baseURL = process.env.REACT_APP_HOST || 'https://api-dev.mamori-i.jp/';
axios.interceptors.request.use(AxiosRequestInterceptor);

export default axios;

