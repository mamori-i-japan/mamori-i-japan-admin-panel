import { createAction } from "redux-actions";
import actionTypes from "./actionTypes";

export const getPositivesAction = createAction(actionTypes.GET_POSITIVES);

export const createPositiveAction = createAction(actionTypes.CREATE_POSITIVE);
