import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';

const initialState = {
  listData: []
};

export default handleActions(
  {
    [actionTypes.GET_ORGANIZATIONS_SUCCESS]: (state, { payload }: any) => ({
      ...state,
      ...payload
    }),
  },
  initialState
);

