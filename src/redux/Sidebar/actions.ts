import { createAction } from 'redux-actions';
import actionTypes from './actionTypes';

export const toggleSidebarCollapseAction = createAction(
  actionTypes.TOGGLE_SIDEBAR_COLLAPSE
);
