import { createAction } from 'redux-actions';
import actionTypes from './actionTypes';

export const loginAction = createAction(actionTypes.LOGIN);
export const logoutAction = createAction(actionTypes.LOGOUT);
