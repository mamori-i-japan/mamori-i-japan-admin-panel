import axios from 'axios';
import { store } from '../redux/store';
// import { logoutAction } from '../redux/Auth/actions';
import { showErrorAlertAction } from '../redux/Feedback/actions';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST || 'https://api-dev.mamori-i.jp/',
  timeout: 30000,
});

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

export const handleError = (response: any) => {
  if (response && response.status === 401) {
    store.dispatch(showErrorAlertAction(401, 'unauthorized'));
    // store.dispatch(logoutAction());
  } else if (response && response.status >= 500) {
    store.dispatch(showErrorAlertAction(response.status, 'internalServerError'));
  }
};

instance.interceptors.request.use(AxiosRequestInterceptor);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      handleError(error.response);
      return Promise.reject(error.response);
    } else {
      store.dispatch(showErrorAlertAction('000', 'unexpectError'));
    }
  }
);

export default instance;
