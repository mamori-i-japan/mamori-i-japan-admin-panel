import { createAction } from 'redux-actions';
import actionTypes from './actionTypes';

export const createUserAction = createAction(actionTypes.CREATE_USER);

export const getUsersAction = createAction(actionTypes.GET_USERS);
