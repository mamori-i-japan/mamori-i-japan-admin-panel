import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';

const initialState = {
  token: null
}

export default handleActions(
  {
    [actionTypes.LOGIN_SUCCESS]: ({ token }: any) => ({
      token
    }),

    [actionTypes.LOGOUT_SUCCESS]: () => ({
      token: null
    })
  },
  initialState
);
