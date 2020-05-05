import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';
import { AdminRoleString } from "../../constants/AdminRole";

interface AuthStates {
  token: string | null;
  email: string | null;
  userAdminRole: AdminRoleString | null;
}

const initialState: AuthStates = {
  token: localStorage.getItem('token') || null,
  email: null,
  userAdminRole: null,
};

export default handleActions(
  {
    [actionTypes.SAVE_TOKEN_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),

    [actionTypes.LOGOUT_SUCCESS]: () => ({
      token: null,
      email: null,
      userAdminRole: null,
    }),
  },
  initialState
);
