import { createAction } from 'redux-actions';
import actionTypes from './actionTypes';

export const createAdminUserAction = createAction(actionTypes.CREATE_ADMIN_USER);

export const getAdminUsersAction = createAction(actionTypes.GET_ADMIN_USERS);

export const getOrganizationOptionsAction = createAction(actionTypes.GET_ORGANIZATION_OPTIONS);

export const deleteAdminUserAction = createAction(actionTypes.DELETE_ADMIN_USER);
