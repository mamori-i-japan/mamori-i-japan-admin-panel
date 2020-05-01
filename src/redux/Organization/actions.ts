import { createAction } from "redux-actions";
import actionTypes from "./actionTypes";

export const getOrganizationsAction = createAction(actionTypes.GET_ORGANIZATIONS);

export const createOrganizationAction = createAction(actionTypes.CREATE_ORGANIZATION);

export const updateOrganizationsAction = createAction(actionTypes.UPDATE_ORGANIZATION);

export const deleteOrganizationAction = createAction(actionTypes.DELETE_ORGANIZATION);

export const getSelectedOrganizationAction = createAction(actionTypes.GET_SELECTED_ORGANIZATION);

