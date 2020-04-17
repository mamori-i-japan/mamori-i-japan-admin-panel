import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';

const initialState = {
  token: ''
}

export default handleActions(
  {
    [actionTypes.LOGIN_SUCCESS]: (state, { payload: { token } }) => ({
      token
    }),

    [actionTypes.LOGOUT_SUCCESS]: () => ({
      token: ''
    })
  },
  initialState
);
