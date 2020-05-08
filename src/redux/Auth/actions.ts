import { createAction } from 'redux-actions';
import actionTypes from './actionTypes';

export const loginAction = createAction(actionTypes.LOGIN);
export const logoutAction = createAction(actionTypes.LOGOUT);
export const autoSignInAction = createAction(actionTypes.AUTO_SIGN_IN); 
