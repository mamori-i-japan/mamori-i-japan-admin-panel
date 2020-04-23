import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';

const initialState = {
  listData: [],
};

export default handleActions(
  {
    [actionTypes.GET_USERS_SUCCESS]: (state, { payload: { listData } }) => ({
      ...state,
      listData,
    }),
  },
  initialState
);
