import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';

const initialState = {
  listData: [],
  isOrganizationLoading: false,
};

export default handleActions(
  {
    [actionTypes.GET_ADMIN_USERS_SUCCESS]: (state, { payload: { listData } }) => ({
      ...state,
      listData,
    }),
    [actionTypes.CHANGE_ORGANIZATION_LOADING_STATUS]: (state, { payload: { isOrganizationLoading } }) => ({
      ...state,
      isOrganizationLoading,
    })
  },
  initialState
);
