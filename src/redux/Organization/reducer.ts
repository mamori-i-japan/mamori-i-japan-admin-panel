import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';
import { OrganizationStates, ListDataState, DetailDataState } from './types';

const initialState: OrganizationStates = {
  listData: [],
  detailData: {},
};

export default handleActions(
  {
    [actionTypes.GET_ORGANIZATIONS_SUCCESS]: (
      state,
      { payload }: { type: string; payload: ListDataState }
    ) => ({
      ...state,
      ...payload,
    }),

    [actionTypes.GET_ORGANIZATION_SUCCESS]: (
      state,
      { payload }: { type: string; payload: DetailDataState }
    ) => ({
      ...state,
      ...payload,
    }),

    [actionTypes.CLEAR_ORGANIZATION_SUCCESS]: (
      state,
      { payload }: { type: string; payload: DetailDataState }
    ) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);
