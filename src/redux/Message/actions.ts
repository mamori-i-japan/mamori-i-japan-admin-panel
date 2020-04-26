import { createAction } from "redux-actions";
import actionTypes from "./actionTypes";

export const getMessagesAction = createAction(actionTypes.GET_MESSAGES);

export const editMessagesAction = createAction(actionTypes.UPDATE_MESSAGES);
