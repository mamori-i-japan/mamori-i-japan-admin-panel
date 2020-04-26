import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';

const initialState = {
  listData: []
};

export default handleActions(
  {
    [actionTypes.GET_MESSAGES_SUCCESS]: (state, { payload }: any) => ({
      ...state,
      ...payload
    }),

    [actionTypes.EDIT_MESSAGES_SUCCESS]: state => ({
      ...state,
    })
  },
  initialState
);

