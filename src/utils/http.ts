import axios from 'axios';
import { store } from '../redux/store';
import { logoutAction } from '../redux/Auth/actions';
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

export const handleError = (response: Response) => {
  if (response && response.status === 401) {
    store.dispatch(
      showErrorAlertAction({
        errorCode: response.status,
        errorMessage: 'unauthorized',
      })
    );
    store.dispatch(logoutAction());
  } else if (response && response.status === 404) {
    store.dispatch(
      showErrorAlertAction({
        errorCode: response.status,
        errorMessage: 'notFound',
      })
    );

    return Promise.reject(response);
  } else if (response && response.status >= 500) {
    return store.dispatch(
      showErrorAlertAction({
        errorCode: response.status,
        errorMessage: 'internalServerError',
      })
    );
  } else {
    return Promise.reject(response);
  }
};

instance.interceptors.request.use(AxiosRequestInterceptor);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      return handleError(error.response);
    } else {
      store.dispatch(
        showErrorAlertAction({
          errorCode: 'xxx',
          errorMessage: 'unexpectError',
        })
      );
    }
  }
);

export default instance;
