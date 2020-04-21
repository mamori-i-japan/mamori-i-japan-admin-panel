import { handleActions } from 'redux-actions';
import actionTypes from './actionTypes';

const initialState = {
  listData: []
};

export default handleActions(
  {
    [actionTypes.GET_POSITIVES_SUCCESS]: (state, { payload }: any) => ({
      ...state,
      listData: payload
    }),

    [actionTypes.CREATE_POSITIVE_SUCCESS]: state => ({
      ...state,
    })
  },
  initialState
);

