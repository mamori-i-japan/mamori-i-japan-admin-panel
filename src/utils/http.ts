import axios from 'axios';
import { message } from 'antd';
import { store } from '../redux/store';
import { logoutAction } from '../redux/Auth/actions';

const instance = axios.create({
  baseURL: process.env.REACT_APP_HOST || 'https://api-dev.mamori-i.jp/',
  timeout: 30000
});

const AxiosRequestInterceptor = async (config: any) => {
  const configTemp = config;
  const token = store.getState().auth.token;

  console.log(token);

  configTemp.headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...configTemp.headers,
  };

  return configTemp;
};

const handleError = (response: any) => {
  if (response && response.status === 401) {
    message.error(response.toString());
    store.dispatch(logoutAction());
  }

  if (response && response.status >= 500) {
    console.log(response);
    message.error(`code: ${response.status}, message: ${response.toString()}`);
  }
};

instance.interceptors.request.use(AxiosRequestInterceptor);

instance.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response) {
    handleError(error.response);
  } else {
    console.log('no error response');
  }
})

export default instance;

