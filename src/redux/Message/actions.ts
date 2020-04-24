import { createAction } from "redux-actions";
import actionTypes from "./actionTypes";

export const getPositivesAction = createAction(actionTypes.GET_MESSAGES);

export const createPositiveAction = createAction(actionTypes.EDIT_MESSAGES_SUCCESS);
