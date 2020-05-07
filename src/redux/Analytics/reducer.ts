import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';

const initialState = {
  lineChartData: [],
};

export default handleActions(
  {
    [actionTypes.GET_ANALYTICS_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);
