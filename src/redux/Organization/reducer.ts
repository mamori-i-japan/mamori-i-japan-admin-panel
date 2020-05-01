import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';

const initialState = {
  listData: [],
  detailData: null,
};

export default handleActions(
  {
    [actionTypes.GET_ORGANIZATIONS_SUCCESS]: (state, { payload }: any) => ({
      ...state,
      ...payload,
    }),

    [actionTypes.GET_SELECTED_ORGANIZATION_SUCCESS]: (
      state,
      { payload }: any
    ) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);
