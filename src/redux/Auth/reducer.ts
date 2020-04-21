import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';

interface AuthStates {
  token: string | null;
  email: string | null;
}

const initialState: AuthStates = {
  token: localStorage.getItem('token') || null,
  email: null,
};

export default handleActions(
  {
    [actionTypes.GET_DEFAULT_TOKEN_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),

    [actionTypes.LOGIN_SUCCESS]: (state, { payload }) => ({
      ...payload,
    }),

    [actionTypes.LOGOUT_SUCCESS]: () => ({
      ...initialState,
    }),
  },
  initialState
);
