import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';

const initialState = {
  isCollapse: false
};

export default handleActions(
  {
    [actionTypes.TOGGLE_SIDEBAR_COLLAPSE]: (state = initialState) => ({
      isCollapse: !state.isCollapse
    })
  },
  initialState
);
