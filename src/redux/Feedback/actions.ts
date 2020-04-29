import { createAction } from 'redux-actions';
import actionTypes from './actionTypes';

export const showErrorAlertAction = createAction(actionTypes.SHOW_ERROR_ALERT);
export const closeErrorAlertAction = createAction(actionTypes.CLOSE_ERROR_ALERT);

export const showSuccessMessageAction = createAction(actionTypes.SHOW_SUCCESS_MESSAGE);
export const closeSuccessMessageAction = createAction(actionTypes.CLOSE_SUCCESS_MESSAGE);

export const showDeleteModalAction = createAction(actionTypes.SHOW_DELETE_MODAL);
export const closeDeleteModalAction = createAction(actionTypes.CLOSE_DELETE_MODAL);


