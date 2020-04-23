import { createAction } from 'redux-actions';
import actionTypes from './actionTypes';

export const createAdminUserAction = createAction(actionTypes.CREATE_ADMIN_USER);

export const getAdminUsersAction = createAction(actionTypes.GET_ADMIN_USERS);
