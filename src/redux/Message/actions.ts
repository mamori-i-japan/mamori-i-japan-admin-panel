import { createAction } from "redux-actions";
import actionTypes from "./actionTypes";

export const getMessagesAction = createAction(actionTypes.GET_MESSAGES);

export const updateMessageAction = createAction(actionTypes.UPDATE_MESSAGE);
