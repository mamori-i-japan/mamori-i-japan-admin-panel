import { createAction } from 'redux-actions';
import actionTypes from './actionTypes';

export const createUserAction = createAction(actionTypes.CREATE_USER);
