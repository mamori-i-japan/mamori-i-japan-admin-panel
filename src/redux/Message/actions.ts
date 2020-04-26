import { createAction } from "redux-actions";
import actionTypes from "./actionTypes";

export const getMessagesAction = createAction(actionTypes.GET_MESSAGES);

export const creatMessagesAction = createAction(actionTypes.EDIT_MESSAGES_SUCCESS);
