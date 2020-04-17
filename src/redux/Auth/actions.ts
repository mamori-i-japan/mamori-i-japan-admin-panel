import { createAction } from 'redux-actions';
import actionTypes from './actionTypes';

export const login = createAction(actionTypes.LOGIN);
export const logout = createAction(actionTypes.LOGOUT);
