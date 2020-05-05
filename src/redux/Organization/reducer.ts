import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';
import { OrganizationStates, Organization } from './types';

const initialState: OrganizationStates = {
  listData: [],
  detailData: null,
};

export default handleActions(
  {
    [actionTypes.GET_ORGANIZATIONS_SUCCESS]: (state, { payload }: { type: string, payload: Organization[] }) => ({
      ...state,
      ...payload,
    }),

    [actionTypes.GET_ORGANIZATION_SUCCESS]: (
      state,
      { payload }: { type: string, payload: any }
    ) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);
