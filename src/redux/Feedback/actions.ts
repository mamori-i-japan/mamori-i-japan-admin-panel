import { createAction } from 'redux-actions';
import actionTypes from './actionTypes';

export const showErrorAlertAction = createAction(actionTypes.SHOW_ERROR_MESSAGE);
export const closeErrorAlertAction = createAction(actionTypes.CLOSE_ERROR_MESSAGE);

export const showSuccessMessageAction = createAction(actionTypes.SHOW_SUCCESS_MESSAGE);
export const closeSuccessMessageAction = createAction(actionTypes.CLOSE_SUCCESS_MESSAGE);


